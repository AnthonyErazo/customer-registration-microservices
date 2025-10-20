import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import sensible from '@fastify/sensible';
import rateLimit from '@fastify/rate-limit';

import { APP_CONFIG } from './config';
import { closePool } from './database/pool';
import { registerHealthRoutes, registerTokenRoutes, registerValidationRoutes } from './routes';

// Fastify initialization
const fastify = Fastify({
  logger: {
    level: APP_CONFIG.LOG_LEVEL,
    redact: ['req.headers.authorization']
  }
});

// Register plugins
fastify.register(cors, { origin: true, credentials: true });
fastify.register(helmet);
fastify.register(sensible);
fastify.register(rateLimit, { max: 100, timeWindow: '1 minute' });

// Register routes
async function registerRoutes(): Promise<void> {
  await registerHealthRoutes(fastify);
  await registerTokenRoutes(fastify);
  await registerValidationRoutes(fastify);
}

/**
 * Graceful shutdown
 * @param signal - Signal to shutdown
 * @returns Promise<void>
 * @throws Error if shutdown fails
 */
async function gracefulShutdown(signal: string): Promise<void> {
  fastify.log.info(`Received ${signal}, shutting down gracefully...`);
  
  try {
    await fastify.close();
    await closePool();
    fastify.log.info('Server closed successfully');
    process.exit(0);
  } catch (error) {
    fastify.log.error(`Error during shutdown: ${error instanceof Error ? error.message : 'Unknown error'}`);
    process.exit(1);
  }
}

// Signal handlers
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Error handlers
process.on('uncaughtException', (error: Error) => {
  fastify.log.error(`Uncaught Exception: ${error.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
  fastify.log.error(`Unhandled Rejection at: ${promise} reason: ${reason}`);
  process.exit(1);
});

// Global error handler
fastify.setErrorHandler((error, _request, reply) => {
  fastify.log.error(error);
  return reply.code(500).send({
    error: 'INTERNAL_SERVER_ERROR',
    message: 'Internal server error'
  });
});

/**
 * Starts the application server
 * @returns Promise<void>
 * @throws Error if start fails
 */
async function start(): Promise<void> {
  try {
    await registerRoutes();
    await fastify.listen({ host: '0.0.0.0', port: APP_CONFIG.PORT });
    
    fastify.log.info({
      message: 'Security microservice started successfully',
      port: APP_CONFIG.PORT,
      environment: APP_CONFIG.NODE_ENV,
      version: APP_CONFIG.VERSION
    });
  } catch (error) {
    fastify.log.error(`Failed to start server: ${error instanceof Error ? error.message : 'Unknown error'}`);
    process.exit(1);
  }
}

start();