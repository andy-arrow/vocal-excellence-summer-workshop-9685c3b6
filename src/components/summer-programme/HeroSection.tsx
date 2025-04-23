
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/masterclass-singers.jpg')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-apple-text/60 to-apple-text/40"></div>
      <div className="relative z-10 container mx-auto px-6 py-20 text-center max-w-[1100px]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h1 className="text-5xl md:text-7xl font-serif font-light leading-tight tracking-tight">
            Summer Intensive
            <span className="block text-xl md:text-2xl font-sans font-light tracking-wide mt-4">
              July 15-19, 2025 • Limassol, Cyprus
            </span>
          </h1>
          
          <div className="w-24 h-px bg-white/30 mx-auto"></div>
          
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed text-white/90">
            An immersive five-day vocal training programme designed to take your performance skills to the next level
          </p>
          
          <div className="pt-8">
            <Link 
              to="/apply" 
              className="inline-flex items-center gap-2 bg-apple-blue text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:bg-apple-blue-hover"
            >
              Register Now
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
