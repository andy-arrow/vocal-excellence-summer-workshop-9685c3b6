
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Spinner from '@/components/ui/spinner';

interface SubmitButtonProps {
  isSubmitting: boolean;
  onClick?: () => void;
}

const SubmitButton = ({ isSubmitting, onClick }: SubmitButtonProps) => {
  const handleClick = (e: React.MouseEvent) => {
    // Don't call onClick if form is submitting to prevent multiple submissions
    if (isSubmitting) return;
    
    if (onClick) {
      onClick();
    }
  };

  return (
    <button 
      type="submit" 
      disabled={isSubmitting}
      className="px-6 py-3 bg-apple-blue hover:bg-apple-blue-hover text-white text-lg font-medium rounded-full
                relative overflow-hidden transition-all duration-300 disabled:opacity-70 
                disabled:cursor-not-allowed disabled:hover:bg-apple-blue shadow-sm"
      aria-label={isSubmitting ? "Submitting application" : "Submit application"}
      onClick={handleClick}
    >
      <span className="flex items-center gap-3">
        {isSubmitting ? (
          <>
            <Spinner size="sm" color="white" speed={1} />
            <span className="text-white">Sending your application...</span>
          </>
        ) : (
          <>
            <span className="text-white">Submit Your Application</span>
            <ArrowRight className="w-5 h-5 text-white" />
          </>
        )}
      </span>
    </button>
  );
};

export default SubmitButton;
