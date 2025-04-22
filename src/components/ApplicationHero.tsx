
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

const ApplicationHero = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById('application-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-apple-text">
      <div className="absolute inset-0 bg-gradient-to-b from-apple-text to-apple-text/90 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white">
            Land Your Next Audition <br />
            <span className="text-apple-blue">
              in 5 Days
            </span>
          </h1>
          
          <motion.p 
            className="text-lg md:text-xl text-apple-grey max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <span className="font-medium">Elite Training, Pro Video Reel, Industry Network—<br />Guaranteed or Your Tuition Back</span>
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-3 pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <div className="flex items-center bg-apple-text/60 backdrop-blur border border-apple-grey/20 rounded-full px-4 py-1.5">
              <Check className="h-4 w-4 text-apple-blue mr-1.5" />
              <span className="text-sm text-white">Limited to 20 participants</span>
            </div>
            <div className="flex items-center bg-apple-text/60 backdrop-blur border border-apple-grey/20 rounded-full px-4 py-1.5">
              <Check className="h-4 w-4 text-apple-blue mr-1.5" />
              <span className="text-sm text-white">Juilliard & Broadway faculty</span>
            </div>
            <div className="flex items-center bg-apple-text/60 backdrop-blur border border-apple-grey/20 rounded-full px-4 py-1.5">
              <Check className="h-4 w-4 text-apple-blue mr-1.5" />
              <span className="text-sm text-white font-medium">94% booking rate</span>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex flex-col items-center gap-5 pt-6 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <motion.button
              onClick={scrollToForm}
              className="px-8 py-4 rounded-full bg-apple-blue text-white hover:bg-apple-blue-hover transition-all duration-300 font-medium text-lg shadow-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center gap-2">
                Secure Your Spot
                <ArrowRight className="h-5 w-5" />
              </span>
            </motion.button>
            
            <div className="text-sm">
              <div className="px-3 py-1.5 bg-apple-text/60 backdrop-blur border border-apple-grey/20 rounded-full text-sm text-white mt-2">
                <span className="font-medium">94% of past attendees booked paid gigs within 6 months</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ApplicationHero;
