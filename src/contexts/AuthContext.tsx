import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User, AuthChangeEvent } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

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
    });

    // Set up auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);

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
          } catch (error) {
            console.error('Error sending welcome email:', error);
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    return supabase.auth.signInWithPassword({ email, password });
  };

  const signUp = async (email: string, password: string) => {
    return supabase.auth.signUp({ email, password });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };
  
  const resetPassword = async (email: string) => {
    const { error, data } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/auth?reset=true',
    });
    
    if (error) {
      toast({
        title: "Password Reset Failed",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
    
    toast({
      title: "Password Reset Email Sent",
      description: "Check your inbox for instructions to reset your password.",
      className: "bg-green-700 text-white border-green-800",
    });
    
    return { data };
  };
  
  const updatePassword = async (newPassword: string) => {
    const { error, data } = await supabase.auth.updateUser({
      password: newPassword,
    });
    
    if (error) {
      toast({
        title: "Password Update Failed",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
    
    toast({
      title: "Password Updated",
      description: "Your password has been successfully updated.",
      className: "bg-green-700 text-white border-green-800",
    });
    
    return { data };
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
