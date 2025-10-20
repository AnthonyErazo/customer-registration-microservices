// Error messages organized by category
export const ERROR_MESSAGES = {
  // Email processing errors
  EMAIL: {
    PROCESSING_FAILED: {
      error: 'EMAIL_PROCESSING_FAILED',
      message: 'Failed to process email message'
    },
    INVALID_MESSAGE: {
      error: 'INVALID_MESSAGE_FORMAT',
      message: 'Invalid message format'
    },
    MISSING_FIELDS: {
      error: 'MISSING_REQUIRED_FIELDS',
      message: 'Missing required email fields'
    }
  },
  
  // Database errors
  DATABASE: {
    CONNECTION_ERROR: {
      error: 'DATABASE_CONNECTION_ERROR',
      message: 'Database connection failed'
    },
    QUERY_ERROR: {
      error: 'DATABASE_QUERY_ERROR',
      message: 'Database query failed'
    },
    INSERT_ERROR: {
      error: 'DATABASE_INSERT_ERROR',
      message: 'Failed to insert email log'
    }
  },
  
  // Message queue errors
  QUEUE: {
    RABBITMQ_CONNECTION_ERROR: {
      error: 'RABBITMQ_CONNECTION_ERROR',
      message: 'RabbitMQ connection failed'
    },
    RABBITMQ_CHANNEL_ERROR: {
      error: 'RABBITMQ_CHANNEL_ERROR',
      message: 'RabbitMQ channel error'
    },
    MESSAGE_CONSUME_ERROR: {
      error: 'MESSAGE_CONSUME_ERROR',
      message: 'Failed to consume message'
    },
    MESSAGE_ACK_ERROR: {
      error: 'MESSAGE_ACK_ERROR',
      message: 'Failed to acknowledge message'
    }
  },
  
  // General errors
  GENERAL: {
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
