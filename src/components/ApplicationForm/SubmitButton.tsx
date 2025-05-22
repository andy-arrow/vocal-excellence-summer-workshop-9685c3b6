
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Spinner from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface SubmitButtonProps {
  isSubmitting: boolean;
}

const SubmitButton = ({ isSubmitting }: SubmitButtonProps) => {
  const isMobile = useIsMobile();
  
  return (
    <Button 
      type="submit" 
      disabled={isSubmitting}
      className="px-4 sm:px-6 py-2 sm:py-3 bg-apple-blue hover:bg-apple-blue-hover text-white font-medium rounded-full
                relative overflow-hidden transition-all duration-300 disabled:opacity-70 
                disabled:cursor-not-allowed disabled:hover:bg-apple-blue shadow-sm 
                min-w-[180px] w-full sm:w-auto min-h-[48px] focus:ring-2 focus:ring-offset-2 focus:ring-apple-blue"
      aria-label={isSubmitting ? "Submitting application" : "Submit application"}
      data-testid="submit-application-button"
    >
      <span className="flex items-center justify-center gap-2 sm:gap-3">
        {isSubmitting ? (
          <>
            <Spinner size="sm" color="white" speed={1} />
            <span className="text-white font-medium">
              {isMobile ? "Sending..." : "Submitting Application..."}
            </span>
          </>
        ) : (
          <>
            <span className="text-white font-medium">
              {isMobile ? "Submit" : "Submit Your Application"}
            </span>
            <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
          </>
        )}
      </span>
    </Button>
  );
};

export default SubmitButton;
