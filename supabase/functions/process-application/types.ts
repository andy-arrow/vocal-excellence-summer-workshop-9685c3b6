
export interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  vocalRange: string;
  yearsOfExperience: string;
  musicalBackground: string;
  teacherName?: string;
  teacherEmail?: string;
  performanceExperience: string;
  reasonForApplying: string;
  heardAboutUs: string;
  scholarshipInterest: boolean;
  specialNeeds?: string;
  termsAgreed: boolean;
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
}

