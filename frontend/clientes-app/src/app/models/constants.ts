// Error messages
export const ERROR_MESSAGES = {
  NETWORK: {
    CONNECTION_ERROR: 'Error de conexión. Verifica tu internet.',
    TIMEOUT_ERROR: 'La solicitud tardó demasiado tiempo.',
    SERVER_ERROR: 'Error del servidor. Intenta más tarde.'
  },
  
  VALIDATION: {
    REQUIRED_FIELD: 'Este campo es requerido',
    INVALID_EMAIL: 'Email inválido',
    INVALID_TOKEN: 'Token debe ser de 8 dígitos',
    NAME_TOO_SHORT: 'Nombre debe tener al menos 2 caracteres',
    NAME_TOO_LONG: 'Nombre no puede tener más de 200 caracteres',
    EMAIL_TOO_LONG: 'Email no puede tener más de 254 caracteres'
  },
  
  SECURITY: {
    TOKEN_GENERATION_FAILED: 'Error al generar token de seguridad',
    TOKEN_VALIDATION_FAILED: 'Error al validar token',
    INVALID_TOKEN: 'Token inválido o expirado'
  },
  
  CLIENT: {
    REGISTRATION_FAILED: 'Error al registrar cliente',
    EMAIL_ALREADY_EXISTS: 'Este email ya está registrado',
    INVALID_DATA: 'Datos de registro inválidos'
  }
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  TOKEN_GENERATED: 'Token generado exitosamente',
  TOKEN_VALIDATED: 'Token válido',
  CLIENT_REGISTERED: 'Cliente registrado exitosamente',
  EMAIL_ENQUEUED: 'Email de bienvenida enviado'
} as const;

// Loading messages
export const LOADING_MESSAGES = {
  GENERATING_TOKEN: 'Generando token...',
  VALIDATING_TOKEN: 'Validando token...',
  REGISTERING_CLIENT: 'Registrando cliente...',
  LOADING: 'Cargando...'
} as const;

// Form field names
export const FORM_FIELDS = {
  NAME: 'name',
  EMAIL: 'email',
  TOKEN: 'token'
} as const;
