
/**
 * Access control utilities for the application
 */

// List of authorized administrator email addresses
export const AUTHORIZED_ADMIN_EMAILS = [
  'info@vocalexcellence.cy',
  'info@vocalexcellence.com.cy',
  'andreas@vocalexcellence.cy',
  'andreas@vocalexcellence.com.cy',
  'aroditis.andreas@gmail.com'
];

/**
 * Check if an email is authorized for admin access
 * @param email The email address to check
 * @returns Boolean indicating if the email is authorized
 */
export const isAuthorizedAdmin = (email: string | undefined | null): boolean => {
  if (!email) return false;
  return AUTHORIZED_ADMIN_EMAILS.includes(email.toLowerCase().trim());
};

/**
 * Log access attempt to admin area
 * @param email Email used for the attempt
 * @param success Whether access was granted
 */
export const logAdminAccessAttempt = (email: string | undefined | null, success: boolean): void => {
  const timestamp = new Date().toISOString();
  const ipAddress = '(IP logging implemented server-side)'; // In production, this would be captured server-side
  
  // Log to console for development
  console.log(`[ADMIN ACCESS ATTEMPT] ${timestamp} | Email: ${email || 'none'} | Success: ${success} | IP: ${ipAddress}`);
  
  // In production, this would send the log to a secure storage system
  // This could be implemented with a Supabase edge function
};
