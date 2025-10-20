import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { TokenGenerationRequest, TokenGenerationResponse, ErrorResponse } from '../types/interfaces';
import { ERROR_MESSAGES } from '../types/constants';
import { generateUniqueToken, storeToken } from '../services/token.service';
import { calculateTokenExpiration, maskToken } from '../utils/token.utils';

/**
 * Registers token generation route
 * @request Body: TokenGenerationRequest
 * @response 200: TokenGenerationResponse
 * @response 500: ErrorResponse
 * @response 503: ErrorResponse
 * @route POST /token
 */
export async function registerTokenRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.post('/token', {
    schema: {
      body: {
        type: 'object',
        properties: {
          metadata: { type: 'object' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            token: { type: 'string' },
            expires_at: { type: 'string' },
            created_at: { type: 'string' }
          }
        },
        500: {
          type: 'object',
          properties: {
            error: { type: 'string' },
            message: { type: 'string' }
          }
        },
        503: {
          type: 'object',
          properties: {
            error: { type: 'string' },
            message: { type: 'string' }
          }
        }
      }
    }
  }, async (
    request: FastifyRequest<{ Body: TokenGenerationRequest }>,
    reply: FastifyReply
  ): Promise<TokenGenerationResponse | ErrorResponse> => {
    try {
      const startTime = Date.now();
      const { metadata = {} } = request.body || {};
      
      const token = await generateUniqueToken();
      const expiresAt = calculateTokenExpiration();
      
      await storeToken(token, expiresAt, metadata);
      
      const responseTime = Date.now() - startTime;
      fastify.log.info({
        action: 'token_generated',
        token: maskToken(token),
        responseTime: `${responseTime}ms`,
        metadata
      });
      
      return {
        token,
        expires_at: expiresAt.toISOString(),
        created_at: new Date().toISOString()
      };
      
    } catch (error) {
      fastify.log.error(`Error generating token: ${error instanceof Error ? error.message : 'Unknown error'}`);
      
      if (error instanceof Error && error.message.includes('Unable to generate unique token')) {
        return reply.code(503).send({
          error: ERROR_MESSAGES.TOKEN.GENERATION_FAILED.error,
          message: ERROR_MESSAGES.TOKEN.GENERATION_FAILED.message
        });
      }
      
      return reply.code(500).send({
        error: ERROR_MESSAGES.GENERAL.INTERNAL_SERVER_ERROR.error,
        message: ERROR_MESSAGES.GENERAL.INTERNAL_SERVER_ERROR.message
      });
    }
  });
}
