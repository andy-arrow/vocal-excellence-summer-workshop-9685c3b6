
import React from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { Calendar, MapPin, Users } from 'lucide-react';

const TuitionHero = React.memo(() => {
  const animationConfig = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

  const isMobile = useIsMobile();
  
  return (
    <section className={`${isMobile ? 'pt-32 pb-16' : 'pt-40 pb-24'} px-4 bg-white relative z-10`}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          {...animationConfig}
          className="space-y-8 md:space-y-10"
        >
          <div className="space-y-4">
            <h1 className="font-serif text-5xl md:text-7xl font-light text-[#141414] tracking-tight leading-tight">
              Vocal Excellence
            </h1>
            
            <p className="font-serif text-xl md:text-2xl text-[#4f6e72] font-light">
              Summer 2026 Program
            </p>
          </div>
          
          <div className="space-y-3 text-[#666666] text-lg font-light">
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5 text-[#4f6e72]" />
              <span>June 29 – July 5, 2026</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5 text-[#4f6e72]" />
              <span>Limassol, Cyprus</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Users className="w-5 h-5 text-[#4f6e72]" />
              <span>Elite Small Group: 20 Students</span>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <p className="text-xl md:text-2xl text-[#333333] font-serif font-light leading-relaxed">
              7 Intensive Days to Unlock Your Full Vocal Potential
            </p>
          </div>

          <motion.div 
            {...animationConfig}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-[#f8f9fa] rounded-2xl p-10 md:p-12 max-w-3xl mx-auto"
          >
            <p className="text-base text-[#4f6e72] font-light mb-3 uppercase tracking-wide">
              All-Inclusive Tuition
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-[#4f6e72] mb-4">
              €749
            </h2>
            <p className="text-lg text-[#4f6e72] font-light mb-3">
              (Approx. €107/day)
            </p>
            <p className="text-[#666666] font-light text-base max-w-lg mx-auto">
              Includes all masterclasses, private coaching, 4K portfolio materials, and daily catering
            </p>
          </motion.div>

          <motion.div 
            {...animationConfig}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center max-w-xl mx-auto pt-4"
          >
            <p className="font-medium text-lg text-[#4f6e72] mb-1">Application Deadline: May 24</p>
            <p className="text-[#888888] font-light text-base">Final call: Registration closes in 7 days</p>
          </motion.div>
          
          <div className="pt-6">
            <div className="h-px w-24 bg-[#e0e0e0] mx-auto" />
          </div>
        </motion.div>
      </div>
    </section>
  );
});

TuitionHero.displayName = 'TuitionHero';

export default TuitionHero;
