
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
        "relative min-h-[75vh] flex flex-col justify-center overflow-hidden",
        "bg-apple-light border-b border-apple-border pt-20 md:pt-20", // Further reduced height and top padding 
        hasReducedMotion ? "reduced-motion" : ""
      )}
    >
      <div className="hero-content relative z-20 text-center px-4 transition-all duration-500 ease-out max-w-5xl mx-auto mt-16 md:mt-14">
        <motion.div 
          className="space-y-3" // Further reduced spacing between elements
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.h1 
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-apple-text tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <span className="inline md:block">Unlock Your </span>
            <span className="text-apple-blue">Vocal Potential</span>
          </motion.h1>
          
          <motion.p 
            className="font-sans text-sm md:text-base text-apple-grey max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            A transformative 5-day vocal intensive featuring masterclasses,
            coaching, and performance opportunities
          </motion.p>

          <motion.div 
            className="pt-3" // Further reduced padding
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <motion.div className="flex flex-row items-center justify-center gap-2 md:gap-3">
              <Link 
                to="/apply" 
                className="group px-4 py-2 bg-apple-blue text-white rounded-full text-sm md:text-base font-medium transition-all duration-300 hover:bg-apple-blue-hover shadow-sm"
              >
                Apply Now
                <ArrowUpRight className="inline-block ml-1 w-4 h-4 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              
              <button 
                onClick={scrollToDiscoverSection} 
                className="text-apple-text hover:text-apple-grey px-4 py-2 rounded-full border border-apple-border backdrop-blur-sm transition-all hover:bg-apple-light-hover text-sm md:text-base font-light"
              >
                Discover More
              </button>
            </motion.div>
            
            <motion.div 
              className="flex items-center justify-center mt-3 space-x-2 text-xs md:text-sm" // Further reduced margin and text size
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-apple-blue animate-pulse-slow"></div>
              <p className="text-apple-grey font-light">
                Applications close <span className="text-apple-text font-medium">May 15, 2025</span> — <span className="whitespace-nowrap">20 spots available</span>
              </p>
              <div className="w-1.5 h-1.5 rounded-full bg-apple-blue animate-pulse-slow"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.button 
        onClick={scrollToDiscoverSection} 
        className="absolute bottom-4 left-0 right-0 mx-auto w-10 h-10 cursor-pointer z-20 flex items-center justify-center"
        aria-label="Scroll down"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div 
          className="rounded-full bg-apple-border/20 backdrop-blur-sm border border-apple-border p-2 hover:bg-apple-border/40 transition-all"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
        >
          <ArrowDown className="text-apple-text w-4 h-4" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroSection;
