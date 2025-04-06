
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Check for existing session
  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Redirect if already logged in
  if (session) {
    return <Navigate to="/admin" />;
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        
        toast({
          title: "Successfully signed in",
          description: "Welcome back!",
          className: "bg-green-700 text-white border-green-800",
        });
        
        navigate('/admin');
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;
        
        if (data.user?.identities?.length === 0) {
          toast({
            title: "Account already exists",
            description: "Please log in instead",
            variant: "destructive",
          });
          setIsLogin(true);
        } else {
          toast({
            title: "Account created successfully",
            description: "Check your email for confirmation link",
            className: "bg-green-700 text-white border-green-800",
          });
        }
      }
    } catch (error: any) {
      toast({
        title: "Authentication error",
        description: error.message || "An error occurred during authentication",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-violet-950 pt-24 pb-16">
        <div className="max-w-md mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-900/80 backdrop-blur-sm border border-violet-500/20 p-8 rounded-2xl shadow-xl"
          >
            <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-violet-400 to-indigo-400 font-outfit">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            
            <form onSubmit={handleAuth} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-violet-100 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-violet-500/30 text-violet-100 focus:outline-none focus:ring-2 focus:ring-violet-400"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-violet-100 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-violet-500/30 text-violet-100 focus:outline-none focus:ring-2 focus:ring-violet-400"
                      placeholder="••••••••"
                      minLength={6}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-violet-300 hover:text-violet-100"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-medium hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 flex items-center justify-center"
              >
                {isLoading ? (
                  <span className="inline-block h-5 w-5 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2"></span>
                ) : isLogin ? (
                  <LogIn size={18} className="mr-2" />
                ) : (
                  <UserPlus size={18} className="mr-2" />
                )}
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>
            
            <div className="mt-5 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-violet-300 hover:text-violet-100 underline underline-offset-4 text-sm"
              >
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Auth;
