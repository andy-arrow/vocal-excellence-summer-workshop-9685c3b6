
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Sparkles, Star, Stars } from 'lucide-react';
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
                <Spinner size="sm" color="white" />
                <span className="font-outfit tracking-wide">Submitting...</span>
              </>
            ) : (
              <>
                <MotionDiv
                  animate={{ 
                    y: [0, -5, 0],
                    rotate: [-5, 5, -5]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Mic className="w-5 h-5" />
                </MotionDiv>
                <span className="font-outfit tracking-wide">Submit Application</span>
                <MotionDiv
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-5 h-5" />
                </MotionDiv>
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
              
              {/* Sparkle effects */}
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
              
              {/* Flying stars animation */}
              <MotionDiv 
                className="absolute top-0 left-0 text-white/10 text-xs"
                animate={{ 
                  y: [-10, -30],
                  x: [0, -20],
                  opacity: [0, 1, 0],
                  rotate: [0, 180]
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                <Star size={12} />
              </MotionDiv>
              
              <MotionDiv 
                className="absolute bottom-0 right-0 text-white/10 text-xs"
                animate={{ 
                  y: [10, 30],
                  x: [0, 20],
                  opacity: [0, 1, 0],
                  rotate: [0, 180]
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5, delay: 0.5 }}
              >
                <Star size={12} />
              </MotionDiv>
              
              {/* Music notes animation */}
              <MotionDiv 
                className="absolute -right-2 top-1/2 text-white/20 text-2xl"
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  y: [-10, -30],
                  x: [0, 10],
                  rotate: [0, 10]
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                ♪
              </MotionDiv>
              
              <MotionDiv 
                className="absolute -left-2 top-1/3 text-white/20 text-xl"
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  y: [0, -20],
                  x: [0, -10],
                  rotate: [0, -10]
                }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.7, delay: 0.2 }}
              >
                ♫
              </MotionDiv>
            </>
          )}
        </Button>
        
        {/* Button shadow and glow effects */}
        <MotionDiv
          className="absolute -inset-1 rounded-xl bg-gradient-to-r from-fuchsia-600/30 to-violet-600/30 blur-lg opacity-0 group-hover:opacity-100 -z-10"
          animate={{
            opacity: [0, 0.5, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </MotionDiv>
  );
};

export default SubmitButton;
