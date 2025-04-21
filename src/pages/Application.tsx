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
const SectionLoader = () => <div className="flex justify-center py-16">
    <div className="w-8 h-8 border-4 border-coral-300 border-t-coral-500 rounded-full animate-spin"></div>
  </div>;
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
    window.scrollTo(0, 0);
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setShowScrollToTop(window.scrollY > 500);
      });
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div className="bg-white text-charcoal min-h-screen font-sans antialiased">
      <Helmet>
        <title>Apply Now | Vocal Excellence Workshop</title>
        <meta name="description" content="Apply now for the Vocal Excellence Summer Workshop and discover your true potential with world-class vocal coaching. Limited spots available." />
        <meta name="theme-color" content="#ffffff" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <div className="bg-gradient-to-b from-white to-neutral-50 py-16 md:py-20 border-b border-neutral-100">
            <div className="max-w-4xl mx-auto px-6 md:px-8">
              <motion.div className="text-center" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8
            }}>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-black mb-6 tracking-tight">
                  <span className="block mb-4">Your Journey To</span>
                  <span className="block">Vocal Mastery</span>
                </h1>
                <p className="font-sans text-lg md:text-xl text-charcoal/80 max-w-2xl mx-auto leading-relaxed">Join our exclusive 5-day Workshop where world-class mentors will transform your voice and elevate your technique to new heights.</p>
              </motion.div>
            </div>
          </div>
          
          <div className="py-12 md:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
              <div className="space-y-20">
                <motion.section key="requirements" initial="hidden" whileInView="visible" viewport={{
                once: true,
                margin: "-100px"
              }} variants={fadeIn} className="bg-white rounded-2xl shadow-sm border border-neutral-200/80 overflow-hidden">
                  <Suspense fallback={<SectionLoader />}>
                    <ApplicationRequirements />
                  </Suspense>
                </motion.section>
                
                <motion.section key="timeline" initial="hidden" whileInView="visible" viewport={{
                once: true,
                margin: "-100px"
              }} variants={fadeIn} className="bg-white rounded-2xl shadow-sm border border-neutral-200/80 overflow-hidden">
                  <Suspense fallback={<SectionLoader />}>
                    <ApplicationTimeline />
                  </Suspense>
                </motion.section>
                
                <motion.section key="form" initial="hidden" whileInView="visible" viewport={{
                once: true,
                margin: "-100px"
              }} id="application-form-section" className="bg-white rounded-2xl shadow-sm border border-neutral-200/80 overflow-hidden" aria-label="Application Form Section">
                  <Suspense fallback={<SectionLoader />}>
                    <ApplicationForm />
                  </Suspense>
                </motion.section>
                
                <motion.section key="faq" initial="hidden" whileInView="visible" viewport={{
                once: true,
                margin: "-100px"
              }} variants={fadeIn} className="bg-white rounded-2xl shadow-sm border border-neutral-200/80 overflow-hidden">
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
    </div>;
};

export default Application;
