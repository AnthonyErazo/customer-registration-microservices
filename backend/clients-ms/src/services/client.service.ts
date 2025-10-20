import { FieldPacket } from 'mysql2/promise';
import { getPool } from '../database/pool';
import { CustomerInsertResult } from '../types/interfaces';

/**
 * Registers a new client in the database
 * @param name - Client name
 * @param email - Client email
 * @returns Client ID
 * @throws Error if email already exists or database error occurs
 */
export async function registerClient(name: string, email: string): Promise<number> {
  try {
    const pool = await getPool();
    const [result] = await pool.execute(
      'INSERT INTO customers (name, email) VALUES (?, ?)',
      [name, email]
    ) as [CustomerInsertResult, FieldPacket[]];
    
    return result.insertId;
  } catch (error: any) {
    if (error && (error.code === 'ER_DUP_ENTRY' || error.errno === 1062)) {
      throw new Error('email_already_exists');
    }
    throw new Error('db_error');
  }
}
