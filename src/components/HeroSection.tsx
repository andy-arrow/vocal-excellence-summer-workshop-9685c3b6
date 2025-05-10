import React from 'react';
import { motion } from 'framer-motion';
import SpotsRemainingIndicator from './SpotsRemainingIndicator';
import { AlertBanner } from './AlertBanner';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen pt-32 pb-16 overflow-hidden bg-apple-light">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-apple-blue/10 text-apple-blue text-sm font-medium">
              July 14–18, 2025 • Limassol, Cyprus
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-apple-text mb-6 tracking-tight"
          >
            Vocal Excellence
            <span className="block mt-2">Summer Workshop</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl text-lg md:text-xl text-apple-grey mb-8 leading-relaxed"
          >
            An immersive 5-day workshop designed to transform your vocal technique
            and performance skills under the guidance of world-class instructors.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <a
              href="/apply"
              className="px-8 py-3 bg-apple-blue text-white rounded-full text-lg font-medium hover:bg-apple-blue-hover transition-colors duration-300"
            >
              Apply Now
            </a>
            <a
              href="/tuition"
              className="px-8 py-3 bg-white text-apple-blue border border-apple-blue/20 rounded-full text-lg font-medium hover:bg-apple-light-hover transition-colors duration-300"
            >
              View Tuition
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="w-full max-w-4xl"
          >
            <SpotsRemainingIndicator />
          </motion.div>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-0 left-0 w-full"
      >
        <AlertBanner />
      </motion.div>
      
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-b from-blue-200/20 to-transparent rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-gradient-to-t from-purple-200/20 to-transparent rounded-full filter blur-3xl"></div>
      </div>
    </section>
  );
};

export default HeroSection;
