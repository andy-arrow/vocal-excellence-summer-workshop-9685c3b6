
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const ApplicationPageHero = () => {
  const isMobile = useIsMobile();
  
  return (
    <section 
      className={cn(
        "relative overflow-visible",
        isMobile 
          ? "pt-28 pb-10" 
          : "pt-36 pb-16", 
        "bg-white"
      )}
    >
      <div className="relative z-20 text-center px-4 md:px-6 max-w-5xl mx-auto">
        <motion.div 
          className="space-y-4 md:space-y-5" 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-2">
            <p className="text-base md:text-lg text-[#666666] font-medium tracking-wider uppercase">
              SUMMER INTENSIVE 2026
            </p>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-[#1d1d1f] tracking-tight">
              Apply for Your Place at{' '}
              <span className="text-apple-blue">Vocal Excellence</span>
            </h1>
          </div>
          
          <p className="font-sans text-base md:text-lg text-[#666666] max-w-2xl mx-auto leading-relaxed">
            Join a select cohort of artists for 7 transformative days in Limassol. World-class mentorship awaits.
          </p>

          <div className="inline-flex items-center gap-2 text-[#1d1d1f] text-sm font-medium mx-auto">
            <Calendar className="w-4 h-4 text-apple-blue flex-shrink-0" />
            <span>June 29 – July 5 | Limassol, Cyprus</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs md:text-sm font-medium text-[#666666]">
            <span className="flex items-center"><span className="w-1.5 h-1.5 bg-apple-blue rounded-full mr-2"></span>Masterclasses</span>
            <span className="flex items-center"><span className="w-1.5 h-1.5 bg-apple-blue rounded-full mr-2"></span>Private Coaching</span>
            <span className="flex items-center"><span className="w-1.5 h-1.5 bg-apple-blue rounded-full mr-2"></span>Audition Prep</span>
            <span className="flex items-center"><span className="w-1.5 h-1.5 bg-apple-blue rounded-full mr-2"></span>4K Portfolio Material</span>
          </div>

          <div className="pt-3 md:pt-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-apple-blue animate-pulse"></div>
              <p className="text-[#888888] text-xs font-light">
                Limited Places Available
              </p>
              <div className="w-1.5 h-1.5 rounded-full bg-apple-blue animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ApplicationPageHero;
