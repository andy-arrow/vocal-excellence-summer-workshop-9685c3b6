import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Navigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, LogIn, UserPlus, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { SocialLoginButtons } from '@/components/SocialLoginButtons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [showResetSuccessDialog, setShowResetSuccessDialog] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, signIn, signUp, resetPassword, updatePassword } = useAuth();
  
  useEffect(() => {
    if (searchParams.get('reset') === 'true') {
      setShowResetSuccessDialog(true);
    }
  }, [searchParams]);

  if (user) {
    return <Navigate to="/admin" />;
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isResetPassword) {
        await resetPassword(email);
        toast({
          title: "Password Reset Email Sent",
          description: "Check your inbox for a link to reset your password.",
          className: "bg-green-700 text-white border-green-800",
        });
        setIsResetPassword(false);
        setIsLogin(true);
      } else if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) throw error;
        
        toast({
          title: "Successfully signed in",
          description: "Welcome back!",
          className: "bg-green-700 text-white border-green-800",
        });
        
        navigate('/admin');
      } else {
        if (password !== confirmPassword) {
          throw new Error("Passwords don't match");
        }
        
        const { error } = await signUp(email, password);
        if (error) throw error;
        
        toast({
          title: "Account created successfully",
          description: "Check your email for confirmation link",
          className: "bg-green-700 text-white border-green-800",
        });
        setIsLogin(true);
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

  const handleUpdatePassword = async () => {
    if (!newPassword) {
      toast({
        title: "Error",
        description: "Please enter a new password",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      await updatePassword(newPassword);
      setShowResetSuccessDialog(false);
      navigate('/admin');
    } catch (error: any) {
      toast({
        title: "Password Update Failed",
        description: error.message || "An error occurred updating your password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderForm = () => {
    if (isResetPassword) {
      return (
        <form onSubmit={handleAuth} className="space-y-6">
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
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-medium hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 flex items-center justify-center"
          >
            {isLoading ? (
              <span className="inline-block h-5 w-5 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2"></span>
            ) : (
              <RotateCcw size={18} className="mr-2" />
            )}
            Send Reset Instructions
          </button>
          
          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={() => setIsResetPassword(false)}
              className="text-violet-300 hover:text-violet-100 underline underline-offset-4 text-sm"
            >
              Back to sign in
            </button>
          </div>
        </form>
      );
    }
    
    return (
      <form onSubmit={handleAuth} className="space-y-6">
        <div className="space-y-2">
          <SocialLoginButtons />
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-violet-500/20"></div>
            <span className="flex-shrink mx-4 text-violet-300 text-sm">or continue with email</span>
            <div className="flex-grow border-t border-violet-500/20"></div>
          </div>
        </div>

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
          
          {!isLogin && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-violet-100 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-violet-500/30 text-violet-100 focus:outline-none focus:ring-2 focus:ring-violet-400"
                  placeholder="••••••••"
                  minLength={6}
                />
              </div>
            </div>
          )}
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
        
        <div className="mt-5 text-center space-y-2">
          {isLogin && (
            <button
              type="button"
              onClick={() => setIsResetPassword(true)}
              className="text-violet-300 hover:text-violet-100 underline underline-offset-4 text-sm block w-full"
            >
              Forgot your password?
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-violet-300 hover:text-violet-100 underline underline-offset-4 text-sm block w-full"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>
      </form>
    );
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
              {isResetPassword ? 'Reset Password' : isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            
            {renderForm()}
          </motion.div>
        </div>
      </div>
      <Footer />
      
      <Dialog open={showResetSuccessDialog} onOpenChange={setShowResetSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Set new password</DialogTitle>
            <DialogDescription>
              Please enter your new password below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="newPassword" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-slate-100 border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-400"
                  placeholder="••••••••"
                  minLength={6}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <Button
              variant="default"
              onClick={handleUpdatePassword}
              disabled={isLoading || !newPassword}
              className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:from-violet-500 hover:to-fuchsia-500"
            >
              {isLoading ? (
                <span className="inline-block h-4 w-4 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2"></span>
              ) : (
                'Update Password'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Auth;
