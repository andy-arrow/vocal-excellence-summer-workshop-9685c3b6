
import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

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
        "relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950",
        hasReducedMotion ? "reduced-motion" : ""
      )}
    >
      {/* Video Background */}
      <div className={cn(
        "absolute inset-0 overflow-hidden",
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
            "absolute min-w-full min-h-full object-cover opacity-60",
            hasReducedMotion ? "hidden" : "block"
          )}
        >
          <source src="/lovable-uploads/cyprus-coast-waves.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/80 to-slate-800/70 mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-cyan-500/20 mix-blend-overlay"></div>

      {/* Animated Musical Notes - Only show if reduced motion is off */}
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
      
      {/* Fallback Background for Reduced Motion */}
      <div className={cn(
        "absolute inset-0",
        isVideoLoaded && !hasReducedMotion ? "opacity-0" : "opacity-100",
        "transition-opacity duration-1000 z-0"
      )}>
        <div className="absolute inset-0 bg-[url('/lovable-uploads/masterclass-singers.jpg')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
      </div>
      
      {/* Main Content */}
      <div className="hero-content relative z-20 text-center px-6 transition-all duration-500 ease-out max-w-5xl mx-auto">
        <motion.div 
          className="space-y-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light text-white tracking-tight leading-[1.1]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <span className="block mb-4">Unlock Your</span> 
            <span className="gradient-text">Vocal Potential</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-2xl text-slate-200 max-w-3xl mx-auto font-light leading-relaxed"
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
              <motion.a 
                href="/apply" 
                className="px-8 py-4 bg-gradient-to-r from-violet-600 to-violet-700 text-white rounded-full text-lg font-medium transition-all duration-300 hover:from-violet-700 hover:to-violet-800 shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/40 hover:-translate-y-0.5"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Apply Now
              </motion.a>
              
              <motion.button
                onClick={scrollToDiscoverSection}
                className="text-slate-200 hover:text-white px-8 py-4 rounded-full border border-slate-400/30 backdrop-blur-sm transition-all hover:bg-white/10 text-lg font-light"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Discover More
              </motion.button>
            </motion.div>
            
            <motion.div
              className="flex items-center justify-center mt-12 space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
            >
              <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse-slow"></div>
              <p className="text-slate-300 text-sm font-light">
                Applications close <span className="text-white font-medium">May 15, 2025</span> — Only 20 spots available
              </p>
              <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse-slow"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll Down Button */}
      <motion.button 
        onClick={scrollToDiscoverSection}
        className="absolute bottom-12 left-0 right-0 mx-auto w-12 h-12 cursor-pointer z-20 flex items-center justify-center"
        aria-label="Scroll down"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div 
          className="rounded-full bg-white/10 backdrop-blur-sm border border-white/20 p-3 hover:bg-white/20 transition-all"
          animate={{ y: [0, 8, 0] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          <ArrowDown className="text-white w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroSection;
