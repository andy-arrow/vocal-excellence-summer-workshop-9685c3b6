
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Award } from 'lucide-react';
import { APPLICATION_DATES } from '@/constants/applicationDates';

const ApplicationPageHero = () => {
  const currentDate = new Date();
  const deadline = APPLICATION_DATES.DEADLINE;
  const applicationsOpen = currentDate <= deadline;
  
  // Calculate days remaining
  const timeUntilDeadline = deadline.getTime() - currentDate.getTime();
  const daysRemaining = Math.ceil(timeUntilDeadline / (1000 * 60 * 60 * 24));

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Main Heading */}
          <div className="space-y-4">
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Apply Now
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Join the Vocal Excellence Summer Workshop 2025 and transform your voice into an instrument of artistry
            </motion.p>
          </div>

          {/* Application Status */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="inline-block"
          >
            {applicationsOpen ? (
              <div className="bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-2xl p-6 max-w-md mx-auto">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-300 font-semibold text-lg">Applications Open</span>
                </div>
                <p className="text-white text-sm">
                  {daysRemaining > 0 ? (
                    <>
                      <span className="font-bold text-green-300">{daysRemaining}</span> days remaining
                    </>
                  ) : (
                    <>
                      Deadline is <span className="font-bold text-green-300">today</span>!
                    </>
                  )}
                </p>
                <p className="text-blue-200 text-sm mt-1">
                  Deadline: {deadline.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            ) : (
              <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-2xl p-6 max-w-md mx-auto">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span className="text-red-300 font-semibold text-lg">Applications Closed</span>
                </div>
                <p className="text-white text-sm">
                  The deadline has passed. Check back for future opportunities.
                </p>
              </div>
            )}
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { icon: <Calendar className="w-6 h-6" />, label: "5 Days", desc: "Intensive Training" },
              { icon: <Users className="w-6 h-6" />, label: "20 Spots", desc: "Limited Enrollment" },
              { icon: <Award className="w-6 h-6" />, label: "Expert", desc: "World-Class Faculty" },
              { icon: <Clock className="w-6 h-6" />, label: "July 14-18", desc: "2025 Dates" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2 text-blue-300">
                  {stat.icon}
                </div>
                <div className="text-white font-bold text-lg">{stat.label}</div>
                <div className="text-blue-200 text-sm">{stat.desc}</div>
              </div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          {applicationsOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col items-center gap-2 text-blue-200"
            >
              <span className="text-sm">Scroll down to apply</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-6 h-10 border-2 border-blue-300 rounded-full flex justify-center"
              >
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-3 bg-blue-300 rounded-full mt-2"
                />
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ApplicationPageHero;
