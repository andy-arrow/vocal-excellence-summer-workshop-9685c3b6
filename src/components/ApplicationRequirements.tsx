
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Info } from 'lucide-react';
import { APPLICATION_DATES } from '@/constants/applicationDates';
import { format } from 'date-fns';

const ApplicationRequirements = () => {
  const deadlineDate = format(APPLICATION_DATES.DEADLINE, 'MMMM d, yyyy');
  const notificationDate = format(APPLICATION_DATES.NOTIFICATION_DATE, 'MMMM d, yyyy');
  const programPeriod = `${format(APPLICATION_DATES.PROGRAM_START, 'MMMM d')}-${format(APPLICATION_DATES.PROGRAM_END, 'MMMM d, yyyy')}`;

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="p-6 sm:p-8 md:p-10 border-b border-apple-border/10">
        <h2 className="text-2xl md:text-3xl font-semibold text-apple-text mb-4">Application Requirements</h2>
        <p className="text-apple-grey text-lg leading-relaxed">
          Please ensure your application meets the following requirements before submission.
        </p>
      </div>
      
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 p-6 sm:p-8 md:p-10">
        <motion.div 
          className="bg-apple-light rounded-xl p-5 sm:p-6"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center gap-3 sm:gap-4 mb-4">
            <div className="bg-white rounded-full p-2 shadow-sm">
              <Info className="w-5 h-5 sm:w-6 sm:h-6 text-apple-blue" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-apple-text">Personal Information</h3>
          </div>
          <div className="space-y-3 pl-4 border-l-2 border-apple-border/30">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-apple-text text-sm">Complete all required personal and contact information fields</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-apple-text text-sm">Ensure your email address is correct as it will be our primary method of contact</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-apple-text text-sm">Include your vocal range and singing experience</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-apple-light rounded-xl p-5 sm:p-6"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center gap-3 sm:gap-4 mb-4">
            <div className="bg-white rounded-full p-2 shadow-sm">
              <Info className="w-5 h-5 sm:w-6 sm:h-6 text-apple-blue" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-apple-text">Programme Details</h3>
          </div>
          <div className="space-y-3 pl-4 border-l-2 border-apple-border/30">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-apple-text text-sm">Tell us why you want to join the workshop (100+ characters)</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-apple-text text-sm">Share your dietary restrictions if applicable</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-apple-text text-sm">Provide any accessibility requirements if needed</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-apple-light rounded-xl p-5 sm:p-6 sm:col-span-2"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center gap-3 sm:gap-4 mb-4">
            <div className="bg-white rounded-full p-2 shadow-sm">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-apple-blue" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-apple-text">Application Timeline</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="font-semibold text-apple-text mb-2">Application Deadline</p>
              <p className="text-apple-grey text-sm">{deadlineDate}</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="font-semibold text-apple-text mb-2">Acceptance Notifications</p>
              <p className="text-apple-grey text-sm">{notificationDate}</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="font-semibold text-apple-text mb-2">Workshop Dates</p>
              <p className="text-apple-grey text-sm">{programPeriod}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ApplicationRequirements;
