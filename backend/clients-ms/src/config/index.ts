// Application configuration
export const APP_CONFIG = {
  PORT: Number(process.env['PORT'] || 3002),
  NODE_ENV: process.env['NODE_ENV'] || 'development',
  VERSION: process.env['npm_package_version'] || '1.0.0',
  LOG_LEVEL: process.env['LOG_LEVEL'] || 'info'
} as const;

// Database configuration
export const DB_CONFIG = {
  HOST: process.env['MYSQL_HOST'] || '127.0.0.1',
  PORT: Number(process.env['MYSQL_PORT'] || 3306),
  USER: process.env['MYSQL_USER'] || 'root',
  PASSWORD: process.env['MYSQL_PASSWORD'] || 'rootpass',
  DATABASE: process.env['MYSQL_DATABASE'] || 'appdb',
  WAIT_FOR_CONNECTIONS: true,
  CONNECTION_LIMIT: Number(process.env['MYSQL_POOL'] || 10)
} as const;

// Redis cache configuration
export const REDIS_CONFIG = {
  HOST: process.env['REDIS_HOST'] || '127.0.0.1',
  PORT: Number(process.env['REDIS_PORT'] || 6379)
} as const;

// External services configuration
export const SERVICES_CONFIG = {
  SECURITY_MS_URL: process.env['SECURITY_MS_URL'] || 'http://localhost:3001',
  TOKEN_VALIDATION_TIMEOUT: 5000
} as const;

// RabbitMQ message queue configuration
export const QUEUE_CONFIG = {
  RABBIT_URL: process.env['RABBITMQ_URL'] || 'amqp://localhost:5672',
  EMAIL_QUEUE: process.env['EMAIL_QUEUE'] || 'email_queue'
} as const;
