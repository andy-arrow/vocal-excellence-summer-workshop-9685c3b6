
import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, VolumeX, Volume2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasReducedMotion, setHasReducedMotion] = useState(false);
  
  // Toggle audio mute state
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Toggle reduced motion preference
  const toggleReducedMotion = () => {
    setHasReducedMotion(!hasReducedMotion);
    localStorage.setItem('reduced-motion', (!hasReducedMotion).toString());
  };

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

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  // Handle video loaded state
  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  return (
    <section 
      id="home" 
      ref={heroRef}
      className={cn(
        "relative h-screen flex items-center justify-center overflow-hidden",
        hasReducedMotion ? "reduced-motion" : ""
      )}
    >
      {/* Accessibility controls */}
      <div className="absolute top-4 right-4 z-50 flex space-x-3">
        <button 
          onClick={toggleMute}
          className="p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
          aria-label={isMuted ? "Unmute background audio" : "Mute background audio"}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        <button 
          onClick={toggleReducedMotion}
          className={cn(
            "p-2 backdrop-blur-sm rounded-full text-white transition-colors text-xs",
            hasReducedMotion ? "bg-white/30" : "bg-white/10 hover:bg-white/20"
          )}
          aria-label={hasReducedMotion ? "Enable animations" : "Reduce animations"}
        >
          {hasReducedMotion ? "Motion: Off" : "Motion: On"}
        </button>
      </div>
      
      {/* Video background */}
      <div className={cn(
        "absolute inset-0 overflow-hidden bg-slate-900",
        isVideoLoaded && !hasReducedMotion ? "opacity-100" : "opacity-0",
        "transition-opacity duration-1000"
      )}>
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted={isMuted}
          playsInline
          onCanPlay={handleVideoLoad}
          className={cn(
            "absolute min-w-full min-h-full object-cover",
            hasReducedMotion ? "hidden" : "block"
          )}
        >
          <source src="/lovable-uploads/cyprus-coast-waves.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Gradient overlay for video */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-800/70 to-slate-900/90 z-10"></div>

      {/* Animated musical notes (only shown when reduced motion is off) */}
      {!hasReducedMotion && (
        <>
          <div className="musical-note absolute top-[15%] left-[10%] text-white/10 text-5xl animate-float z-10">♪</div>
          <div className="musical-note absolute top-[25%] right-[15%] text-white/10 text-6xl animate-float animation-delay-700 z-10">♩</div>
          <div className="musical-note absolute bottom-[35%] left-[20%] text-white/10 text-4xl animate-float animation-delay-1500 z-10">♫</div>
          <div className="musical-note absolute bottom-[25%] right-[25%] text-white/10 text-7xl animate-float animation-delay-2000 z-10">𝄞</div>
          <div className="musical-note absolute top-[40%] left-[30%] text-white/10 text-5xl animate-float animation-delay-1000 z-10">♬</div>
        </>
      )}
      
      {/* Hero background image - updated to show singers at masterclass */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900",
        isVideoLoaded && !hasReducedMotion ? "opacity-0" : "opacity-100",
        "transition-opacity duration-1000 z-0"
      )}>
        <div className="absolute inset-0 bg-[url('/lovable-uploads/masterclass-singers.jpg')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
      </div>
      
      {/* Refined hero content */}
      <div className="hero-content relative z-20 text-center px-6 transition-all duration-500 ease-out max-w-4xl mx-auto">
        <div className="space-y-8">
          <div className="inline-block py-1.5 px-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-2">
            <span className="uppercase tracking-wider text-xs font-medium text-white/80">July 14-18, 2025 • Limassol, Cyprus</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-white tracking-tight leading-tight">
            Vocal Excellence <br className="hidden sm:block"/> 
            <span className="mt-2 block text-white/80">Let Your Voice Soar</span>
          </h1>
          
          <div className="w-16 h-px bg-white/20 mx-auto"></div>
          
          <p className="text-base md:text-xl text-white/70 max-w-2xl mx-auto mb-10 font-light leading-relaxed animate-pulse-slow">
            Transform your singing technique and performance in five days of immersive masterclasses with world-class faculty
          </p>
        </div>
      </div>
      
      {/* Sound wave styled scroll indicator */}
      <div className="absolute bottom-12 left-0 right-0 mx-auto w-max cursor-pointer z-20" onClick={scrollToAbout}>
        <div className="flex flex-col items-center">
          <span className="text-white/60 text-xs uppercase tracking-wider mb-2 font-light">Discover</span>
          <div className="flex items-center justify-center h-8 space-x-1">
            {!hasReducedMotion ? (
              <>
                <span className="inline-block w-0.5 h-3 bg-white/40 animate-soundwave"></span>
                <span className="inline-block w-0.5 h-4 bg-white/50 animate-soundwave animation-delay-100"></span>
                <span className="inline-block w-0.5 h-6 bg-white/60 animate-soundwave animation-delay-200"></span>
                <span className="inline-block w-0.5 h-8 bg-white/70 animate-soundwave animation-delay-300"></span>
                <span className="inline-block w-0.5 h-6 bg-white/60 animate-soundwave animation-delay-200"></span>
                <span className="inline-block w-0.5 h-4 bg-white/50 animate-soundwave animation-delay-100"></span>
                <span className="inline-block w-0.5 h-3 bg-white/40 animate-soundwave"></span>
              </>
            ) : (
              <div className="p-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15">
                <ChevronDown className="text-white/70" size={16} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
