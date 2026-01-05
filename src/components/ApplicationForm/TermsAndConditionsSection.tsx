import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { ApplicationFormValues } from './schema';
import { Lock, ShieldCheck, Video } from 'lucide-react';

const TermsAndConditionsSection = () => {
  const form = useFormContext<ApplicationFormValues>();
  const [shakeToggle, setShakeToggle] = useState(false);
  const toggleRef = useRef<HTMLDivElement>(null);

  const triggerShake = () => {
    setShakeToggle(true);
    setTimeout(() => setShakeToggle(false), 500);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div 
        className="relative rounded-xl sm:rounded-[18px] p-4 sm:p-6 border border-black/5 dark:border-white/10"
        style={{
          background: 'rgba(245, 245, 247, 0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          fontFeatureSettings: '"kern" 1',
          WebkitFontSmoothing: 'antialiased',
        }}
      >
        <h3 
          className="mb-2 text-[15px] sm:text-[17px]"
          style={{
            fontWeight: 600,
            color: '#1D1D1F',
            letterSpacing: '-0.01em',
          }}
        >
          Finalizing Your Registration
        </h3>
        
        <p 
          className="mb-4 sm:mb-6 text-[13px] sm:text-[14px]"
          style={{
            lineHeight: 1.5,
            color: '#86868B',
          }}
        >
          Thank you for choosing Vocal Excellence. By proceeding, you acknowledge our{' '}
          <Link 
            to="/terms" 
            target="_blank"
            className="no-underline hover:underline"
            style={{ color: '#0066CC' }}
            data-testid="link-terms-inline"
          >
            Terms of Use
          </Link>
          , which help us maintain the high standard of our intensive.
        </p>

        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-start gap-2.5 sm:gap-3">
            <Lock 
              className="flex-shrink-0 mt-0.5 w-4 h-4 sm:w-[18px] sm:h-[18px]" 
              style={{ color: '#0066CC' }} 
            />
            <p className="text-[12px] sm:text-[13px]" style={{ color: '#424245', lineHeight: 1.5 }}>
              <strong>Your Commitment:</strong> Your deposit is non-refundable to secure your seat.
            </p>
          </div>
          
          <div className="flex items-start gap-2.5 sm:gap-3">
            <ShieldCheck 
              className="flex-shrink-0 mt-0.5 w-4 h-4 sm:w-[18px] sm:h-[18px]" 
              style={{ color: '#0066CC' }} 
            />
            <p className="text-[12px] sm:text-[13px]" style={{ color: '#424245', lineHeight: 1.5 }}>
              <strong>Peace of Mind:</strong> Tuition becomes non-refundable after June 15, 2026. We warmly recommend travel insurance.
            </p>
          </div>
          
          <div className="flex items-start gap-2.5 sm:gap-3">
            <Video 
              className="flex-shrink-0 mt-0.5 w-4 h-4 sm:w-[18px] sm:h-[18px]" 
              style={{ color: '#0066CC' }} 
            />
            <p className="text-[12px] sm:text-[13px]" style={{ color: '#424245', lineHeight: 1.5 }}>
              <strong>Captured Moments:</strong> We film performances! By joining, you agree Vocal Excellence retains rights to share these moments for promotion.
            </p>
          </div>
        </div>

        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-black/5">
          <FormField
            control={form.control}
            name="termsAgreed"
            render={({ field }) => (
              <FormItem>
                <div 
                  ref={toggleRef}
                  className={`flex items-center gap-2.5 sm:gap-3 ${shakeToggle ? 'animate-shake' : ''}`}
                  style={{ minHeight: '44px' }}
                >
                  <FormControl>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={field.value}
                      onClick={() => field.onChange(!field.value)}
                      className="relative flex-shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 rounded-full"
                      style={{
                        width: '46px',
                        height: '28px',
                        backgroundColor: field.value ? '#34C759' : '#E5E5EA',
                        borderRadius: '28px',
                        transition: 'background-color 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                        padding: '2px',
                      }}
                      data-testid="toggle-terms-agreement"
                    >
                      <span
                        style={{
                          display: 'block',
                          width: '24px',
                          height: '24px',
                          backgroundColor: '#FFFFFF',
                          borderRadius: '50%',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                          transform: field.value ? 'translateX(18px)' : 'translateX(0)',
                          transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                        }}
                      />
                    </button>
                  </FormControl>
                  <label 
                    onClick={() => field.onChange(!field.value)}
                    className="cursor-pointer select-none text-[13px] sm:text-[14px]"
                    style={{
                      fontWeight: 500,
                      color: '#1D1D1F',
                    }}
                  >
                    I agree to the terms and am ready to join the program.
                  </label>
                </div>
                <FormMessage className="text-red-600 text-xs sm:text-sm mt-2" />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="text-center space-y-2">
        <p className="text-[12px] sm:text-[13px]" style={{ color: '#86868B' }}>
          Read the full{' '}
          <Link 
            to="/terms" 
            target="_blank"
            className="no-underline hover:underline"
            style={{ color: '#0066CC' }}
            data-testid="link-terms-full"
          >
            Terms of Use
          </Link>
          {' '}and{' '}
          <Link 
            to="/privacy" 
            target="_blank"
            className="no-underline hover:underline"
            style={{ color: '#0066CC' }}
            data-testid="link-privacy-full"
          >
            Privacy Policy
          </Link>
        </p>
      </div>

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
    </div>
  );
};

export default TermsAndConditionsSection;
