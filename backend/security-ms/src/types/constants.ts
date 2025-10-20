// Error messages organized by category
export const ERROR_MESSAGES = {
  TOKEN: {
    REQUIRED: {
      error: 'TOKEN_REQUIRED',
      message: 'Token is required'
    },
    MUST_BE_STRING: {
      error: 'TOKEN_MUST_BE_STRING',
      message: 'Token must be a string'
    },
    INVALID_LENGTH: {
      error: 'TOKEN_INVALID_LENGTH',
      message: 'Token must be 8 digits long'
    },
    MUST_BE_NUMERIC: {
      error: 'TOKEN_MUST_BE_NUMERIC',
      message: 'Token must be a number'
    },
    NO_REASON: {
      error: 'NO_REASON',
      message: 'No reason'
    },
    VALIDATION_FAILED: {
      error: 'TOKEN_VALIDATION_FAILED',
      message: 'Token validation failed'
    },
    NOT_FOUND: {
      error: 'TOKEN_NOT_FOUND',
      message: 'Token not found'
    },
    EXPIRED: {
      error: 'TOKEN_EXPIRED',
      message: 'Token expired'
    },
    INVALIDATED: {
      error: 'TOKEN_INVALIDATED',
      message: 'Token invalidated'
    },
    GENERATION_FAILED: {
      error: 'TOKEN_GENERATION_FAILED',
      message: 'Failed to generate unique token'
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
    }
  }
} as const;
