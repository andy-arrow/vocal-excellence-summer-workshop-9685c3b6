
import { useEffect } from 'react';

export const PopupCredentialsLoader = () => {
  useEffect(() => {
    // Configure the popup script with Supabase credentials
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseAnonKey) {
      window.VX_SUPABASE_URL = supabaseUrl;
      window.VX_SUPABASE_ANON_KEY = supabaseAnonKey;
      
      console.log('[Popup Credentials] Supabase credentials configured for popup');
    } else {
      console.warn('[Popup Credentials] Missing Supabase credentials');
    }
  }, []);

  return null; // This component doesn't render anything
};
