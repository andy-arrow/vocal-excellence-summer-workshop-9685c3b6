
import React, { useEffect, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

// Lazily load less critical components
const ApplicationForm = lazy(() => import('@/components/ApplicationForm'));
const ApplicationRequirements = lazy(() => import('@/components/ApplicationRequirements'));
const ApplicationTimeline = lazy(() => import('@/components/ApplicationTimeline'));
const ApplicationFAQ = lazy(() => import('@/components/ApplicationFAQ'));
const ScrollToTopButton = lazy(() => import('@/components/ScrollToTopButton'));

const SectionLoader = () => (
  <div className="flex justify-center py-16">
    <div className="w-8 h-8 border-4 border-coral-300 border-t-coral-500 rounded-full animate-spin"></div>
  </div>
);

const fadeIn = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const Application = () => {
  const [showScrollToTop, setShowScrollToTop] = React.useState(false);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Add scroll event listener
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setShowScrollToTop(window.scrollY > 500);
      });
    };
    
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    
    console.log('Application.tsx: Page mounted');
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      console.log('Application.tsx: Page unmounted');
    };
  }, []);

  return (
    <div className="bg-[#f5f5f7] text-apple-text min-h-screen font-sans antialiased">
      <Helmet>
        <title>Apply Now | Vocal Excellence Workshop</title>
        <meta name="description" content="Apply now for the Vocal Excellence Summer Workshop and discover your true potential with world-class vocal coaching. Limited spots available." />
        <meta name="theme-color" content="#ffffff" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col relative z-10">
        <Navbar />
        
        <main className="flex-grow relative z-10">
          <div className="bg-gradient-to-b from-white to-[#f5f5f7] border-b border-apple-border/10">
            <div className="max-w-5xl mx-auto px-6 md:px-8 pt-32 md:pt-40 pb-16 md:pb-20">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block text-apple-grey text-sm tracking-wide uppercase mb-4 font-medium">
                  Summer Workshop 2025
                </span>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-apple-text mb-4 tracking-tight">
                  Application Form
                </h1>
                <p className="font-sans text-lg md:text-xl text-apple-grey max-w-2xl mx-auto leading-relaxed mb-6">
                  Join our exclusive 5-day workshop. Complete the form below to apply.
                </p>
                <a 
                  href="#application-form"
                  className="inline-flex items-center justify-center px-6 py-3 bg-apple-blue text-white rounded-full hover:bg-apple-blue-hover transition-colors font-medium"
                >
                  Get Started
                </a>
              </motion.div>
            </div>
          </div>
          
          <div className="py-6 md:py-12 bg-[#f5f5f7]">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
              <div className="space-y-12 md:space-y-16">
                <motion.section 
                  key="form" 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true, margin: "-100px" }} 
                  id="application-form"
                  className="bg-white rounded-2xl shadow-sm overflow-hidden"
                  aria-label="Application Form Section"
                  variants={fadeIn}
                >
                  <Suspense fallback={<SectionLoader />}>
                    <ApplicationForm />
                  </Suspense>
                </motion.section>
                
                <motion.section 
                  key="requirements" 
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
                  key="timeline" 
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
                  key="faq" 
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
            </div>
          </div>
        </main>
        
        <Suspense fallback={null}>
          <ScrollToTopButton visible={showScrollToTop} />
        </Suspense>
        
        <Footer />
        <Toaster />
      </div>
    </div>
  );
};

export default Application;
