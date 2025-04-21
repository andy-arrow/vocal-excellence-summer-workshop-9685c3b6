
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Mic, Music, Sparkles, ScrollText } from 'lucide-react';

const requirementItems = [
  {
    icon: <FileText className="text-apple-blue" />,
    title: "Personal Information",
    description: "Basic contact details and background information"
  },
  {
    icon: <Music className="text-apple-blue" />,
    title: "Musical Experience",
    description: "Details about your vocal training and performance history"
  },
  {
    icon: <Mic className="text-apple-blue" />,
    title: "Repertoire Recordings",
    description: "Two contrasting pieces that showcase your range"
  },
  {
    icon: <Sparkles className="text-apple-blue" />,
    title: "Personal Statement",
    description: "A brief explanation of your goals and aspirations"
  },
  {
    icon: <ScrollText className="text-apple-blue" />,
    title: "Supporting Documents",
    description: "CV/resume and optional recommendation letters"
  }
];

const ApplicationRequirements = () => {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl text-apple-text font-light mb-6 tracking-tight">
            Application Requirements
          </h2>
          <p className="text-lg md:text-xl text-apple-grey max-w-2xl mx-auto leading-relaxed">
            Prepare these materials for a complete application. Each element helps us understand your unique voice and potential.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          {requirementItems.map((item, index) => (
            <motion.div 
              key={index} 
              className="bg-white rounded-xl p-8 border border-apple-border hover:border-apple-blue/30 transition-all duration-300 shadow-sm hover:shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="bg-apple-light p-3 rounded-xl border border-apple-border">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-serif text-xl text-apple-text mb-2">{item.title}</h3>
                  <p className="text-apple-grey leading-relaxed">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 bg-apple-light rounded-xl p-8 border border-apple-border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-serif text-2xl text-apple-text mb-4">Pro Tips</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-apple-blue text-lg">•</span>
              <span className="text-apple-grey">Start your application early to allow time for gathering materials</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-apple-blue text-lg">•</span>
              <span className="text-apple-grey">Choose repertoire that highlights your strengths and versatility</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-apple-blue text-lg">•</span>
              <span className="text-apple-grey">Be authentic in your personal statement—we want to understand your unique voice</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default ApplicationRequirements;
