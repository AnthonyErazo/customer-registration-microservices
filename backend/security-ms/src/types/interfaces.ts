import { RowDataPacket } from 'mysql2';

// Database interfaces
export interface SecurityToken extends RowDataPacket {
  token_id: string;
  token_value: string;
  is_active: boolean;
  expires_at: Date;
  metadata?: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

export interface TokenQueryResult extends RowDataPacket {
  token_id: string;
}

export interface TokenValidationQueryResult extends RowDataPacket {
  is_active: boolean;
  expires_at: Date;
}

// API Request/Response interfaces
export interface TokenGenerationRequest {
  metadata?: Record<string, any>;
}

export interface TokenGenerationResponse {
  token: string;
  expires_at: string;
  created_at: string;
}

export interface TokenValidationRequest {
  token: string;
}

export interface TokenValidationResponse {
  valid: boolean;
  expires_at?: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
}

// Configuration interfaces
export interface DatabaseConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
  waitForConnections: boolean;
  connectionLimit: number;
  queueLimit: number;
  acquireTimeout: number;
  timeout: number;
  reconnect: boolean;
}

export interface AppConfig {
  TOKEN_LENGTH: number;
  MAX_RETRIES: number;
  TOKEN_EXPIRY_HOURS: number;
}

// Validation interfaces
export interface ValidationResult {
  valid: boolean;
  reason: string;
}

// Retry configuration
export interface RetryConfig {
  retries: number;
  factor: number;
  minTimeout: number;
  maxTimeout: number;
}
