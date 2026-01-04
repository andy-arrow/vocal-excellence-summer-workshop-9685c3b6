
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Mail, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SubmissionSuccessMessage = () => {
  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-sm overflow-hidden border border-apple-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="p-8 md:p-12 text-center">
        <motion.div 
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5, type: 'spring', stiffness: 150 }}
        >
          <CheckCircle2 className="h-8 w-8 text-white" />
        </motion.div>
        
        <motion.h2 
          className="text-3xl md:text-4xl font-serif font-medium text-apple-text mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Application Submitted!
        </motion.h2>
        
        <motion.p 
          className="text-lg text-apple-grey max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Thank you for applying to the Vocal Excellence Summer Workshop 2026. Your application has been received and is now being reviewed by our team.
        </motion.p>
        
        <motion.div 
          className="mt-8 grid gap-5 max-w-xl mx-auto text-left"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.6
              }
            }
          }}
          initial="hidden"
          animate="show"
        >
          <motion.div 
            className="flex gap-4 items-start rounded-xl p-4 bg-gray-50 border border-gray-100"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
          >
            <div className="bg-emerald-100 p-2 rounded-full">
              <Mail className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-medium text-base text-apple-text">Confirmation Email</h3>
              <p className="text-sm text-apple-grey mt-1">
                We've sent a confirmation to your email address with a copy of your application details.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex gap-4 items-start rounded-xl p-4 bg-gray-50 border border-gray-100"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
          >
            <div className="bg-violet-100 p-2 rounded-full">
              <Calendar className="h-5 w-5 text-violet-600" />
            </div>
            <div>
              <h3 className="font-medium text-base text-apple-text">What's Next?</h3>
              <p className="text-sm text-apple-grey mt-1">
                We'll review your application and contact you within 2 weeks regarding the next steps and selection results.
              </p>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Link 
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-apple-blue text-white rounded-full hover:bg-apple-blue-hover transition-colors font-medium"
          >
            Return to Home
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SubmissionSuccessMessage;
