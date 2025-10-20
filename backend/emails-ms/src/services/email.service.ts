import { FieldPacket } from 'mysql2/promise';
import { getPool } from '../database/pool';
import { EmailLogInsertResult, EmailMessage } from '../types/interfaces';

/**
 * Logs an email message to the database
 * @param emailMessage - Email message data
 * @returns Log ID
 * @throws Error if database operation fails
 */
export async function logEmailMessage(emailMessage: EmailMessage): Promise<number> {
  try {
    const pool = await getPool();
    const [result] = await pool.execute(
      'INSERT INTO email_logs (recipient_email, email_subject, email_body, client_id, status) VALUES (?, ?, ?, ?, ?)',
      [
        emailMessage.to,
        emailMessage.subject,
        emailMessage.body || null,
        emailMessage.clientId || null,
        'received'
      ]
    ) as [EmailLogInsertResult, FieldPacket[]];
    
    return result.insertId;
  } catch (error: any) {
    throw new Error('db_insert_error');
  }
}