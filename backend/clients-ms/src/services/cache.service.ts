import Redis from 'ioredis';
import { REDIS_CONFIG } from '../config';
import { FieldPacket, Pool } from 'mysql2/promise';
import { Param } from '../types/interfaces';

// Redis client instance
const redis = new Redis({
  host: REDIS_CONFIG.HOST,
  port: REDIS_CONFIG.PORT
});

/**
 * Loads parameters from database to Redis cache
 * @param getPool - Database pool getter function
 * @returns Number of parameters loaded
 */
export async function loadParamsToRedis(getPool: () => Promise<Pool>): Promise<number> {
  const pool = await getPool();
  const [rows] = await pool.query('SELECT `key`, `value` FROM params') as [Param[], FieldPacket[]];
  
  for (const row of rows) {
    await redis.set(`app:param:${row.key}`, row.value);
  }
  
  return rows.length;
}

/**
 * Gets a parameter value from Redis cache
 * @param key - Parameter key
 * @returns Parameter value or null
 */
export async function getParam(key: string): Promise<string | null> {
  return await redis.get(`app:param:${key}`);
}

/**
 * Checks if welcome email should be sent based on Redis config
 * @returns True if welcome email should be sent
 */
export async function shouldSendWelcomeEmail(): Promise<boolean> {
  const sendEmail = await getParam('send_welcome_email');
  return String(sendEmail).toLowerCase() === 'true';
}

/**
 * Closes the Redis connection
 * @returns Promise<void>
 * @throws Error if close fails
 */
export async function disconnectRedis(): Promise<void> {
  await redis.quit();
}

// Export queue service functions
export * from './queue.service';