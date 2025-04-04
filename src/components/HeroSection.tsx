
import React, { useEffect, useRef } from 'react';
import { ChevronDown, Music } from 'lucide-react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollPosition = window.scrollY;
      const opacity = 1 - scrollPosition / 700;
      const translateY = scrollPosition * 0.3;

      // Apply parallax effect to hero content
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
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 to-white"
    >
      {/* Decorative Music Notes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 animate-float" style={{ animationDelay: '0s' }}>
          <Music size={40} className="text-rose-200/40" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float" style={{ animationDelay: '1s' }}>
          <Music size={28} className="text-rose-200/30" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 animate-float" style={{ animationDelay: '2s' }}>
          <Music size={32} className="text-rose-200/50" />
        </div>
        <div className="absolute top-1/2 right-1/3 animate-float" style={{ animationDelay: '1.5s' }}>
          <Music size={24} className="text-rose-200/40" />
        </div>
      </div>
      
      {/* Hero Content */}
      <div className="hero-content relative z-10 text-center px-6 transition-all duration-500 ease-out max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <span className="uppercase tracking-widest text-xs text-rose-500 font-medium mb-4 inline-block">July 14-18, 2025 • Limassol, Cyprus</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-gray-800 mb-6 tracking-tight leading-tight">
            Vocal Excellence <br/> Summer Workshop
          </h1>
          <div className="w-20 h-px bg-rose-300 mx-auto mb-6"></div>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            A transformative 5-day vocal intensive for advancing singers, featuring masterclasses, private coaching, and performance opportunities with world-class faculty
          </p>
          <a href="#apply" className="primary-button inline-block">Apply Now</a>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-0 right-0 mx-auto w-max cursor-pointer animate-bounce" onClick={scrollToAbout}>
        <div className="flex flex-col items-center">
          <span className="text-rose-400 text-xs font-light mb-1">Discover</span>
          <ChevronDown className="text-rose-400" size={18} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
