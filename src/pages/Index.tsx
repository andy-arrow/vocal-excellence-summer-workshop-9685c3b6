
import React, { useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import { toast } from '@/hooks/use-toast';
import { useScrollPosition } from '@/hooks/use-scroll-position';

// Optimized lazy loading with explicit chunk names
const AboutSection = lazy(() => 
  import(/* webpackChunkName: "about" */ '@/components/AboutSection')
);
const CurriculumSection = lazy(() => 
  import(/* webpackChunkName: "curriculum" */ '@/components/CurriculumSection')
);
// Use the original InstructorsSection instead of CustomInstructorsSection
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

// Optimized loader component
const SectionLoader = () => (
  <div className="py-8 flex justify-center">
    <div className="w-6 h-6 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
  </div>
);

const Index = () => {
  const scrolled = useScrollPosition();
  
  useEffect(() => {
    if (!localStorage.getItem('visitedBefore')) {
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

  // Enhanced popup debugging and integration
  useEffect(() => {
    console.log('[Index] Page loaded, checking popup system...');
    
    // Add popup event listeners for debugging
    const handlePopupShown = (e) => {
      console.log('[Index] Popup shown event received:', e.detail);
      // Optional: Track with analytics
      if (window.gtag) {
        window.gtag('event', 'popup_shown', {
          variant: e.detail.variant,
          page_path: window.location.pathname
        });
      }
    };

    const handlePopupSubmitted = (e) => {
      console.log('[Index] Popup submission event received:', e.detail);
      // Optional: Track with analytics
      if (window.gtag) {
        window.gtag('event', 'email_signup', {
          method: 'popup',
          variant: e.detail.variant
        });
      }
      
      // Show success toast
      toast({
        title: "Thank you for subscribing!",
        description: "Check your inbox for exclusive content.",
        duration: 5000,
      });
    };

    const handlePopupClosed = () => {
      console.log('[Index] Popup closed event received');
    };

    // Add event listeners
    window.addEventListener('vx-popup-shown', handlePopupShown);
    window.addEventListener('vx-popup-submitted', handlePopupSubmitted);
    window.addEventListener('vx-popup-closed', handlePopupClosed);

    // Debug popup status after a short delay
    setTimeout(() => {
      if (window.VX_DEBUG) {
        const status = window.VX_DEBUG.getStatus();
        console.log('[Index] Popup system status:', status);
        
        // Check if popup should show but hasn't
        if (status.state.shouldShow && !status.state.popupShown) {
          console.log('[Index] Popup should show but hasn\'t triggered yet');
        }
      } else {
        console.log('[Index] VX_DEBUG not available - popup script may not be loaded');
      }
    }, 1000);

    // Cleanup
    return () => {
      window.removeEventListener('vx-popup-shown', handlePopupShown);
      window.removeEventListener('vx-popup-submitted', handlePopupSubmitted);
      window.removeEventListener('vx-popup-closed', handlePopupClosed);
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
      
      {/* Hero Section - loads immediately */}
      <div className="relative z-10">
        <HeroSection />
      </div>
      
      {/* Lazy loaded sections with optimized suspense boundaries */}
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
