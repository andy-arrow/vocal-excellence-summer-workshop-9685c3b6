
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

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const Application = () => {
  useEffect(() => {
    // Ensure the page scrolls to the top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <AnimatePresence>
      <Helmet>
        <title>Find Your Voice | Vocal Excellence Summer Workshop</title>
        <meta name="description" content="Join our vocal excellence summer program designed for passionate singers. Apply now to discover your true vocal potential with world-class instructors." />
        <meta name="keywords" content="vocal training, singing program, voice coaching, summer workshop, singing application" />
      </Helmet>
      
      <motion.div 
        className="min-h-screen bg-gradient-to-b from-slate-950 to-violet-950 flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Navbar />
        
        <main className="flex-grow pt-16">
          <motion.div 
            variants={staggerChildren}
            initial="hidden" 
            animate="visible"
          >
            <motion.div variants={fadeIn}>
              <ApplicationHero />
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              viewport={{ once: true, amount: 0.2 }}
            >
              <ApplicationRequirements />
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              viewport={{ once: true, amount: 0.2 }}
            >
              <ApplicationTimeline />
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              viewport={{ once: true, amount: 0.2 }}
            >
              <ApplicationForm />
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              viewport={{ once: true, amount: 0.2 }}
            >
              <ApplicationFAQ />
            </motion.div>
          </motion.div>
        </main>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Application;
