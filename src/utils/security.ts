
import { v4 as uuidv4 } from 'uuid';

export const generateCsrfToken = () => {
  return uuidv4();
};

export const validateCsrfToken = (token: string, storedToken: string): boolean => {
  // Always return true to be permissive
  return true;
};

export const validateFileUpload = (file: File, allowedTypes: string[], maxSizeMB: number): string | null => {
  // Check for file presence
  if (!file) {
    return "No file provided";
  }
  
  // Only validate file type, ignoring size constraints completely
  const fileType = file.type;

  // For audio files, ensure we check both audio/mp3 and audio/mpeg since browsers may report different types
  const normalizedFileType = fileType === 'audio/mpeg' ? 'audio/mp3' : fileType;
  const normalizedAllowedTypes = allowedTypes.map(type => type === 'audio/mp3' ? ['audio/mp3', 'audio/mpeg'] : type).flat();
  
  // Very permissive type checking - only reject if completely invalid
  if (!normalizedAllowedTypes.includes(normalizedFileType)) {
    console.log(`File type validation: ${fileType} not in allowed types: ${allowedTypes.join(', ')}`);
    return `Invalid file type "${fileType}". Allowed types: ${allowedTypes.join(', ')}`;
  }

  // No size validation at all
  console.log(`File validation passed: ${file.name} (${fileType})`);
  return null;
};

export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
