
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const AboutSection = () => {
  const isMobile = useIsMobile();
  
  const features = [
    {
      title: 'Precision Coaching',
      description: "Don't just sing—refine. Receive 1-on-1 private lessons tailored to your unique voice type, with professional accompanists dedicated to polishing your specific repertoire.",
      icon: <CheckCircle2 className="h-5 w-5 text-apple-blue" />
    },
    {
      title: 'Industry-Standard Assets',
      description: "Walk away with professional 4K video recordings of your mock auditions and final performance—essential assets for your showreel and casting submissions.",
      icon: <CheckCircle2 className="h-5 w-5 text-apple-blue" />
    },
    {
      title: 'Unshakeable Confidence',
      description: 'Overcome performance anxiety for good. Our specialized Alexander Technique workshops give you the physical and mental tools to command any stage with presence and ease.',
      icon: <CheckCircle2 className="h-5 w-5 text-apple-blue" />
    },
    {
      title: 'Vocal Longevity',
      description: 'Protect your instrument. Learn sustainability strategies from a vocal health specialist to ensure your career lasts a lifetime.',
      icon: <CheckCircle2 className="h-5 w-5 text-apple-blue" />
    },
    {
      title: 'High-Level Networking',
      description: "Build relationships that matter. Connect directly with successful professionals who are currently working in the industries you want to enter.",
      icon: <CheckCircle2 className="h-5 w-5 text-apple-blue" />
    }
  ];

  return (
    <section id="about" className="py-16 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className={cn(
          "grid gap-10 md:gap-16",
          isMobile ? "" : "grid-cols-1 lg:grid-cols-2"
        )}>
          <motion.div 
            className="space-y-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light tracking-tight text-apple-text">
              Elevate Your Artistry
            </h2>
            
            <p className="text-lg text-apple-grey leading-relaxed">
              Transform your potential into professional excellence with targeted coaching designed for serious vocalists.
            </p>
            
            <div className="pt-4 flex justify-center">
              <motion.div 
                className="h-1 w-12 bg-apple-blue rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              />
            </div>
          </motion.div>

          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="flex gap-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
              >
                <div className="flex-shrink-0 mt-1.5">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full">
                    {feature.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-apple-text mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-apple-grey">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
