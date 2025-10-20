import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { ClientRegistrationRequest, ClientRegistrationResponse, ErrorResponse } from '../types/interfaces';
import { ERROR_MESSAGES } from '../types/constants';
import { validateSecurityToken } from '../services/security.service';
import { registerClient } from '../services/client.service';
import { enqueueWelcomeEmail } from '../services/queue.service';
import { shouldSendWelcomeEmail } from '../services/cache.service';
import { maskEmail, formatResponseTime } from '../utils/logger.utils';

/**
 * Registers client registration routes
 * @request Body: ClientRegistrationRequest
 * @response 200: ClientRegistrationResponse
 * @response 400: ErrorResponse
 * @response 401: ErrorResponse
 * @response 409: ErrorResponse
 * @response 500: ErrorResponse
 * @response 503: ErrorResponse
 * @route POST /clients
 */
export async function registerClientRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.post('/clients', {
    schema: {
      body: {
        type: 'object',
        properties: {
          name: { type: 'string', minLength: 1, maxLength: 200 },
          email: { type: 'string', format: 'email', maxLength: 254 },
          token: { type: 'string', pattern: '^\\d{8}$' }
        },
        required: ['name', 'email', 'token'],
        additionalProperties: false
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            email: { type: 'string' },
            enqueuedEmail: { type: 'boolean' }
          },
          required: ['id', 'name', 'email', 'enqueuedEmail']
        }
      }
    }
  }, async (
    request: FastifyRequest<{ Body: ClientRegistrationRequest }>,
    reply: FastifyReply
  ): Promise<ClientRegistrationResponse | ErrorResponse> => {
    const startTime = Date.now();
    const { name, email, token } = request.body;

    try {
        // Validate token with security microservice
      const validationResult = await validateSecurityToken(token);
      if (!validationResult.valid) {
        fastify.log.warn({
          action: 'invalid_token',
          email: maskEmail(email)
        });
        return reply.code(401).send(ERROR_MESSAGES.TOKEN.INVALID);
      }

      // Register client in database
      const clientId = await registerClient(name, email);

      // Check if welcome email should be sent and enqueue
      const shouldSend = await shouldSendWelcomeEmail();
      const enqueuedEmail = shouldSend 
        ? await enqueueWelcomeEmail(email, name, clientId)
        : false;

      fastify.log.info({
        action: 'client_registered',
        clientId,
        email: maskEmail(email),
        enqueuedEmail,
        responseTime: formatResponseTime(startTime)
      });

      return reply.code(200).send({
        id: clientId,
        name,
        email,
        enqueuedEmail
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      fastify.log.error({
        action: 'client_registration_failed',
        error: errorMessage,
        email: maskEmail(email)
      });

      // Handle specific errors
      switch (errorMessage) {
        case 'security_ms_unavailable':
          return reply.code(503).send(ERROR_MESSAGES.EXTERNAL.SECURITY_MS_UNAVAILABLE);
        case 'email_already_exists':
          return reply.code(409).send(ERROR_MESSAGES.CLIENT.EMAIL_ALREADY_EXISTS);
        case 'db_error':
          return reply.code(500).send(ERROR_MESSAGES.DATABASE.QUERY_ERROR);
        default:
          return reply.code(500).send(ERROR_MESSAGES.GENERAL.INTERNAL_SERVER_ERROR);
      }
    }
  });
}
