
import React, { useEffect, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ApplicationHero from '@/components/ApplicationHero';

// Lazily load less critical components
const ApplicationForm = lazy(() => import('@/components/ApplicationForm'));
const ApplicationRequirements = lazy(() => import('@/components/ApplicationRequirements'));
const ApplicationTimeline = lazy(() => import('@/components/ApplicationTimeline'));
const ApplicationFAQ = lazy(() => import('@/components/ApplicationFAQ'));
const ScrollToTopButton = lazy(() => import('@/components/ScrollToTopButton'));

// Loading indicator for lazy components
const SectionLoader = () => (
  <div className="py-16 flex justify-center">
    <div className="w-8 h-8 border-4 border-energy-purple/30 border-t-energy-purple rounded-full animate-spin"></div>
  </div>
);

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

const Application = () => {
  const [showScrollToTop, setShowScrollToTop] = React.useState(false);
  
  useEffect(() => {
    // Scroll to top more efficiently
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      // Use requestAnimationFrame to avoid layout thrashing during scroll
      requestAnimationFrame(() => {
        setShowScrollToTop(window.scrollY > 500);
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="bg-slate-950 text-white min-h-screen">
      <Helmet>
        <title>Apply Now | Vocal Excellence Summer Workshop</title>
        <meta name="description" content="Apply now for the Vocal Excellence Summer Workshop and discover your true potential with world-class vocal coaching. Limited spots available." />
        <meta name="keywords" content="vocal training application, singing workshop application, voice coaching program, summer singing program, singing application" />
        <meta property="og:title" content="Apply Now | Vocal Excellence Summer Workshop" />
        <meta property="og:description" content="Join our transformative vocal program this summer. Apply now to secure your spot!" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      
      <motion.div 
        className="min-h-screen flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Navbar />
        
        <main className="flex-grow">
          <ApplicationHero />
          
          <div className="space-y-24 md:space-y-32 py-16 md:py-24">
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <Suspense fallback={<SectionLoader />}>
                <ApplicationRequirements />
              </Suspense>
            </motion.section>
            
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <Suspense fallback={<SectionLoader />}>
                <ApplicationTimeline />
              </Suspense>
            </motion.section>
            
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              id="application-form-section"
            >
              <Suspense fallback={<SectionLoader />}>
                <ApplicationForm />
              </Suspense>
            </motion.section>
            
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <Suspense fallback={<SectionLoader />}>
                <ApplicationFAQ />
              </Suspense>
            </motion.section>
          </div>
        </main>
        
        <Suspense fallback={null}>
          <ScrollToTopButton visible={showScrollToTop} />
        </Suspense>
        
        <Footer />
      </motion.div>
    </div>
  );
};

export default Application;
