
import React, { useEffect, useRef, useState } from 'react';
import { Music, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasReducedMotion, setHasReducedMotion] = useState(false);
  const navigate = useNavigate();
  
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
        "relative min-h-screen flex items-center justify-center overflow-hidden bg-black",
        hasReducedMotion ? "reduced-motion" : ""
      )}
    >
      <div className={cn(
        "absolute inset-0 overflow-hidden bg-black",
        isVideoLoaded && !hasReducedMotion ? "opacity-100" : "opacity-0",
        "transition-opacity duration-1000"
      )}>
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted
          playsInline
          onCanPlay={handleVideoLoad}
          className={cn(
            "absolute min-w-full min-h-full object-cover opacity-80",
            hasReducedMotion ? "hidden" : "block"
          )}
        >
          <source src="/lovable-uploads/cyprus-coast-waves.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-energy-purple/90 via-energy-pink/70 to-energy-cyan/80 mix-blend-overlay z-10"></div>
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {!hasReducedMotion && (
        <>
          <motion.div 
            className="musical-note absolute top-[15%] left-[10%] text-white/20 text-5xl z-10"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            ♪
          </motion.div>
          <motion.div 
            className="musical-note absolute top-[25%] right-[15%] text-white/20 text-6xl z-10"
            animate={{
              y: [0, -20, 0],
              rotate: [0, -5, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ 
              duration: 5,
              delay: 0.7,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            ♩
          </motion.div>
          <motion.div 
            className="musical-note absolute bottom-[35%] left-[20%] text-white/20 text-4xl z-10"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 8, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              duration: 3.5,
              delay: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            ♫
          </motion.div>
          <motion.div 
            className="musical-note absolute bottom-[25%] right-[25%] text-white/20 text-7xl z-10"
            animate={{
              y: [0, -25, 0],
              rotate: [0, -8, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ 
              duration: 6,
              delay: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            𝄞
          </motion.div>
          <motion.div 
            className="musical-note absolute top-[40%] left-[30%] text-white/20 text-5xl z-10"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              duration: 4.5,
              delay: 1,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >
            ♬
          </motion.div>
        </>
      )}
      
      <div className={cn(
        "absolute inset-0 bg-black",
        isVideoLoaded && !hasReducedMotion ? "opacity-0" : "opacity-100",
        "transition-opacity duration-1000 z-0"
      )}>
        <div className="absolute inset-0 bg-[url('/lovable-uploads/masterclass-singers.jpg')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
      </div>
      
      <div className="hero-content relative z-20 text-center px-6 transition-all duration-500 ease-out max-w-4xl mx-auto">
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div 
            className="inline-block py-2 px-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-2 w-auto max-w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <span className="uppercase tracking-widest text-xs font-medium text-white flex items-center justify-center flex-wrap">
              <span className="mr-1 text-energy-yellow font-bold animate-pulse-slow inline-block">EXCLUSIVE:</span>
              <span className="inline-block">July 14-18, 2025 • Limassol, Cyprus</span>
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-outfit font-bold text-white tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <span className="block">Unlock Your</span> 
            <span className="gradient-text">Vocal Potential</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            A transformative 5-day vocal intensive for advancing singers, featuring masterclasses, private coaching, and performance opportunities with world-class faculty
          </motion.p>

          <motion.div 
            className="pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <motion.a 
              href="/apply" 
              className="primary-button inline-block text-lg px-8 py-4 transition-all"
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px 5px rgba(124, 58, 237, 0.5)" }}
              whileTap={{ scale: 0.98 }}
            >
              Apply Now — Only 20 Spots Available
            </motion.a>
            <motion.div
              className="flex items-center justify-center mt-4 space-x-1 flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
            >
              <div className="w-2 h-2 rounded-full bg-energy-pink animate-pulse-slow"></div>
              <p className="text-white/80 text-sm">Applications close <span className="font-semibold text-white">May 15, 2025</span></p>
              <div className="w-2 h-2 rounded-full bg-energy-pink animate-pulse-slow"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.button 
        onClick={scrollToDiscoverSection}
        className="absolute bottom-0 left-0 right-0 mx-auto w-12 h-12 cursor-pointer z-20 group pb-8 flex items-center justify-center"
        aria-label="Scroll down"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        {!hasReducedMotion ? (
          <div className="rounded-full bg-white/10 backdrop-blur-sm border border-white/20 p-3 hover:bg-white/20 transition-all">
            <ArrowDown className="text-white w-5 h-5" />
          </div>
        ) : (
          <div className="p-2 rounded-full bg-white/30 backdrop-blur-sm border border-white/40 group-hover:bg-white/40 transition-all">
            <ArrowDown className="text-white" size={20} />
          </div>
        )}
      </motion.button>
    </section>
  );
};

export default HeroSection;
