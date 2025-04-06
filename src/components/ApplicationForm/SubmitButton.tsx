
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Spinner from '@/components/ui/spinner';

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
      <motion.div
        className="relative"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-500 hover:to-violet-500 text-white font-bold py-6 px-14 rounded-xl text-lg relative overflow-hidden group"
          aria-label={isSubmitting ? "Submitting application" : "Submit application"}
        >
          <span className="relative z-10 flex items-center gap-3">
            {isSubmitting ? (
              <>
                <Spinner size="sm" color="white" speed={1} />
                <span className="font-outfit tracking-wide">Submitting...</span>
              </>
            ) : (
              <>
                <Mic className="w-5 h-5" />
                <span className="font-outfit tracking-wide">Submit Your Application</span>
                <Sparkles className="w-5 h-5" />
              </>
            )}
          </span>

          {/* Enhanced interactive background elements */}
          {!isSubmitting && (
            <>
              {/* Background pulse */}
              <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity"></span>
              
              {/* Animated border */}
              <MotionDiv
                className="absolute inset-0 border-2 border-white/10 rounded-xl opacity-0 group-hover:opacity-100"
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(255,255,255,0)",
                    "0 0 15px rgba(255,255,255,0.5)",
                    "0 0 0 rgba(255,255,255,0)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Glow effects */}
              <MotionDiv 
                className="absolute -right-3 -top-3 w-16 h-16 bg-gradient-to-br from-fuchsia-400/30 to-violet-500/30 rounded-full blur-xl opacity-0 group-hover:opacity-100"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0, 0.3, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              <MotionDiv 
                className="absolute -left-3 -bottom-3 w-16 h-16 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 rounded-full blur-xl opacity-0 group-hover:opacity-100"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0, 0.3, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              />
            </>
          )}
        </Button>
        
        {/* Enhanced button shadow and glow effects */}
        <MotionDiv
          className="absolute -inset-1 rounded-xl bg-gradient-to-r from-fuchsia-600/30 to-violet-600/30 blur-lg opacity-0 group-hover:opacity-100 -z-10"
          animate={{
            opacity: [0, 0.5, 0],
            scale: [0.95, 1.05, 0.95]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </MotionDiv>
  );
};

export default SubmitButton;
