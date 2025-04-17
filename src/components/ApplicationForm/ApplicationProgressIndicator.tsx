
import React from 'react';

interface ApplicationProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

const ApplicationProgressIndicator: React.FC<ApplicationProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  stepTitles
}) => {
  const percentage = (currentStep / totalSteps) * 100;
  
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Step {currentStep} of {totalSteps}</span>
        <span className="text-sm font-medium text-gray-700">{Math.round(percentage)}% Complete</span>
      </div>
      
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
      
      <div className="hidden md:flex justify-between mt-2">
        {stepTitles.map((title, index) => {
          const isActive = currentStep > index;
          const isCurrentStep = currentStep === index + 1;
          
          return (
            <div key={index} className="flex flex-col items-center max-w-[100px]">
              <div 
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mb-1
                  ${isCurrentStep 
                    ? 'bg-blue-600 text-white' 
                    : isActive 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-gray-100 text-gray-500'}`}
              >
                {index + 1}
              </div>
              <span 
                className={`text-xs text-center truncate w-full
                  ${isCurrentStep 
                    ? 'text-blue-600 font-medium' 
                    : isActive 
                      ? 'text-gray-700' 
                      : 'text-gray-500'}`}
              >
                {title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ApplicationProgressIndicator;
