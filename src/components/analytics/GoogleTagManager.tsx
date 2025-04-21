
import React, { useEffect } from 'react';
import { startEngagementTracking } from '@/utils/analytics';

interface GoogleTagManagerProps {
  gtmId: string;
  googleAdsId: string;
}

export default function GoogleTagManager({ gtmId, googleAdsId }: GoogleTagManagerProps) {
  useEffect(() => {
    // Only run in browser, not during SSR
    if (typeof window === 'undefined') return;

    // Initialize Google Tag Manager
    const initGTM = () => {
      (window as any).dataLayer = (window as any).dataLayer || [];
      
      function gtag(...args: any[]) {
        // Spread the arguments to handle all possible forms of gtag calls
        (window as any).dataLayer.push(arguments);
      }
      
      // Assign the function to window.gtag
      window.gtag = gtag;
      
      // Initial gtag setup
      gtag('js', new Date());
      
      // Configure Google Analytics through GTM
      gtag('config', gtmId);
      
      // Configure Google Ads
      gtag('config', googleAdsId);
      
      console.log('Google Tag Manager initialized with ID:', gtmId);
      console.log('Google Ads configured with ID:', googleAdsId);
    };

    // Start tracking user engagement
    startEngagementTracking();
    
    // No need to load the script again as it's already in the head
    // Just initialize the GTM
    initGTM();
    
    return () => {
      console.log('GoogleTagManager component unmounted');
    };
  }, [gtmId, googleAdsId]);

  return null;
}
