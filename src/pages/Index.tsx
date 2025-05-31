
import React, { useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import { toast } from '@/hooks/use-toast';
import { useScrollPosition } from '@/hooks/use-scroll-position';

// Optimized lazy loading
const AboutSection = lazy(() => 
  import(/* webpackChunkName: "about" */ '@/components/AboutSection')
);
const CurriculumSection = lazy(() => 
  import(/* webpackChunkName: "curriculum" */ '@/components/CurriculumSection')
);
const InstructorsSection = lazy(() => 
  import(/* webpackChunkName: "instructors" */ '@/components/InstructorsSection')
);
const CTASection = lazy(() => 
  import(/* webpackChunkName: "cta" */ '@/components/CTASection')
);
const Footer = lazy(() => 
  import(/* webpackChunkName: "footer" */ '@/components/Footer')
);
const ScrollToTopButton = lazy(() => 
  import(/* webpackChunkName: "scroll-top" */ '@/components/ScrollToTopButton')
);

const SectionLoader = () => (
  <div className="py-8 flex justify-center">
    <div className="w-6 h-6 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
  </div>
);

const Index = () => {
  const scrolled = useScrollPosition();
  
  useEffect(() => {
    const hasVisited = localStorage.getItem('visitedBefore');
    if (!hasVisited) {
      const timeoutId = setTimeout(() => {
        toast({
          title: "Welcome to Vocal Excellence Summer Workshop",
          description: "Applications for our 2025 program are now open!",
          duration: 5000,
        });
        localStorage.setItem('visitedBefore', 'true');
      }, 2000);
      
      return () => clearTimeout(timeoutId);
    }
  }, []);

  // Scholarship popup system initialization
  useEffect(() => {
    console.log('[Index] Initializing scholarship popup system...');
    
    const initializePopup = () => {
      if (typeof window !== 'undefined' && (window as any).VX_DEBUG) {
        console.log('[Index] Scholarship popup script loaded successfully');
        const status = (window as any).VX_DEBUG.getStatus();
        console.log('[Index] Scholarship popup system status:', status);
        
        if (!status.credentials.supabaseUrl || !status.credentials.supabaseKey) {
          console.error('[Index] Missing Supabase credentials for scholarship popup');
          return;
        }
        
        console.log('[Index] Scholarship popup system ready - will trigger on scroll (25%)');
        
        // Force show for testing if URL parameter is present
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('force_popup') === 'true') {
          console.log('[Index] Force showing scholarship popup for testing');
          (window as any).VX_DEBUG.forceShow();
        }
        
      } else {
        console.log('[Index] Scholarship popup script not yet loaded, retrying...');
        setTimeout(initializePopup, 500);
      }
    };

    const initTimeout = setTimeout(initializePopup, 1000);
    
    // Scholarship popup event listeners
    const handlePopupShown = (e: CustomEvent) => {
      console.log('[Index] Scholarship popup shown:', e.detail);
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'popup_shown', {
          variant: e.detail.variant,
          page_path: window.location.pathname,
          event_category: 'scholarship'
        });
      }
    };

    const handlePopupSubmitted = (e: CustomEvent) => {
      console.log('[Index] Scholarship popup submission:', e.detail);
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'scholarship_inquiry', {
          method: 'popup',
          variant: e.detail.variant
        });
      }
      
      toast({
        title: "Scholarship Information Sent!",
        description: "Check your inbox for merit-based scholarship details and application guidance.",
        className: "bg-amber-700 text-white border-amber-800",
        duration: 7000,
      });
    };

    const handlePopupClosed = () => {
      console.log('[Index] Scholarship popup closed');
    };

    // Add event listeners
    window.addEventListener('vx-popup-shown', handlePopupShown as EventListener);
    window.addEventListener('vx-popup-submitted', handlePopupSubmitted as EventListener);
    window.addEventListener('vx-popup-closed', handlePopupClosed as EventListener);

    // Cleanup
    return () => {
      window.removeEventListener('vx-popup-shown', handlePopupShown as EventListener);
      window.removeEventListener('vx-popup-submitted', handlePopupSubmitted as EventListener);
      window.removeEventListener('vx-popup-closed', handlePopupClosed as EventListener);
      clearTimeout(initTimeout);
    };
  }, []);

  return (
    <motion.div 
      className="min-h-screen overflow-hidden relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Navbar />
      
      <div className="relative z-10">
        <HeroSection />
      </div>
      
      <div className="relative z-10">
        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <CurriculumSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <InstructorsSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <CTASection />
        </Suspense>
      </div>
      
      {/* Progress indicator */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-energy-purple via-energy-pink to-energy-cyan"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrolled ? 1 : 0 }}
          style={{ transformOrigin: "0% 50%" }}
        />
      </div>
      
      <Suspense fallback={null}>
        <ScrollToTopButton visible={scrolled} />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </motion.div>
  );
};

export default React.memo(Index);
