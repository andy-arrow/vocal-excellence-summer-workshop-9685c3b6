
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Spinner from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';

interface SubmitButtonProps {
  isSubmitting: boolean;
}

const SubmitButton = ({ isSubmitting }: SubmitButtonProps) => {
  return (
    <Button 
      type="submit" 
      disabled={isSubmitting}
      className="px-6 py-3 bg-apple-blue hover:bg-apple-blue-hover text-white font-medium rounded-full
                relative overflow-hidden transition-all duration-300 disabled:opacity-70 
                disabled:cursor-not-allowed disabled:hover:bg-apple-blue shadow-sm 
                min-w-[180px] w-full sm:w-auto min-h-[48px] focus:ring-2 focus:ring-offset-2 focus:ring-apple-blue"
      aria-label={isSubmitting ? "Submitting application" : "Submit application"}
      data-testid="submit-application-button"
    >
      <span className="flex items-center justify-center gap-3">
        {isSubmitting ? (
          <>
            <Spinner size="sm" color="white" speed={1} />
            <span className="text-white font-medium">Sending...</span>
          </>
        ) : (
          <>
            <span className="text-white font-medium">Submit Your Application</span>
            <ArrowRight className="w-5 h-5 text-white" />
          </>
        )}
      </span>
    </Button>
  );
};

export default SubmitButton;
