
import React from 'react';
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
      <ScrollToTopButton />
      <Toaster />
    </>
  );
};

export default Pricing;
