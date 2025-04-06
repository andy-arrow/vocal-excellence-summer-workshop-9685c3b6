
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User, AuthChangeEvent } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';
import { trackEvent, trackError } from '@/utils/monitoring';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<any>;
  updatePassword: (newPassword: string) => Promise<any>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
      
      if (session?.user) {
        trackEvent('auth', 'info', {
          message: 'User session restored',
          user: session.user.id,
        });
      }
    }).catch(error => {
      trackError('auth', error);
      setIsLoading(false);
    });

    // Set up auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);

        // Track auth state changes
        trackEvent('auth', 'info', {
          message: `Auth state changed: ${event}`,
          details: { event },
          user: session?.user?.id,
        });

        // Send welcome email when a user signs up
        if (event.toLowerCase() === 'signed_up' && session?.user) {
          try {
            await supabase.functions.invoke('send-email', {
              body: {
                type: 'welcome',
                email: session.user.email,
                name: session.user.email?.split('@')[0] || '',
              }
            });
            
            trackEvent('auth', 'info', {
              message: 'Welcome email sent',
              user: session.user.id,
            });
          } catch (error) {
            console.error('Error sending welcome email:', error);
            trackError('auth', error instanceof Error ? error : new Error(String(error)), {
              action: 'send_welcome_email',
            }, session.user.id);
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await supabase.auth.signInWithPassword({ email, password });
      
      if (response.error) {
        trackEvent('auth', 'warning', {
          message: 'Sign in failed',
          details: { error: response.error.message },
        });
      } else if (response.data.user) {
        trackEvent('auth', 'info', {
          message: 'User signed in',
          user: response.data.user.id,
        });
      }
      
      return response;
    } catch (error) {
      trackError('auth', error instanceof Error ? error : new Error(String(error)), {
        action: 'sign_in',
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const response = await supabase.auth.signUp({ email, password });
      
      if (response.error) {
        trackEvent('auth', 'warning', {
          message: 'Sign up failed',
          details: { error: response.error.message },
        });
      } else if (response.data.user) {
        trackEvent('auth', 'info', {
          message: 'User signed up',
          user: response.data.user.id,
        });
      }
      
      return response;
    } catch (error) {
      trackError('auth', error instanceof Error ? error : new Error(String(error)), {
        action: 'sign_up',
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const userId = user?.id;
      await supabase.auth.signOut();
      
      if (userId) {
        trackEvent('auth', 'info', {
          message: 'User signed out',
          user: userId,
        });
      }
    } catch (error) {
      trackError('auth', error instanceof Error ? error : new Error(String(error)), {
        action: 'sign_out',
      }, user?.id);
      throw error;
    }
  };
  
  const resetPassword = async (email: string) => {
    try {
      const { error, data } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/auth?reset=true',
      });
      
      if (error) {
        trackEvent('auth', 'warning', {
          message: 'Password reset failed',
          details: { error: error.message, email },
        });
        
        toast({
          title: "Password Reset Failed",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }
      
      trackEvent('auth', 'info', {
        message: 'Password reset email sent',
        details: { email },
      });
      
      toast({
        title: "Password Reset Email Sent",
        description: "Check your inbox for instructions to reset your password.",
        className: "bg-green-700 text-white border-green-800",
      });
      
      return { data };
    } catch (error) {
      trackError('auth', error instanceof Error ? error : new Error(String(error)), {
        action: 'reset_password',
        email,
      });
      throw error;
    }
  };
  
  const updatePassword = async (newPassword: string) => {
    try {
      const { error, data } = await supabase.auth.updateUser({
        password: newPassword,
      });
      
      if (error) {
        trackEvent('auth', 'warning', {
          message: 'Password update failed',
          details: { error: error.message },
          user: user?.id,
        });
        
        toast({
          title: "Password Update Failed",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }
      
      trackEvent('auth', 'info', {
        message: 'Password updated successfully',
        user: user?.id,
      });
      
      toast({
        title: "Password Updated",
        description: "Your password has been successfully updated.",
        className: "bg-green-700 text-white border-green-800",
      });
      
      return { data };
    } catch (error) {
      trackError('auth', error instanceof Error ? error : new Error(String(error)), {
        action: 'update_password',
      }, user?.id);
      throw error;
    }
  };

  const value = {
    session,
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
