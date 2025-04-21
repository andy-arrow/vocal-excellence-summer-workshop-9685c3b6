import React, { useEffect, useRef, useState } from 'react';
import { Star, Mic, Video, UserCheck, Stethoscope } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: <UserCheck className="w-5 h-5 text-energy-purple" />,
    title: "Personalized Coaching",
    description: "45-minute private lessons tailored to your goals, plus 30-minute sessions with professional accompanists for your repertoire."
  },
  {
    icon: <Video className="w-5 h-5 text-energy-pink" />,
    title: "Professional Recording",
    description: "Take home professionally recorded footage of your mock auditions—a valuable asset for your career portfolio."
  },
  {
    icon: <Mic className="w-5 h-5 text-energy-cyan" />,
    title: "Performance Mastery",
    description: "Transform your stage presence through Alexander Technique workshops and targeted performance coaching."
  },
  {
    icon: <Stethoscope className="w-5 h-5 text-energy-yellow" />,
    title: "Expert Health Focus",
    description: "Learn from physicians specializing in vocal health, ensuring your instrument stays in peak condition."
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
          <h2 className="text-3xl md:text-4xl font-serif mb-4 text-gray-900">
            Your Voice, Your Future: <br />
            Why This Workshop Changes Everything
          </h2>
          <div className="w-16 h-0.5 bg-energy-pink mb-6"></div>
        </div>

        <div className="grid md:grid-cols-5 gap-8 md:gap-16 items-start">
          <div className="md:col-span-2 space-y-8">
            <div className="prose prose-slate max-w-none space-y-6">
              <p className="text-lg leading-relaxed text-gray-700">
                Picture this: You're working with world-class vocal teachers who actually understand where you want to go. Not just vocal technique, but the whole artist—your presence, your confidence, your career.
              </p>
              <p className="text-lg font-medium text-energy-purple">
                That's exactly what our Vocal Excellence Summer Workshop delivers.
              </p>
              <div className="space-y-4">
                <p className="text-gray-700">
                  What makes us different? We believe preparation meets opportunity. Every participant receives a 45-minute private lesson tailored just for you. You'll work directly with an accompanist for 30 minutes on your repertoire (yes, your actual audition pieces). Our Alexander Technique workshops transform how you physically approach performance.
                </p>
                <p className="text-gray-700">
                  Worried about stage fright? We address that head-on. Concerned about vocal health? An actual physician leads our vocal health seminar.
                </p>
                <p className="text-gray-700">
                  The highlight? Those mock auditions aren't just practice—they're professionally recorded. Think about that: performance-ready footage you'll own forever. That's not just a workshop benefit; that's a career asset.
                </p>
              </div>
              
              <blockquote className="pl-6 border-l-2 border-energy-pink/50 my-8 italic text-2xl text-gray-700 font-light leading-relaxed">
                "The best musicians know something others don't: success happens through connections."
              </blockquote>
              
              <p className="text-gray-700">
                Our industry professionals aren't just visitors—they're actively working in the spaces you want to enter.
              </p>
              <p className="text-xl font-medium text-energy-purple">
                This isn't just training; it's transformation.
              </p>
              <p className="text-2xl font-serif text-gray-900 mt-6">
                Isn't it time your voice got the platform it deserves?
              </p>
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
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Ready to transform your voice?</h3>
                    <p className="text-slate-700 mb-6">
                      Join a community of dedicated artists and take your first step towards vocal excellence. Limited spots available.
                    </p>
                    
                    <a href="/apply" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-energy-purple to-energy-pink text-white rounded-xl shadow-md shadow-energy-purple/20 hover:shadow-xl hover:shadow-energy-purple/30 transition-all">
                      Apply Now
                      <span className="text-white">→</span>
                    </a>
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
