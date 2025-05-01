
import React from 'react';
import { motion } from 'framer-motion';

const TuitionHero = React.memo(() => {
  // Optimized animation configuration
  const animationConfig = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <section className="pt-28 pb-10 md:pt-36 md:pb-12 px-6 bg-gradient-to-b from-white to-[#fafafa]"> {/* Increased padding top */}
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          {...animationConfig}
          className="space-y-5"
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-[#141414] tracking-tight leading-tight">
            Tuition & Financial Information
          </h1>
          <p className="text-lg md:text-xl text-[#141414]/70 max-w-2xl mx-auto font-sans">
            Join our transformative program with options designed to support your musical journey
          </p>
          <div className="pt-3">
            <motion.div 
              className="h-1 w-16 bg-gradient-to-r from-[#4f6e72] to-[#6a8d91] rounded-full mx-auto"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
});

TuitionHero.displayName = 'TuitionHero';

export default TuitionHero;
