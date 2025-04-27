
import React from 'react';
import { motion } from 'framer-motion';

const PricingHero = () => {
  return (
    <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-apple-text tracking-tight mb-6">
            Simple, transparent pricing
          </h1>
          <p className="text-xl md:text-2xl text-apple-grey max-w-2xl mx-auto">
            Invest in your growth with our carefully structured payment options
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingHero;
