
import React, { useEffect } from 'react';
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
import { ArrowUp } from 'lucide-react';

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
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

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
      
      {/* Scroll to top button with AnimatePresence */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            key="scroll-to-top-button"
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-500 hover:to-violet-500 text-white p-3 rounded-full shadow-lg shadow-fuchsia-900/30"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 10px 25px -5px rgba(225, 29, 236, 0.4)"
            }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
      
      <Footer />
    </motion.div>
  );
};

export default Index;
