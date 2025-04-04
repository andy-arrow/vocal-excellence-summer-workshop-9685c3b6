
import React, { useEffect, useRef } from 'react';
import { ChevronDown, Music, Mic } from 'lucide-react';

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
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Hero Background - Enhanced with more sophisticated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100/40 via-rose-50/30 to-white/20">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>
      
      {/* Decorative Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2720%27%20height%3D%2720%27%20viewBox%3D%270%200%2020%2020%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cg%20fill%3D%27%23ffffff%27%20fill-opacity%3D%270.4%27%20fill-rule%3D%27evenodd%27%3E%3Ccircle%20cx%3D%273%27%20cy%3D%273%27%20r%3D%273%27%2F%3E%3Ccircle%20cx%3D%2713%27%20cy%3D%2713%27%20r%3D%273%27%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')] bg-repeat"></div>
      </div>
      
      {/* Hero Overlay with refined opacity */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      
      {/* Decorative Music Notes - More sophisticated arrangement */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 animate-float opacity-60" style={{ animationDelay: '0s' }}>
          <Music size={40} className="text-rose-200/60" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float opacity-50" style={{ animationDelay: '1s' }}>
          <Music size={28} className="text-rose-200/50" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 animate-float opacity-70" style={{ animationDelay: '2s' }}>
          <Mic size={32} className="text-rose-200/70" />
        </div>
        <div className="absolute top-1/2 right-1/3 animate-float opacity-60" style={{ animationDelay: '1.5s' }}>
          <Music size={24} className="text-rose-200/60" />
        </div>
        <div className="absolute bottom-1/4 right-1/5 animate-float opacity-50" style={{ animationDelay: '0.5s' }}>
          <Mic size={36} className="text-rose-200/50" />
        </div>
      </div>
      
      {/* Hero Content - Improved typography and spacing */}
      <div className="hero-content relative z-10 text-center px-6 transition-all duration-500 ease-out max-w-4xl mx-auto">
        <div className="animate-fade-in space-y-6">
          <div className="inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-2">
            <span className="uppercase tracking-wider text-xs text-rose-200 font-medium">July 14-18, 2025 • Limassol, Cyprus</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-white mb-6 tracking-tight leading-tight">
            Vocal Excellence <br className="hidden sm:block"/> 
            <span className="mt-1 md:mt-2 block text-rose-200">Summer Workshop</span>
          </h1>
          
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto mb-6"></div>
          
          <p className="text-base md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            A transformative 5-day vocal intensive for advancing singers, featuring masterclasses, private coaching, and performance opportunities with world-class faculty
          </p>
          
          <a 
            href="#apply" 
            className="inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-md text-sm font-medium tracking-wider uppercase hover:from-rose-600 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-rose-500/20 transform hover:-translate-y-0.5"
          >
            Apply Now
          </a>
        </div>
      </div>
      
      {/* Scroll Down Indicator - Enhanced with animation */}
      <div className="absolute bottom-10 left-0 right-0 mx-auto w-max cursor-pointer animate-bounce" onClick={scrollToAbout}>
        <div className="flex flex-col items-center">
          <span className="text-rose-200 text-xs font-light tracking-wider mb-2 opacity-80">Discover</span>
          <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <ChevronDown className="text-rose-200" size={18} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
