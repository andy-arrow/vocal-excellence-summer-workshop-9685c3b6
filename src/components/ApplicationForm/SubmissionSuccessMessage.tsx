
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { APPLICATION_DATES } from '@/constants/applicationDates';
import { format } from 'date-fns';

const SubmissionSuccessMessage = () => {
  const notificationDate = format(APPLICATION_DATES.NOTIFICATION_DATE, 'MMMM d, yyyy');
  const tuitionDeadline = format(APPLICATION_DATES.TUITION_DEADLINE, 'MMMM d, yyyy');
  const programYear = format(APPLICATION_DATES.PROGRAM_START, 'yyyy');

  return (
    <div className="py-16 md:py-20">
      <motion.div 
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg">
            <CheckCircle2 size={40} className="text-white" />
          </div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-apple-text mb-6">
          Application Submitted!
        </h2>
        
        <div className="bg-white rounded-xl p-8 mb-8 shadow-sm border border-apple-border/40">
          <p className="text-lg text-apple-grey mb-6 leading-relaxed">
            Thank you for applying to the Vocal Excellence Summer Workshop {programYear}. 
            We have received your application and will review it carefully.
          </p>
          
          <div className="bg-apple-light rounded-lg p-4 mb-6">
            <p className="text-apple-blue font-medium">
              You will receive a confirmation email shortly. Please check your inbox (and spam folder).
            </p>
          </div>
          
          <div className="space-y-4 text-left">
            <h3 className="font-semibold text-apple-text">What happens next?</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-apple-blue flex items-center justify-center shrink-0">
                  <span className="text-white text-sm font-medium">1</span>
                </div>
                <span className="text-apple-grey">Our team will review your application</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-apple-blue flex items-center justify-center shrink-0">
                  <span className="text-white text-sm font-medium">2</span>
                </div>
                <span className="text-apple-grey">You'll receive our decision by {notificationDate}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-apple-blue flex items-center justify-center shrink-0">
                  <span className="text-white text-sm font-medium">3</span>
                </div>
                <span className="text-apple-grey">If accepted, you'll need to confirm your participation by {tuitionDeadline}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-apple-blue text-white rounded-full hover:bg-apple-blue-hover transition-colors font-medium"
          >
            Return to Homepage
            <ChevronRight size={16} />
          </Link>
          
          <Link 
            to="/tuition"
            className="flex items-center justify-center gap-2 px-6 py-3 border border-apple-border rounded-full hover:bg-apple-light transition-colors font-medium text-apple-text"
          >
            View Tuition Details
            <ChevronRight size={16} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SubmissionSuccessMessage;
