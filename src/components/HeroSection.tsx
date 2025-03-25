
import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollPosition = window.scrollY;
      const opacity = 1 - scrollPosition / 700;
      const scale = 1 + scrollPosition * 0.0005;
      const translateY = scrollPosition * 0.3;

      // Apply parallax effect to hero content
      if (heroRef.current) {
        const heroContent = heroRef.current.querySelector('.hero-content') as HTMLElement;
        if (heroContent) {
          heroContent.style.opacity = Math.max(0.2, opacity).toString();
          heroContent.style.transform = `translateY(${translateY}px)`;
        }

        // Apply scale effect to background
        const heroBg = heroRef.current.querySelector('.hero-bg') as HTMLElement;
        if (heroBg) {
          heroBg.style.transform = `scale(${scale})`;
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
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Hero Background */}
      <div className="hero-bg absolute inset-0 w-full h-full bg-apple-dark transition-transform duration-500 ease-out">
        <div 
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{ 
            backgroundImage: `url('/lovable-uploads/6fe8392e-8aba-4eeb-afd2-49b7bafc73bb.png')`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>
        </div>
      </div>
      
      {/* Hero Content */}
      <div className="hero-content relative z-10 text-center px-6 transition-all duration-500 ease-out max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <span className="inline-block mb-3 py-1 px-4 rounded-full bg-white/10 backdrop-blur-md text-white/90 text-xs font-medium tracking-wide">
            Summer Programme • July 14-18, 2025
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-semibold text-white mb-4 tracking-tight leading-tight">
            Vocal Excellence Academy
          </h1>
          <p className="text-base md:text-xl text-white/80 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
            A transformative 5-day vocal intensive for advancing singers, featuring masterclasses, private coaching, and performance opportunities with world-class faculty
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a 
              href="#apply" 
              className="primary-button"
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
              className="secondary-button"
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
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce" onClick={scrollToAbout}>
        <div className="flex flex-col items-center">
          <span className="text-white/60 text-xs font-light mb-1">Discover</span>
          <ChevronDown className="text-white/60" size={18} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
