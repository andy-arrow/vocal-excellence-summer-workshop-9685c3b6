
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { APPLICATION_DATES } from '@/constants/applicationDates';
import { useIsMobile } from '@/hooks/use-mobile';
import SpotsRemainingIndicator from './SpotsRemainingIndicator';

const ApplicationHero = () => {
  const today = new Date();
  const applicationsClosed = today > APPLICATION_DATES.DEADLINE;
  const isMobile = useIsMobile();
  
  const scrollToForm = () => {
    const formElement = document.getElementById('application-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Even more dramatically increased padding for both mobile and desktop views
  const paddingClasses = isMobile 
    ? "pt-64 mt-24 pb-16" // Substantially increased from pt-48 for mobile
    : "pt-96 pb-20"; // Substantially increased from pt-80 for desktop

  return (
    <section className={`relative ${paddingClasses} overflow-hidden bg-apple-text`}>
      <div className="absolute inset-0 bg-gradient-to-b from-apple-text to-apple-text/90 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-white">
            Your Journey to<br />
            <span className="text-apple-blue">
              Vocal Mastery
            </span>
          </h1>
          
          <motion.p 
            className="text-base md:text-xl text-apple-grey max-w-2xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Join our exclusive 7-day Workshop where world-class mentors will transform your voice and elevate your technique to new heights.
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
                  <ArrowRight className="h-5 w-5" />
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
                <span className="inline-block px-3 py-1 bg-apple-text/60 backdrop-blur border border-apple-grey/20 rounded-full text-xs font-medium text-apple-grey">
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
            
            {applicationsClosed && (
              <p className="text-apple-grey mt-2">
                Please check back later for information about future programmes or 
                <a href="mailto:admissions@vocalexcellence.com" className="text-apple-blue ml-1 hover:underline">
                  contact our admissions team
                </a>.
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ApplicationHero;
