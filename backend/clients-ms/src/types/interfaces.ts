import { RowDataPacket, ResultSetHeader } from 'mysql2';

// Database interfaces
export interface Customer extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export interface CustomerInsertResult extends ResultSetHeader {
  insertId: number;
}

export interface Param extends RowDataPacket {
  key: string;
  value: string;
}

// API Request/Response interfaces
export interface ClientRegistrationRequest {
  name: string;
  email: string;
  token: string;
}

export interface ClientRegistrationResponse {
  id: number;
  name: string;
  email: string;
  enqueuedEmail: boolean;
}

export interface ErrorResponse {
  error: string;
  message: string;
}

// External service interfaces
export interface SecurityTokenValidationRequest {
  token: string;
}

export interface SecurityTokenValidationResponse {
  valid: boolean;
  reason?: string;
  expires_at?: string;
}

export interface EmailMessage {
  to: string;
  subject: string;
  body: string;
  clientId: number;
}

// Configuration interfaces
export interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  waitForConnections: boolean;
  connectionLimit: number;
}

export interface RedisConfig {
  host: string;
  port: number;
}

export interface AppConfig {
  PORT: number;
  RABBIT_URL: string;
  SECURITY_MS_URL: string;
  EMAIL_QUEUE: string;
  TOKEN_VALIDATION_TIMEOUT: number;
}

// Error types
export interface DatabaseError extends Error {
  code?: string;
  errno?: number;
}

export interface ValidationError extends Error {
  validation?: any;
}

// HTTP Agent types
export interface HttpAgentConfig {
  keepAlive: boolean;
}

export interface AxiosConfig {
  timeout: number;
  httpAgent: any;
  httpsAgent: any;
}