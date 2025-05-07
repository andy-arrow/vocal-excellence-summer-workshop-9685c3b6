
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TuitionHero from '@/components/Tuition/TuitionHero';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { Toaster } from '@/components/ui/toaster';

// Lazy load non-critical components
const TuitionTiers = lazy(() => import('@/components/Tuition/TuitionTiers'));
const TuitionFAQ = lazy(() => import('@/components/Tuition/TuitionFAQ'));

// Loading fallback
const LoadingFallback = () => (
  <div className="py-8 flex justify-center items-center min-h-[200px]">
    <div className="h-8 w-8 border-t-2 border-[#4f6e72] border-r-transparent rounded-full animate-spin"></div>
  </div>
);

const Tuition = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Optimized scroll handler with throttling
  useEffect(() => {
    let lastScrollY = 0;
    let ticking = false;
    
    const handleScroll = () => {
      lastScrollY = window.scrollY;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsVisible(lastScrollY > 300);
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <>
      <Helmet>
        <title>Tuition & Financial Options – Vocal Excellence</title>
        <meta 
          name="description" 
          content="Explore our flexible tuition options, payment plans, and financial assistance for the Vocal Excellence Summer 2025 program." 
        />
        <meta name="keywords" content="vocal training tuition, music program costs, singing scholarship, vocal education financing" />
        <link rel="preload" as="image" href="/og-image.png" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow bg-white overflow-hidden pt-16">
          <TuitionHero />
          
          <Suspense fallback={<LoadingFallback />}>
            <TuitionTiers />
          </Suspense>
          
          <Suspense fallback={<LoadingFallback />}>
            <TuitionFAQ />
          </Suspense>
        </main>
        
        <Footer />
      </div>
      
      <ScrollToTopButton visible={isVisible} />
      <Toaster />
    </>
  );
};

export default React.memo(Tuition);
