import axios from 'axios';
import http from 'http';
import https from 'https';
import { SERVICES_CONFIG } from '../config';
import { SecurityTokenValidationResponse } from '../types/interfaces';

/**
 * Validates a security token with the security microservice
 * @param token - Token to validate
 * @returns Validation response
 * @throws Error if security service is unavailable
 */
export async function validateSecurityToken(token: string): Promise<SecurityTokenValidationResponse> {
  try {
    const response = await axios.post(
      `${SERVICES_CONFIG.SECURITY_MS_URL}/token/validate`,
      { token },
      {
        timeout: SERVICES_CONFIG.TOKEN_VALIDATION_TIMEOUT,
        httpAgent: new http.Agent({ keepAlive: true }),
        httpsAgent: new https.Agent({ keepAlive: true })
      }
    );
    
    return response.data;
  } catch (error) {
    throw new Error('security_ms_unavailable');
  }
}
