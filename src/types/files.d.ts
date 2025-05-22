
interface Window {
  applicationFiles: {
    audioFile1: File | null;
    audioFile2: File | null;
    cvFile: File | null;
    recommendationFile: File | null;
    [key: string]: File | null;
  };
}

// Define a consistent ApplicationFiles type that can be reused throughout the app
interface ApplicationFiles {
  audioFile1: File | null;
  audioFile2: File | null;
  cvFile: File | null;
  recommendationFile: File | null;
  [key: string]: File | null;
}
