
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles } from 'lucide-react';
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
        className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold py-6 px-12 rounded-xl text-lg relative overflow-hidden group"
      >
        <span className="relative z-10 flex items-center">
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Submit Application
              <Sparkles className="w-5 h-5 ml-2 group-hover:animate-pulse-slow" />
            </>
          )}
        </span>
        
        {/* Background animation */}
        <span className="absolute bottom-0 left-0 w-full h-1 bg-white opacity-20 group-hover:opacity-30 transition-opacity"></span>
        
        {!isSubmitting && (
          <>
            <span className="absolute top-0 left-0 w-full h-full bg-white/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
            <span className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            <span className="absolute -bottom-10 -left-10 w-20 h-20 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity delay-100"></span>
          </>
        )}
      </Button>
    </MotionDiv>
  );
};

export default SubmitButton;
