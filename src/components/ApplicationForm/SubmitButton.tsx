
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, Music, Mic } from 'lucide-react';
import { motion } from 'framer-motion';

interface SubmitButtonProps {
  isSubmitting: boolean;
}

const MotionDiv = motion.div;

const SubmitButton = ({ isSubmitting }: SubmitButtonProps) => {
  return (
    <MotionDiv 
      className="flex justify-center pt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700 text-white font-bold py-6 px-12 rounded-xl text-lg relative overflow-hidden group"
        aria-label={isSubmitting ? "Submitting application" : "Submit application"}
      >
        <span className="relative z-10 flex items-center gap-3">
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="font-outfit tracking-wide">Submitting...</span>
            </>
          ) : (
            <>
              <Mic className="w-5 h-5 group-hover:animate-bounce" />
              <span className="font-outfit tracking-wide">Submit Application</span>
              <Sparkles className="w-5 h-5 group-hover:animate-pulse-slow" />
            </>
          )}
        </span>

        {/* Enhanced interactive background elements */}
        {!isSubmitting && (
          <>
            {/* Background pulse */}
            <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity"></span>
            
            {/* Animated border */}
            <span className="absolute inset-0 border-2 border-white/10 rounded-xl scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300"></span>
            
            {/* Decorative elements */}
            <span className="absolute -right-3 -top-3 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity"></span>
            <span className="absolute -left-3 -bottom-3 w-16 h-16 bg-gradient-to-br from-indigo-400 to-cyan-400 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity"></span>
            
            {/* Music note animations */}
            <MotionDiv 
              className="absolute -right-4 -top-4 text-white/20 text-2xl"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], y: -20 }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              ♪
            </MotionDiv>
            <MotionDiv 
              className="absolute -left-4 -top-2 text-white/20 text-xl"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], y: -15 }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5, delay: 0.5 }}
            >
              ♫
            </MotionDiv>
          </>
        )}
      </Button>
    </MotionDiv>
  );
};

export default SubmitButton;
