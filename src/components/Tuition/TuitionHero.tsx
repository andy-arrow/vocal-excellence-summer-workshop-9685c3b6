
import React from 'react';
import { motion } from 'framer-motion';

const TuitionHero = () => {
  return (
    <section className="pt-20 pb-16 md:pt-32 md:pb-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-[#141414] tracking-tight leading-tight">
            Tuition & Financial Information
          </h1>
          <p className="text-lg md:text-xl text-[#141414]/70 max-w-2xl mx-auto font-sans font-light">
            Join our transformative program with options designed to support your journey
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TuitionHero;
