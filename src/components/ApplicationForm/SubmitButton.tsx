import { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Spinner from '@/components/ui/spinner';
import { useFormContext } from 'react-hook-form';
import { ApplicationFormValues } from './schema';

interface SubmitButtonProps {
  isSubmitting: boolean;
}

const SubmitButton = ({ isSubmitting }: SubmitButtonProps) => {
  const form = useFormContext<ApplicationFormValues>();
  const termsAgreed = form.watch('termsAgreed');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [shake, setShake] = useState(false);

  const isDisabled = !termsAgreed || isSubmitting;

  const handleClick = (e: React.MouseEvent) => {
    if (!termsAgreed && !isSubmitting) {
      e.preventDefault();
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="submit"
        disabled={isDisabled}
        onClick={handleClick}
        className={`
          px-4 sm:px-6 py-2.5 sm:py-3 font-medium rounded-full
          relative overflow-hidden
          min-w-[140px] sm:min-w-[180px] min-h-[44px] sm:min-h-[48px]
          focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500
          ${shake ? 'animate-shake' : ''}
        `}
        style={{
          backgroundColor: '#0066CC',
          color: '#FFFFFF',
          opacity: isDisabled ? 0.3 : 1,
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          filter: isDisabled ? 'grayscale(100%)' : 'none',
          transition: 'all 0.4s ease',
          transform: !isDisabled ? 'scale(1)' : 'scale(1)',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          fontFeatureSettings: '"kern" 1',
          WebkitFontSmoothing: 'antialiased',
        }}
        aria-label={isSubmitting ? "Submitting application" : "Submit application"}
        data-testid="submit-application-button"
      >
        <span className="flex items-center justify-center gap-1.5 sm:gap-2">
          {isSubmitting ? (
            <>
              <Spinner size="sm" color="white" speed={1} />
              <span className="text-[13px] sm:text-[15px] font-medium">
                Submitting...
              </span>
            </>
          ) : (
            <>
              <span className="text-[13px] sm:text-[15px] font-medium">
                Submit Application
              </span>
              <ArrowRight className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </>
          )}
        </span>
      </button>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-5px); }
          40% { transform: translateX(5px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default SubmitButton;
