import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@/hooks/use-intersection';

interface CurriculumSectionProps {
  className?: string;
}

const CurriculumSection: FC<CurriculumSectionProps> = ({ className }) => {
  const { ref, isInView } = useIntersectionObserver({ threshold: 0.2, triggerOnce: true });
  
  return (
    <section
      id="curriculum" // Adding id for navigation
      ref={ref}
      className={cn(
        "py-20 md:py-32 bg-[#f5f5f7] overflow-hidden",
        className
      )}
      aria-label="Workshop Curriculum"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <motion.div
          className="text-center mb-12 md:mb-16"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
        >
          <span className="inline-block text-apple-grey text-sm tracking-wide uppercase mb-4 font-medium">
            Our Curriculum
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-apple-text mb-4 tracking-tight">
            What You'll Learn
          </h2>
          <p className="font-sans text-lg md:text-xl text-apple-grey max-w-2xl mx-auto leading-relaxed">
            A comprehensive and transformative program designed to elevate your vocal skills and artistry.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Module 1 */}
          <motion.div
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeInOut" }}
          >
            <h3 className="font-serif text-xl font-medium text-apple-text mb-3">
              Module 1: Vocal Anatomy & Physiology
            </h3>
            <p className="font-sans text-base text-apple-grey leading-relaxed">
              Understand the mechanics of your voice. Learn about breath control, resonance, and articulation for optimal vocal performance.
            </p>
          </motion.div>

          {/* Module 2 */}
          <motion.div
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}
          >
            <h3 className="font-serif text-xl font-medium text-apple-text mb-3">
              Module 2: Technique & Skill Development
            </h3>
            <p className="font-sans text-base text-apple-grey leading-relaxed">
              Master essential vocal techniques. Develop skills in pitch accuracy, vocal agility, and stylistic interpretation.
            </p>
          </motion.div>

          {/* Module 3 */}
          <motion.div
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
          >
            <h3 className="font-serif text-xl font-medium text-apple-text mb-3">
              Module 3: Performance Practice
            </h3>
            <p className="font-sans text-base text-apple-grey leading-relaxed">
              Apply your skills in live performance scenarios. Receive personalized feedback to refine your stage presence and captivate audiences.
            </p>
          </motion.div>

          {/* Module 4 */}
          <motion.div
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeInOut" }}
          >
            <h3 className="font-serif text-xl font-medium text-apple-text mb-3">
              Module 4: Vocal Health & Maintenance
            </h3>
            <p className="font-sans text-base text-apple-grey leading-relaxed">
              Learn how to care for your voice. Discover strategies for preventing vocal strain, maintaining vocal health, and prolonging your career.
            </p>
          </motion.div>

          {/* Module 5 */}
          <motion.div
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.7, ease: "easeInOut" }}
          >
            <h3 className="font-serif text-xl font-medium text-apple-text mb-3">
              Module 5: Artistry & Expression
            </h3>
            <p className="font-sans text-base text-apple-grey leading-relaxed">
              Explore the art of vocal expression. Develop your unique style, connect emotionally with your audience, and tell compelling stories through song.
            </p>
          </motion.div>

          {/* Module 6 */}
          <motion.div
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: 0.8, ease: "easeInOut" }}
          >
            <h3 className="font-serif text-xl font-medium text-apple-text mb-3">
              Module 6: Career Development
            </h3>
            <p className="font-sans text-base text-apple-grey leading-relaxed">
              Navigate the music industry. Learn about branding, marketing, networking, and creating a sustainable career as a professional vocalist.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CurriculumSection;
