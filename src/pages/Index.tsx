
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
import TestimonialsSection from '@/components/TestimonialsSection';
import GallerySection from '@/components/GallerySection';
import { useToast } from '@/hooks/use-toast';

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
  const [activeSection, setActiveSection] = useState('home');
  const { toast } = useToast();
  
  useEffect(() => {
    // Show welcome toast for first-time visitors
    if (!localStorage.getItem('visitedBefore')) {
      setTimeout(() => {
        toast({
          title: "Welcome to Vocal Excellence Summer Workshop",
          description: "Applications for our 2025 program are now open!",
          duration: 5000,
        });
        localStorage.setItem('visitedBefore', 'true');
      }, 2000);
    }
    
    // Check for hash in URL and scroll to that section
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(hash);
        }
      }
    };

    // Handle initial hash if present
    handleHashChange();
    
    // Scroll to top when component mounts if no hash
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
    
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
    
    // Active section detection and scroll to top button visibility
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowScrollToTop(scrollPosition > 500);
      setHasScrolled(scrollPosition > 100);
      
      // Determine active section for nav highlighting
      const sections = ['home', 'about', 'timeline', 'curriculum', 'instructors', 'testimonials', 'gallery', 'apply'];
      
      // Find the section that is currently most visible in the viewport
      let maxVisibleSection = '';
      let maxVisiblePercentage = 0;
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (!element) return;
        
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate how much of the section is visible in the viewport as a percentage
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const visiblePercentage = visibleHeight > 0 ? visibleHeight / element.offsetHeight : 0;
        
        if (visiblePercentage > maxVisiblePercentage) {
          maxVisiblePercentage = visiblePercentage;
          maxVisibleSection = section;
        }
      });
      
      if (maxVisibleSection && maxVisiblePercentage > 0.2) {
        setActiveSection(maxVisibleSection);
        // Update URL hash without scrolling
        const currentHash = window.location.hash.substring(1);
        if (currentHash !== maxVisibleSection) {
          window.history.replaceState(null, '', `#${maxVisibleSection}`);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      revealElements.forEach((el) => revealObserver.unobserve(el));
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [toast]);

  return (
    <motion.div 
      className="min-h-screen overflow-hidden"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Navbar activeSection={activeSection} />
      
      {/* Hero Section */}
      <motion.div variants={sectionVariants} id="home">
        <HeroSection />
      </motion.div>
      
      {/* About Section */}
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
      
      {/* Timeline Section */}
      <motion.div 
        id="timeline"
        variants={sectionVariants}
        initial="initial" 
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        className="scroll-mt-16"
      >
        <ApplicationTimeline />
      </motion.div>
      
      {/* Curriculum Section */}
      <motion.div 
        id="curriculum"
        variants={sectionVariants}
        initial="initial" 
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        className="scroll-mt-16"
      >
        <CurriculumSection />
      </motion.div>
      
      {/* Instructors Section */}
      <motion.div 
        id="instructors"
        variants={sectionVariants}
        initial="initial" 
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        className="scroll-mt-16"
      >
        <InstructorsSection />
      </motion.div>
      
      {/* Testimonials Section */}
      <motion.div 
        id="testimonials"
        variants={sectionVariants}
        initial="initial" 
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        className="scroll-mt-16"
      >
        <TestimonialsSection />
      </motion.div>
      
      {/* Gallery Section */}
      <motion.div 
        id="gallery"
        variants={sectionVariants}
        initial="initial" 
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        className="scroll-mt-16"
      >
        <GallerySection />
      </motion.div>
      
      {/* CTA Section */}
      <motion.div 
        id="apply"
        variants={sectionVariants}
        initial="initial" 
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        className="scroll-mt-16"
      >
        <CTASection />
      </motion.div>
      
      {/* Progress indicator for visual feedback */}
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
