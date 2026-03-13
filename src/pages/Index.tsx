
import React, { useEffect, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import { toast } from '@/hooks/use-toast';
import { HOME_WELCOME_TITLE, HOME_WELCOME_DESCRIPTION } from '@/constants/copy';
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
const TrustBar = lazy(() => import('@/components/TrustBar'));
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
          title: HOME_WELCOME_TITLE,
          description: HOME_WELCOME_DESCRIPTION,
          duration: 5000,
        });
        localStorage.setItem('visitedBefore', 'true');
      }, 2000);
      
      return () => clearTimeout(timeoutId);
    }
  }, []);


  return (
    <motion.div 
      className="min-h-screen overflow-hidden relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Helmet>
        <title>Vocal Excellence — Seven Days, Filmed Audition, Class of 30 | Summer 2026</title>
        <meta name="description" content="The Mediterranean's only pre-university vocal intensive. Seven days in Cyprus with Juilliard and West End faculty. Audition preparation and a filmed audition for university applications." />
        <link rel="canonical" href="https://vocalexcellence.cy/" />
        <meta property="og:title" content="Vocal Excellence — Seven Days, Filmed Audition, Class of 30 | Summer 2026" />
        <meta property="og:description" content="The Mediterranean's only pre-university vocal intensive. Juilliard & West End faculty. Filmed audition. Thirty places." />
        <meta property="og:url" content="https://vocalexcellence.cy/" />
      </Helmet>
      <Navbar />
      
      <div className="relative z-10">
        <HeroSection />
      </div>
      
      <Suspense fallback={null}>
        <TrustBar />
      </Suspense>
      
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
