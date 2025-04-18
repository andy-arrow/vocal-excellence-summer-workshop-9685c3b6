
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
      className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-lg font-medium rounded-xl 
                relative overflow-hidden transition-all duration-300 disabled:opacity-70 
                disabled:cursor-not-allowed disabled:hover:bg-green-600 shadow-md hover:shadow-lg"
      aria-label={isSubmitting ? "Submitting application" : "Submit application"}
    >
      <span className="flex items-center gap-3">
        {isSubmitting ? (
          <>
            <Spinner size="sm" color="white" speed={1} />
            <span>Sending your application...</span>
          </>
        ) : (
          <>
            <span>Submit Your Application</span>
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </span>
    </button>
  );
};

export default SubmitButton;
