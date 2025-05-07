
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

  return (
    <motion.div 
      className="min-h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Navbar />
      
      <div style={{ paddingTop: '64px' }}>
        {/* Hero Section - loads immediately */}
        <HeroSection />
        
        {/* Lazy loaded sections with optimized suspense boundaries */}
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
