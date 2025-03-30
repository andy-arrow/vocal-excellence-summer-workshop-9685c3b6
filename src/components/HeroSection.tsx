
import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

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
      className="relative h-screen flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Hero Background */}
      <div className="absolute inset-0 w-full h-full bg-white">
        <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 opacity-50"></div>
      </div>
      
      {/* Hero Content */}
      <div className="hero-content relative z-10 text-center px-6 transition-all duration-500 ease-out max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-gray-800 mb-6 tracking-tight leading-tight">
            Vocal Excellence Academy
          </h1>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            A transformative 5-day vocal intensive for advancing singers, featuring masterclasses, private coaching, and performance opportunities with world-class faculty
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a 
              href="#apply" 
              className="px-8 py-3 border border-gray-800 text-gray-800 rounded-none text-sm font-light tracking-wider uppercase hover:bg-gray-800 hover:text-white transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                const applySection = document.getElementById('apply');
                if (applySection) {
                  window.scrollTo({
                    top: applySection.offsetTop - 80,
                    behavior: 'smooth',
                  });
                }
              }}
            >
              Apply Now
            </a>
            <a 
              href="#about" 
              className="px-8 py-3 border border-gray-300 text-gray-600 rounded-none text-sm font-light tracking-wider uppercase hover:bg-gray-100 transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                scrollToAbout();
              }}
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll Down Indicator - Updated for better centering */}
      <div className="absolute bottom-10 left-0 right-0 mx-auto w-max cursor-pointer animate-bounce" onClick={scrollToAbout}>
        <div className="flex flex-col items-center">
          <span className="text-gray-500 text-xs font-light mb-1">Discover</span>
          <ChevronDown className="text-gray-500" size={18} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
