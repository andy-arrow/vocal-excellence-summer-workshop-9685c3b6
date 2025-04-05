
import React, { useEffect, useRef, useState } from 'react';
import { Music, Mic, Users, Award, Play, Pause, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: <Mic className="w-5 h-5 text-rose-500" />,
    title: "Master Your Voice",
    description: "Study with internationally renowned vocal pedagogues who will help you find your authentic timber and technical precision."
  },
  {
    icon: <Music className="w-5 h-5 text-rose-500" />,
    title: "Perform With Passion",
    description: "Develop your artistry through masterclasses and culminate in transformative public performances."
  },
  {
    icon: <Users className="w-5 h-5 text-rose-500" />,
    title: "Harmonize Together",
    description: "Connect with fellow artists in a supportive atmosphere designed for collaborative growth and inspiration."
  },
  {
    icon: <Award className="w-5 h-5 text-rose-500" />,
    title: "Launch Your Career",
    description: "Gain valuable insights into the professional world of vocal performance and build your artistic network."
  }
];

const audioSamples = [
  {
    title: "Vocal Warm-Up",
    description: "Experience our signature five-minute vocal warm-up routine",
    file: "/lovable-uploads/vocal-warmup-sample.mp3",
  },
  {
    title: "Master Class Highlight",
    description: "Listen to a coaching session on breath support technique",
    file: "/lovable-uploads/masterclass-highlight.mp3",
  }
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeAudioIndex, setActiveAudioIndex] = useState<number | null>(null);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const [hasReducedMotion, setHasReducedMotion] = useState(false);
  
  useEffect(() => {
    // Check for reduced motion preference from localStorage
    const savedPreference = localStorage.getItem('reduced-motion') === 'true';
    setHasReducedMotion(savedPreference);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentElements = elementsRef.current.filter(Boolean) as HTMLElement[];
    currentElements.forEach((el) => observer.observe(el));

    return () => {
      currentElements.forEach((el) => observer.unobserve(el));
      
      // Clean up audio players when component unmounts
      audioRefs.current.forEach(audio => {
        if (audio) {
          audio.pause();
        }
      });
    };
  }, []);

  const toggleAudioPlay = (index: number) => {
    const audio = audioRefs.current[index];
    
    if (!audio) return;
    
    // If this is the currently playing audio
    if (activeAudioIndex === index) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
      return;
    }
    
    // Stop any currently playing audio
    if (activeAudioIndex !== null && audioRefs.current[activeAudioIndex]) {
      audioRefs.current[activeAudioIndex]?.pause();
    }
    
    // Play the new audio
    setActiveAudioIndex(index);
    audio.currentTime = 0;
    audio.play();
  };

  return (
    <section id="about" ref={sectionRef} className="py-20 music-pattern-bg">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <h2 
            ref={(el) => (elementsRef.current[0] = el)} 
            className="section-title reveal-on-scroll"
          >
            Sing Your Truth This Summer
          </h2>
          <p 
            ref={(el) => (elementsRef.current[1] = el)} 
            className="section-subtitle reveal-on-scroll"
          >
            Harmonize technique with passion under Cyprus' summer skies
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div 
            ref={(el) => (elementsRef.current[2] = el)} 
            className="reveal-on-scroll space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-serif text-rose-600">Find Your Authentic Voice</h3>
              <p className="text-gray-600 leading-relaxed">
                The Vocal Excellence Summer Workshop is an immersive five-day vocal transformation designed for serious singers. Like the perfect vibrato, we balance technical precision with artistic freedom.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Each breath, note, and phrase is an opportunity to discover your unique vocal signature under the guidance of world-class faculty who have performed on prestigious stages worldwide.
              </p>
            </div>
            
            <blockquote className="decorative-quote pl-6 border-l-2 border-rose-200 my-8">
              "The voice is the original instrument—a powerful tool of expression that resonates with the very essence of who we are."
            </blockquote>
            
            {/* Audio Sample Players */}
            <div className="space-y-4 mt-8">
              <h4 className="text-lg font-medium text-gray-800">Experience Our Sound</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {audioSamples.map((sample, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "glass-card p-4 cursor-pointer transition-all duration-300",
                      "hover:shadow-lg border border-rose-100"
                    )}
                    onClick={() => toggleAudioPlay(index)}
                  >
                    <div className="flex items-center mb-2">
                      <div 
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center mr-3",
                          activeAudioIndex === index && !audioRefs.current[index]?.paused
                            ? "bg-rose-100 text-rose-600"
                            : "bg-gray-100 text-gray-600"
                        )}
                      >
                        {activeAudioIndex === index && !audioRefs.current[index]?.paused 
                          ? <Pause size={18} /> 
                          : <Play size={18} />
                        }
                      </div>
                      <div>
                        <h5 className="text-sm font-medium">{sample.title}</h5>
                        <p className="text-xs text-gray-500">{sample.description}</p>
                      </div>
                    </div>
                    
                    {/* Audio wave visualization (simplified for initial implementation) */}
                    <div className={cn(
                      "h-2 flex items-end space-x-0.5 mt-2",
                      hasReducedMotion ? "opacity-50" : ""
                    )}>
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div 
                          key={i}
                          className={cn(
                            "w-1 bg-rose-300 rounded-full",
                            activeAudioIndex === index && !audioRefs.current[index]?.paused && !hasReducedMotion
                              ? "animate-soundwave"
                              : "h-1"
                          )}
                          style={{ 
                            height: `${Math.max(2, Math.sin(i / 2) * 8)}px`,
                            animationDelay: `${i * 0.05}s`
                          }}
                        ></div>
                      ))}
                    </div>
                    
                    <audio 
                      ref={el => audioRefs.current[index] = el}
                      src={sample.file}
                      onEnded={() => setActiveAudioIndex(null)}
                      preload="metadata"
                      className="hidden"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                ref={(el) => (elementsRef.current[4 + index] = el)} 
                className={cn(
                  "reveal-on-scroll glass-card p-5 shadow-md hover:shadow-lg transition-all duration-300",
                  "hover:bg-rose-50/50 group"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-rose-100 mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2 group-hover:text-rose-600 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                
                {/* Animated music notes on hover (only when reduced motion is off) */}
                {!hasReducedMotion && (
                  <div className="relative h-6 mt-2">
                    <div className="absolute right-0 -top-2 opacity-0 group-hover:opacity-100 transition-opacity text-rose-300 text-sm">
                      <span className="inline-block animate-float animation-delay-100">♪</span>
                      <span className="inline-block animate-float animation-delay-300">♩</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
