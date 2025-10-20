import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

import { MICROSERVICES_CONFIG } from '../config/app.config';
import { 
  SecurityTokenResponse, 
  TokenValidationResponse, 
  ClientRegistrationRequest, 
  ClientRegistrationResponse,
  ApiError 
} from '../models/interfaces';
import { ERROR_MESSAGES } from '../models/constants';

@Injectable({
  providedIn: 'root'
})
export class MicroservicesSdkService {
  
  constructor(private http: HttpClient) {}

  /**
   * Genera un token de seguridad de 8 dígitos
   * @returns Observable con la respuesta del token
   */
  generateSecurityToken(): Observable<SecurityTokenResponse> {
    return this.http.post<SecurityTokenResponse>(`${MICROSERVICES_CONFIG.SECURITY_MS_URL}/token`, {})
      .pipe(
        timeout(MICROSERVICES_CONFIG.TIMEOUT),
        catchError(this.handleError)
      );
  }

  /**
   * Valida un token de seguridad
   * @param token - Token a validar
   * @returns Observable con el resultado de la validación
   */
  validateSecurityToken(token: string): Observable<TokenValidationResponse> {
    return this.http.post<TokenValidationResponse>(`${MICROSERVICES_CONFIG.SECURITY_MS_URL}/token/validate`, { token })
      .pipe(
        timeout(MICROSERVICES_CONFIG.TIMEOUT),
        catchError(this.handleError)
      );
  }

  /**
   * Registra un nuevo cliente
   * @param registrationData - Datos del cliente a registrar
   * @returns Observable con la respuesta del registro
   */
  registerClient(registrationData: ClientRegistrationRequest): Observable<ClientRegistrationResponse> {
    return this.http.post<ClientRegistrationResponse>(`${MICROSERVICES_CONFIG.CLIENTS_MS_URL}/clients`, registrationData)
      .pipe(
        timeout(MICROSERVICES_CONFIG.TIMEOUT),
        catchError(this.handleError)
      );
  }

  /**
   * Maneja errores HTTP
   * @param error - Error HTTP
   * @returns Observable con error manejado
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string = ERROR_MESSAGES.NETWORK.SERVER_ERROR;
    
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = ERROR_MESSAGES.NETWORK.CONNECTION_ERROR;
    } else {
      // Error del servidor
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      } else {
        switch (error.status) {
          case 0:
            errorMessage = ERROR_MESSAGES.NETWORK.CONNECTION_ERROR;
            break;
          case 400:
            errorMessage = ERROR_MESSAGES.CLIENT.INVALID_DATA;
            break;
          case 401:
            errorMessage = ERROR_MESSAGES.SECURITY.INVALID_TOKEN;
            break;
          case 409:
            errorMessage = ERROR_MESSAGES.CLIENT.EMAIL_ALREADY_EXISTS;
            break;
          case 500:
            errorMessage = ERROR_MESSAGES.NETWORK.SERVER_ERROR;
            break;
          case 503:
            errorMessage = ERROR_MESSAGES.SECURITY.TOKEN_GENERATION_FAILED;
            break;
          default:
            errorMessage = `Error ${error.status}: ${error.statusText}`;
        }
      }
    }
    
    console.error('Error en SDK:', errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}
