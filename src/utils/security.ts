
// Security utility functions

/**
 * Regular expression for validating email addresses
 */
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Generate a CSRF token to protect forms
 */
export function generateCsrfToken(): string {
  // Create random bytes
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  
  // Convert to base64 string
  return btoa(String.fromCharCode.apply(null, Array.from(array)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Validate a file upload
 * @param file The file to validate
 * @param allowedTypes Array of allowed MIME types
 * @param maxSizeBytes Maximum file size in bytes
 * @returns Error message if validation fails, null if valid
 */
export function validateFileUpload(
  file: File, 
  allowedTypes: string[],
  maxSizeBytes: number
): string | null {
  // Check file size
  if (file.size > maxSizeBytes) {
    return `File size exceeds the ${Math.round(maxSizeBytes / (1024 * 1024))}MB limit`;
  }
  
  // Check file type
  if (!allowedTypes.includes(file.type)) {
    const typeNames = allowedTypes.map(type => {
      if (type.includes('pdf')) return 'PDF';
      if (type.includes('mp3') || type.includes('mpeg')) return 'MP3';
      if (type.includes('wav')) return 'WAV';
      return type.split('/')[1]?.toUpperCase() || type;
    }).join(', ');
    
    return `Invalid file type. Allowed types: ${typeNames}`;
  }
  
  return null;
}

/**
 * Sanitize user input to prevent XSS attacks
 * @param input String to sanitize
 * @returns Sanitized string
 */
export function sanitizeInput(input: string): string {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}
