
import React from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { Calendar } from 'lucide-react';

const TuitionHero = React.memo(() => {
  // Optimized animation configuration
  const animationConfig = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  };

  const isMobile = useIsMobile();
  
  return (
    <section className={`${isMobile ? 'pt-32 mt-24 pb-10' : 'pt-64 pb-20'} px-4 bg-gradient-to-b from-white to-[#fafafa] relative z-10`}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          {...animationConfig}
          className="space-y-4 md:space-y-5"
        >
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-[#141414] tracking-tight leading-tight">
            Tuition & Financial Information
          </h1>
          
          <p className="text-base md:text-xl text-[#141414]/70 max-w-2xl mx-auto font-sans">
            Join our transformative program with options designed to support your musical journey
          </p>
          
          {/* Program dates with location - improved visibility for mobile */}
          <div className="inline-flex items-center gap-2 text-[#141414]/60 text-sm font-medium mx-auto">
            <Calendar className="w-4 h-4 text-[#4f6e72]" />
            <span>14-18 July | Limassol, Cyprus</span>
          </div>
          
          <div className="pt-3 md:pt-3">
            <motion.div 
              className="h-1 w-16 bg-gradient-to-r from-[#4f6e72] to-[#6a8d91] rounded-full mx-auto"
              initial={{ width: 0 }}
              animate={{ width: isMobile ? 64 : 64 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
});

TuitionHero.displayName = 'TuitionHero';

export default TuitionHero;
