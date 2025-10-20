import crypto from 'crypto';
import retry from 'async-retry';
import { FieldPacket } from 'mysql2/promise';
import { getPool } from '../database/pool';
import { TOKEN_CONFIG } from '../config';
import { TokenQueryResult } from '../types/interfaces';

/**
 * Generates a unique 8-digit token with collision detection
 * @returns Promise with unique token
 */
export async function generateUniqueToken(): Promise<string> {
  return await retry(async (): Promise<string> => {
    const token = crypto
      .randomInt(0, 100000000)
      .toString()
      .padStart(TOKEN_CONFIG.LENGTH, '0');
    
    const pool = await getPool();
    const [rows] = await pool.execute(
      'SELECT token_id FROM security_tokens WHERE token_value = ?',
      [token]
    ) as [TokenQueryResult[], FieldPacket[]];
    
    if (rows.length > 0) {
      throw new Error('Token collision detected');
    }
    
    return token;
  }, {
    retries: TOKEN_CONFIG.MAX_RETRIES,
    factor: 2,
    minTimeout: 10,
    maxTimeout: 100
  });
}

/**
 * Stores token in database
 * @param token - Token value
 * @param expiresAt - Expiration date
 * @param metadata - Optional metadata
 * @returns Token ID
 */
export async function storeToken(
  token: string,
  expiresAt: Date,
  metadata: Record<string, any> = {}
): Promise<string> {
  const tokenId = crypto.randomUUID();
  const pool = await getPool();
  
  await pool.execute(
    'INSERT INTO security_tokens (token_id, token_value, is_active, expires_at, metadata) VALUES (?, ?, ?, ?, ?)',
    [tokenId, token, true, expiresAt, JSON.stringify(metadata)]
  );
  
  return tokenId;
}

/**
 * Validates token in database
 * @param token - Token to validate
 * @returns Validation result with token data
 */
export async function validateToken(token: string): Promise<{
  valid: boolean;
  is_active?: boolean;
  expires_at?: Date;
}> {
  const pool = await getPool();
  const [rows] = await pool.query(
    'SELECT is_active, expires_at FROM security_tokens WHERE token_value = ?',
    [token]
  ) as [Array<{ is_active: boolean; expires_at: Date }>, FieldPacket[]];
  
  if (rows.length === 0) {
    return { valid: false };
  }
  
  const tokenData = rows[0];
  if (!tokenData) {
    return { valid: false };
  }
  
  return {
    valid: true,
    is_active: tokenData.is_active,
    expires_at: tokenData.expires_at
  };
}
