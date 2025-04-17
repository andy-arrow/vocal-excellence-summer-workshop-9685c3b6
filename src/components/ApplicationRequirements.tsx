
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Mic, Music, Sparkles, ScrollText } from 'lucide-react';

const requirementItems = [
  {
    icon: <FileText className="text-violet-600 dark:text-violet-400" />,
    title: "Personal Information",
    description: "Basic contact details and background information"
  },
  {
    icon: <Music className="text-violet-600 dark:text-violet-400" />,
    title: "Musical Experience",
    description: "Details about your vocal training and performance history"
  },
  {
    icon: <Mic className="text-violet-600 dark:text-violet-400" />,
    title: "Repertoire Recordings",
    description: "Two contrasting pieces that showcase your range"
  },
  {
    icon: <Sparkles className="text-violet-600 dark:text-violet-400" />,
    title: "Personal Statement",
    description: "A brief explanation of your goals and aspirations"
  },
  {
    icon: <ScrollText className="text-violet-600 dark:text-violet-400" />,
    title: "Supporting Documents",
    description: "CV/resume and optional recommendation letters"
  }
];

const ApplicationRequirements = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white font-outfit">
          Application Requirements
        </h2>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Prepare these materials for a complete application. Each element helps us understand your unique voice and potential.
        </p>
      </div>
      
      <motion.div 
        className="grid md:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.1 }}
      >
        {requirementItems.map((item, index) => (
          <motion.div 
            key={index} 
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start gap-4">
              <div className="bg-violet-100 dark:bg-violet-900/30 p-3 rounded-xl">
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{item.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        className="mt-12 bg-violet-50 dark:bg-violet-900/10 rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Pro Tips</h3>
        <ul className="space-y-2 text-slate-600 dark:text-slate-300 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-violet-600 dark:text-violet-400 font-bold">•</span>
            <span>Start your application early to allow time for gathering materials</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-violet-600 dark:text-violet-400 font-bold">•</span>
            <span>Choose repertoire that highlights your strengths and versatility</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-violet-600 dark:text-violet-400 font-bold">•</span>
            <span>Be authentic in your personal statement—we want to understand your unique voice</span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default ApplicationRequirements;
