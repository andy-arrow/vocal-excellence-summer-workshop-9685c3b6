
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // Add other env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ApplicationFiles {
  audioFile1: File | null;
  audioFile2: File | null;
  cvFile: File | null;
  recommendationFile: File | null;
  [key: string]: File | null;
}

interface Window {
  applicationFiles: ApplicationFiles;
  FingerprintJS?: any; // Add FingerprintJS to fix the errors in fingerprinting.ts
  // Add other global window properties here
}
