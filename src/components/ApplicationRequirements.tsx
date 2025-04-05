
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, FileText, Mic, Music, Sparkles } from 'lucide-react';

const requirementItems = [
  {
    icon: <FileText className="text-fuchsia-500" />,
    title: "Personal Information",
    description: "Basic contact details and background information to help us get to know you"
  },
  {
    icon: <Music className="text-violet-500" />,
    title: "Musical Experience",
    description: "Details about your vocal training, performance history, and musical background"
  },
  {
    icon: <Mic className="text-indigo-500" />,
    title: "Repertoire Recordings",
    description: "Two contrasting pieces (5 minutes max each) that showcase your range and technique"
  },
  {
    icon: <Sparkles className="text-purple-500" />,
    title: "Personal Statement",
    description: "A brief explanation of why you want to join and what you hope to achieve"
  },
  {
    icon: <FileText className="text-pink-500" />,
    title: "Supporting Documents",
    description: "CV/resume and optional recommendation letters from music professionals"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const ApplicationRequirements = () => {
  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-200 to-fuchsia-200">
            Application Requirements
          </h2>
          <p className="text-lg text-violet-100/80 max-w-2xl mx-auto">
            Ready to take your vocal talent to the next level? Prepare these materials for a complete application.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {requirementItems.map((item, index) => (
            <motion.div 
              key={index} 
              className="bg-slate-800/50 backdrop-blur-sm border border-violet-500/10 rounded-xl p-6 relative overflow-hidden group"
              variants={itemVariants}
            >
              {/* Gradient hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/5 to-violet-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="flex items-start gap-4 relative z-10">
                <div className="bg-slate-900/60 p-3 rounded-lg">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-violet-100/70">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-12 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-violet-500/10 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Clock className="text-fuchsia-400" size={20} />
            <h3 className="text-xl font-semibold text-white">Application Tips</h3>
          </div>
          
          <ul className="space-y-3 text-violet-100/80">
            <li className="flex items-start gap-2">
              <Check size={18} className="text-green-400 mt-1 flex-shrink-0" />
              <span>Start your application early to allow time for gathering materials and recording your best performances.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check size={18} className="text-green-400 mt-1 flex-shrink-0" />
              <span>Choose repertoire that highlights your strengths and demonstrates your vocal versatility.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check size={18} className="text-green-400 mt-1 flex-shrink-0" />
              <span>Be authentic in your personal statement—we want to understand your unique voice and artistic goals.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check size={18} className="text-green-400 mt-1 flex-shrink-0" />
              <span>Applications are reviewed on a rolling basis, and candidates may be invited for a virtual interview.</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default ApplicationRequirements;
