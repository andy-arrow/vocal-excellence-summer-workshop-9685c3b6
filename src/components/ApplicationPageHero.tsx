
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
          ? "pt-20 pb-12" 
          : "pt-24 pb-20", 
        "bg-white"
      )}
    >
      <div className="relative z-20 text-center px-4 transition-all duration-500 ease-out max-w-5xl mx-auto">
        <motion.div 
          className="space-y-4 md:space-y-6" 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="space-y-2"
          >
            <p className="text-lg md:text-xl text-apple-grey font-medium tracking-wider uppercase">
              SUMMER INTENSIVE 2026
            </p>
            <h1 className="font-serif text-3xl sm:text-3xl md:text-4xl lg:text-6xl font-light text-apple-text tracking-tight">
              Apply for Your Place at{' '}
              <span className="text-apple-blue">Vocal Excellence</span>
            </h1>
          </motion.div>
          
          <motion.p 
            className="font-sans text-sm sm:text-base md:text-lg lg:text-xl text-apple-grey max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            Join a select cohort of artists for 7 transformative days in Limassol. World-class mentorship awaits.
          </motion.p>

          <motion.div 
            className="inline-flex items-center gap-2 text-apple-text/80 text-sm font-medium mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <Calendar className="w-4 h-4 text-apple-blue" />
            <span>June 29 – July 5 | Limassol, Cyprus</span>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-xs md:text-xs font-medium text-apple-grey/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <span className="flex items-center"><span className="w-1.5 h-1.5 bg-apple-blue rounded-full mr-2"></span>Masterclasses</span>
            <span className="flex items-center"><span className="w-1.5 h-1.5 bg-apple-blue rounded-full mr-2"></span>Private Coaching</span>
            <span className="flex items-center"><span className="w-1.5 h-1.5 bg-apple-blue rounded-full mr-2"></span>Audition Prep</span>
            <span className="flex items-center"><span className="w-1.5 h-1.5 bg-apple-blue rounded-full mr-2"></span>4K Portfolio Material</span>
          </motion.div>

          <motion.div 
            className="pt-4 md:pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <motion.div 
              className="flex items-center justify-center mt-4 sm:mt-6 md:mt-8 space-x-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-apple-blue animate-pulse-slow"></div>
              <p className="text-apple-grey text-xs font-light">
                Limited Places Available
              </p>
              <div className="w-1.5 h-1.5 rounded-full bg-apple-blue animate-pulse-slow"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ApplicationPageHero;
