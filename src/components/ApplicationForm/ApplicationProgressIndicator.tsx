
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Check, Circle } from 'lucide-react';

interface ApplicationProgressIndicatorProps {
  steps: string[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

const ApplicationProgressIndicator = ({
  steps,
  currentStep,
  onStepClick
}: ApplicationProgressIndicatorProps) => {
  return (
    <div className="flex justify-center my-8">
      <div className="flex items-center space-x-1 md:space-x-2">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          
          return (
            <React.Fragment key={`step-${index}`}>
              {index > 0 && (
                <div 
                  className={cn(
                    "h-0.5 w-5 md:w-8", 
                    index <= currentStep ? "bg-apple-blue" : "bg-gray-200"
                  )}
                />
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onStepClick(index)}
                className={cn(
                  "flex flex-col items-center cursor-pointer group transition-all",
                  (isCompleted || isCurrent) ? "opacity-100" : "opacity-60 hover:opacity-80"
                )}
                type="button"
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all",
                  isCompleted ? "bg-apple-blue border-apple-blue" : 
                  isCurrent ? "border-apple-blue" : "border-gray-300"
                )}>
                  {isCompleted ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <Circle className={cn(
                      "w-2 h-2", 
                      isCurrent ? "text-apple-blue" : "text-gray-300"
                    )} />
                  )}
                </div>
                <span className={cn(
                  "text-xs mt-1 font-medium transition-all", 
                  isCompleted ? "text-apple-blue" : 
                  isCurrent ? "text-apple-text" : "text-gray-400 group-hover:text-gray-600"
                )}>
                  {step}
                </span>
              </motion.button>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ApplicationProgressIndicator;
