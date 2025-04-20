import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hasReducedMotion, setHasReducedMotion] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);
  const imagePath = '/lovable-uploads/06153527-7089-4713-b4d9-ddf638befdcb.png';
  const fallbackImageUrl = 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80';

  useEffect(() => {
    console.log('Hero container dimensions:', {
      width: heroRef.current?.offsetWidth,
      height: heroRef.current?.offsetHeight
    });
    
    console.log('Attempting to load image from:', imagePath);
    
    const img = new Image();
    img.onload = () => {
      console.log('✅ Background image loaded successfully:', {
        width: img.width,
        height: img.height,
        src: img.src
      });
      setIsImageLoaded(true);
      setImageLoadError(false);
    };
    
    img.onerror = (e) => {
      console.error('Failed to load background image:', e);
      setImageLoadError(true);
      setIsImageLoaded(false);
      
      const fallbackImg = new Image();
      fallbackImg.onload = () => {
        console.log('Fallback image loaded successfully');
        setIsImageLoaded(true);
      };
      fallbackImg.src = fallbackImageUrl;
    };
    
    img.src = imagePath;
    
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
          const translateAmount = scrollPosition * 0.05 * (index % 2 === 0 ? 1 : -1);
          noteEl.style.transform = `translateY(${translateAmount}px) rotate(${translateAmount}deg)`;
        });
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
        "relative min-h-[500px] h-screen flex items-center justify-center overflow-hidden mt-16",
        hasReducedMotion ? "reduced-motion" : ""
      )}
    >
      <div 
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-0"
        style={{
          backgroundImage: `url(${imageLoadError ? fallbackImageUrl : imagePath})`,
          opacity: 0.15,
          width: '100%',
          height: '100%',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {imageLoadError && (
        <img 
          src={fallbackImageUrl}
          alt="Background"
          className="absolute inset-0 object-cover w-full h-full opacity-15 z-0"
          style={{ opacity: 0.15 }}
        />
      )}
      
      <div className="absolute inset-0 bg-black/80 z-10"></div>
      
      {process.env.NODE_ENV !== 'production' && (
        <div className="absolute top-20 right-4 z-50 bg-black/70 text-white text-xs p-2 rounded">
          Image: {isImageLoaded ? '✅ Loaded' : imageLoadError ? '❌ Error' : '⏳ Loading'}
        </div>
      )}
      
      <div className="hero-content relative z-20 text-center px-6 transition-all duration-500 ease-out max-w-5xl mx-auto pt-24 md:pt-32 lg:pt-40">
        <motion.div className="space-y-10" initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.3
        }}>
          <motion.h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-lg" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.7
          }}>
            <span className="block mb-4">Unlock Your</span>
            <span className="text-gradient">Vocal Potential</span>
          </motion.h1>
          
          <motion.p className="font-sans text-lg md:text-xl text-white font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-lg" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 0.8,
            delay: 0.9
          }}>A transformative 5-day vocal intensive for advancing singers, featuring masterclasses, private coaching, and performance opportunities with world-class faculty</motion.p>

          <motion.div className="pt-8" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 1.1
          }}>
            <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/apply" className="group px-8 py-4 bg-white text-black rounded-xl text-lg font-medium transition-all duration-300 hover:bg-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2">
                Apply Now
                <ArrowUpRight className="w-5 h-5 opacity-90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>
            
            <motion.div className="flex items-center justify-center mt-12 space-x-4" initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              delay: 1.3,
              duration: 0.5
            }}>
              <div className="w-2 h-2 rounded-full bg-white animate-pulse-slow"></div>
              <p className="text-white text-sm font-medium">
                Applications close <span className="text-white font-bold">May 15, 2025</span> — Only 20 spots available
              </p>
              <div className="w-2 h-2 rounded-full bg-white animate-pulse-slow"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.button onClick={scrollToDiscoverSection} className="absolute bottom-12 left-0 right-0 mx-auto w-12 h-12 cursor-pointer z-20 flex items-center justify-center" aria-label="Scroll down" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 1.5,
        duration: 0.8
      }}>
        <motion.div className="rounded-full bg-white/20 backdrop-blur-sm border border-white/30 p-3 hover:bg-white/30 transition-all" animate={{
          y: [0, 8, 0]
        }} transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop"
        }}>
          <ArrowDown className="text-white w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroSection;
