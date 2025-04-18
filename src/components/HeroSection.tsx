import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
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

      if (!hasReducedMotion) {
        const notes = document.querySelectorAll('.musical-note');
        notes.forEach((note, index) => {
          const noteEl = note as HTMLElement;
          const translateAmount = (scrollPosition * 0.05) * (index % 2 === 0 ? 1 : -1);
          noteEl.style.transform = `translateY(${translateAmount}px) rotate(${translateAmount}deg)`;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasReducedMotion]);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const scrollToDiscoverSection = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section 
      id="home" 
      ref={heroRef}
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden",
        "bg-white",
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
            className="display-text tracking-tight leading-[1.1]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <span className="block mb-4">Unlock Your</span> 
            <span className="gradient-text">Vocal Potential</span>
          </motion.h1>
          
          <motion.p 
            className="subtitle max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            A transformative 5-day vocal intensive for advancing singers, featuring masterclasses, private coaching, and performance opportunities with world-class faculty
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
                className="group px-8 py-4 bg-energy-purple text-white rounded-xl text-lg font-medium transition-all duration-300 hover:bg-energy-purple/90 shadow-lg shadow-energy-purple/25 hover:shadow-xl hover:shadow-energy-purple/40 hover:-translate-y-0.5 flex items-center gap-2"
              >
                Apply Now
                <ArrowUpRight className="w-5 h-5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              
              <button
                onClick={scrollToDiscoverSection}
                className="text-charcoal hover:text-charcoal/80 px-8 py-4 rounded-xl border border-charcoal/20 backdrop-blur-sm transition-all hover:bg-charcoal/5 text-lg font-light"
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
              <div className="w-2 h-2 rounded-full bg-energy-purple animate-pulse-slow"></div>
              <p className="text-charcoal/70 text-sm font-light">
                Applications close <span className="text-charcoal font-medium">May 15, 2025</span> — Only 20 spots available
              </p>
              <div className="w-2 h-2 rounded-full bg-energy-purple animate-pulse-slow"></div>
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
          className="rounded-full bg-charcoal/10 backdrop-blur-sm border border-charcoal/20 p-3 hover:bg-charcoal/20 transition-all"
          animate={{ y: [0, 8, 0] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          <ArrowDown className="text-charcoal w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroSection;
