
import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { APPLICATION_DATES } from './ApplicationTimeline';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [hasReducedMotion, setHasReducedMotion] = useState(false);
  const today = new Date();
  const applicationsClosed = today > APPLICATION_DATES.DEADLINE;
  const isMobile = useIsMobile();
  
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
  
  // Significantly increase padding for mobile devices
  const paddingClasses = isMobile 
    ? "pt-48 pb-16" // Much more padding-top for mobile
    : "pt-56 md:pt-64"; // Increase desktop padding too
  
  return (
    <section 
      id="home" 
      ref={heroRef} 
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden",
        paddingClasses,
        "bg-apple-light border-b border-apple-border",
        hasReducedMotion ? "reduced-motion" : ""
      )}
    >
      <div className="hero-content relative z-20 text-center px-6 transition-all duration-500 ease-out max-w-5xl mx-auto">
        <motion.div 
          className="space-y-10" 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.h1 
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-apple-text mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <span className="block mb-4">Unlock Your</span>
            <span className="text-apple-blue">Vocal Potential</span>
          </motion.h1>
          
          <motion.p 
            className="font-sans text-lg md:text-xl text-apple-grey max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            A transformative 5-day vocal intensive for advancing singers, featuring masterclasses, 
            private coaching, and performance opportunities with world-class faculty
          </motion.p>

          <motion.div 
            className="pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                to="/apply" 
                className={`group px-8 py-4 ${
                  applicationsClosed 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-apple-blue hover:bg-apple-blue-hover'
                } text-white rounded-full text-lg font-medium transition-all duration-300 shadow-sm`}
              >
                {applicationsClosed ? 'Applications Closed' : 'Apply Now'}
                {!applicationsClosed && (
                  <ArrowUpRight className="inline-block ml-2 w-5 h-5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                )}
              </Link>
              
              <button 
                onClick={scrollToDiscoverSection} 
                className="text-apple-text hover:text-apple-grey px-8 py-4 rounded-full border border-apple-border backdrop-blur-sm transition-all hover:bg-apple-light-hover text-lg font-light"
              >
                Discover More
              </button>
            </motion.div>
            
            <motion.div 
              className="flex items-center justify-center mt-12 space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
            >
              <div className="w-2 h-2 rounded-full bg-apple-blue animate-pulse-slow"></div>
              <p className="text-apple-grey text-sm font-light">
                {applicationsClosed ? (
                  <span className="text-apple-text font-medium">Applications for {format(APPLICATION_DATES.PROGRAM_START, 'yyyy')} are now closed</span>
                ) : (
                  <>
                    Applications close <span className="text-apple-text font-medium">{format(APPLICATION_DATES.DEADLINE, 'MMMM d, yyyy')}</span> — Only 20 spots available
                  </>
                )}
              </p>
              <div className="w-2 h-2 rounded-full bg-apple-blue animate-pulse-slow"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.button 
        onClick={scrollToDiscoverSection} 
        className="absolute bottom-12 left-0 right-0 mx-auto w-12 h-12 cursor-pointer z-20 flex items-center justify-center"
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
