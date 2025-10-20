import mysql, { Pool } from 'mysql2/promise';
import { DB_CONFIG } from '../config';

let pool: Pool | undefined;

/**
 * Gets the database pool with lazy initialization
 * @returns Database pool instance
 */
export async function getPool(): Promise<Pool> {
  if (!pool) {
    pool = mysql.createPool({
      host: DB_CONFIG.HOST,
      port: DB_CONFIG.PORT,
      user: DB_CONFIG.USER,
      password: DB_CONFIG.PASSWORD,
      database: DB_CONFIG.DATABASE,
      waitForConnections: DB_CONFIG.WAIT_FOR_CONNECTIONS,
      connectionLimit: DB_CONFIG.CONNECTION_LIMIT,
      queueLimit: DB_CONFIG.QUEUE_LIMIT
    });
  }
  return pool;
}

/**
 * Closes the database pool
 */
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = undefined;
  }
}
