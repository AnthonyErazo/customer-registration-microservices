// Application configuration
export const APP_CONFIG = {
  PORT: Number(process.env['PORT'] || 3003),
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

// RabbitMQ message queue configuration
export const QUEUE_CONFIG = {
  RABBIT_URL: process.env['RABBITMQ_URL'] || 'amqp://localhost:5672',
  EMAIL_QUEUE: process.env['EMAIL_QUEUE'] || 'email_queue',
  PREFETCH_COUNT: Number(process.env['PREFETCH_COUNT'] || 10)
} as const;
