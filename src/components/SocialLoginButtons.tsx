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
            // Removed domain restriction (hd parameter)
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
        className="w-full flex items-center gap-2 bg-white hover:bg-[#f5f5f7] text-[#1d1d1f] border border-[#d2d2d7] rounded-full py-6" 
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
      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 7H13V13H11V7ZM11 15H13V17H11V15Z"
      fill="currentColor"
    />
  </svg>
));

// Add display names for better debugging
SocialLoginButtons.displayName = 'SocialLoginButtons';
GoogleIcon.displayName = 'GoogleIcon';
