
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Calendar, Check, ChevronRight, Clock, Users, Wallet, PartyPopper, Star } from 'lucide-react';
import { useInView } from 'framer-motion';

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
    description: "All applications must be submitted by this date.",
    icon: <Clock className="text-violet-400" />,
    status: "upcoming",
    highlight: true
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
    title: "Programme Begins",
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
  const sectionRef = useRef<HTMLElement>(null);
  const controls = useAnimation();
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
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
      className="py-20 bg-gradient-to-b from-slate-900 to-violet-950"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            hidden: { opacity: 0, y: 20 }
          }}
        >
          <motion.div 
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-violet-900/50 border border-violet-600/30 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Clock className="w-4 h-4 mr-2 text-violet-400" />
            <span className="text-xs font-medium text-violet-300">
              {daysRemaining} days until application deadline
            </span>
          </motion.div>
        
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
          animate={controls}
        >
          {/* Timeline line with animation */}
          <motion.div 
            className="absolute left-0 md:left-1/2 top-0 w-px bg-gradient-to-b from-fuchsia-500/30 via-violet-500/30 to-indigo-500/30 md:transform md:-translate-x-1/2"
            style={{ height: '0%' }}
            animate={isInView ? { height: '100%' } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
          ></motion.div>
          
          {timelineItems.map((item, index) => (
            <motion.div 
              key={index} 
              className="relative mb-12 last:mb-0"
              variants={itemVariants}
            >
              <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
                {/* Timeline dot with enhanced animation */}
                <motion.div 
                  className={`absolute left-0 md:left-1/2 w-10 h-10 ${
                    item.highlight ? 'bg-fuchsia-900' : 'bg-slate-800'
                  } rounded-full border-4 ${
                    item.highlight ? 'border-fuchsia-500/70' : 'border-violet-500/30'
                  } flex items-center justify-center md:transform md:-translate-x-1/2 z-10 ${
                    item.highlight ? 'shadow-lg shadow-fuchsia-500/30' : ''
                  }`}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: index * 0.2 + 0.5, duration: 0.5, type: "spring" }}
                >
                  {item.icon}
                  
                  {/* Add pulsing effect to the highlight item */}
                  {item.highlight && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-fuchsia-400"
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 0, 0.7]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    />
                  )}
                </motion.div>
                
                {/* Content card - alternating sides on desktop */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'} pl-16 md:pl-0`}>
                  <motion.div 
                    className={`${
                      item.highlight 
                        ? 'bg-fuchsia-900/30 border-fuchsia-500/30 shadow-lg shadow-fuchsia-900/20' 
                        : 'bg-slate-800/50 border-violet-500/10'
                    } backdrop-blur-sm rounded-xl p-6 hover:bg-slate-800/80 transition-colors duration-300 border`}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <span className={`block ${item.highlight ? 'text-fuchsia-300 font-bold' : 'text-fuchsia-400'} text-sm font-semibold mb-2`}>
                      {item.date}
                    </span>
                    <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                      {item.title}
                      {item.status === 'active' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                          Current
                        </span>
                      )}
                      {item.highlight && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-fuchsia-500/20 text-fuchsia-300">
                          Important
                        </span>
                      )}
                    </h3>
                    <p className={`${item.highlight ? 'text-fuchsia-100/80' : 'text-violet-100/70'}`}>
                      {item.description}
                    </p>
                    
                    {/* Add special callout for the deadline */}
                    {item.highlight && (
                      <div className="mt-4 p-2 bg-fuchsia-800/30 rounded-lg border border-fuchsia-500/20 flex items-center">
                        <Star className="text-yellow-400 w-4 h-4 mr-2 flex-shrink-0" />
                        <p className="text-sm text-fuchsia-200">
                          <strong>{daysRemaining} days remaining</strong> to complete your application
                        </p>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <motion.a 
            href="#application-form"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-500 hover:to-violet-500 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-fuchsia-900/30"
            whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(236, 72, 153, 0.3)" }}
            whileTap={{ scale: 0.97 }}
          >
            <span>Apply Now</span>
            <ChevronRight size={18} />
          </motion.a>
          
          <div className="mt-4 inline-flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse mr-2"></div>
            <p className="text-fuchsia-200 font-medium">Applications close May 15, 2025</p>
            <div className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse ml-2"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ApplicationTimeline;
