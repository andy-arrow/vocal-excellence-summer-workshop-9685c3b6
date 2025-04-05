
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, Music } from 'lucide-react';
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
        className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-bold py-6 px-12 rounded-xl text-lg relative overflow-hidden group"
      >
        <span className="relative z-10 flex items-center gap-3">
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Music className="w-5 h-5 group-hover:animate-bounce" />
              <span>Submit Application</span>
              <Sparkles className="w-5 h-5 group-hover:animate-pulse-slow" />
            </>
          )}
        </span>
        
        {/* Enhanced background animation */}
        <span className="absolute bottom-0 left-0 w-full h-1 bg-white opacity-25 group-hover:opacity-40 transition-opacity"></span>
        
        {!isSubmitting && (
          <>
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            <span className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            <span className="absolute -bottom-10 -left-10 w-20 h-20 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity delay-100"></span>
            
            {/* Added subtle pulse effect */}
            <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity"></span>
          </>
        )}
      </Button>
    </MotionDiv>
  );
};

export default SubmitButton;
