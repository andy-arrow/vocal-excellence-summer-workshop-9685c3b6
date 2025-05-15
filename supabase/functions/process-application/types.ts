
export interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  whereFrom: string;
  age: number;
  socialMedia?: string;
  dateOfBirth: string;
  nationality: string;
  vocalRange: string;
  yearsOfSinging: string;
  musicalBackground: string;
  teacherName?: string;
  teacherEmail?: string;
  reasonForApplying: string;
  heardAboutUs: string;
  scholarshipInterest: boolean;
  dietaryRestrictions: {
    type: string;
    details?: string;
  };
  areasOfInterest?: string;
  specialNeeds?: string;
  termsAgreed: boolean;
  [key: string]: any; // Allow for additional fields
}

export interface FileUpload {
  name: string;
  file: File;
  type: 'audio' | 'document';
}

export interface ProcessedFile {
  name: string;
  path: string;
  type: string;
}

export interface ErrorResponse {
  success: false;
  error: string;
  details?: any;
}

export interface SuccessResponse {
  success: true;
  message: string;
  applicationId: string;
  uploadedFiles?: ProcessedFile[];
  emailStatus?: { error?: any; success?: boolean };
  submissionId?: string;
}
