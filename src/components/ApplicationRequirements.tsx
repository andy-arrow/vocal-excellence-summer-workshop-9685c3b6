
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Mic, Music, Sparkles, ScrollText } from 'lucide-react';

const requirementItems = [
  {
    icon: <FileText className="text-coral-500" />,
    title: "Personal Information",
    description: "Basic contact details and background information"
  },
  {
    icon: <Music className="text-coral-500" />,
    title: "Musical Experience",
    description: "Details about your vocal training and performance history"
  },
  {
    icon: <Mic className="text-coral-500" />,
    title: "Repertoire Recordings",
    description: "Two contrasting pieces that showcase your range"
  },
  {
    icon: <Sparkles className="text-coral-500" />,
    title: "Personal Statement",
    description: "A brief explanation of your goals and aspirations"
  },
  {
    icon: <ScrollText className="text-coral-500" />,
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
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal-900 font-light mb-6 tracking-tight">
            Application Requirements
          </h2>
          <p className="text-lg md:text-xl text-charcoal-600 max-w-2xl mx-auto leading-relaxed">
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
              className="bg-white rounded-xl p-8 border border-stone-200 hover:border-coral-300 transition-all duration-300 shadow-sm hover:shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-serif text-xl text-charcoal-900 mb-2">{item.title}</h3>
                  <p className="text-charcoal-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 bg-stone-50 rounded-xl p-8 border border-stone-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-serif text-2xl text-charcoal-900 mb-4">Pro Tips</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-coral-500 text-lg">•</span>
              <span className="text-charcoal-600">Start your application early to allow time for gathering materials</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-coral-500 text-lg">•</span>
              <span className="text-charcoal-600">Choose repertoire that highlights your strengths and versatility</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-coral-500 text-lg">•</span>
              <span className="text-charcoal-600">Be authentic in your personal statement—we want to understand your unique voice</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default ApplicationRequirements;
