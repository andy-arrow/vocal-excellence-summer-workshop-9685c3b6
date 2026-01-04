
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
    <div className="flex justify-center w-full">
      <div className="w-full max-w-3xl">
        {/* Desktop progress indicator */}
        <div className="hidden md:flex items-center justify-between relative mb-2">
          <div className="absolute h-1 w-full bg-[#e6e6e6] rounded-full"></div>
          
          <div 
            className="absolute h-1 bg-apple-blue rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
          
          {steps.map((step, index) => {
            const isActive = index <= currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div 
                key={step}
                className="relative z-10"
                onClick={() => onStepClick(index)} 
              >
                <div className="flex flex-col items-center cursor-pointer">
                  <div className={`rounded-full transition-colors duration-300 flex items-center justify-center w-8 h-8 text-sm font-medium ${
                    isCompleted 
                      ? 'bg-apple-blue text-white' 
                      : isActive 
                        ? 'bg-apple-blue text-white' 
                        : 'bg-[#e6e6e6] text-[#666666]'
                  }`}>
                    {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${
                    isActive ? 'text-[#1d1d1f]' : 'text-[#888888]'
                  }`}>
                    {step}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Mobile progress indicator */}
        <div className="flex md:hidden items-center justify-between mb-3">
          <span className="text-xs font-medium text-apple-blue">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-xs text-[#666666]">
            {Math.round((currentStep / (steps.length - 1)) * 100)}% Complete
          </span>
        </div>
        
        <div className="w-full h-1.5 bg-[#e6e6e6] rounded-full md:hidden overflow-hidden">
          <div
            className="h-full bg-apple-blue rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
        </div>
        
        <div className="md:hidden text-center mt-2">
          <span className="text-xs font-medium text-[#1d1d1f]">{steps[currentStep]}</span>
        </div>
      </div>
    </div>
  );
};

export default ApplicationProgressIndicator;
