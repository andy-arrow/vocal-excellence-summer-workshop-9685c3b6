
/// <reference types="vite/client" />

// Extend window interface to include application files
interface Window {
  applicationFiles: {
    audioFile1: File | null;
    audioFile2: File | null;
    cvFile: File | null;
    recommendationFile: File | null;
    [key: string]: File | null;
  };
  FingerprintJS?: {
    load: () => Promise<{
      get: () => Promise<{ visitorId: string }>;
    }>;
  };
}

// Define the toast theme
interface ToastTheme {
  success: string;
  error: string;
  loading: string;
  default: string;
}
