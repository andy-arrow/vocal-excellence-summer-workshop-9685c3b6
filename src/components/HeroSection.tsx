
import React, { useEffect, useRef, useState } from 'react';
import { Music } from 'lucide-react';
import { cn } from '@/lib/utils';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasReducedMotion, setHasReducedMotion] = useState(false);
  
  useEffect(() => {
    // Check for reduced motion preference from localStorage
    const savedPreference = localStorage.getItem('reduced-motion') === 'true';
    setHasReducedMotion(savedPreference);

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

      // Animate musical notes based on scroll (when motion is enabled)
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

  // Handle video loaded state
  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  return (
    <section 
      id="home" 
      ref={heroRef}
      className={cn(
        "relative h-screen flex items-center justify-center overflow-hidden bg-black",
        hasReducedMotion ? "reduced-motion" : ""
      )}
    >
      {/* Video background with vibrant overlay */}
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
      
      {/* Vibrant gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-energy-purple/90 via-energy-pink/70 to-energy-cyan/80 mix-blend-overlay z-10"></div>
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Animated musical notes (only shown when reduced motion is off) */}
      {!hasReducedMotion && (
        <>
          <div className="musical-note absolute top-[15%] left-[10%] text-white/20 text-5xl animate-float z-10">♪</div>
          <div className="musical-note absolute top-[25%] right-[15%] text-white/20 text-6xl animate-float animation-delay-700 z-10">♩</div>
          <div className="musical-note absolute bottom-[35%] left-[20%] text-white/20 text-4xl animate-float animation-delay-1500 z-10">♫</div>
          <div className="musical-note absolute bottom-[25%] right-[25%] text-white/20 text-7xl animate-float animation-delay-2000 z-10">𝄞</div>
          <div className="musical-note absolute top-[40%] left-[30%] text-white/20 text-5xl animate-float animation-delay-1000 z-10">♬</div>
        </>
      )}
      
      {/* Hero background image - updated to show singers at masterclass */}
      <div className={cn(
        "absolute inset-0 bg-black",
        isVideoLoaded && !hasReducedMotion ? "opacity-0" : "opacity-100",
        "transition-opacity duration-1000 z-0"
      )}>
        <div className="absolute inset-0 bg-[url('/lovable-uploads/masterclass-singers.jpg')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
      </div>
      
      {/* Dynamic hero content with more persuasive messaging */}
      <div className="hero-content relative z-20 text-center px-6 transition-all duration-500 ease-out max-w-4xl mx-auto">
        <div className="space-y-6">
          <div className="inline-block py-2 px-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-2">
            <span className="uppercase tracking-widest text-xs font-medium text-white flex items-center justify-center">
              <span className="mr-1 text-energy-yellow font-bold">EXCLUSIVE:</span> July 14-18, 2025 • Limassol, Cyprus
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-outfit font-bold text-white tracking-tight leading-tight">
            <span className="block">Unlock Your</span> 
            <span className="gradient-text">Vocal Potential</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto font-light">
            Join the transformative 5-day vocal experience that has launched careers and transformed passionate singers into confident performers
          </p>

          <div className="pt-6">
            <a 
              href="/apply" 
              className="primary-button inline-block text-lg px-8 py-4 transition-all hover:scale-105 hover:shadow-glow"
            >
              Apply Now — Only 20 Spots Available
            </a>
            <p className="text-white/70 text-sm mt-3">Applications close May 15, 2025</p>
          </div>
        </div>
      </div>
      
      {/* Animated scroll indicator */}
      <div className="absolute bottom-12 left-0 right-0 mx-auto w-max cursor-pointer z-20">
        <div className="flex flex-col items-center">
          <span className="text-white/90 text-xs uppercase tracking-widest mb-2 font-medium">Discover What Awaits</span>
          <div className="flex items-center justify-center h-12 space-x-1 animate-bounce-light">
            {!hasReducedMotion ? (
              <>
                <span className="inline-block w-1 h-4 bg-energy-pink rounded-full"></span>
                <span className="inline-block w-1 h-6 bg-energy-purple rounded-full"></span>
                <span className="inline-block w-1 h-8 bg-energy-cyan rounded-full"></span>
                <span className="inline-block w-1 h-6 bg-energy-purple rounded-full"></span>
                <span className="inline-block w-1 h-4 bg-energy-pink rounded-full"></span>
              </>
            ) : (
              <div className="p-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                <Music className="text-white" size={20} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
