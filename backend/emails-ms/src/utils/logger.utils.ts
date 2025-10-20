/**
 * Utility functions for logging and formatting
 */

/**
 * Masks email for logging (shows first 3 chars and domain)
 * @param email - Email to mask
 * @returns Masked email
 * @example maskEmail('test@example.com') => 'tes***@example.com'
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return '***';
  const [local, domain] = email.split('@');
  const maskedLocal = local.substring(0, 3) + '***';
  return `${maskedLocal}@${domain}`;
}

/**
 * Formats timestamp for logging
 * @param date - Date to format
 * @returns Formatted timestamp string
 */
export function formatTimestamp(date: Date = new Date()): string {
  return date.toISOString();
}

/**
 * Validates email message format
 * @param message - Message to validate
 * @returns True if message is valid
 */
export function validateEmailMessage(message: any): message is { to: string; subject: string; body?: string; clientId?: number } {
  return (
    message &&
    typeof message === 'object' &&
    typeof message.to === 'string' &&
    typeof message.subject === 'string' &&
    message.to.includes('@') &&
    message.subject.length > 0
  );
}
