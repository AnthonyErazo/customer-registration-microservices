// Application configuration
export const APP_CONFIG = {
  TITLE: 'Sistema de Registro de Clientes',
  DESCRIPTION: 'Sistema integrado con microservicios de seguridad y clientes',
  VERSION: '1.0.0'
} as const;

// Microservices URLs configuration
export const MICROSERVICES_CONFIG = {
  SECURITY_MS_URL: 'http://localhost:3001',
  CLIENTS_MS_URL: 'http://localhost:3002',
  TIMEOUT: 10000 // 10 seconds
} as const;

// Form validation configuration
export const VALIDATION_CONFIG = {
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 200
  },
  EMAIL: {
    MAX_LENGTH: 254
  },
  TOKEN: {
    LENGTH: 8,
    PATTERN: /^\d{8}$/
  }
} as const;

// UI configuration
export const UI_CONFIG = {
  DEBOUNCE_TIME: 300,
  TOAST_DURATION: 5000,
  LOADING_DELAY: 500
} as const;
