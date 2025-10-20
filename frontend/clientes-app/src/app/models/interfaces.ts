// Security microservice interfaces
export interface SecurityTokenResponse {
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

// Clients microservice interfaces
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

// Common interfaces
export interface ApiError {
  error: string;
  message: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  success: boolean;
}

// Form interfaces
export interface RegistrationFormData {
  name: string;
  email: string;
  token: string;
}

export interface FormValidationError {
  field: string;
  message: string;
}
