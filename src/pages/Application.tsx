
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ApplicationForm from '@/components/ApplicationForm';
import ApplicationHero from '@/components/ApplicationHero';
import ApplicationRequirements from '@/components/ApplicationRequirements';
import ApplicationTimeline from '@/components/ApplicationTimeline';
import ApplicationFAQ from '@/components/ApplicationFAQ';
import ScrollToTopButton from '@/components/ScrollToTopButton';

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
    // Ensure the page scrolls to the top when component mounts
    window.scrollTo(0, 0);
    
    // Scroll to top button visibility
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
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
          
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="py-16 md:py-24"
            >
              <ApplicationRequirements />
            </motion.section>
            
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="py-16 md:py-24"
            >
              <ApplicationTimeline />
            </motion.section>
            
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              id="application-form-section"
              className="py-16 md:py-24"
            >
              <ApplicationForm />
            </motion.section>
            
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="py-16 md:py-24"
            >
              <ApplicationFAQ />
            </motion.section>
          </div>
        </main>
        
        <ScrollToTopButton visible={showScrollToTop} />
        
        <Footer />
      </motion.div>
    </div>
  );
};

export default Application;
