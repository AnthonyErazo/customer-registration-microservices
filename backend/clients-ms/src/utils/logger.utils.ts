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
  const maskedLocal = local?.substring(0, 3) + '***';
  return `${maskedLocal ?? '***'}@${domain}`;
}

/**
 * Formats response time in milliseconds
 * @param startTime - Start time in milliseconds
 * @returns Formatted response time string
 */
export function formatResponseTime(startTime: number): string {
  return `${Date.now() - startTime}ms`;
}
