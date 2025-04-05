
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Check, ChevronRight, Clock, Users, Wallet, PartyPopper } from 'lucide-react';

const timelineItems = [
  {
    date: "March 1, 2025",
    title: "Applications Open",
    description: "Early application is encouraged as spaces fill quickly.",
    icon: <Calendar className="text-fuchsia-400" />,
    status: "active"
  },
  {
    date: "May 15, 2025",
    title: "Application Deadline",
    description: "All materials must be submitted by this date.",
    icon: <Clock className="text-violet-400" />,
    status: "upcoming"
  },
  {
    date: "June 1, 2025",
    title: "Final Notifications",
    description: "All applicants will be notified of their acceptance status.",
    icon: <Check className="text-indigo-400" />,
    status: "upcoming"
  },
  {
    date: "June 15, 2025",
    title: "Tuition Deadline",
    description: "Full payment due to secure your place.",
    icon: <Wallet className="text-purple-400" />,
    status: "upcoming"
  },
  {
    date: "July 14, 2025",
    title: "Program Begins",
    description: "Welcome reception and orientation.",
    icon: <PartyPopper className="text-pink-400" />,
    status: "upcoming"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const ApplicationTimeline = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-violet-950">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-200 to-fuchsia-200">
            Application Timeline
          </h2>
          <p className="text-lg text-violet-100/80 max-w-2xl mx-auto">
            Mark these important dates in your calendar to stay on track with your application.
          </p>
        </motion.div>
        
        <motion.div 
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 h-full w-px bg-gradient-to-b from-fuchsia-500/30 via-violet-500/30 to-indigo-500/30 md:transform md:-translate-x-1/2"></div>
          
          {timelineItems.map((item, index) => (
            <motion.div 
              key={index} 
              className="relative mb-12 last:mb-0"
              variants={itemVariants}
            >
              <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-10 h-10 bg-slate-800 rounded-full border-4 border-violet-500/30 flex items-center justify-center md:transform md:-translate-x-1/2 z-10">
                  {item.icon}
                </div>
                
                {/* Content card - alternating sides on desktop */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'} pl-16 md:pl-0`}>
                  <motion.div 
                    className="bg-slate-800/50 backdrop-blur-sm border border-violet-500/10 rounded-xl p-6 hover:bg-slate-800/80 transition-colors duration-300"
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <span className="block text-fuchsia-400 text-sm font-semibold mb-2">{item.date}</span>
                    <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                      {item.title}
                      {item.status === 'active' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                          Current
                        </span>
                      )}
                    </h3>
                    <p className="text-violet-100/70">{item.description}</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.a 
            href="#application-form"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-500 hover:to-violet-500 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-fuchsia-900/30"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
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
