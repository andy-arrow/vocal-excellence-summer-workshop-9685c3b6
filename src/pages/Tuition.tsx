
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TuitionHero from '@/components/Tuition/TuitionHero';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { Toaster } from '@/components/ui/toaster';
import { useIsMobile } from '@/hooks/use-mobile';

// Lazy load non-critical components
const TuitionTiers = lazy(() => import('@/components/Tuition/TuitionTiers'));
const TuitionFAQ = lazy(() => import('@/components/Tuition/TuitionFAQ'));

// Loading fallback
const LoadingFallback = () => (
  <div className="py-8 flex justify-center items-center min-h-[200px]">
    <div className="h-8 w-8 border-t-2 border-[#4f6e72] border-r-transparent rounded-full animate-spin"></div>
  </div>
);

const Tuition = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();
  
  // Optimized scroll handler with throttling
  useEffect(() => {
    let lastScrollY = 0;
    let ticking = false;
    
    const handleScroll = () => {
      lastScrollY = window.scrollY;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsVisible(lastScrollY > 300);
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add popup testing function
  useEffect(() => {
    // Add global function to test popup
    window.testPopup = () => {
      console.log('[Test] Clearing popup data and forcing show...');
      localStorage.removeItem('vx_popup_seen');
      localStorage.removeItem('vx_popup_variant');
      if (window.VX_DEBUG) {
        window.VX_DEBUG.forceShow();
        console.log('[Test] Popup should now be visible');
      } else {
        console.log('[Test] VX_DEBUG not available, try refreshing the page');
        window.location.reload();
      }
    };

    window.clearPopupData = () => {
      console.log('[Test] Clearing popup storage data...');
      localStorage.removeItem('vx_popup_seen');
      localStorage.removeItem('vx_popup_variant');
      console.log('[Test] Popup data cleared. Refresh page to see popup.');
    };

    console.log('[VX Config] Setting up popup credentials...');
    
    // Configure the popup script with Supabase credentials
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseAnonKey) {
      window.VX_SUPABASE_URL = supabaseUrl;
      window.VX_SUPABASE_ANON_KEY = supabaseAnonKey;
      
      console.log('[VX Config] Popup configuration loaded:', {
        hasSupabaseUrl: !!supabaseUrl,
        hasSupabaseKey: !!supabaseAnonKey,
        currentPath: window.location.pathname
      });
    } else {
      console.warn('[VX Config] Missing Supabase credentials');
    }

    // Load the popup script
    const script = document.createElement('script');
    script.src = '/popup.js';
    script.async = true;
    script.onload = () => {
      console.log('[VX Config] Popup script loaded successfully');
    };
    script.onerror = () => {
      console.error('[VX Config] Failed to load popup script');
    };
    document.head.appendChild(script);

    console.log('[VX Config] Configuration complete. Use testPopup() or clearPopupData() in console for testing.');

    return () => {
      // Cleanup
      delete window.testPopup;
      delete window.clearPopupData;
      const existingScript = document.querySelector('script[src="/popup.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);
  
  return (
    <>
      <Helmet>
        <title>Tuition & Financial Options – Vocal Excellence</title>
        <meta 
          name="description" 
          content="Total tuition €749 includes everything. Flexible payment plans available with €100 registration fee included in total cost. Early bird discount available." 
        />
        <meta name="keywords" content="vocal training tuition, music program costs, singing scholarship, vocal education financing" />
        <link rel="preload" as="image" href="/og-image.png" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col relative">
        <Navbar />
        
        <main className="flex-grow bg-white overflow-visible">
          <TuitionHero />
          
          <Suspense fallback={<LoadingFallback />}>
            <TuitionTiers />
          </Suspense>
          
          <Suspense fallback={<LoadingFallback />}>
            <TuitionFAQ />
          </Suspense>
        </main>
        
        <Footer />
      </div>
      
      <ScrollToTopButton visible={isVisible} />
      <Toaster />
    </>
  );
};

export default React.memo(Tuition);
