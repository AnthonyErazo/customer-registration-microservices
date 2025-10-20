import { ValidationResult } from '../types/interfaces';
import { ERROR_MESSAGES } from '../types/constants';
import { TOKEN_CONFIG } from '../config';

/**
 * Validates token format
 * @param token - Token to validate
 * @returns Validation result
 */
export function validateTokenFormat(token: string): ValidationResult {
  const isValid = 
    !!token && 
    typeof token === 'string' && 
    token.length === TOKEN_CONFIG.LENGTH && 
    /^\d{8}$/.test(token);
  
  const reason = !isValid ? ERROR_MESSAGES.TOKEN.REQUIRED.message 
    : typeof token !== 'string' ? ERROR_MESSAGES.TOKEN.MUST_BE_STRING.message
    : token.length !== TOKEN_CONFIG.LENGTH ? ERROR_MESSAGES.TOKEN.INVALID_LENGTH.message
    : !/^\d{8}$/.test(token) ? ERROR_MESSAGES.TOKEN.MUST_BE_NUMERIC.message
    : ERROR_MESSAGES.TOKEN.NO_REASON.message;
  
  return { valid: isValid, reason };
}

/**
 * Masks token for logging (shows first 4 chars)
 * @param token - Token to mask
 * @returns Masked token
 */
export function maskToken(token: string): string {
  return token ? token.substring(0, 4) + '****' : 'null';
}

/**
 * Calculates token expiration date
 * @param hours - Hours to add to current time
 * @returns Expiration date
 */
export function calculateTokenExpiration(hours: number = TOKEN_CONFIG.EXPIRY_HOURS): Date {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + hours);
  return expiresAt;
}

/**
 * Checks if token is expired
 * @param expiresAt - Expiration date
 * @returns True if expired
 */
export function isTokenExpired(expiresAt: Date): boolean {
  return new Date() > new Date(expiresAt);
}
