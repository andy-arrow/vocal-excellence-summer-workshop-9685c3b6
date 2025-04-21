
import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [hasReducedMotion, setHasReducedMotion] = useState(false);
  
  useEffect(() => {
    const savedPreference = localStorage.getItem('reduced-motion') === 'true';
    setHasReducedMotion(savedPreference);
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches && !localStorage.getItem('reduced-motion')) {
      setHasReducedMotion(true);
    }
    
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollPosition = window.scrollY;
      const opacity = 1 - scrollPosition / 700;
      const translateY = scrollPosition * 0.3;
      
      if (heroRef.current) {
        const heroContent = heroRef.current.querySelector('.hero-content') as HTMLElement;
        if (heroContent) {
          heroContent.style.opacity = Math.max(0.2, opacity).toString();
          heroContent.style.transform = `translateY(${translateY}px)`;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasReducedMotion]);
  
  const scrollToDiscoverSection = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <section 
      id="home" 
      ref={heroRef} 
      className={cn(
        "relative min-h-[85vh] flex flex-col justify-center overflow-hidden",
        "bg-apple-light border-b border-apple-border pt-32 md:pt-24", // Reduced height and adjusted padding
        hasReducedMotion ? "reduced-motion" : ""
      )}
    >
      <div className="hero-content relative z-20 text-center px-6 transition-all duration-500 ease-out max-w-5xl mx-auto">
        <motion.div 
          className="space-y-5" // Reduced spacing between elements
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.h1 
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-apple-text tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <span className="block mb-1">Unlock Your</span> {/* Reduced spacing */}
            <span className="text-apple-blue">Vocal Potential</span>
          </motion.h1>
          
          <motion.p 
            className="font-sans text-base md:text-lg text-apple-grey max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            A transformative 5-day vocal intensive for advancing singers, featuring masterclasses, 
            private coaching, and performance opportunities with world-class faculty
          </motion.p>

          <motion.div 
            className="pt-4" // Reduced padding
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/apply" 
                className="group px-6 py-3 bg-apple-blue text-white rounded-full text-lg font-medium transition-all duration-300 hover:bg-apple-blue-hover shadow-sm w-full sm:w-auto"
              >
                Apply Now
                <ArrowUpRight className="inline-block ml-2 w-5 h-5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              
              <button 
                onClick={scrollToDiscoverSection} 
                className="text-apple-text hover:text-apple-grey px-6 py-3 rounded-full border border-apple-border backdrop-blur-sm transition-all hover:bg-apple-light-hover text-lg font-light w-full sm:w-auto"
              >
                Discover More
              </button>
            </motion.div>
            
            <motion.div 
              className="flex items-center justify-center mt-6 space-x-4" // Reduced margin
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
            >
              <div className="w-2 h-2 rounded-full bg-apple-blue animate-pulse-slow"></div>
              <p className="text-apple-grey text-sm font-light">
                Applications close <span className="text-apple-text font-medium">May 15, 2025</span> — Only 20 spots available
              </p>
              <div className="w-2 h-2 rounded-full bg-apple-blue animate-pulse-slow"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.button 
        onClick={scrollToDiscoverSection} 
        className="absolute bottom-6 left-0 right-0 mx-auto w-12 h-12 cursor-pointer z-20 flex items-center justify-center"
        aria-label="Scroll down"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div 
          className="rounded-full bg-apple-border/20 backdrop-blur-sm border border-apple-border p-3 hover:bg-apple-border/40 transition-all"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
        >
          <ArrowDown className="text-apple-text w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroSection;
