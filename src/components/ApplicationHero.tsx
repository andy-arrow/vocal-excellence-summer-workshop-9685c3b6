
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, MusicIcon } from 'lucide-react';

const ApplicationHero = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById('application-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-white dark:bg-slate-950">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 pointer-events-none"></div>
      
      {/* Main content */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-outfit font-bold tracking-tight text-slate-900 dark:text-white">
            Your Journey to<br />
            <span className="text-violet-600 dark:text-violet-400">Vocal Mastery</span>
          </h1>
            
          <motion.p 
            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-light"
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
              className="px-8 py-4 rounded-full bg-violet-600 text-white hover:bg-violet-700 transition-all duration-300 font-medium text-lg shadow-sm hover:shadow-md"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center gap-2">
                Begin Your Application
                <MusicIcon className="h-5 w-5" />
              </span>
            </motion.button>
            
            <div className="text-sm text-slate-500 dark:text-slate-400">
              <span className="inline-block px-2 py-0.5 bg-violet-100 dark:bg-violet-900/30 rounded-full text-xs font-medium text-violet-800 dark:text-violet-300 mr-2">
                Limited Capacity
              </span>
              Only 20 spots available for Summer 2025
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.7 }}
        >
          <motion.div 
            animate={{ y: [0, 8, 0] }} 
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="text-slate-400 dark:text-slate-500 h-6 w-6" />
          </motion.div>
          <span className="text-xs text-slate-400 dark:text-slate-500 mt-2">View Application Details</span>
        </motion.div>
      </div>
    </section>
  );
};

export default ApplicationHero;
