
import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Calendar } from 'lucide-react';
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
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // CRITICAL FIX: Completely different layout approach for mobile vs. desktop
  const containerClasses = isMobile 
    ? "py-0 relative flex items-start justify-center" // Remove ALL padding and height constraints for mobile
    : "pt-60 pb-20 min-h-[80vh] flex items-center justify-center"; // Keep desktop layout
  
  return (
    <section 
      id="home" 
      ref={heroRef} 
      className={cn(
        "relative overflow-hidden", 
        containerClasses,
        "bg-apple-light border-b border-apple-border",
        hasReducedMotion ? "reduced-motion" : ""
      )}
    >
      <div className={cn(
        "hero-content relative z-20 text-center px-4 transition-all duration-500 ease-out max-w-5xl mx-auto",
        isMobile ? "pt-16" : "" // Add padding-top only on mobile to position below navbar
      )}>
        <motion.div 
          className="space-y-1 md:space-y-6" // Further reduce space between elements on mobile
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.h1 
            className="font-serif text-xl sm:text-3xl md:text-4xl lg:text-6xl font-light text-apple-text mb-1 md:mb-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <span className="block mb-0 md:mb-2">5 Full Days of</span>
            <span className="text-apple-blue">Exclusive Vocal Training</span>
          </motion.h1>
          
          <motion.p 
            className="font-sans text-xs sm:text-base md:text-lg lg:text-xl text-apple-grey max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            With coaches from London's West End, Netflix & the world's top universities
          </motion.p>

          {/* Program dates with location - smaller text on mobile */}
          <motion.div 
            className="inline-flex items-center gap-1 md:gap-2 text-apple-text/80 text-xs md:text-sm font-medium mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <Calendar className="w-3 h-3 md:w-4 md:h-4 text-apple-blue" />
            <span>14-18 July | Limassol, Cyprus</span>
          </motion.div>
          
          {/* Features highlight - made more compact on mobile */}
          <motion.div 
            className="flex flex-wrap justify-center gap-x-2 md:gap-x-3 gap-y-1 text-[10px] md:text-xs font-medium text-apple-grey/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <span className="flex items-center"><span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-apple-blue rounded-full mr-1 md:mr-2"></span>Masterclasses</span>
            <span className="flex items-center"><span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-apple-blue rounded-full mr-1 md:mr-2"></span>Private Coaching</span>
            <span className="flex items-center"><span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-apple-blue rounded-full mr-1 md:mr-2"></span>Audition Prep</span>
            <span className="flex items-center"><span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-apple-blue rounded-full mr-1 md:mr-2"></span>Stage Anxiety</span>
          </motion.div>

          <motion.div 
            className="pt-2 md:pt-6" // Reduced top padding further on mobile
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
              <Link 
                to="/apply" 
                className={`group px-4 sm:px-5 md:px-7 py-2 md:py-3 ${
                  applicationsClosed 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-apple-blue hover:bg-apple-blue-hover'
                } text-white rounded-full text-sm md:text-base lg:text-lg font-medium transition-all duration-300 shadow-sm`}
              >
                {applicationsClosed ? 'Applications Closed' : 'Register Now'}
                {!applicationsClosed && (
                  <ArrowUpRight className="inline-block ml-1 md:ml-2 w-3 h-3 sm:w-4 sm:h-4 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                )}
              </Link>
              
              <button 
                onClick={scrollToDiscoverSection} 
                className="text-apple-text hover:text-apple-grey px-4 sm:px-5 md:px-7 py-2 md:py-3 rounded-full border border-apple-border backdrop-blur-sm transition-all hover:bg-apple-light-hover text-sm md:text-base lg:text-lg font-light"
              >
                Learn More
              </button>
            </motion.div>
            
            <motion.div 
              className="flex items-center justify-center mt-3 sm:mt-6 md:mt-8 space-x-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
            >
              <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-apple-blue animate-pulse-slow"></div>
              <p className="text-apple-grey text-[10px] md:text-xs font-light">
                {applicationsClosed ? (
                  <span>Applications for {format(APPLICATION_DATES.PROGRAM_START, 'yyyy')} are now closed</span>
                ) : (
                  <>Limited Places Available</>
                )}
              </p>
              <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-apple-blue animate-pulse-slow"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Hide the scroll button on mobile to save space */}
      {!isMobile && (
        <motion.button 
          onClick={scrollToDiscoverSection} 
          className="absolute bottom-4 md:bottom-8 left-0 right-0 mx-auto w-8 h-8 md:w-12 md:h-12 cursor-pointer z-20 flex items-center justify-center"
          aria-label="Scroll down"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.div 
            className="rounded-full bg-apple-border/20 backdrop-blur-sm border border-apple-border p-2 md:p-3 hover:bg-apple-border/40 transition-all"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
          >
            <ArrowDown className="text-apple-text w-3 h-3 md:w-5 md:h-5" />
          </motion.div>
        </motion.button>
      )}
    </section>
  );
};

export default HeroSection;
