
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Check, ChevronRight, Wallet, PartyPopper } from 'lucide-react';
import { useInView } from 'framer-motion';
import { format, differenceInDays } from 'date-fns';

// Define key dates as constants that can be reused throughout the application
export const APPLICATION_DATES = {
  OPEN_DATE: new Date('2025-03-01'),
  DEADLINE: new Date('2025-05-15'),
  EARLY_BIRD_DEADLINE: new Date('2025-04-30'),
  NOTIFICATIONS: new Date('2025-06-01'),
  TUITION_DEADLINE: new Date('2025-06-15'),
  PROGRAM_START: new Date('2025-07-14')
};

const ApplicationTimeline = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const today = new Date();
  
  const getTimelineItemStatus = (date: Date) => {
    const isPast = today > date;
    const isToday = today.toDateString() === date.toDateString();
    
    if (isPast && !isToday) {
      return "completed";
    } else if (isToday) {
      return "active";
    } else {
      return "upcoming";
    }
  };
  
  const calculateDaysRemaining = (deadline: Date) => {
    return Math.max(0, differenceInDays(deadline, today));
  };
  
  const timelineItems = [
    {
      date: format(APPLICATION_DATES.OPEN_DATE, "MMMM d, yyyy"),
      title: "Applications Open",
      description: "Early application is encouraged as spaces fill quickly.",
      icon: <Calendar className="text-apple-blue" />,
      status: getTimelineItemStatus(APPLICATION_DATES.OPEN_DATE)
    },
    {
      date: format(APPLICATION_DATES.DEADLINE, "MMMM d, yyyy"),
      title: "Application Deadline",
      description: "All applications must be submitted by this date.",
      icon: <Clock className="text-apple-blue" />,
      status: getTimelineItemStatus(APPLICATION_DATES.DEADLINE),
      highlight: true,
      deadlineDate: APPLICATION_DATES.DEADLINE
    },
    {
      date: format(APPLICATION_DATES.NOTIFICATIONS, "MMMM d, yyyy"),
      title: "Final Notifications",
      description: "All applicants will be notified of their acceptance status.",
      icon: <Check className="text-apple-blue" />,
      status: getTimelineItemStatus(APPLICATION_DATES.NOTIFICATIONS)
    },
    {
      date: format(APPLICATION_DATES.TUITION_DEADLINE, "MMMM d, yyyy"),
      title: "Tuition Deadline",
      description: "Full payment (€999) due to secure your place.",
      icon: <Wallet className="text-apple-blue" />,
      status: getTimelineItemStatus(APPLICATION_DATES.TUITION_DEADLINE)
    },
    {
      date: format(APPLICATION_DATES.PROGRAM_START, "MMMM d, yyyy"),
      title: "Programme Begins",
      description: "Welcome reception and orientation.",
      icon: <PartyPopper className="text-apple-blue" />,
      status: getTimelineItemStatus(APPLICATION_DATES.PROGRAM_START)
    }
  ];

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
                      : item.status === 'completed' 
                        ? 'border-green-500' 
                        : item.status === 'active' 
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
                    {item.status === 'completed' && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                        Completed
                      </span>
                    )}
                    {item.highlight && item.status === 'upcoming' && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-apple-blue border border-blue-200">
                        Important
                      </span>
                    )}
                  </h3>
                  <p className="text-apple-grey leading-relaxed">
                    {item.description}
                  </p>
                  
                  {item.highlight && item.status === 'upcoming' && 'deadlineDate' in item && (
                    <div className="mt-3 p-4 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100">
                      <p className="text-sm text-apple-text font-medium">
                        <strong>{calculateDaysRemaining(item.deadlineDate as Date)} days remaining</strong> to complete your application
                      </p>
                    </div>
                  )}

                  {item.highlight && item.status === 'active' && (
                    <div className="mt-3 p-4 bg-gradient-to-br from-amber-50 to-white rounded-xl border border-amber-100">
                      <p className="text-sm text-amber-700 font-medium">
                        <strong>Application deadline is today!</strong> Submit your application as soon as possible.
                      </p>
                    </div>
                  )}

                  {item.highlight && item.status === 'completed' && (
                    <div className="mt-3 p-4 bg-gradient-to-br from-red-50 to-white rounded-xl border border-red-100">
                      <p className="text-sm text-red-700 font-medium">
                        <strong>Application deadline has passed.</strong> Contact admissions for late application options.
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
            className={`inline-flex items-center gap-2 px-8 py-4 ${
              today > APPLICATION_DATES.DEADLINE
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-apple-blue hover:bg-apple-blue-hover cursor-pointer'
            } text-white rounded-full font-medium transition-all duration-300 shadow-sm`}
            whileHover={today <= APPLICATION_DATES.DEADLINE ? { scale: 1.02 } : {}}
            whileTap={today <= APPLICATION_DATES.DEADLINE ? { scale: 0.98 } : {}}
          >
            {today > APPLICATION_DATES.DEADLINE ? 'Applications Closed' : 'Apply Now'}
            {today <= APPLICATION_DATES.DEADLINE && <ChevronRight size={18} />}
          </motion.a>
          {today > APPLICATION_DATES.DEADLINE && (
            <p className="mt-3 text-apple-grey">
              The application deadline has passed. Contact us for late application options.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ApplicationTimeline;
