
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Spinner from '@/components/ui/spinner';

interface SubmitButtonProps {
  isSubmitting: boolean;
}

const SubmitButton = ({ isSubmitting }: SubmitButtonProps) => {
  return (
    <button 
      type="submit" 
      disabled={isSubmitting}
      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-base 
                relative overflow-hidden transition-all duration-300 disabled:opacity-70 
                disabled:cursor-not-allowed disabled:hover:bg-blue-600 shadow-sm"
      aria-label={isSubmitting ? "Submitting application" : "Submit application"}
    >
      <span className="flex items-center gap-2">
        {isSubmitting ? (
          <>
            <Spinner size="sm" color="white" speed={1} />
            <span>Submitting...</span>
          </>
        ) : (
          <>
            <span>Submit Application</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </span>
    </button>
  );
};

export default SubmitButton;
