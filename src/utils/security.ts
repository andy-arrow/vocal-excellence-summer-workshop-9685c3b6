
import { v4 as uuidv4 } from 'uuid';

export const generateCsrfToken = () => {
  return uuidv4();
};

export const validateCsrfToken = (token: string, storedToken: string): boolean => {
  return token === storedToken;
};

export const validateFileUpload = (file: File, allowedTypes: string[], maxSizeMB: number): string | null => {
  const fileType = file.type;
  const fileSizeMB = file.size / (1024 * 1024);

  if (!allowedTypes.includes(fileType)) {
    return `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`;
  }

  if (fileSizeMB > maxSizeMB) {
    return `File size exceeds ${maxSizeMB}MB limit`;
  }

  return null;
};

export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

