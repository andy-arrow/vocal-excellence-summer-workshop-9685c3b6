
import React from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Mail } from 'lucide-react';

export const SocialLoginButtons = () => {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth`
      }
    });

    if (error) {
      console.error('Error logging in with Google:', error.message);
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
