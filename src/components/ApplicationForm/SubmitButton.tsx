
import React from 'react';
import { ArrowRight, Check, Loader } from 'lucide-react';
import Spinner from '@/components/ui/spinner';

interface SubmitButtonProps {
  isSubmitting: boolean;
}

const SubmitButton = ({ isSubmitting }: SubmitButtonProps) => {
  return (
    <button 
      type="submit" 
      disabled={isSubmitting}
      className="px-6 py-3 bg-apple-blue hover:bg-apple-blue-hover text-white text-lg font-medium rounded-full
                relative overflow-hidden transition-all duration-300 disabled:opacity-70 
                disabled:cursor-not-allowed disabled:hover:bg-apple-blue shadow-sm 
                min-w-[200px] min-h-[48px]"
      aria-label={isSubmitting ? "Submitting application" : "Submit application"}
      data-testid="submit-application-button"
    >
      <span className="flex items-center justify-center gap-3">
        {isSubmitting ? (
          <>
            <Spinner size="sm" color="white" speed={1} />
            <span className="text-white">Sending application...</span>
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
