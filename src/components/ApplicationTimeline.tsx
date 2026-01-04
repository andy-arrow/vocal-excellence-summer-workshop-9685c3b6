
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
    <div className="bg-white rounded-xl md:rounded-2xl shadow-sm overflow-hidden">
      <div className="p-5 md:p-8 border-b border-[#e5e5e5]">
        <h2 className="text-xl md:text-2xl font-semibold text-[#1d1d1f] mb-2 md:mb-3">Your Road to Limassol</h2>
        <p className="text-[#666666] text-base md:text-lg leading-relaxed">
          From application to the stage in five simple steps.
        </p>
      </div>
      
      <div className="p-5 md:p-8">
        <div className="relative">
          <div className="absolute left-9 top-0 bottom-0 w-0.5 bg-[#e0e0e0] hidden md:block"></div>
          
          <div className="space-y-5 md:space-y-8 relative">
            {timelineSteps.map((step, index) => (
              <div 
                key={index}
                className="md:grid md:grid-cols-6 gap-4 items-start"
              >
                <div className="hidden md:flex md:col-span-1 justify-center">
                  <div className="w-[72px] h-[72px] rounded-full bg-white shadow-sm border border-[#e5e5e5] flex items-center justify-center z-10">
                    <div className="w-11 h-11 rounded-full bg-[#f5f5f7] flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-5 bg-[#f5f5f7] rounded-lg md:rounded-xl p-4 md:p-5">
                  <div className="flex md:hidden items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                      {step.icon}
                    </div>
                    <h3 className="text-base font-semibold text-[#1d1d1f]">{step.title}</h3>
                  </div>
                  <div className="md:flex md:items-start md:justify-between gap-4">
                    <div className="space-y-1 md:space-y-2">
                      <h3 className="text-lg font-semibold text-[#1d1d1f] hidden md:block">{step.title}</h3>
                      <p className="text-[#666666] text-sm md:text-base">{step.description}</p>
                    </div>
                    <div className="mt-3 md:mt-0 md:min-w-[130px] md:text-right">
                      <span className="inline-block px-3 py-1.5 bg-white rounded-md text-apple-blue font-medium text-xs md:text-sm">
                        {step.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationTimeline;
