
import React, { useEffect, useRef, useState } from 'react';
import { Music, Mic, Users, Award, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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

const MotionDiv = motion.div;

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
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
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-28 noise-bg bg-gradient-to-b from-white to-primary/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center bg-primary/10 text-primary rounded-full py-1.5 px-3.5 text-sm font-medium mb-4">
            <Star className="mr-1.5 w-4 h-4 text-energy-yellow" />
            About The Programme
          </span>
          <h2 
            ref={(el) => (elementsRef.current[0] = el)} 
            className="section-title reveal-on-scroll text-center block relative font-outfit text-4xl md:text-5xl mb-4 tracking-tight"
          >
            Break the Rules, <br className="md:hidden" />
            <span className="gradient-text">Find Your Sound</span>
          </h2>
          <div className="decorative-line mx-auto"></div>
          <p 
            ref={(el) => (elementsRef.current[1] = el)} 
            className="section-subtitle reveal-on-scroll max-w-3xl mx-auto"
          >
            A high-energy vocal experience designed for your creative expression
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 md:gap-16 items-start">
          <div 
            ref={(el) => (elementsRef.current[2] = el)} 
            className="reveal-on-scroll md:col-span-2 space-y-8"
          >
            <div className="focus-section space-y-5">
              <h3 className="text-2xl font-bold text-primary font-outfit tracking-tight">Unlock Your Authentic Voice</h3>
              <p className="text-foreground/80 leading-relaxed">
                <span className="font-semibold text-secondary">Vocal Excellence Summer Workshop</span> isn't your typical boring workshop. 
                It's an <span className="font-semibold text-primary">energy-packed</span> five-day vocal transformation where you'll:
              </p>
              <ul className="space-y-3 pt-1">
                {[
                  "Find your unique vocal style",
                  "Master techniques that enhance your natural abilities",
                  "Connect with coaches who understand your creative vision",
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
              
              <div className="rounded-xl overflow-hidden relative h-6 mt-2">
                <div className="progress-bar"></div>
              </div>
            </div>
            
            <blockquote className="decorative-quote pl-6 border-l-2 border-secondary/50 my-8">
              "Your voice is your superpower. Your creativity is your edge. Together, they're unstoppable."
            </blockquote>
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
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors font-outfit tracking-tight">{feature.title}</h3>
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
                className="focus-section p-6 md:p-8 bg-gradient-to-br from-white/90 to-primary/5 rounded-xl border border-primary/10 shadow-md"
              >
                <div className="flex items-center mb-5">
                  <span className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
                    <Sparkles className="w-5 h-5" />
                  </span>
                  <h3 className="text-xl font-bold ml-3 font-outfit tracking-tight">Ready to find your voice?</h3>
                </div>
                
                <p className="text-foreground/80 mb-6 leading-relaxed">
                  Our coaches understand that traditional voice lessons can feel constraining. 
                  We've designed this program specifically for young artists who crave movement,
                  variation, and quick results.
                </p>
                
                <Link to="/apply">
                  <Button className="bg-primary hover:bg-primary/80 text-white rounded-xl shadow-md shadow-primary/10 hover:shadow-primary/20 transition-all">
                    Apply Now <Sparkles className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </MotionDiv>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
