
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { APPLICATION_DATES } from '@/constants/applicationDates';

const ApplicationTimeline = () => {
  const currentDate = new Date();
  
  const timelineItems = [
    {
      date: APPLICATION_DATES.EARLY_BIRD_DEADLINE,
      title: "Early Bird Deadline",
      description: "Submit by this date for priority consideration",
      icon: <Clock className="w-5 h-5" />,
      type: 'early-bird' as const
    },
    {
      date: APPLICATION_DATES.DEADLINE,
      title: "Application Deadline", 
      description: "Final deadline for all applications",
      icon: <Calendar className="w-5 h-5" />,
      type: 'deadline' as const
    },
    {
      date: APPLICATION_DATES.REVIEW_PERIOD_START,
      title: "Review Period Begins",
      description: "Applications under review by our panel",
      icon: <AlertCircle className="w-5 h-5" />,
      type: 'review' as const
    },
    {
      date: APPLICATION_DATES.NOTIFICATION_DATE,
      title: "Notification Date",
      description: "Acceptance notifications sent",
      icon: <CheckCircle2 className="w-5 h-5" />,
      type: 'notification' as const
    },
    {
      date: APPLICATION_DATES.TUITION_DEADLINE,
      title: "Tuition Payment Due",
      description: "Final payment deadline for accepted applicants",
      icon: <Calendar className="w-5 h-5" />,
      type: 'payment' as const
    }
  ];

  const getItemStatus = (date: Date) => {
    if (currentDate > date) return 'completed';
    if (currentDate.toDateString() === date.toDateString()) return 'current';
    return 'upcoming';
  };

  const getStatusColor = (status: string, type: string) => {
    if (status === 'completed') return 'text-green-600 bg-green-100';
    if (status === 'current') return 'text-blue-600 bg-blue-100';
    if (type === 'deadline' || type === 'early-bird') return 'text-orange-600 bg-orange-100';
    return 'text-gray-600 bg-gray-100';
  };

  // Check if applications are still open
  const applicationsOpen = currentDate <= APPLICATION_DATES.DEADLINE;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-apple-text mb-4">
            Application Timeline
          </h2>
          <p className="text-lg text-apple-grey max-w-2xl mx-auto">
            Important dates for the 2026 Summer Workshop application process
          </p>
          
          {applicationsOpen ? (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">
                ✅ Applications are currently open! Submit your application before {APPLICATION_DATES.DEADLINE.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          ) : (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-medium">
                ❌ The application deadline has passed. Please check back for future opportunities.
              </p>
            </div>
          )}
        </motion.div>

        <div className="space-y-8">
          {timelineItems.map((item, index) => {
            const status = getItemStatus(item.date);
            const isImportant = item.type === 'deadline' || item.type === 'early-bird';
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex items-start gap-4 p-6 rounded-xl border transition-all duration-300 ${
                  status === 'current' 
                    ? 'border-blue-300 bg-blue-50 shadow-md' 
                    : isImportant && status === 'upcoming'
                    ? 'border-orange-300 bg-orange-50'
                    : 'border-apple-border bg-white hover:shadow-sm'
                }`}
              >
                <div className={`flex items-center justify-center w-12 h-12 rounded-full ${getStatusColor(status, item.type)}`}>
                  {item.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-apple-text">
                      {item.title}
                    </h3>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      status === 'completed' ? 'bg-green-100 text-green-700' :
                      status === 'current' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {status === 'completed' ? 'Completed' : 
                       status === 'current' ? 'Today' : 'Upcoming'}
                    </span>
                  </div>
                  
                  <p className="text-apple-grey mb-2">
                    {item.description}
                  </p>
                  
                  <p className="text-sm font-medium text-apple-text">
                    {item.date.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ApplicationTimeline;
