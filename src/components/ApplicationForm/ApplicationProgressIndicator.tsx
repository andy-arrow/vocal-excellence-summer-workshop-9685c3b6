
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ApplicationProgressIndicatorProps {
  steps: string[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

const ApplicationProgressIndicator: React.FC<ApplicationProgressIndicatorProps> = ({ 
  steps, 
  currentStep,
  onStepClick
}) => {
  const isMobile = useIsMobile();
  
  return (
    <motion.div 
      className="flex justify-center w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="w-full max-w-3xl">
        {/* Desktop progress indicator */}
        <div className="hidden md:flex items-center justify-between relative mb-2">
          {/* Progress bar background */}
          <div className="absolute h-1 w-full bg-[#e6e6e6] rounded-full"></div>
          
          {/* Progress bar filled */}
          <motion.div 
            className="absolute h-1 bg-gradient-to-r from-apple-blue via-apple-blue to-apple-blue rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          ></motion.div>
          
          {/* Steps indicators */}
          {steps.map((step, index) => {
            const isActive = index <= currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <motion.div 
                key={step}
                className="relative z-10"
                onClick={() => onStepClick(index)} 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex flex-col items-center cursor-pointer">
                  <div className={`rounded-full transition-colors duration-300 flex items-center justify-center w-10 h-10 ${
                    isCompleted 
                      ? 'bg-apple-blue text-white shadow-md' 
                      : isActive 
                        ? 'bg-apple-blue text-white shadow-md' 
                        : 'bg-[#e6e6e6] text-apple-grey'
                  }`}>
                    {isCompleted ? <Check className="w-5 h-5" /> : index + 1}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${
                    isActive ? 'text-apple-text' : 'text-apple-grey'
                  }`}>
                    {step}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Mobile progress indicator */}
        <div className="flex md:hidden items-center justify-between mb-4">
          <span className="text-sm font-medium text-apple-blue">
            Step {currentStep + 1} of {steps.length}{isMobile ? "" : `: ${steps[currentStep]}`}
          </span>
          <span className="text-sm text-apple-grey">
            {Math.round((currentStep / (steps.length - 1)) * 100)}% Complete
          </span>
        </div>
        
        <div className="w-full h-2 bg-[#e6e6e6] rounded-full md:hidden overflow-hidden">
          <motion.div
            className="h-full bg-apple-blue rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ApplicationProgressIndicator;
