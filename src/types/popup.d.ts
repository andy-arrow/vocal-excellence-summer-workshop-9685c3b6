
declare global {
  interface Window {
    VX_SUPABASE_URL?: string;
    VX_SUPABASE_ANON_KEY?: string;
    VX_DEBUG?: {
      forceShow: () => void;
      clearStorage: () => void;
      getStatus: () => any;
      showPopup: () => void;
      closePopup: () => void;
    };
  }
}

export {};
