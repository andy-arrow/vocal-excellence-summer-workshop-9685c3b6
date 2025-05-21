
interface Window {
  applicationFiles: {
    audioFile1: File | null;
    audioFile2: File | null;
    cvFile: File | null;
    recommendationFile: File | null;
    [key: string]: File | null;
  };
}
