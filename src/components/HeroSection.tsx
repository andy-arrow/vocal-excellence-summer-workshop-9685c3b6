
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
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Sophisticated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-3 mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2720%27%20height%3D%2720%27%20viewBox%3D%270%200%2020%2020%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Cg%20fill%3D%27%23ffffff%27%20fill-opacity%3D%270.2%27%20fill-rule%3D%27evenodd%27%3E%3Ccircle%20cx%3D%273%27%20cy%3D%273%27%20r%3D%272%27%2F%3E%3Ccircle%20cx%3D%2713%27%20cy%3D%2713%27%20r%3D%272%27%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')] bg-repeat"></div>
      </div>
      
      {/* Refined hero content */}
      <div className="hero-content relative z-10 text-center px-6 transition-all duration-500 ease-out max-w-4xl mx-auto">
        <div className="space-y-8">
          <div className="inline-block py-1.5 px-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-2">
            <span className="uppercase tracking-wider text-xs font-medium text-white/80">July 14-18, 2025 • Limassol, Cyprus</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-white tracking-tight leading-tight">
            Vocal Excellence <br className="hidden sm:block"/> 
            <span className="mt-2 block text-white/80">Summer Workshop</span>
          </h1>
          
          <div className="w-16 h-px bg-white/20 mx-auto"></div>
          
          <p className="text-base md:text-xl text-white/70 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            A transformative 5-day vocal intensive for advancing singers, featuring masterclasses, private coaching, and performance opportunities with world-class faculty
          </p>
        </div>
      </div>
      
      {/* Minimal scroll indicator */}
      <div className="absolute bottom-12 left-0 right-0 mx-auto w-max cursor-pointer" onClick={scrollToAbout}>
        <div className="flex flex-col items-center">
          <span className="text-white/60 text-xs uppercase tracking-wider mb-2 font-light">Discover</span>
          <div className="p-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <ChevronDown className="text-white/60" size={16} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
