
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TuitionHero from '@/components/Tuition/TuitionHero';
import TuitionTiers from '@/components/Tuition/TuitionTiers';
import TuitionFAQ from '@/components/Tuition/TuitionFAQ';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { Toaster } from '@/components/ui/toaster';

const Tuition = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Function to toggle visibility of scroll-to-top button
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', toggleVisibility);
    
    // Clean up event listener
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  return (
    <>
      <Helmet>
        <title>Tuition & Financial Information - Vocal Excellence</title>
        <meta 
          name="description" 
          content="Learn about tuition options, payment plans, and financial assistance for our transformative vocal training program." 
        />
      </Helmet>
      <Navbar />
      <main className="min-h-screen bg-white overflow-hidden">
        <TuitionHero />
        <TuitionTiers />
        <TuitionFAQ />
      </main>
      <Footer />
      <ScrollToTopButton visible={isVisible} />
      <Toaster />
    </>
  );
};

export default Tuition;
