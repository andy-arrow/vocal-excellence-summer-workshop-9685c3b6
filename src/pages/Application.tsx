
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ApplicationForm from '@/components/ApplicationForm';
import ApplicationHero from '@/components/ApplicationHero';
import ApplicationRequirements from '@/components/ApplicationRequirements';
import ApplicationTimeline from '@/components/ApplicationTimeline';
import ApplicationFAQ from '@/components/ApplicationFAQ';
import { ArrowUp } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const Application = () => {
  const [showScrollToTop, setShowScrollToTop] = React.useState(false);
  
  useEffect(() => {
    // Ensure the page scrolls to the top when component mounts
    window.scrollTo(0, 0);
    
    // Scroll to top button visibility
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <AnimatePresence>
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
        className="min-h-screen bg-slate-950 flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Navbar />
        
        <main className="flex-grow pt-16">
          <ApplicationHero />
          
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <ApplicationRequirements />
          </motion.section>
          
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <ApplicationTimeline />
          </motion.section>
          
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <ApplicationForm />
          </motion.section>
          
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <ApplicationFAQ />
          </motion.section>
        </main>
        
        {/* Scroll to top button */}
        <AnimatePresence>
          {showScrollToTop && (
            <motion.button
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-500 hover:to-violet-500 text-white p-3 rounded-full shadow-lg shadow-fuchsia-900/30"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} />
            </motion.button>
          )}
        </AnimatePresence>
        
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Application;
