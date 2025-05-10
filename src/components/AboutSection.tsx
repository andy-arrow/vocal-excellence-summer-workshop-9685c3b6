
import React, { useEffect, useRef, useState } from 'react';
import { Star, Mic, Video, UserCheck, Stethoscope, CheckCircle, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { FeatureCard } from '@/components/ui/feature-card';

const features = [
  {
    icon: <UserCheck className="w-5 h-5 text-apple-blue" />,
    title: "Personalized Coaching",
    description: "Private lessons tailored to your goals, with professional accompanists for your repertoire."
  }, 
  {
    icon: <Video className="w-5 h-5 text-apple-blue" />,
    title: "Professional Recording",
    description: "Take home professionally recorded footage of your mock auditions—a valuable portfolio asset."
  }, 
  {
    icon: <Mic className="w-5 h-5 text-apple-blue" />,
    title: "Performance Mastery",
    description: "Transform your stage presence through Alexander Technique and performance coaching."
  }, 
  {
    icon: <Stethoscope className="w-5 h-5 text-apple-blue" />,
    title: "Expert Health Focus",
    description: "Learn from physicians specializing in vocal health to keep your instrument in peak condition."
  }
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const [hasReducedMotion, setHasReducedMotion] = useState(false);
  
  useEffect(() => {
    const savedPreference = localStorage.getItem('reduced-motion') === 'true';
    setHasReducedMotion(savedPreference);
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, {
      threshold: 0.1
    });
    
    const currentElements = elementsRef.current.filter(Boolean) as HTMLElement[];
    currentElements.forEach(el => observer.observe(el));
    
    return () => {
      currentElements.forEach(el => observer.unobserve(el));
    };
  }, []);
  
  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 bg-gradient-to-b from-[#fbfbfd] to-[#f5f5f7] overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-16"
        >
          <div className="inline-flex items-center justify-center mb-3">
            <div className="w-8 h-0.5 bg-apple-blue opacity-30"></div>
            <span className="mx-2 text-apple-blue font-medium text-sm tracking-wide">WHY CHOOSE US</span>
            <div className="w-8 h-0.5 bg-apple-blue opacity-30"></div>
          </div>
          
          <h2 className="text-[40px] md:text-[48px] font-medium text-apple-text mb-6 tracking-tight leading-tight">
            Your Voice, Your Future
          </h2>
          
          <p className="max-w-2xl text-[21px] leading-relaxed font-light text-apple-text">
            Work with world-class teachers who understand your artistic journey—from technique to presence, confidence, and career goals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:col-span-5 space-y-8"
          >
            <div className="relative p-8 bg-white shadow-lg rounded-2xl border border-[#d2d2d7]/40">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-apple-blue to-[#06c] rounded-t-2xl"></div>
              
              <div className="prose prose-apple max-w-none space-y-6">
                <div className="space-y-4 mb-6">
                  {[
                    "Private lessons tailored to specific goals",
                    "Expert-led vocal health seminars",
                    "Alexander Technique workshops",
                    "Professional recordings of performances"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-apple-blue mt-0.5 flex-shrink-0" />
                      <p className="text-[17px] leading-tight text-apple-text m-0">{item}</p>
                    </div>
                  ))}
                </div>
                
                <div className="relative">
                  <div className="absolute -left-3 -top-1 text-[60px] text-apple-blue/20 font-serif">
                    <Quote className="w-10 h-10" />
                  </div>
                  <blockquote className="pl-8 py-4 border-l-0 italic text-[22px] text-apple-text font-light leading-tight">
                    The best musicians know something others don't: 
                    <span className="block mt-1 font-medium text-apple-blue">success happens through connections.</span>
                  </blockquote>
                </div>
              </div>
              
              <div className="mt-8 flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <a 
                    href="/apply" 
                    className="inline-flex items-center gap-2 px-8 py-4 bg-apple-blue text-white rounded-full text-[17px] font-medium 
                              transition-all duration-300 hover:bg-apple-blue-hover hover:shadow-lg"
                  >
                    Apply Now
                    <span className="text-white">→</span>
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 3) }}
                viewport={{ once: true }}
              >
                <Card className="h-full overflow-hidden border-[#d2d2d7]/40 bg-white/70 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-[#f5f5f7] flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-[20px] font-semibold mb-3 text-apple-text">
                      {feature.title}
                    </h3>
                    <p className="text-[16px] leading-relaxed text-apple-grey">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
              className="sm:col-span-2"
            >
              <Card className="border-[#d2d2d7]/40 bg-gradient-to-br from-[#f5f5f7] to-white overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-apple-blue to-[#06c] flex items-center justify-center text-white">
                        <Star className="w-8 h-8" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-[24px] font-semibold text-apple-text mb-2">Isn't it time your voice got the platform it deserves?</h3>
                      <p className="text-[17px] leading-relaxed text-apple-grey mb-0">
                        Connect with industry professionals who are active in the spaces you want to enter.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
