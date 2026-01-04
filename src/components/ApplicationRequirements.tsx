
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Mail, Music, FileText, Utensils } from 'lucide-react';

const ApplicationRequirements = () => {
  const requirements = [
    {
      icon: <Mail className="w-5 h-5 text-apple-blue" />,
      title: "Contact Details",
      description: "A valid email address you check regularly."
    },
    {
      icon: <Music className="w-5 h-5 text-apple-blue" />,
      title: "Experience",
      description: "A brief summary of your vocal range and background."
    },
    {
      icon: <FileText className="w-5 h-5 text-apple-blue" />,
      title: "Statement of Purpose",
      description: "A short paragraph (100+ characters) explaining your artistic goals."
    },
    {
      icon: <Utensils className="w-5 h-5 text-apple-blue" />,
      title: "Dietary Needs",
      description: "Any restrictions we should know for the daily catered lunch."
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="p-6 sm:p-8 md:p-10 border-b border-apple-border/10">
        <h2 className="text-2xl md:text-3xl font-semibold text-apple-text mb-4">Application Checklist</h2>
        <p className="text-apple-grey text-lg leading-relaxed">
          Before you begin, please ensure you have the following ready:
        </p>
      </div>
      
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 p-6 sm:p-8 md:p-10">
        {requirements.map((req, index) => (
          <motion.div 
            key={index}
            className="bg-apple-light rounded-xl p-5 sm:p-6"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-start gap-4">
              <div className="bg-white rounded-full p-2.5 shadow-sm shrink-0">
                {req.icon}
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-apple-text">{req.title}</h3>
                <p className="text-apple-grey text-sm leading-relaxed">{req.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationRequirements;
