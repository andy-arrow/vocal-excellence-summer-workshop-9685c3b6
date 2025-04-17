
import React, { useEffect, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Lazily load less critical components
const ApplicationForm = lazy(() => import('@/components/ApplicationForm'));
const ApplicationRequirements = lazy(() => import('@/components/ApplicationRequirements'));
const ApplicationTimeline = lazy(() => import('@/components/ApplicationTimeline'));
const ApplicationFAQ = lazy(() => import('@/components/ApplicationFAQ'));
const ScrollToTopButton = lazy(() => import('@/components/ScrollToTopButton'));

const SectionLoader = () => (
  <div className="py-16 flex justify-center">
    <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
  </div>
);

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

const Application = () => {
  const [showScrollToTop, setShowScrollToTop] = React.useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setShowScrollToTop(window.scrollY > 500);
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="bg-white text-gray-900 min-h-screen font-sans antialiased">
      <Helmet>
        <title>Apply Now | Vocal Excellence Workshop</title>
        <meta name="description" content="Apply now for the Vocal Excellence Summer Workshop and discover your true potential with world-class vocal coaching. Limited spots available." />
        <meta name="theme-color" content="#ffffff" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        
        <main className="flex-grow">
          <div className="bg-gray-50 py-12 md:py-20 border-b border-gray-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                  Apply to the Vocal Excellence Workshop
                </h1>
                <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
                  Join our Summer 2025 program and take your vocal talents to new heights with world-class coaching
                </p>
              </div>
            </div>
          </div>
          
          <div className="py-12 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="space-y-20">
                <motion.section
                  key="requirements"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeIn}
                  className="bg-white"
                >
                  <Suspense fallback={<SectionLoader />}>
                    <ApplicationRequirements />
                  </Suspense>
                </motion.section>
                
                <motion.section
                  key="timeline"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeIn}
                  className="bg-white"
                >
                  <Suspense fallback={<SectionLoader />}>
                    <ApplicationTimeline />
                  </Suspense>
                </motion.section>
                
                <motion.section
                  key="form"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  id="application-form-section"
                  className="bg-white"
                  aria-label="Application Form Section"
                >
                  <Suspense fallback={<SectionLoader />}>
                    <ApplicationForm />
                  </Suspense>
                </motion.section>
                
                <motion.section
                  key="faq"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeIn}
                  className="bg-white"
                >
                  <Suspense fallback={<SectionLoader />}>
                    <ApplicationFAQ />
                  </Suspense>
                </motion.section>
              </div>
            </div>
          </div>
        </main>
        
        <Suspense fallback={null}>
          <ScrollToTopButton visible={showScrollToTop} />
        </Suspense>
        
        <Footer />
      </div>
    </div>
  );
};

export default Application;
