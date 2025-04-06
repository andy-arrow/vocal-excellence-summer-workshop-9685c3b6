
import React, { useEffect } from 'react';
import { Check, Calendar, Mail, ArrowRight, Music, Star, Download, Twitter, Instagram, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }
  }
};

const floatingNotes = Array(5).fill(null);

const SubmissionSuccessMessage = () => {
  // Trigger confetti effect when component mounts
  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    
    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };
    
    const confettiAnimation = () => {
      const timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) return;
      
      const particleCount = 40 * (timeLeft / duration);
      
      // Launch confetti from both sides
      confetti({
        particleCount: particleCount,
        spread: 80,
        angle: randomInRange(55, 125),
        origin: { x: randomInRange(0.1, 0.3), y: randomInRange(0.1, 0.3) },
        colors: ['#c026d3', '#8b5cf6', '#7c3aed', '#a855f7', '#6366f1'],
      });
      
      confetti({
        particleCount: particleCount,
        spread: 80,
        angle: randomInRange(55, 125),
        origin: { x: randomInRange(0.7, 0.9), y: randomInRange(0.1, 0.3) },
        colors: ['#c026d3', '#8b5cf6', '#7c3aed', '#a855f7', '#6366f1'],
      });
      
      requestAnimationFrame(confettiAnimation);
    };
    
    requestAnimationFrame(confettiAnimation);
  }, []);

  return (
    <section id="application-success" className="py-16 md:py-32 bg-gradient-to-b from-slate-900 via-violet-950 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[url('/subtle-noise.png')] opacity-5"></div>
      
      {/* Floating music notes animation */}
      {floatingNotes.map((_, index) => (
        <motion.div
          key={index}
          className="absolute text-fuchsia-500/20"
          initial={{ 
            x: `${Math.random() * 100}%`, 
            y: `${Math.random() * 100}%`,
            opacity: 0,
            scale: 0.5,
            rotate: Math.random() * 360
          }}
          animate={{ 
            y: [null, '-100vh'],
            opacity: [0, 0.5, 0],
            scale: [0.5, Math.random() * 0.5 + 0.7],
            rotate: Math.random() * 360
          }}
          transition={{ 
            duration: Math.random() * 15 + 20,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          style={{ left: `${Math.random() * 100}%`, fontSize: `${Math.random() * 2 + 1}rem` }}
        >
          {index % 2 === 0 ? '♪' : '♫'}
        </motion.div>
      ))}
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div 
          className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md border border-green-500/20 rounded-2xl overflow-hidden shadow-2xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="p-1">
            <div className="h-2 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 rounded-t-xl"></div>
          </div>
          
          <div className="p-8 md:p-12">
            <motion.div 
              className="flex justify-center mb-10"
              variants={itemVariants}
            >
              <motion.div 
                className="bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-full p-5"
                animate={{ 
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 0 rgba(34, 197, 94, 0)",
                    "0 0 20px rgba(34, 197, 94, 0.5)",
                    "0 0 0 rgba(34, 197, 94, 0)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: 0.5
                  }}
                >
                  <Check size={60} className="text-green-500" />
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="text-center mb-12"
              variants={itemVariants}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 font-outfit text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-400">
                Application Submitted Successfully!
              </h2>
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Congratulations! Your journey with the Vocal Excellence Summer Workshop 2025 has officially begun. We're thrilled about the possibility of working with you to develop your unique vocal talent.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-2 gap-6 mb-12"
              variants={itemVariants}
            >
              <motion.div 
                className="bg-slate-800/50 rounded-xl p-6 border border-green-500/20 hover:border-green-500/40 transition-colors duration-300"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-500/10 p-3 rounded-lg">
                    <Mail className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-medium text-white">Check Your Email</h3>
                </div>
                <p className="text-slate-300">
                  We've sent a detailed confirmation to your email with a copy of your application and next steps in the selection process.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-slate-800/50 rounded-xl p-6 border border-green-500/20 hover:border-green-500/40 transition-colors duration-300"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-500/10 p-3 rounded-lg">
                    <Calendar className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-medium text-white">What's Next</h3>
                </div>
                <p className="text-slate-300">
                  Our selection committee will review your application within 10 business days. Shortlisted candidates will be invited for a brief online interview and audition.
                </p>
              </motion.div>
            </motion.div>
            
            <motion.div
              className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-green-500/10 rounded-xl p-6 mb-12"
              variants={itemVariants}
            >
              <h3 className="text-xl font-medium text-white mb-4 flex items-center gap-2">
                <Star className="text-yellow-500" />
                <span>Preparation Tips</span>
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="bg-green-500/10 p-1.5 rounded-full mt-0.5">
                    <Check size={14} className="text-green-500" />
                  </div>
                  <span className="text-slate-300">Continue practicing your audition pieces to refine your technique</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-500/10 p-1.5 rounded-full mt-0.5">
                    <Check size={14} className="text-green-500" />
                  </div>
                  <span className="text-slate-300">Review the preparation materials in your confirmation email</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-500/10 p-1.5 rounded-full mt-0.5">
                    <Check size={14} className="text-green-500" />
                  </div>
                  <span className="text-slate-300">Follow us on social media for workshop updates and vocal technique tips</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div className="flex flex-col items-center gap-8" variants={itemVariants}>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button 
                  asChild
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-6 py-2 rounded-lg"
                >
                  <Link to="/">
                    <span>Return to Home</span>
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
                
                <Button 
                  asChild
                  className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-lg"
                >
                  <a href="mailto:applications@vocalexcellence.org" target="_blank" rel="noopener noreferrer">
                    <Mail size={16} className="mr-2" />
                    <span>Contact Admissions</span>
                  </a>
                </Button>
              </div>
              
              <div className="border-t border-slate-700/50 pt-8 w-full">
                <p className="text-center text-slate-400 mb-4">Share your excitement!</p>
                <div className="flex justify-center gap-4">
                  <motion.a 
                    href="https://twitter.com/intent/tweet?text=I%20just%20applied%20to%20the%20Vocal%20Excellence%20Summer%20Workshop%202025!%20%23VocalExcellence%20%23MusicEducation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 p-3 rounded-full text-[#1DA1F2]"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Twitter size={20} />
                    <span className="sr-only">Share on Twitter</span>
                  </motion.a>
                  <motion.a 
                    href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fvocalexcellence.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#4267B2]/10 hover:bg-[#4267B2]/20 p-3 rounded-full text-[#4267B2]"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Facebook size={20} />
                    <span className="sr-only">Share on Facebook</span>
                  </motion.a>
                  <motion.a 
                    href="https://www.instagram.com/vocalexcellence"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#C13584]/10 hover:bg-[#C13584]/20 p-3 rounded-full text-[#C13584]"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Instagram size={20} />
                    <span className="sr-only">Share on Instagram</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SubmissionSuccessMessage;
