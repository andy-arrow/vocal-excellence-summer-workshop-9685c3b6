
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
    transition: { duration: 0.6 }
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
        <title>Apply - Vocal Excellence Summer Workshop</title>
        <meta name="description" content="Apply to join the Vocal Excellence Summer Workshop summer programme. Submit your application and begin your vocal journey with world-class instructors." />
      </Helmet>
      
      <motion.div 
        className="min-h-screen bg-gradient-to-b from-slate-950 to-violet-950 flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Navbar />
        <main className="flex-grow pt-16">
          <motion.div variants={fadeIn} initial="hidden" animate="visible">
            <ApplicationHero />
          </motion.div>
          
          <motion.div 
            variants={fadeIn} 
            initial="hidden" 
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <ApplicationRequirements />
          </motion.div>
          
          <motion.div 
            variants={fadeIn} 
            initial="hidden" 
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <ApplicationTimeline />
          </motion.div>
          
          <motion.div 
            variants={fadeIn} 
            initial="hidden" 
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <ApplicationForm />
          </motion.div>
          
          <motion.div 
            variants={fadeIn} 
            initial="hidden" 
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <ApplicationFAQ />
          </motion.div>
        </main>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Application;
