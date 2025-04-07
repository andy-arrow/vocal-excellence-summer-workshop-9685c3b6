import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, MusicIcon, Award, Clock } from 'lucide-react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, type: "spring", stiffness: 100 }
  }
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  opacity: [0.9, 1, 0.9],
  transition: {
    duration: 3,
    repeat: Infinity,
    repeatType: "loop" as const,
    ease: "easeInOut"
  }
};

const ApplicationHero = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById('application-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950"></div>
      
      {/* Animated background patterns */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div 
          className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full bg-fuchsia-600 blur-[120px]" 
          animate={pulseAnimation} 
        />
        <motion.div 
          className="absolute top-[40%] right-[10%] w-80 h-80 rounded-full bg-violet-600 blur-[120px]" 
          animate={{...pulseAnimation, scale: [1, 1.1, 1]}}
          transition={{ delay: 1.5 }} 
        />
        <motion.div 
          className="absolute bottom-[10%] left-[20%] w-72 h-72 rounded-full bg-indigo-600 blur-[140px]" 
          animate={{...pulseAnimation, scale: [1, 1.07, 1]}} 
          transition={{ delay: 0.7 }}
        />
      </div>
      
      {/* Music note decorations */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <motion.div 
            key={index} 
            className="absolute text-white text-4xl"
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: "0%", 
              opacity: 0.3 + Math.random() * 0.7 
            }}
            animate={{ 
              y: "100vh", 
              rotate: Math.random() * 360,
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{ 
              duration: 15 + Math.random() * 20,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {index % 2 === 0 ? "♪" : "♫"}
          </motion.div>
        ))}
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center space-y-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-fuchsia-300 to-violet-300 font-outfit tracking-tighter">
              Your Journey to <br className="md:hidden" />
              <span className="relative inline-block">
                Vocal Mastery
                <motion.span 
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-500 to-violet-500"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 1 }}
                />
              </span>
            </h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-violet-100/90 max-w-3xl mx-auto leading-relaxed font-light"
              variants={itemVariants}
            >
              Join our exclusive 5-day Workshop where world-class mentors will transform your voice and launch your technique to new heights.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col items-center gap-5"
            variants={itemVariants}
          >
            <motion.button
              onClick={scrollToForm}
              className="gradient-button text-lg px-8 py-4 rounded-lg transition-all duration-500 font-medium relative overflow-hidden group"
              whileHover={{ 
                scale: 1.03, 
                boxShadow: "0 10px 30px -10px rgba(212, 45, 245, 0.7)" 
              }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Begin Your Application
                <MusicIcon className="h-5 w-5" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-violet-600"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute inset-0 w-full h-full bg-[length:300%_300%] bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 animate-subtle-gradient"></span>
            </motion.button>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="flex items-center gap-2 text-violet-300/80 text-sm"
            >
              <span className="inline-block px-2 py-0.5 bg-violet-900/50 rounded-full text-xs font-semibold text-violet-200">
                Limited Capacity
              </span>
              Only 20 spots available for Summer 2025
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-6 pt-8"
            variants={itemVariants}
          >
            <motion.div 
              className="bg-white/5 backdrop-blur-md p-5 rounded-xl border border-white/10"
              whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(139, 92, 246, 0.3)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-fuchsia-500/20 p-2 rounded-full">
                  <MusicIcon size={20} className="text-fuchsia-400" />
                </div>
                <h3 className="font-semibold text-white">Elite Coaching</h3>
              </div>
              <p className="text-violet-100/70 text-sm">Learn directly from internationally acclaimed vocal instructors with decades of stage experience</p>
            </motion.div>
            
            <motion.div 
              className="bg-white/5 backdrop-blur-md p-5 rounded-xl border border-white/10"
              whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(139, 92, 246, 0.3)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-violet-500/20 p-2 rounded-full">
                  <Award size={20} className="text-violet-400" />
                </div>
                <h3 className="font-semibold text-white">Final Showcase</h3>
              </div>
              <p className="text-violet-100/70 text-sm">Perform at our prestigious concert venue with industry professionals and talent scouts in attendance</p>
            </motion.div>
            
            <motion.div 
              className="bg-white/5 backdrop-blur-md p-5 rounded-xl border border-white/10"
              whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(139, 92, 246, 0.3)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-indigo-500/20 p-2 rounded-full">
                  <Clock size={20} className="text-indigo-400" />
                </div>
                <h3 className="font-semibold text-white">Immersive Learning</h3>
              </div>
              <p className="text-violet-100/70 text-sm">5 days of intensive technique, performance practice, and industry mentorship from July 14-18, 2025</p>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="text-white/60 h-6 w-6" />
          </motion.div>
          <span className="text-xs text-white/60 mt-2">Complete Your Application Below</span>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
          <path 
            fill="rgb(15 23 42)" 
            fillOpacity="1" 
            d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,42.7C840,32,960,32,1080,42.7C1200,53,1320,75,1380,85.3L1440,96L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  );
};

export default ApplicationHero;
