
import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Music, Sparkles, Star } from 'lucide-react';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const ApplicationHero = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 to-violet-950/90 z-0"></div>
      <div className="absolute inset-0 bg-[url('/subtle-noise.png')] opacity-[0.03] z-0"></div>
      
      {/* Animated music notes and decorative elements */}
      <motion.div 
        className="absolute top-20 right-[20%] text-fuchsia-400/20"
        animate={{ 
          y: [0, -15, 0],
          opacity: [0.2, 0.5, 0.2],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      >
        <Music size={60} />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-20 left-[15%] text-violet-400/20"
        animate={{ 
          y: [0, 15, 0],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, -10, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
      >
        <Star size={48} />
      </motion.div>
      
      <motion.div 
        className="absolute top-40 left-[25%] text-indigo-400/20"
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.2, 0.3, 0.2],
          rotate: [0, 15, 0]
        }}
        transition={{ duration: 7, repeat: Infinity, repeatType: "reverse", delay: 1 }}
      >
        <Mic size={40} />
      </motion.div>
      
      <div className="max-w-4xl mx-auto px-6 md:px-8 relative z-10">
        <motion.div 
          className="text-center"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          <motion.div variants={itemVariants}>
            <span className="inline-block py-1 px-4 rounded-full bg-fuchsia-500/10 text-fuchsia-300 text-sm font-medium tracking-wide mb-6">
              Summer 2025 Applications
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-100 to-fuchsia-200"
          >
            Your Voice, Your Journey
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-violet-100/90 max-w-2xl mx-auto leading-relaxed mb-8"
          >
            Apply for the Vocal Excellence Summer Workshop where extraordinary talents find their unique voice. Limited spaces available to ensure personalized instruction.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex justify-center">
            <motion.a 
              href="#application-form"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-500 hover:to-violet-500 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-fuchsia-900/30"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>Start Application</span>
              <Sparkles size={16} className="animate-pulse" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Visual indicator to scroll down */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <span className="text-violet-300/60 text-sm mb-2">Scroll to learn more</span>
        <motion.div 
          className="w-6 h-10 border-2 border-violet-300/30 rounded-full flex justify-center"
          animate={{ boxShadow: ['0 0 0 rgba(124, 58, 237, 0)', '0 0 8px rgba(124, 58, 237, 0.5)', '0 0 0 rgba(124, 58, 237, 0)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div 
            className="w-1.5 h-1.5 bg-violet-300 rounded-full mt-2"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ApplicationHero;
