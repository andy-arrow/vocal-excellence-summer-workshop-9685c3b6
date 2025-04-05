
import React from 'react';
import { Check, Calendar, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const SubmissionSuccessMessage = () => {
  return (
    <section id="application-success" className="py-16 md:py-24 bg-gradient-to-b from-slate-900 to-violet-950">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-green-500/20 rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-1">
            <div className="h-2 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 rounded-t-xl"></div>
          </div>
          
          <div className="p-8 md:p-12">
            <motion.div 
              className="flex justify-center mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            >
              <div className="bg-green-500/20 rounded-full p-4">
                <Check size={48} className="text-green-500" />
              </div>
            </motion.div>
            
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white font-outfit bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-emerald-400">
                Application Submitted Successfully!
              </h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                Thank you for applying to the Vocal Excellence Summer Workshop 2025. Your journey to vocal mastery has officially begun!
              </p>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-2 gap-6 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="text-emerald-400" />
                  <h3 className="text-lg font-medium text-white">Check Your Email</h3>
                </div>
                <p className="text-slate-300">
                  We've sent a confirmation to your email with all the details about your application and next steps.
                </p>
              </div>
              
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="text-emerald-400" />
                  <h3 className="text-lg font-medium text-white">What's Next?</h3>
                </div>
                <p className="text-slate-300">
                  Our team will review your application within 2 weeks. We'll contact you to schedule an online interview.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p className="mb-6 text-slate-400">
                If you have any questions in the meantime, please contact us at <a href="mailto:admissions@vocalexcellence.com" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4">admissions@vocalexcellence.com</a>
              </p>
              
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Button 
                  asChild
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-2"
                >
                  <Link to="/">
                    <span>Return to Home</span>
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SubmissionSuccessMessage;
