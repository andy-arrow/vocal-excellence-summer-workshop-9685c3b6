
import React, { memo } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { trackEvent } from '@/utils/monitoring';

// Memoize the component to prevent unnecessary re-renders
export const SocialLoginButtons = memo(() => {
  const { toast } = useToast();

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth`,
          queryParams: {
            // Force account selection each time
            prompt: 'select_account'
          }
        }
      });

      if (error) {
        console.error('Google Login Error:', error.message);
        trackEvent('auth', 'error', {
          message: 'Google Login Failed',
          details: { error: error.message }
        });
        
        toast({
          title: "Login Failed",
          description: "Unable to login with Google. Please try again.",
          variant: "destructive"
        });
      } else {
        trackEvent('auth', 'info', {
          message: 'Google Login Initiated',
          details: {}
        });
      }
    } catch (err) {
      console.error('Unexpected Google Login Error:', err);
      trackEvent('auth', 'error', {
        message: 'Unexpected Google Login Error',
        details: { error: String(err) }
      });
      
      toast({
        title: "Login Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-3">
      <Button 
        variant="outline" 
        className="w-full flex items-center gap-2 bg-white hover:bg-apple-light text-apple-text border border-apple-border rounded-full py-6" 
        onClick={handleGoogleLogin}
      >
        <GoogleIcon className="h-5 w-5" />
        Continue with Google
      </Button>
    </div>
  );
});

// Updated Google icon for a more minimal, Apple-like style
const GoogleIcon = memo(({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path 
      d="M12 1.95c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm-1.13 14.32c-2.38 0-4.32-1.93-4.32-4.32 0-2.38 1.94-4.32 4.32-4.32 1.16 0 2.13.43 2.88 1.14l-1.17 1.12c-.32-.31-.89-.67-1.7-.67-1.46 0-2.65 1.2-2.65 2.73 0 1.52 1.19 2.73 2.65 2.73 1.69 0 2.33-1.22 2.43-1.85h-2.43v-1.47h4.06c.04.23.06.46.06.71 0 2.49-1.67 4.2-4.13 4.2z"
      fill="currentColor"
    />
  </svg>
));

// Add display names for better debugging
SocialLoginButtons.displayName = 'SocialLoginButtons';
GoogleIcon.displayName = 'GoogleIcon';
