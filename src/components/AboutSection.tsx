import React, { useEffect, useRef, useState } from 'react';
import { Music, Mic, Users, Award, ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

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

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const [hasReducedMotion, setHasReducedMotion] = useState(false);

  useEffect(() => {
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
    <section 
      id="about" 
      ref={sectionRef} 
      className="py-24 md:py-28 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="inline-flex items-center bg-primary/10 text-primary rounded-full py-1.5 px-3.5 text-sm font-medium mb-4">
            <Star className="mr-1.5 w-4 h-4 text-energy-yellow" />
            About The Programme
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
            Break the Rules, <br className="md:hidden" />
            Find Your Sound
          </h2>
          <div className="w-16 h-0.5 bg-energy-pink"></div>
          <p className="text-lg text-slate-700 max-w-2xl mt-6 leading-relaxed">
            A high-energy vocal experience designed for your creative expression
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 md:gap-16 items-start">
          <div className="md:col-span-2 space-y-8">
            <div className="focus-section space-y-5">
              <h3 className="text-2xl font-bold text-slate-900 font-outfit tracking-tight">Unlock Your Authentic Voice</h3>
              <p className="text-slate-700 leading-relaxed">
                <span className="font-semibold text-energy-purple">Vocal Excellence Summer Workshop</span> isn't your typical boring workshop. 
                It's an <span className="font-semibold text-energy-pink">energy-packed</span> five-day vocal transformation where you'll:
              </p>
              <ul className="space-y-3.5 pt-1">
                {[
                  "Find your unique vocal style",
                  "Master techniques that enhance your natural abilities",
                  "Connect with coaches who understand your creative vision",
                  "Perform on stage in our final showcase"
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-energy-purple/30 to-energy-pink/30 flex items-center justify-center mt-1 mr-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-energy-pink"></span>
                    </span>
                    <span className="text-slate-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
              
              <div className="rounded-xl overflow-hidden relative h-1 mt-6">
                <div className="w-full h-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-energy-purple to-energy-pink rounded-full"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "85%" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>
            </div>
            
            <blockquote className="pl-6 border-l-2 border-energy-pink/50 my-8 italic text-2xl text-slate-700 font-light leading-relaxed">
              "Your voice is your superpower. Your creativity is your edge. Together, they're unstoppable."
            </blockquote>
            
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-lg mb-2 text-slate-900">Next Application Deadline</h4>
              <div className="flex justify-between items-center">
                <p className="text-slate-700">May 15, 2025</p>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-6 rounded-full bg-energy-purple animate-pulse-slow"></div>
                  <div className="w-1.5 h-3 rounded-full bg-energy-pink animate-pulse-slow animation-delay-300"></div>
                  <div className="w-1.5 h-5 rounded-full bg-energy-cyan animate-pulse-slow animation-delay-500"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={cn(
                  "bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300",
                  "group cursor-pointer"
                )}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 group-hover:text-energy-purple transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-700 leading-relaxed">{feature.description}</p>
                
                {!hasReducedMotion && (
                  <div className="relative h-6 mt-2">
                    <div className="absolute right-0 -top-2 opacity-0 group-hover:opacity-100 transition-opacity text-energy-purple text-sm">
                      <span className="inline-block animate-float animation-delay-100">♪</span>
                      <span className="inline-block animate-float animation-delay-300">♩</span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="p-8 bg-slate-50 rounded-xl border border-slate-200 shadow-sm"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-energy-purple to-energy-pink flex items-center justify-center text-white shadow-lg">
                      <Star className="w-8 h-8" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Ready to find your voice?</h3>
                    <p className="text-slate-700 mb-6 leading-relaxed">
                      Our coaches understand that traditional voice lessons can feel constraining. 
                      We've designed this program specifically for young artists who crave movement,
                      variation, and quick results.
                    </p>
                    
                    <Link to="/apply">
                      <Button className="bg-gradient-to-r from-energy-purple to-energy-pink hover:from-energy-purple/90 hover:to-energy-pink/90 text-white rounded-xl shadow-md shadow-energy-purple/20 hover:shadow-xl hover:shadow-energy-purple/30 transition-all flex items-center gap-2 px-6 py-5">
                        Apply Now <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
