// Application configuration
export const APP_CONFIG = {
  PORT: Number(process.env['PORT'] || 3001),
  NODE_ENV: process.env['NODE_ENV'] || 'development',
  VERSION: process.env['npm_package_version'] || '1.0.0',
  LOG_LEVEL: process.env['LOG_LEVEL'] || 'info'
} as const;

// Token configuration
export const TOKEN_CONFIG = {
  LENGTH: 8,
  MAX_RETRIES: 10,
  EXPIRY_HOURS: parseInt(process.env['TOKEN_EXPIRY_HOURS'] || '24')
} as const;

// Database configuration
export const DB_CONFIG = {
  HOST: process.env['MYSQL_HOST'] || 'localhost',
  PORT: Number(process.env['MYSQL_PORT'] || 3306),
  USER: process.env['MYSQL_USER'] || 'appuser',
  PASSWORD: process.env['MYSQL_PASSWORD'] || 'appsecret',
  DATABASE: process.env['MYSQL_DATABASE'] || 'appdb',
  WAIT_FOR_CONNECTIONS: true,
  CONNECTION_LIMIT: Number(process.env['MYSQL_POOL'] || 10),
  QUEUE_LIMIT: 0
} as const;