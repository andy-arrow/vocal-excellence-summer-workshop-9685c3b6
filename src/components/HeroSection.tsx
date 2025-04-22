
import React, { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CountdownTimer } from './CountdownTimer';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        console.log('Autoplay prevented');
      });
    }
  }, []);

  const scrollToAboutSection = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-apple-text"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/lovable-uploads/masterclass-singers.jpg"
        >
          <source src="/lovable-uploads/masterclass-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-apple-text/70"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div 
          className="max-w-4xl mx-auto space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Headline */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white">
            Earn a Professional Audition Reel
            <br />
            <span className="text-apple-blue">in 5 Days</span>
          </h1>

          {/* Subheadline */}
          <motion.p 
            className="text-lg md:text-xl text-apple-grey max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Private coaching, Alexander Technique, & physician-led vocal health in sunny Limassol. 
            <span className="font-medium"> Only 20 singers admitted.</span>
          </motion.p>

          {/* Trust Badges */}
          <motion.div 
            className="flex flex-wrap justify-center gap-8 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <img src="/lovable-uploads/juilliard-logo.png" alt="Juilliard" className="h-8 opacity-50 grayscale" />
            <img src="/lovable-uploads/broadway-logo.png" alt="Broadway" className="h-8 opacity-50 grayscale" />
            <img src="/lovable-uploads/nyt-logo.png" alt="New York Times" className="h-8 opacity-50 grayscale" />
            <img src="/lovable-uploads/opera-today-logo.png" alt="Opera Today" className="h-8 opacity-50 grayscale" />
          </motion.div>

          {/* Success Metric & Timer */}
          <motion.div 
            className="flex flex-col items-center gap-3 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            <div className="px-4 py-1.5 bg-apple-text/60 backdrop-blur border border-apple-grey/20 rounded-full">
              <span className="text-sm text-white font-medium">94% of past attendees booked paid gigs within 6 months</span>
            </div>
            
            <CountdownTimer deadline="2025-05-15" />
          </motion.div>

          {/* CTA Button */}
          <motion.div 
            className="pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.7 }}
          >
            <Link 
              to="/apply" 
              className="group inline-flex items-center gap-2 px-8 py-4 bg-apple-blue text-white rounded-full text-lg font-medium transition-all duration-300 hover:bg-apple-blue-hover"
            >
              Reserve My Spot
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down Arrow */}
      <motion.button 
        onClick={scrollToAboutSection}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white cursor-pointer z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
          className="rounded-full bg-apple-text/20 backdrop-blur-sm border border-white/20 p-2 hover:bg-apple-text/40 transition-all"
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroSection;

