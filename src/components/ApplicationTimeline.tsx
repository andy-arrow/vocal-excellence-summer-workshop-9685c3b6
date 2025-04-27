
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Check, ChevronRight, Wallet, PartyPopper } from 'lucide-react';
import { useInView } from 'framer-motion';

const timelineItems = [
  {
    date: "March 1, 2025",
    title: "Applications Open",
    description: "Early application is encouraged as spaces fill quickly.",
    icon: <Calendar className="text-apple-blue" />,
    status: "active"
  },
  {
    date: "May 15, 2025",
    title: "Application Deadline",
    description: "All applications must be submitted by this date.",
    icon: <Clock className="text-apple-blue" />,
    status: "upcoming",
    highlight: true
  },
  {
    date: "June 1, 2025",
    title: "Final Notifications",
    description: "All applicants will be notified of their acceptance status.",
    icon: <Check className="text-apple-blue" />,
    status: "upcoming"
  },
  {
    date: "June 15, 2025",
    title: "Tuition Deadline",
    description: "Full payment (€999) due to secure your place.",
    icon: <Wallet className="text-apple-blue" />,
    status: "upcoming"
  },
  {
    date: "July 14, 2025",
    title: "Programme Begins",
    description: "Welcome reception and orientation.",
    icon: <PartyPopper className="text-apple-blue" />,
    status: "upcoming"
  }
];

const ApplicationTimeline = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
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
      className="py-24 md:py-32 bg-white"
    >
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl text-apple-text font-light mb-6 tracking-tight">
            Application Timeline
          </h2>
          <p className="text-lg md:text-xl text-apple-grey max-w-2xl mx-auto leading-relaxed">
            Mark these important dates in your calendar to stay on track with your application.
          </p>
        </motion.div>

        <div className="relative">
          <motion.div 
            className="absolute left-8 top-0 bottom-0 w-px bg-apple-border"
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
                <motion.div 
                  className={`absolute left-8 w-6 h-6 rounded-full border-2 bg-white flex items-center justify-center transform -translate-x-3 ${
                    item.highlight 
                      ? 'border-apple-blue' 
                      : 'border-apple-border'
                  }`}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
                >
                  {item.icon}
                </motion.div>
                
                <div>
                  <span className={`block ${
                    item.highlight ? 'text-apple-blue font-medium' : 'text-apple-grey'
                  } text-sm mb-1`}>
                    {item.date}
                  </span>
                  <h3 className="text-xl font-serif text-apple-text mb-2 flex items-center gap-2">
                    {item.title}
                    {item.status === 'active' && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                        Current
                      </span>
                    )}
                    {item.highlight && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-apple-blue border border-blue-200">
                        Important
                      </span>
                    )}
                  </h3>
                  <p className="text-apple-grey leading-relaxed">
                    {item.description}
                  </p>
                  
                  {item.highlight && (
                    <div className="mt-3 p-4 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100">
                      <p className="text-sm text-apple-text font-medium">
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
            className="inline-flex items-center gap-2 px-8 py-4 bg-apple-blue hover:bg-apple-blue-hover text-white rounded-full font-medium transition-all duration-300 shadow-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Apply Now</span>
            <ChevronRight size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ApplicationTimeline;
