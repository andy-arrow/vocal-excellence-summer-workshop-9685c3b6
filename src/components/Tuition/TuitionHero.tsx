
import React from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { Calendar, MapPin, Users } from 'lucide-react';

const TuitionHero = React.memo(() => {
  // Optimized animation configuration
  const animationConfig = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

  const isMobile = useIsMobile();
  
  return (
    <section className={`${isMobile ? 'pt-4 pb-16' : 'pt-8 pb-24'} px-4 bg-white relative z-10`}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          {...animationConfig}
          className="space-y-8 md:space-y-12"
        >
          <div className="space-y-6 pt-8">
            <h1 className="font-serif text-5xl md:text-7xl font-light text-[#141414] tracking-tight leading-tight">
              Vocal Excellence
            </h1>
            
            <p className="font-serif text-xl md:text-2xl text-[#4f6e72] font-light">
              Summer 2025 Program
            </p>
          </div>
          
          {/* Simple program details */}
          <div className="space-y-4 text-[#141414]/70 text-lg font-light">
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5 text-[#4f6e72]" />
              <span>July 14-18, 2025</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5 text-[#4f6e72]" />
              <span>Limassol, Cyprus</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Users className="w-5 h-5 text-[#4f6e72]" />
              <span>Only 20 Spots</span>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <p className="text-xl md:text-2xl text-[#141414]/80 font-serif font-light leading-relaxed">
              Five incredible days that will transform your voice
            </p>
          </div>

          {/* Simple cost highlight */}
          <motion.div 
            {...animationConfig}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-[#fafafa] rounded-3xl p-12 max-w-3xl mx-auto mt-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-light text-[#4f6e72] mb-6">
              €749
            </h2>
            <p className="text-xl text-[#4f6e72]/90 font-light mb-4">
              Everything included • About €150 per day
            </p>
            <p className="text-[#141414]/70 font-light text-lg max-w-lg mx-auto">
              All lessons, materials, recordings, and daily lunch
            </p>
          </motion.div>

          {/* Simple urgency */}
          <motion.div 
            {...animationConfig}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center max-w-xl mx-auto"
          >
            <p className="font-light text-xl text-[#4f6e72] mb-2">Apply by June 7</p>
            <p className="text-[#141414]/60 font-light">Only 7 days left</p>
          </motion.div>
          
          <div className="pt-8">
            <motion.div 
              className="h-px w-24 bg-[#4f6e72]/30 mx-auto"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
});

TuitionHero.displayName = 'TuitionHero';

export default TuitionHero;
