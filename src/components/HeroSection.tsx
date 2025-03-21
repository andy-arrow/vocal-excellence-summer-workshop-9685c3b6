
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
          className="absolute inset-0 bg-center bg-cover"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')`,
          }}
        >
          <div className="hero-overlay"></div>
        </div>
      </div>
      
      {/* Hero Content */}
      <div className="hero-content relative z-10 text-center px-6 transition-all duration-500 ease-out">
        <div className="animate-fade-in">
          <span className="inline-block mb-4 py-1 px-4 rounded-full bg-white/10 backdrop-blur-md text-white/90 text-sm font-medium">
            Summer Programme 2024
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold text-white mb-6 tracking-tight">
            Vocal Excellence Academy
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
            Unleash your vocal brilliance this summer in an immersive, transformative programme led by world-class instructors
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
          <span className="text-white/80 text-sm mb-2">Discover</span>
          <ChevronDown className="text-white/80 animate-float" size={20} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
