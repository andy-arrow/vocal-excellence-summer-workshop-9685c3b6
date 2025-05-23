
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const AboutSection = () => {
  const isMobile = useIsMobile();
  
  const features = [
    {
      title: 'Tailored Coaching',
      description: 'Personal lessons focused on your goals, featuring skilled accompanists to support your music.',
      icon: <CheckCircle2 className="h-5 w-5 text-apple-blue" />
    },
    {
      title: 'Professional Recordings',
      description: "Your mock auditions and final performance will be professionally recorded, giving you high-quality footage that's perfect for audition submissions, social-media sharing, and building your portfolio.",
      icon: <CheckCircle2 className="h-5 w-5 text-apple-blue" />
    },
    {
      title: 'Performance Confidence',
      description: 'Enhance your stage presence and overcome nerves with practical workshops using Alexander Technique.',
      icon: <CheckCircle2 className="h-5 w-5 text-apple-blue" />
    },
    {
      title: 'Vocal Health Essentials',
      description: 'Keep your voice strong and healthy with guidance from an expert vocal health specialist.',
      icon: <CheckCircle2 className="h-5 w-5 text-apple-blue" />
    },
    {
      title: 'Make Real Connections',
      description: "Meet and network with industry professionals already working in the areas you're passionate about.",
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
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light tracking-tight text-apple-text">
              Your Voice, Your Future
            </h2>
            
            <p className="text-lg text-apple-grey leading-relaxed">
              Work closely with experienced teachers who get your artistic path—from technique and confidence to navigating your career.
            </p>
            
            <div className="pt-4">
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
            
            {/* Removed the "Ready to level up your voice?" text */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
