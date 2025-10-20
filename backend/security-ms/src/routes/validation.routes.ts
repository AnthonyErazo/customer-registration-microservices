import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { TokenValidationRequest, TokenValidationResponse, ErrorResponse } from '../types/interfaces';
import { ERROR_MESSAGES } from '../types/constants';
import { validateToken } from '../services/token.service';
import { validateTokenFormat, maskToken, isTokenExpired } from '../utils/token.utils';

/**
 * Registers token validation route
 * @body token: string
 * @response 200: TokenValidationResponse
 * @response 400: ErrorResponse
 * @response 404: ErrorResponse
 * @response 500: ErrorResponse
 * @route POST /token/validate
 */
export async function registerValidationRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.post('/token/validate', {
    schema: {
      body: {
        type: 'object',
        required: ['token'],
        properties: {
          token: { type: 'string', minLength: 8, maxLength: 8 }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            valid: { type: 'boolean' },
            expires_at: { type: 'string' }
          }
        },
        400: {
          type: 'object',
          properties: {
            valid: { type: 'boolean' },
            reason: { type: 'string' }
          }
        },
        404: {
          type: 'object',
          properties: {
            valid: { type: 'boolean' },
            reason: { type: 'string' }
          }
        }
      }
    }
  }, async (
    request: FastifyRequest<{ Body: TokenValidationRequest }>,
    reply: FastifyReply
  ): Promise<TokenValidationResponse | ErrorResponse> => {
    try {
      const { token } = request.body;
      
      const formatValidation = validateTokenFormat(token);
      if (!formatValidation.valid) {
        fastify.log.warn({
          action: ERROR_MESSAGES.TOKEN.VALIDATION_FAILED.error,
          reason: formatValidation.reason,
          token: maskToken(token)
        });
        
        return reply.code(400).send({
          error: ERROR_MESSAGES.TOKEN.VALIDATION_FAILED.error,
          message: formatValidation.reason
        });
      }
      
      const result = await validateToken(token);
      
      if (!result.valid || !result.expires_at) {
        return reply.code(404).send({
          error: ERROR_MESSAGES.TOKEN.NOT_FOUND.error,
          message: ERROR_MESSAGES.TOKEN.NOT_FOUND.message
        });
      }
      
      if (isTokenExpired(result.expires_at)) {
        return reply.code(400).send({
          error: ERROR_MESSAGES.TOKEN.EXPIRED.error,
          message: ERROR_MESSAGES.TOKEN.EXPIRED.message
        });
      }
      
      if (!result.is_active) {
        return reply.code(400).send({
          error: ERROR_MESSAGES.TOKEN.INVALIDATED.error,
          message: ERROR_MESSAGES.TOKEN.INVALIDATED.message
        });
      }
      
      fastify.log.info({
        action: 'token_validated',
        token: maskToken(token),
        expires_at: result.expires_at.toISOString()
      });
      
      return reply.code(200).send({
        valid: true,
        expires_at: result.expires_at.toISOString()
      });
      
    } catch (error) {
      fastify.log.error(`Error validating token: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return reply.code(500).send({
        error: ERROR_MESSAGES.GENERAL.VALIDATION_ERROR.error,
        message: ERROR_MESSAGES.GENERAL.VALIDATION_ERROR.message
      });
    }
  });
}
