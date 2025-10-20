import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { ConsumeMessage } from 'amqplib';

// Database interfaces
export interface EmailLog extends RowDataPacket {
  log_id: string;
  recipient_email: string;
  email_subject: string;
  email_body?: string;
  client_id?: string;
  status: 'pending' | 'sent' | 'failed';
  created_at: Date;
  sent_at?: Date;
}

export interface EmailLogInsertResult extends ResultSetHeader {
  insertId: number;
}

// Message queue interfaces
export interface EmailMessage {
  to: string;
  subject: string;
  body: string;
  clientId: number;
}

export interface ProcessedMessage {
  message: ConsumeMessage;
  payload: EmailMessage;
}

// Configuration interfaces
export interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password?: string;
  database: string;
  waitForConnections: boolean;
  connectionLimit: number;
}

export interface QueueConfig {
  rabbitUrl: string;
  emailQueue: string;
  prefetchCount: number;
}

export interface AppConfig {
  PORT: number;
  NODE_ENV: string;
  VERSION: string;
  LOG_LEVEL: string;
}

// Error types
export interface DatabaseError extends Error {
  code?: string;
  errno?: number;
}

export interface QueueError extends Error {
  code?: string;
}
