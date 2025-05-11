
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Info } from 'lucide-react';

const ApplicationRequirements = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="p-8 md:p-10 border-b border-apple-border/10">
        <h2 className="text-2xl md:text-3xl font-semibold text-apple-text mb-4">Application Requirements</h2>
        <p className="text-apple-grey text-lg leading-relaxed">
          Please ensure your application meets the following requirements before submission.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 p-8 md:p-10">
        <motion.div 
          className="bg-apple-light rounded-xl p-6"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white rounded-full p-2 shadow-sm">
              <Info className="w-6 h-6 text-apple-blue" />
            </div>
            <h3 className="text-xl font-semibold text-apple-text">Personal Information</h3>
          </div>
          <div className="space-y-3 pl-4 border-l-2 border-apple-border/30">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-apple-text text-sm">Complete all required personal and contact information fields</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-apple-text text-sm">Ensure your email address is correct as it will be our primary method of contact</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-apple-text text-sm">Include your vocal range and singing experience</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-apple-light rounded-xl p-6"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white rounded-full p-2 shadow-sm">
              <Info className="w-6 h-6 text-apple-blue" />
            </div>
            <h3 className="text-xl font-semibold text-apple-text">Programme Details</h3>
          </div>
          <div className="space-y-3 pl-4 border-l-2 border-apple-border/30">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-apple-text text-sm">Tell us why you want to join the workshop (100+ characters)</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-apple-text text-sm">Share your dietary restrictions if applicable</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-apple-text text-sm">Provide any accessibility requirements if needed</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-apple-light rounded-xl p-6 md:col-span-2"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white rounded-full p-2 shadow-sm">
              <Clock className="w-6 h-6 text-apple-blue" />
            </div>
            <h3 className="text-xl font-semibold text-apple-text">Application Timeline</h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="font-semibold text-apple-text mb-2">Application Deadline</p>
              <p className="text-apple-grey text-sm">May 1, 2025</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="font-semibold text-apple-text mb-2">Acceptance Notifications</p>
              <p className="text-apple-grey text-sm">May 15, 2025</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="font-semibold text-apple-text mb-2">Workshop Dates</p>
              <p className="text-apple-grey text-sm">July 10-15, 2025</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ApplicationRequirements;
