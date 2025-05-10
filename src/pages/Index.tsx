
import React, { useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import { toast } from '@/hooks/use-toast';
import { useScrollPosition } from '@/hooks/use-scroll-position';
import { useLocation } from 'react-router-dom';

// Optimized lazy loading with explicit chunk names
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

// Optimized loader component
const SectionLoader = () => (
  <div className="py-8 flex justify-center">
    <div className="w-6 h-6 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
  </div>
);

const Index = () => {
  const scrolled = useScrollPosition();
  const location = useLocation();
  
  useEffect(() => {
    if (!localStorage.getItem('visitedBefore')) {
      const timeoutId = setTimeout(() => {
        toast.toast({
          title: "Welcome to Vocal Excellence Summer Workshop",
          description: "Applications for our 2025 program are now open!",
          duration: 5000,
        });
        localStorage.setItem('visitedBefore', 'true');
      }, 2000);
      
      return () => clearTimeout(timeoutId);
    }
  }, []);

  // Handle scrolling to sections when navigating with hash
  useEffect(() => {
    // Extract the hash from the URL
    const hash = location.hash.replace('#', '');
    
    if (hash) {
      // Add a small delay to ensure all components are loaded
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    } else {
      // If no hash, scroll to top when navigating to the page
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

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
