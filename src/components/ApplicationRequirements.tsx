
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Mail, Music, FileText, Utensils } from 'lucide-react';

import { APPLY_CHECKLIST_INTRO } from '@/constants/copy';

const ApplicationRequirements = () => {
  const requirements = [
    {
      icon: <Mail className="w-5 h-5 text-apple-blue" />,
      title: "Contact details",
      description: "A valid email you check regularly."
    },
    {
      icon: <Music className="w-5 h-5 text-apple-blue" />,
      title: "Vocal background",
      description: "Your range and a brief summary of your singing journey."
    },
    {
      icon: <FileText className="w-5 h-5 text-apple-blue" />,
      title: "Your goals (a few sentences)",
      description: "What you hope to achieve and why you're applying. 100+ characters—no long essay."
    },
    {
      icon: <Utensils className="w-5 h-5 text-apple-blue" />,
      title: "Dietary needs",
      description: "Any restrictions for the daily catered lunch."
    }
  ];

  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-sm overflow-hidden">
      <div className="p-5 md:p-8 border-b border-[#e5e5e5]">
        <h2 className="text-xl md:text-2xl font-semibold text-[#1d1d1f] mb-2 md:mb-3">What You'll Need</h2>
        <p className="text-[#666666] text-base md:text-lg leading-relaxed">
          {APPLY_CHECKLIST_INTRO}
        </p>
      </div>
      
      <div className="grid sm:grid-cols-2 gap-3 md:gap-5 p-5 md:p-8">
        {requirements.map((req, index) => (
          <div 
            key={index}
            className="bg-[#f5f5f7] rounded-lg md:rounded-xl p-4 md:p-5"
          >
            <div className="flex items-start gap-3 md:gap-4">
              <div className="bg-white rounded-full p-2 md:p-2.5 shadow-sm shrink-0">
                {req.icon}
              </div>
              <div className="space-y-1">
                <h3 className="text-base md:text-lg font-semibold text-[#1d1d1f]">{req.title}</h3>
                <p className="text-[#666666] text-sm leading-relaxed">{req.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationRequirements;
