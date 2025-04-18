
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
    <div className="w-8 h-8 border-4 border-blue-300 border-t-blue-500 rounded-full animate-spin"></div>
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
      
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        
        <main className="flex-grow">
          <div className="bg-white py-12 md:py-20 border-b border-gray-100 shadow-sm">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  Join Our Vocal Excellence Workshop
                </h1>
                <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
                  Fill out this simple form to apply for our Summer 2025 program 
                  and take your singing to the next level!
                </p>
              </div>
            </div>
          </div>
          
          <div className="py-8 md:py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="mb-12 max-w-3xl mx-auto bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">Need Help?</h2>
                <p className="text-blue-900 text-lg">
                  We're here to help you with your application! If you have any questions, 
                  call us at <span className="font-bold">123-456-7890</span> or email 
                  <a href="mailto:help@vocalexcellence.com" className="ml-1 font-bold underline">help@vocalexcellence.com</a>
                </p>
              </div>
              
              <div className="space-y-20">
                <motion.section
                  key="requirements"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeIn}
                  className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
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
                  className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
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
                  className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
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
                  className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
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
