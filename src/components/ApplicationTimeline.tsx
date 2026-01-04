
import React from 'react';
import { motion } from 'framer-motion';
import { Send, Users, Bell, CreditCard, Sparkles } from 'lucide-react';
import { APPLICATION_DATES } from '@/constants/applicationDates';
import { format } from 'date-fns';

const ApplicationTimeline = () => {
  const deadlineDate = format(APPLICATION_DATES.DEADLINE, 'MMMM d, yyyy');
  const reviewPeriod = `${format(APPLICATION_DATES.REVIEW_PERIOD_START, 'MMMM d')} – ${format(APPLICATION_DATES.REVIEW_PERIOD_END, 'd, yyyy')}`;
  const notificationDate = format(APPLICATION_DATES.NOTIFICATION_DATE, 'MMMM d, yyyy');
  const tuitionDeadline = format(APPLICATION_DATES.TUITION_DEADLINE, 'MMMM d, yyyy');
  const workshopStart = format(APPLICATION_DATES.PROGRAM_START, 'MMMM d, yyyy');

  const timelineSteps = [
    {
      icon: <Send className="w-5 h-5 text-purple-500" />,
      title: "Submit Application",
      description: "Complete your online profile and statement of interest.",
      date: `Deadline: ${deadlineDate}`,
    },
    {
      icon: <Users className="w-5 h-5 text-blue-500" />,
      title: "Faculty Review",
      description: "Our directors review all applications to select the final cohort.",
      date: reviewPeriod,
    },
    {
      icon: <Bell className="w-5 h-5 text-amber-500" />,
      title: "Decision Notification",
      description: "Check your email for your acceptance letter and registration details.",
      date: notificationDate,
    },
    {
      icon: <CreditCard className="w-5 h-5 text-green-500" />,
      title: "Secure Your Seat",
      description: "Confirm your attendance by placing your deposit.",
      date: `By ${tuitionDeadline}`,
    },
    {
      icon: <Sparkles className="w-5 h-5 text-rose-500" />,
      title: "The Workshop Begins",
      description: "We welcome you to Limassol for Day 1 of training.",
      date: workshopStart,
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="p-6 sm:p-8 md:p-10 border-b border-apple-border/10">
        <h2 className="text-2xl md:text-3xl font-semibold text-apple-text mb-4">Your Road to Limassol</h2>
        <p className="text-apple-grey text-base sm:text-lg leading-relaxed">
          From application to the stage in five simple steps.
        </p>
      </div>
      
      <div className="p-6 sm:p-8 md:p-10">
        <div className="relative">
          <div className="absolute left-9 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-rose-500 hidden md:block"></div>
          
          <div className="space-y-8 md:space-y-12 relative">
            {timelineSteps.map((step, index) => (
              <motion.div 
                key={index}
                className="md:grid md:grid-cols-6 gap-4 items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="hidden md:flex md:col-span-1 justify-center">
                  <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center z-10">
                    <div className="w-12 h-12 rounded-full bg-apple-light flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-5 bg-apple-light rounded-xl p-5 sm:p-6 shadow-sm">
                  <div className="flex md:hidden items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-apple-text">{step.title}</h3>
                  </div>
                  <div className="md:flex md:items-start md:justify-between">
                    <div className="space-y-2 md:space-y-3">
                      <h3 className="text-xl font-semibold text-apple-text hidden md:block">{step.title}</h3>
                      <p className="text-apple-grey text-sm sm:text-base">{step.description}</p>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-4 md:min-w-[140px] text-right">
                      <span className="inline-block px-3 py-1.5 bg-white rounded-lg text-apple-blue font-medium text-xs sm:text-sm shadow-sm">
                        {step.date}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationTimeline;
