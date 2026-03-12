export interface ApplicationFiles {
  audioFile1: File | null;
  audioFile2: File | null;
  cvFile: File | null;
  recommendationFile: File | null;
  [key: string]: File | null;
}

export interface ApplicationSubmissionResult {
  success: boolean;
  applicationId?: string | number;
  error?: {
    message: string;
    code?: string;
  };
  filesUploaded?: string[];
  emailSent?: boolean;
}
