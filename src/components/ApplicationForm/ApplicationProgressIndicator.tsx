
import React from 'react';
import { motion } from 'framer-motion';

interface ApplicationProgressIndicatorProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
}

const ApplicationProgressIndicator: React.FC<ApplicationProgressIndicatorProps> = ({
  steps,
  currentStep,
  onStepClick
}) => {
  return (
    <div className="py-5">
      <div className="hidden md:flex items-center justify-center space-x-2">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div 
              className={`flex flex-col items-center cursor-pointer ${onStepClick ? 'cursor-pointer' : 'cursor-default'}`}
              onClick={() => onStepClick && onStepClick(index)}
            >
              <div 
                className={`
                  flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors
                  ${index < currentStep 
                    ? 'bg-apple-blue text-white'
                    : index === currentStep
                      ? 'bg-apple-blue text-white ring-4 ring-apple-blue/20'
                      : 'bg-apple-border/40 text-apple-grey'
                  }
                `}
              >
                {index + 1}
              </div>
              <span className={`
                mt-2 text-xs font-medium 
                ${index === currentStep ? 'text-apple-blue' : 'text-apple-grey'}
              `}>
                {step}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div 
                className={`w-12 h-0.5 ${
                  index < currentStep ? 'bg-apple-blue' : 'bg-apple-border/40'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Mobile view */}
      <div className="flex items-center justify-between md:hidden">
        <div className="text-sm font-medium text-apple-blue">
          Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
        </div>
        <div className="text-xs text-apple-grey">
          {Math.round((currentStep / (steps.length - 1)) * 100)}%
        </div>
      </div>
      
      <div className="mt-2 h-1 w-full bg-apple-border/20 rounded-full overflow-hidden md:hidden">
        <motion.div 
          className="h-full bg-apple-blue"
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};

export default ApplicationProgressIndicator;
