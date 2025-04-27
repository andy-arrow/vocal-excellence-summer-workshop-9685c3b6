
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PricingHero from '@/components/Pricing/PricingHero';
import PricingTiers from '@/components/Pricing/PricingTiers';
import PricingFAQ from '@/components/Pricing/PricingFAQ';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { Toaster } from '@/components/ui/toaster';

const Pricing = () => {
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
        <title>Pricing - The Threshold</title>
        <meta 
          name="description" 
          content="Pricing options for The Threshold - a transformative experience for growth and impact." 
        />
      </Helmet>
      <Navbar />
      <main className="min-h-screen bg-white overflow-hidden">
        <PricingHero />
        <PricingTiers />
        <PricingFAQ />
      </main>
      <Footer />
      <ScrollToTopButton visible={isVisible} />
      <Toaster />
    </>
  );
};

export default Pricing;
