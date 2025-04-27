
import React from 'react';
import { motion } from 'framer-motion';

const TuitionHero = () => {
  return (
    <section className="py-20 md:py-24 px-6 bg-gradient-to-b from-white to-apple-light">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-apple-text tracking-tight">
            Tuition & Financial Information
          </h1>
          <p className="text-xl md:text-2xl text-apple-grey max-w-2xl mx-auto">
            Everything you need to know about joining our transformative vocal program
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TuitionHero;
