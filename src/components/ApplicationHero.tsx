import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Music } from 'lucide-react';

const ApplicationHero = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById('application-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-[#1d1d1f]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1d1d1f] to-[#1d1d1f]/90 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white">
            Your Journey to<br />
            <span className="text-[#2997ff]">
              Vocal Mastery
            </span>
          </h1>
          
          <motion.p 
            className="text-lg md:text-xl text-[#86868b] max-w-2xl mx-auto leading-relaxed font-light"
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
            <motion.button
              onClick={scrollToForm}
              className="px-8 py-4 rounded-full bg-[#0071e3] text-white hover:bg-[#0077ED] transition-all duration-300 font-medium text-lg shadow-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center gap-2">
                Begin Your Application
                <ArrowRight className="h-5 w-5" />
              </span>
            </motion.button>
            
            <div className="text-sm">
              <span className="inline-block px-3 py-1 bg-[#1d1d1f]/60 backdrop-blur border border-[#86868b]/20 rounded-full text-xs font-medium text-[#86868b]">
                Limited Capacity
              </span>
              <span className="text-[#86868b] ml-2">
                Only 20 spots available for Summer 2025
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ApplicationHero;
