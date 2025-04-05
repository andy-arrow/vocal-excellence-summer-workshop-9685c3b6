
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ChevronUp } from 'lucide-react';

interface ScrollToTopButtonProps {
  visible: boolean;
}

const ScrollToTopButton = ({ visible }: ScrollToTopButtonProps) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-500 hover:to-violet-500 text-white p-3 rounded-full shadow-lg shadow-fuchsia-900/30 group"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 10px 25px -5px rgba(225, 29, 236, 0.4)"
          }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          <div className="relative">
            <ArrowUp size={20} className="opacity-100 transition-opacity group-hover:opacity-0" />
            <motion.div 
              className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
              initial={{ y: 10 }}
              animate={{ y: 0 }}
            >
              <ChevronUp size={20} />
            </motion.div>
          </div>
          
          {/* Animated ring */}
          <motion.div 
            className="absolute inset-0 rounded-full border border-white/30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
