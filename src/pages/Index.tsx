
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import CurriculumSection from '@/components/CurriculumSection';
import InstructorsSection from '@/components/InstructorsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import ApplicationTimeline from '@/components/ApplicationTimeline';

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
  const [hasScrolled, setHasScrolled] = useState(false);
  
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
    
    // Scroll to top button visibility and scroll tracking
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowScrollToTop(scrollPosition > 500);
      setHasScrolled(scrollPosition > 100);
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
      
      {/* Hero Section */}
      <motion.div variants={sectionVariants}>
        <HeroSection />
      </motion.div>
      
      {/* About Section - this is what "awaits" */}
      <motion.div 
        id="about"
        variants={sectionVariants}
        initial="initial" 
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        className="scroll-mt-16"
      >
        <AboutSection />
      </motion.div>
      
      {/* Timeline Section - Highlighting May 15 deadline */}
      <motion.div 
        variants={sectionVariants}
        initial="initial" 
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
      >
        <ApplicationTimeline />
      </motion.div>
      
      {/* Curriculum Section */}
      <motion.div 
        variants={sectionVariants}
        initial="initial" 
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
      >
        <CurriculumSection />
      </motion.div>
      
      {/* Instructors Section */}
      <motion.div 
        variants={sectionVariants}
        initial="initial" 
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
      >
        <InstructorsSection />
      </motion.div>
      
      {/* CTA Section */}
      <motion.div 
        variants={sectionVariants}
        initial="initial" 
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
      >
        <CTASection />
      </motion.div>
      
      {/* Add a progress indicator for visual feedback */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-energy-purple via-energy-pink to-energy-cyan"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: hasScrolled ? 1 : 0 }}
          style={{ 
            transformOrigin: "0% 50%",
            transition: "transform 0.3s ease-out"
          }}
        />
      </div>
      
      {/* ScrollToTopButton with improved styling */}
      <ScrollToTopButton visible={showScrollToTop} />
      
      <Footer />
    </motion.div>
  );
};

export default Index;
