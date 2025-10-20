// Error messages organized by category
export const ERROR_MESSAGES = {
  CLIENT: {
    EMAIL_ALREADY_EXISTS: {
      error: 'EMAIL_ALREADY_EXISTS',
      message: 'Email already exists'
    },
    REGISTRATION_FAILED: {
      error: 'CLIENT_REGISTRATION_FAILED',
      message: 'Client registration failed'
    }
  },
  
  TOKEN: {
    INVALID: {
      error: 'INVALID_TOKEN',
      message: 'Invalid token'
    },
    VALIDATION_FAILED: {
      error: 'TOKEN_VALIDATION_FAILED',
      message: 'Token validation failed'
    }
  },
  
  EXTERNAL: {
    SECURITY_MS_UNAVAILABLE: {
      error: 'SECURITY_MS_UNAVAILABLE',
      message: 'Security service unavailable'
    },
    EMAIL_SERVICE_UNAVAILABLE: {
      error: 'EMAIL_SERVICE_UNAVAILABLE',
      message: 'Email service unavailable'
    }
  },
  
  DATABASE: {
    CONNECTION_ERROR: {
      error: 'DATABASE_CONNECTION_ERROR',
      message: 'Database connection failed'
    },
    QUERY_ERROR: {
      error: 'DATABASE_QUERY_ERROR',
      message: 'Database query failed'
    },
    CONSTRAINT_ERROR: {
      error: 'DATABASE_CONSTRAINT_ERROR',
      message: 'Database constraint violation'
    }
  },
  
  CACHE: {
    REDIS_CONNECTION_ERROR: {
      error: 'REDIS_CONNECTION_ERROR',
      message: 'Redis connection failed'
    },
    REDIS_OPERATION_ERROR: {
      error: 'REDIS_OPERATION_ERROR',
      message: 'Redis operation failed'
    }
  },
  
  QUEUE: {
    RABBITMQ_CONNECTION_ERROR: {
      error: 'RABBITMQ_CONNECTION_ERROR',
      message: 'RabbitMQ connection failed'
    },
    RABBITMQ_CHANNEL_ERROR: {
      error: 'RABBITMQ_CHANNEL_ERROR',
      message: 'RabbitMQ channel error'
    },
    MESSAGE_ENQUEUE_FAILED: {
      error: 'MESSAGE_ENQUEUE_FAILED',
      message: 'Failed to enqueue message'
    }
  },
  
  GENERAL: {
    VALIDATION_ERROR: {
      error: 'VALIDATION_ERROR',
      message: 'Validation error'
    },
    INTERNAL_SERVER_ERROR: {
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Internal server error'
    },
    SERVICE_UNAVAILABLE: {
      error: 'SERVICE_UNAVAILABLE',
      message: 'Service unavailable'
    }
  }
} as const;
