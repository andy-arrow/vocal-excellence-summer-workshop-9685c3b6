import React from 'react';
import { motion } from 'framer-motion';
import { TRUST_BAR_LINE } from '@/constants/copy';

/** Single quotable line (Bernays); authority without clutter */
const TrustBar = () => (
  <section className="py-6 md:py-8 bg-white border-b border-apple-border">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.p
        className="text-center text-sm md:text-base font-medium text-apple-text max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {TRUST_BAR_LINE}
      </motion.p>
      <motion.div
        className="flex flex-wrap justify-center gap-x-4 md:gap-x-6 gap-y-2 mt-3 text-xs md:text-sm font-semibold text-apple-grey uppercase tracking-wider"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <span>Netflix</span>
        <span>Juilliard</span>
        <span>The West End</span>
        <span>Royal Academy of Music</span>
      </motion.div>
    </div>
  </section>
);

export default TrustBar;
