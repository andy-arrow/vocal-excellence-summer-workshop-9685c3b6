
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import CurriculumSection from '@/components/CurriculumSection';
import InstructorsSection from '@/components/InstructorsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import GallerySection from '@/components/GallerySection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import ScrollToTopButton from '@/components/ScrollToTopButton';

// Animation variants
const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      duration: 0.5,
      staggerChildren: 0.1
    }
  },
  exit: { opacity: 0 }
};

const sectionVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const Index = () => {
  const [showScrollToTop, setShowScrollToTop] = React.useState(false);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Scroll reveal animations
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    revealElements.forEach((el) => revealObserver.observe(el));
    
    // Scroll to top button visibility
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      revealElements.forEach((el) => revealObserver.unobserve(el));
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.div 
      className="min-h-screen bg-white overflow-hidden"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Navbar />
      
      <motion.div variants={sectionVariants}>
        <HeroSection />
      </motion.div>
      
      <motion.div 
        variants={sectionVariants}
        initial="initial" 
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
      >
        <AboutSection />
      </motion.div>
      
      <motion.div 
        variants={sectionVariants}
        initial="initial" 
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
      >
        <GallerySection />
      </motion.div>
      
      <motion.div 
        variants={sectionVariants}
        initial="initial" 
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
      >
        <CurriculumSection />
      </motion.div>
      
      <motion.div 
        variants={sectionVariants}
        initial="initial" 
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
      >
        <InstructorsSection />
      </motion.div>
      
      <motion.div 
        variants={sectionVariants}
        initial="initial" 
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
      >
        <TestimonialsSection />
      </motion.div>
      
      <motion.div 
        variants={sectionVariants}
        initial="initial" 
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
      >
        <CTASection />
      </motion.div>
      
      {/* Use the ScrollToTopButton component */}
      <ScrollToTopButton visible={showScrollToTop} />
      
      <Footer />
    </motion.div>
  );
};

export default Index;
