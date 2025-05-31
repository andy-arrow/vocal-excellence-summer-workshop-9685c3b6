
import React from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { Calendar, MapPin, Users } from 'lucide-react';

const TuitionHero = React.memo(() => {
  // Optimized animation configuration
  const animationConfig = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  };

  const isMobile = useIsMobile();
  
  return (
    <section className={`${isMobile ? 'pt-20 pb-12' : 'pt-24 pb-20'} px-4 bg-white relative z-10`}>
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          {...animationConfig}
          className="space-y-6 md:space-y-8"
        >
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-[#141414] tracking-tight leading-tight">
            Vocal Excellence
          </h1>
          
          <p className="font-serif text-xl md:text-2xl text-[#4f6e72] font-light">
            Summer 2025 Vocal Training Program
          </p>
          
          {/* Program details */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 text-[#141414]/70 text-base font-medium">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#4f6e72]" />
              <span>July 14-18, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#4f6e72]" />
              <span>Limassol, Cyprus</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#4f6e72]" />
              <span>Only 20 Spots Available</span>
            </div>
          </div>

          <p className="text-lg md:text-xl text-[#141414]/80 max-w-3xl mx-auto font-sans leading-relaxed">
            Level up your voice with five incredible days of vocal training. This program mixes serious technique with real performance skills - perfect for singers who want to take their voice to the next level.
          </p>

          {/* Value proposition highlight */}
          <motion.div 
            {...animationConfig}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-gradient-to-br from-[#f7fafa] to-[#eef2f2] border border-[#4f6e72]/20 rounded-2xl p-8 md:p-10 mt-10 max-w-4xl mx-auto"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-light text-[#4f6e72] mb-4">
              Cost: €749 (Everything Included)
            </h2>
            <p className="text-xl text-[#4f6e72]/90 font-medium mb-3">
              That's about €150 per day for full-day intensive training
            </p>
            <p className="text-[#141414]/70 font-sans max-w-2xl mx-auto">
              This covers everything - all lessons, materials, professional video recordings, and daily lunch. Way better value than booking private lessons separately.
            </p>
          </motion.div>

          {/* Urgency notice */}
          <motion.div 
            {...animationConfig}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-[#4f6e72] text-white rounded-xl p-6 max-w-2xl mx-auto"
          >
            <p className="font-medium text-xl mb-2">Application Deadline: June 7, 2025</p>
            <p className="text-white/90 font-medium">Only 7 days left! Just 20 spots available.</p>
            <p className="text-sm text-white/80 mt-2">Don't miss out - spots are going fast and applications close soon.</p>
          </motion.div>
          
          <div className="pt-4 md:pt-6">
            <motion.div 
              className="h-1 w-20 bg-gradient-to-r from-[#4f6e72] to-[#6a8d91] rounded-full mx-auto"
              initial={{ width: 0 }}
              animate={{ width: isMobile ? 80 : 80 }}
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
