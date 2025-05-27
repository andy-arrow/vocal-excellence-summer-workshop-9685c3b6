
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
  // Popup system debug interface
  VX_DEBUG?: {
    forceShow: () => void;
    clearStorage: () => void;
    getStatus: () => any;
    showPopup: () => void;
    closePopup: () => void;
  };
  // Google Analytics gtag function
  gtag?: (...args: any[]) => void;
  // Popup test controls component (for console access)
  PopupTestControls?: any;
  // Google Tag Manager dataLayer
  dataLayer: any[];
}

// Define the toast theme
interface ToastTheme {
  success: string;
  error: string;
  loading: string;
  default: string;
}
