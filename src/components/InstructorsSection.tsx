import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@/hooks/use-intersection';

interface InstructorsSectionProps {
  className?: string;
}

const InstructorsSection: React.FC<InstructorsSectionProps> = ({ className }) => {
  const { ref, isInView } = useIntersectionObserver({ threshold: 0.2, triggerOnce: true });
  
  return (
    <section
      id="instructors" // Adding id for navigation
      ref={ref}
      className={cn(
        "py-20 md:py-32 bg-white overflow-hidden",
        className
      )}
      aria-label="Our Instructors"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          className="text-center mb-16 md:mb-24"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-apple-text mb-4">
            Meet Our Expert Instructors
          </h2>
          <p className="text-apple-grey text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Learn from the best in the industry. Our instructors bring years of experience and a passion for vocal excellence to every session.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Instructor Card 1 */}
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <img
              src="/lovable-uploads/69a9999c-8f1a-491f-8099-15e4e79399e4.jpeg"
              alt="Instructor 1"
              className="w-full h-64 object-cover object-center"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="font-semibold text-xl text-white mb-2">
                Dr. Emily Carter
              </h3>
              <p className="text-apple-light-grey text-sm">
                World-renowned Vocal Coach
              </p>
            </div>
          </motion.div>

          {/* Instructor Card 2 */}
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <img
              src="/lovable-uploads/4965499a-6699-4499-a59f-91564394479c.jpeg"
              alt="Instructor 2"
              className="w-full h-64 object-cover object-center"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="font-semibold text-xl text-white mb-2">
                Mr. John Williams
              </h3>
              <p className="text-apple-light-grey text-sm">
                Award-Winning Music Director
              </p>
            </div>
          </motion.div>

          {/* Instructor Card 3 */}
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          >
            <img
              src="/lovable-uploads/666a955f-955a-4ca5-895a-995a5ad5595a.jpeg"
              alt="Instructor 3"
              className="w-full h-64 object-cover object-center"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="font-semibold text-xl text-white mb-2">
                Ms. Olivia Brown
              </h3>
              <p className="text-apple-light-grey text-sm">
                Celebrated Opera Singer
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InstructorsSection;
