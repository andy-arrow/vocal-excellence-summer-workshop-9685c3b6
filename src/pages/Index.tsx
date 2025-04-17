
import React, { useEffect, useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import { useToast } from '@/hooks/use-toast';

// Lazy load non-critical sections
const AboutSection = lazy(() => import('@/components/AboutSection'));
const CurriculumSection = lazy(() => import('@/components/CurriculumSection'));
const InstructorsSection = lazy(() => import('@/components/InstructorsSection'));
const CTASection = lazy(() => import('@/components/CTASection'));
const Footer = lazy(() => import('@/components/Footer'));
const ScrollToTopButton = lazy(() => import('@/components/ScrollToTopButton'));
const ApplicationTimeline = lazy(() => import('@/components/ApplicationTimeline'));

// Simple section loader
const SectionLoader = () => (
  <div className="py-8 flex justify-center">
    <div className="w-6 h-6 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin"></div>
  </div>
);

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
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [sectionsVisible, setSectionsVisible] = useState({
    about: false,
    timeline: false,
    curriculum: false,
    instructors: false,
    apply: false
  });
  const { toast } = useToast();
  
  useEffect(() => {
    // Show welcome toast for first-time visitors without blocking main thread
    if (!localStorage.getItem('visitedBefore')) {
      const timeoutId = setTimeout(() => {
        toast({
          title: "Welcome to Vocal Excellence Summer Workshop",
          description: "Applications for our 2025 program are now open!",
          duration: 5000,
        });
        localStorage.setItem('visitedBefore', 'true');
      }, 2000);
      
      return () => clearTimeout(timeoutId);
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
    
    // Use Intersection Observer for efficient scroll detection
    const sections = ['about', 'timeline', 'curriculum', 'instructors', 'apply'];
    
    const observerOptions = { 
      threshold: [0.1, 0.5],
      rootMargin: "-50px 0px"
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        
        // Update visible sections state
        if (entry.isIntersecting) {
          setSectionsVisible(prev => ({ ...prev, [id]: true }));
          
          // If it's very visible, update active section
          if (entry.intersectionRatio > 0.5) {
            setActiveSection(id);
            
            // Update URL hash without scrolling
            const currentHash = window.location.hash.substring(1);
            if (currentHash !== id) {
              window.history.replaceState(null, '', `#${id}`);
            }
          }
        }
      });
    }, observerOptions);
    
    // Observe sections
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) sectionObserver.observe(element);
    });
    
    // Setup scroll event listeners optimized for performance
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const scrollPosition = window.scrollY;
        setShowScrollToTop(scrollPosition > 500);
        setHasScrolled(scrollPosition > 100);
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      // Clean up all observers and listeners
      sections.forEach(id => {
        const element = document.getElementById(id);
        if (element) sectionObserver.unobserve(element);
      });
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
      
      {/* Hero Section - loads immediately */}
      <motion.div variants={sectionVariants} id="home">
        <HeroSection />
      </motion.div>
      
      {/* About Section - lazy loaded */}
      <motion.div 
        id="about"
        variants={sectionVariants}
        initial="initial" 
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        className="scroll-mt-16"
      >
        <Suspense fallback={<SectionLoader />}>
          {sectionsVisible.about || activeSection === 'about' ? <AboutSection /> : <div className="h-screen"></div>}
        </Suspense>
      </motion.div>
      
      {/* Timeline Section - lazy loaded */}
      <motion.div 
        id="timeline"
        variants={sectionVariants}
        initial="initial" 
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        className="scroll-mt-16"
      >
        <Suspense fallback={<SectionLoader />}>
          {sectionsVisible.timeline || activeSection === 'timeline' ? <ApplicationTimeline /> : <div className="h-screen"></div>}
        </Suspense>
      </motion.div>
      
      {/* Curriculum Section - lazy loaded */}
      <motion.div 
        id="curriculum"
        variants={sectionVariants}
        initial="initial" 
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        className="scroll-mt-16"
      >
        <Suspense fallback={<SectionLoader />}>
          {sectionsVisible.curriculum || activeSection === 'curriculum' ? <CurriculumSection /> : <div className="h-screen"></div>}
        </Suspense>
      </motion.div>
      
      {/* Instructors Section - lazy loaded */}
      <motion.div 
        id="instructors"
        variants={sectionVariants}
        initial="initial" 
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        className="scroll-mt-16"
      >
        <Suspense fallback={<SectionLoader />}>
          {sectionsVisible.instructors || activeSection === 'instructors' ? <InstructorsSection /> : <div className="h-screen"></div>}
        </Suspense>
      </motion.div>
      
      {/* CTA Section - lazy loaded */}
      <motion.div 
        id="apply"
        variants={sectionVariants}
        initial="initial" 
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        className="scroll-mt-16"
      >
        <Suspense fallback={<SectionLoader />}>
          {sectionsVisible.apply || activeSection === 'apply' ? <CTASection /> : <div className="h-screen"></div>}
        </Suspense>
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
      <Suspense fallback={null}>
        {showScrollToTop && <ScrollToTopButton visible={true} />}
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </motion.div>
  );
};

export default Index;
