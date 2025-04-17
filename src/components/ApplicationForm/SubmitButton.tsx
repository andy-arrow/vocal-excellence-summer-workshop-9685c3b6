
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
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
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-8 rounded-xl text-base relative overflow-hidden group transition-all duration-300 focus:ring-2 focus:ring-gray-500/50 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={isSubmitting ? "Submitting application" : "Submit application"}
        >
          <span className="relative z-10 flex items-center gap-3">
            {isSubmitting ? (
              <>
                <Spinner size="sm" color="white" speed={1} />
                <span className="tracking-tight">Submitting...</span>
              </>
            ) : (
              <>
                <span className="tracking-tight">Submit Application</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </>
            )}
          </span>
        </Button>
      </motion.div>
    </MotionDiv>
  );
};

export default SubmitButton;
