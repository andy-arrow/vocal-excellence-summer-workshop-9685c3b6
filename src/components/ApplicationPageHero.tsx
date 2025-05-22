
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { format } from 'date-fns';
import { APPLICATION_DATES } from '@/constants/applicationDates';
import { useIsMobile } from '@/hooks/use-mobile';
import SpotsRemainingIndicator from './SpotsRemainingIndicator';

const ApplicationPageHero = () => {
  const today = new Date();
  const applicationsClosed = today > APPLICATION_DATES.DEADLINE;
  const isMobile = useIsMobile();
  
  const scrollToForm = () => {
    const formElement = document.getElementById('application-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-white to-[#f5f5f7] py-12 sm:py-16 md:py-20 overflow-hidden border-b border-apple-border/10">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block text-apple-grey text-xs sm:text-sm tracking-wide uppercase mb-2 sm:mb-3 font-medium">
            Summer Workshop 2025
          </span>
          
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-apple-text">
            Your Application to<br />
            <span className="text-apple-blue">
              Vocal Excellence
            </span>
          </h1>
          
          <motion.p 
            className="text-base md:text-xl text-apple-grey max-w-2xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Join our exclusive 5-day Workshop where world-class mentors will transform your voice and elevate your technique to new heights.
          </motion.p>
          
          <motion.div 
            className="flex flex-col items-center gap-5 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            {!applicationsClosed ? (
              <motion.button
                onClick={scrollToForm}
                className="px-8 py-4 rounded-full bg-apple-blue text-white hover:bg-apple-blue-hover transition-all duration-300 font-medium text-lg shadow-sm w-full sm:w-auto"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center gap-2">
                  Begin Your Application
                  <ArrowDown className="h-5 w-5" />
                </span>
              </motion.button>
            ) : (
              <div className="px-8 py-4 rounded-full bg-gray-400 text-white font-medium text-lg shadow-sm w-full sm:w-auto">
                <span className="flex items-center gap-2">
                  Applications Closed
                </span>
              </div>
            )}
            
            <div className="text-sm">
              {!applicationsClosed && <SpotsRemainingIndicator className="mb-1 justify-center" />}
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="inline-block px-3 py-1 bg-apple-light backdrop-blur border border-apple-grey/20 rounded-full text-xs font-medium text-apple-grey">
                  Limited Capacity
                </span>
                <span className="text-apple-grey">
                  {applicationsClosed 
                    ? `Applications for ${format(APPLICATION_DATES.PROGRAM_START, 'yyyy')} are now closed`
                    : `Only 20 spots available for Summer ${format(APPLICATION_DATES.PROGRAM_START, 'yyyy')}`
                  }
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ApplicationPageHero;
