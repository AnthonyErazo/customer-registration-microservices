import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

/**
 * Registers health check route
 * @returns Promise<void>
 * @route GET /health
 * @response 200: { status: 'OK', message: 'Service is healthy' }
 */
export async function registerHealthRoutes(fastify: FastifyInstance): Promise<void> {
  fastify.get('/health', async (
    _request: FastifyRequest,
    reply: FastifyReply
  ) => {
    return reply.status(200).send({
      status: 'OK',
      message: 'Service is healthy'
    });
  });
}
