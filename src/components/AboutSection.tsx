import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@/hooks/use-intersection';

interface AboutSectionProps {
  className?: string;
}

const AboutSection: FC<AboutSectionProps> = ({ className }) => {
  const { ref, isInView } = useIntersectionObserver({ threshold: 0.2, triggerOnce: true });
  
  return (
    <section
      id="about" // Adding id for navigation
      ref={ref}
      className={cn(
        "py-20 md:py-32 overflow-hidden bg-white",
        className
      )}
      aria-label="About the Vocal Excellence Workshop"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={ref}
            className="order-2 md:order-1"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeInOut" }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-apple-text mb-6 tracking-tight">
              About Vocal Excellence
            </h2>
            <p className="text-lg text-apple-grey leading-relaxed mb-4">
              At Vocal Excellence, we are dedicated to nurturing the next generation of vocal artists. Our summer workshop is designed to provide intensive training and personalized coaching to help you unlock your full potential.
            </p>
            <p className="text-lg text-apple-grey leading-relaxed mb-4">
              Located in the beautiful city of Limassol, Cyprus, our program offers a unique blend of rigorous study and cultural immersion. You'll work with world-renowned instructors, collaborate with talented peers, and gain invaluable performance experience.
            </p>
            <p className="text-lg text-apple-grey leading-relaxed">
              Whether you're looking to refine your technique, expand your repertoire, or prepare for professional auditions, Vocal Excellence is the perfect place to take your singing to the next level.
            </p>
          </motion.div>
          
          <motion.div
            className="order-1 md:order-2"
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <img
              src="/lovable-uploads/09999a9d-5555-413c-889f-6a9818a4969a.webp"
              alt="Vocal Excellence Workshop"
              className="rounded-2xl shadow-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
