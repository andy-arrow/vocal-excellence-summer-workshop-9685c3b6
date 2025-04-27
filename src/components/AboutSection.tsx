import React, { useEffect, useRef, useState } from 'react';
import { Star, Mic, Video, UserCheck, Stethoscope } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
const features = [{
  icon: <UserCheck className="w-5 h-5 text-energy-purple" />,
  title: "Personalized Coaching",
  description: "45-minute private lessons tailored to your goals, plus 30-minute sessions with professional accompanists for your repertoire."
}, {
  icon: <Video className="w-5 h-5 text-energy-pink" />,
  title: "Professional Recording",
  description: "Take home professionally recorded footage of your mock auditions—a valuable asset for your career portfolio."
}, {
  icon: <Mic className="w-5 h-5 text-energy-cyan" />,
  title: "Performance Mastery",
  description: "Transform your stage presence through Alexander Technique workshops and targeted performance coaching."
}, {
  icon: <Stethoscope className="w-5 h-5 text-energy-yellow" />,
  title: "Expert Health Focus",
  description: "Learn from physicians specializing in vocal health, ensuring your instrument stays in peak condition."
}];
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
  return <section id="about" ref={sectionRef} className="py-24 md:py-32 bg-[#fbfbfd] overflow-hidden">
      <div className="max-w-[980px] mx-auto px-6 md:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-[40px] md:text-[48px] font-medium text-apple-text mb-4 tracking-tight leading-tight">
            Your Voice, Your Future: <br />
            Why This Workshop Changes Everything
          </h2>
          <div className="w-16 h-0.5 bg-apple-blue mb-6 opacity-30"></div>
        </div>

        <div className="grid md:grid-cols-5 gap-12 md:gap-16 items-start">
          <div className="md:col-span-2 space-y-8">
            <div className="prose prose-apple max-w-none space-y-6">
              <p className="text-[21px] leading-[1.381] font-light text-apple-text">Picture this: You're working with world-class teachers who actually understand where you want to go. Not just vocal technique, but the whole artist—your presence, your confidence, your career.</p>
              <p className="text-[21px] font-medium text-apple-blue">That's exactly what our Workshop delivers.</p>
              <div className="space-y-6">
                <p className="text-[19px] leading-[1.4211] text-apple-text font-light">What makes us different? We believe preparation meets opportunity. Every participant receives a 45-minute private lesson tailored just for you. You'll also work directly with an accompanist for 30 minutes on your repertoire. Our Alexander Technique workshops transform how you physically approach performance.</p>
                <p className="text-[19px] leading-[1.4211] text-apple-text font-light">Stage Fright? We address that head-on. Concerned about vocal health? An actual physician leads our vocal health seminar.</p>
                <p className="text-[19px] leading-[1.4211] text-apple-text font-light">
                  The highlight? Those mock auditions aren't just practice—they're professionally recorded. Think about that: performance-ready footage you'll own forever. That's not just a workshop benefit; that's a career asset.
                </p>
              </div>
              
              <blockquote className="pl-6 border-l-2 border-apple-blue/30 my-8 italic text-[32px] text-apple-text font-light leading-[1.125]">
                "The best musicians know something others don't: success happens through connections."
              </blockquote>
              
              <p className="text-[19px] leading-[1.4211] text-apple-text font-light">Our industry professionals aren't just academics —they're actively working in the spaces you want to enter.</p>
              <p className="text-[21px] font-medium text-apple-blue">This isn't just training; it's a transformation.</p>
              <p className="text-[32px] font-light text-apple-text mt-8 leading-[1.125]">
                Isn't it time your voice got the platform it deserves?
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-3">
            {features.map((feature, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: index * 0.1
          }} viewport={{
            once: true
          }} className={cn("bg-white/60 backdrop-blur-sm p-6 rounded-2xl", "border border-[#d2d2d7]", "transition-all duration-300", "hover:bg-white", "group cursor-pointer")}>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#f5f5f7] mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-[21px] font-semibold mb-2 text-apple-text group-hover:text-apple-blue transition-colors">
                  {feature.title}
                </h3>
                <p className="text-[17px] leading-[1.4706] text-apple-grey">{feature.description}</p>
                
                {!hasReducedMotion && <div className="relative h-6 mt-2">
                    <div className="absolute right-0 -top-2 opacity-0 group-hover:opacity-100 transition-opacity text-apple-blue text-sm">
                      <span className="inline-block animate-float animation-delay-100">♪</span>
                      <span className="inline-block animate-float animation-delay-300">♩</span>
                    </div>
                  </div>}
              </motion.div>)}

            <div className="md:col-span-2">
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.5,
              delay: 0.4
            }} viewport={{
              once: true
            }} className="p-8 bg-[#f5f5f7] rounded-2xl border border-[#d2d2d7] hover:bg-white transition-colors duration-300">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-apple-blue to-[#06c] flex items-center justify-center text-white">
                      <Star className="w-8 h-8" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-[24px] font-semibold text-apple-text mb-2">Ready to transform your voice?</h3>
                    <p className="text-[17px] leading-[1.4706] text-apple-grey mb-6">
                      Join a community of dedicated artists and take your first step towards vocal excellence. Limited spots available.
                    </p>
                    
                    <a href="/apply" className="inline-flex items-center gap-2 px-6 py-3 bg-apple-blue text-white rounded-full text-[17px] font-medium 
                               transition-all duration-300 hover:bg-apple-blue-hover">
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
    </section>;
};
export default AboutSection;