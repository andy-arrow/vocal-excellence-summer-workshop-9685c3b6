
import React from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Mail } from 'lucide-react';  // Changed back to Mail since Google isn't available
import { useToast } from '@/hooks/use-toast';
import { trackEvent } from '@/utils/monitoring';

export const SocialLoginButtons = () => {
  const { toast } = useToast();

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth`
        }
      });

      if (error) {
        console.error('Google Login Error:', error.message);
        trackEvent('auth', 'error', {
          message: 'Google Login Failed',
          details: error.message
        });
        
        toast({
          title: "Login Failed",
          description: "Unable to login with Google. Please try again.",
          variant: "destructive"
        });
      } else {
        trackEvent('auth', 'info', {
          message: 'Google Login Initiated'
        });
      }
    } catch (err) {
      console.error('Unexpected Google Login Error:', err);
      trackEvent('auth', 'error', {
        message: 'Unexpected Google Login Error',
        details: String(err)
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
        className="w-full flex items-center gap-2" 
        onClick={handleGoogleLogin}
      >
        <Mail className="h-5 w-5" />
        Continue with Google
      </Button>
    </div>
  );
};
