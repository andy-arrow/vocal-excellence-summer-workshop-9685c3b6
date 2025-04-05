
import React, { useEffect, useRef, useState } from 'react';
import { Music, Mic, Users, Award, Play, Pause, Volume2, Sparkles, Star, MoveHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Mic className="w-5 h-5 text-energy-pink" />,
    title: "Level Up Your Voice",
    description: "Train with international vocal coaches who'll help you discover your unique sound and push your technical limits."
  },
  {
    icon: <Music className="w-5 h-5 text-energy-purple" />,
    title: "Perform With Fire",
    description: "Develop your stage presence through energetic masterclasses and show off your skills in our showcase events."
  },
  {
    icon: <Users className="w-5 h-5 text-energy-cyan" />,
    title: "Find Your Crew",
    description: "Connect with other passionate singers who share your energy and create music collaborations that will last."
  },
  {
    icon: <Award className="w-5 h-5 text-energy-yellow" />,
    title: "Launch Your Sound",
    description: "Get insider tips on breaking into the music industry and building your social media presence as an artist."
  }
];

const audioSamples = [
  {
    title: "Vocal Warm-Up",
    description: "Quick 5-minute energy boost for your voice",
    file: "/lovable-uploads/vocal-warmup-sample.mp3",
  },
  {
    title: "Master Class Clip",
    description: "Hear a coach fixing breath support issues instantly",
    file: "/lovable-uploads/masterclass-highlight.mp3",
  }
];

const MotionDiv = motion.div;

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
    <section id="about" ref={sectionRef} className="py-24 noise-bg bg-gradient-to-b from-white to-primary/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center bg-primary/10 text-primary rounded-full py-1 px-3 text-sm font-medium mb-4">
            <Star className="mr-1 w-4 h-4 text-energy-yellow" />
            About The Program
          </span>
          <h2 
            ref={(el) => (elementsRef.current[0] = el)} 
            className="section-title reveal-on-scroll text-center block relative"
          >
            Break the Rules, <br className="md:hidden" />
            <span className="gradient-text">Find Your Sound</span>
          </h2>
          <div className="decorative-line mx-auto"></div>
          <p 
            ref={(el) => (elementsRef.current[1] = el)} 
            className="section-subtitle reveal-on-scroll"
          >
            A high-energy vocal experience designed for your hyperactive creativity
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 md:gap-16 items-start">
          <div 
            ref={(el) => (elementsRef.current[2] = el)} 
            className="reveal-on-scroll md:col-span-2 space-y-8"
          >
            <div className="focus-section space-y-4">
              <h3 className="text-2xl font-bold text-primary">Unlock Your Authentic Voice</h3>
              <p className="text-foreground/80 leading-relaxed">
                <span className="font-semibold text-secondary">VocalCrush</span> isn't your typical boring workshop. 
                It's an <span className="font-semibold text-primary">energy-packed</span> five-day vocal transformation where you'll:
              </p>
              <ul className="space-y-2">
                {[
                  "Find your unique vocal style",
                  "Master techniques that work with your ADHD, not against it",
                  "Connect with coaches who understand your creative energy",
                  "Perform on stage in our final showcase"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center mt-1 mr-3">
                      <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="rounded-xl overflow-hidden relative h-6">
                <div className="progress-bar"></div>
              </div>
            </div>
            
            <blockquote className="decorative-quote pl-6 border-l-2 border-secondary/50 my-8">
              "Your voice is your superpower. Your ADHD is your creative edge. Together, they're unstoppable."
            </blockquote>
            
            {/* Audio Sample Players */}
            <div className="space-y-4 mt-8">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-primary flex items-center">
                  <Volume2 className="mr-2 w-4 h-4" /> Hear Our Energy
                </h4>
                <span className="text-xs text-primary/60 flex items-center">
                  <MoveHorizontal className="mr-1 w-3 h-3" /> Swipe to explore
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-x-auto pb-3 no-scrollbar">
                {audioSamples.map((sample, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "vibrant-card p-4 cursor-pointer transition-all duration-300 group",
                      "hover:shadow-xl min-w-[250px]"
                    )}
                    onClick={() => toggleAudioPlay(index)}
                  >
                    <div className="flex items-center mb-3">
                      <div 
                        className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center mr-3",
                          activeAudioIndex === index && !audioRefs.current[index]?.paused
                            ? "bg-secondary/20 text-secondary"
                            : "bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors"
                        )}
                      >
                        {activeAudioIndex === index && !audioRefs.current[index]?.paused 
                          ? <Pause size={20} /> 
                          : <Play size={20} />
                        }
                      </div>
                      <div>
                        <h5 className="text-sm font-bold">{sample.title}</h5>
                        <p className="text-xs text-foreground/60">{sample.description}</p>
                      </div>
                    </div>
                    
                    {/* Audio wave visualization */}
                    <div className={cn(
                      "h-3 flex items-end space-x-0.5 mt-4",
                      hasReducedMotion ? "opacity-50" : ""
                    )}>
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div 
                          key={i}
                          className={cn(
                            "w-1 rounded-full",
                            activeAudioIndex === index && !audioRefs.current[index]?.paused && !hasReducedMotion
                              ? "bg-secondary animate-soundwave"
                              : "bg-primary/30 group-hover:bg-primary/40 h-1"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-3">
            {features.map((feature, index) => (
              <MotionDiv 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={cn(
                  "vibrant-card p-6 shadow-md hover:shadow-lg transition-all duration-300",
                  "group cursor-pointer"
                )}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{feature.description}</p>
                
                {/* Animated music notes on hover (only when reduced motion is off) */}
                {!hasReducedMotion && (
                  <div className="relative h-6 mt-2">
                    <div className="absolute right-0 -top-2 opacity-0 group-hover:opacity-100 transition-opacity text-secondary text-sm">
                      <span className="inline-block animate-float animation-delay-100">♪</span>
                      <span className="inline-block animate-float animation-delay-300">♩</span>
                    </div>
                  </div>
                )}
              </MotionDiv>
            ))}
            
            <div className="md:col-span-2">
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="focus-section"
              >
                <div className="flex items-center mb-4">
                  <span className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
                    <Sparkles className="w-5 h-5" />
                  </span>
                  <h3 className="text-xl font-bold ml-3">Ready to crush it?</h3>
                </div>
                
                <p className="text-foreground/80 mb-6">
                  Our coaches get it - traditional voice lessons can feel boring and constraining. 
                  We've designed this program specifically for active minds that crave movement,
                  variation and quick results.
                </p>
                
                <Button className="bg-primary hover:bg-primary/80 text-white rounded-xl">
                  Apply Now <Sparkles className="ml-2 w-4 h-4" />
                </Button>
              </MotionDiv>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
