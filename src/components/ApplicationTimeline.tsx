
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Check, ChevronRight, Wallet, PartyPopper } from 'lucide-react';
import { useInView } from 'framer-motion';

const timelineItems = [
  {
    date: "March 1, 2025",
    title: "Applications Open",
    description: "Early application is encouraged as spaces fill quickly.",
    icon: <Calendar className="text-violet-600 dark:text-violet-400" />,
    status: "active"
  },
  {
    date: "May 15, 2025",
    title: "Application Deadline",
    description: "All applications must be submitted by this date.",
    icon: <Clock className="text-violet-600 dark:text-violet-400" />,
    status: "upcoming",
    highlight: true
  },
  {
    date: "June 1, 2025",
    title: "Final Notifications",
    description: "All applicants will be notified of their acceptance status.",
    icon: <Check className="text-violet-600 dark:text-violet-400" />,
    status: "upcoming"
  },
  {
    date: "June 15, 2025",
    title: "Tuition Deadline",
    description: "Full payment due to secure your place.",
    icon: <Wallet className="text-violet-600 dark:text-violet-400" />,
    status: "upcoming"
  },
  {
    date: "July 14, 2025",
    title: "Programme Begins",
    description: "Welcome reception and orientation.",
    icon: <PartyPopper className="text-violet-600 dark:text-violet-400" />,
    status: "upcoming"
  }
];

const ApplicationTimeline = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  // Calculate days remaining until May 15, 2025
  const calculateDaysRemaining = () => {
    const deadline = new Date('2025-05-15T23:59:59');
    const today = new Date();
    const diffTime = Math.abs(deadline.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const daysRemaining = calculateDaysRemaining();

  return (
    <section 
      ref={sectionRef}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-12">
        <motion.div 
          className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-violet-100 dark:bg-violet-900/30 mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Clock className="w-4 h-4 mr-2 text-violet-600 dark:text-violet-400" />
          <span className="text-xs font-medium text-violet-800 dark:text-violet-300">
            {daysRemaining} days until application deadline
          </span>
        </motion.div>
      
        <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white font-outfit">
          Application Timeline
        </h2>
        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Mark these important dates in your calendar to stay on track with your application.
        </p>
      </div>
      
      <div className="relative">
        {/* Timeline line */}
        <motion.div 
          className="absolute left-8 top-0 bottom-0 w-px bg-violet-200 dark:bg-violet-800/30"
          style={{ height: '0%' }}
          animate={isInView ? { height: '100%' } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        
        <div className="space-y-10">
          {timelineItems.map((item, index) => (
            <motion.div 
              key={index} 
              className="relative pl-20"
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              {/* Timeline dot */}
              <motion.div 
                className={`absolute left-8 w-6 h-6 rounded-full border-2 bg-white dark:bg-slate-900 flex items-center justify-center transform -translate-x-3 ${
                  item.highlight 
                    ? 'border-violet-600 dark:border-violet-400' 
                    : 'border-violet-300 dark:border-violet-700'
                }`}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
              >
                {item.icon}
              </motion.div>
              
              {/* Content */}
              <div>
                <span className={`block ${item.highlight ? 'text-violet-600 dark:text-violet-400 font-medium' : 'text-slate-500 dark:text-slate-400'} text-sm mb-1`}>
                  {item.date}
                </span>
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                  {item.title}
                  {item.status === 'active' && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                      Current
                    </span>
                  )}
                  {item.highlight && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300">
                      Important
                    </span>
                  )}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {item.description}
                </p>
                
                {/* Special callout for the deadline */}
                {item.highlight && (
                  <div className="mt-2 p-2 bg-violet-50 dark:bg-violet-900/10 rounded-lg border border-violet-200 dark:border-violet-800 flex items-center">
                    <p className="text-xs text-violet-800 dark:text-violet-200">
                      <strong>{daysRemaining} days remaining</strong> to complete your application
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <motion.div 
        className="mt-16 text-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <motion.a 
          href="#application-form"
          className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white py-3 px-6 rounded-full font-medium transition-all duration-300 shadow-sm hover:shadow-md"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Apply Now</span>
          <ChevronRight size={18} />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default ApplicationTimeline;
