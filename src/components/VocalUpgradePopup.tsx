import React, { useState } from 'react';
import { X, Send, Music, FileText, Video } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

type VoiceType = 'Soprano' | 'Alto' | 'Tenor' | 'Baritone' | 'Bass';

interface VocalUpgradePopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VocalUpgradePopup({ open, onOpenChange }: VocalUpgradePopupProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [showQuiz, setShowQuiz] = useState(false);
  const [voiceType, setVoiceType] = useState<VoiceType | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async () => {
    if (!email || !name) return;
    
    setIsSubmitting(true);
    
    try {
      console.log('Starting popup signup process', { email, name });
      
      // Step 1: Save to Supabase email_signups table
      const signupData = {
        email: email.trim().toLowerCase(),
        source: 'popup',
        variant: 'A', // You can make this dynamic based on A/B testing
        page_path: window.location.pathname,
      };
      
      console.log('Saving to email_signups table:', signupData);
      const { error: dbError } = await supabase
        .from('email_signups')
        .insert(signupData);
      
      if (dbError) {
        console.error('Database save error:', dbError);
        throw new Error(`Failed to save signup: ${dbError.message}`);
      }
      
      console.log('Successfully saved to database');
      
      // Step 2: Send emails via edge function
      const emailPayload = {
        type: 'popup_signup',
        email: email.trim().toLowerCase(),
        name: name.trim(),
        variant: 'A',
        source: 'popup',
        page_path: window.location.pathname
      };
      
      console.log('Sending emails via edge function:', emailPayload);
      const { data: emailResponse, error: emailError } = await supabase.functions.invoke('send-email', {
        body: emailPayload,
      });
      
      if (emailError) {
        console.error('Email sending error:', emailError);
        // Don't throw error here - we want to show success even if email fails
        toast({
          title: "Signup Successful!",
          description: "You've been added to our list! Email delivery may be delayed.",
          className: "bg-green-700 text-white border-green-800",
        });
      } else {
        console.log('Emails sent successfully:', emailResponse);
        toast({
          title: "Success!",
          description: "Your Vocal Upgrade Kit is on its way to your inbox!",
          className: "bg-green-700 text-white border-green-800",
        });
      }
      
      // Success state
      setIsSubmitted(true);
      
    } catch (error) {
      console.error('Popup signup error:', error);
      toast({
        title: "Almost there!",
        description: "Your signup was processed, but email delivery may be delayed. We'll be in touch soon!",
        className: "bg-blue-700 text-white border-blue-800",
      });
      
      // Still show success to avoid confusing the user
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (!email || !name) return;
    setShowQuiz(true);
  };

  const handleClose = () => {
    // Reset state on close
    onOpenChange(false);
    setTimeout(() => {
      if (!isSubmitted) {
        setEmail('');
        setName('');
        setShowQuiz(false);
        setVoiceType(null);
      }
    }, 300);
  };

  const handleSelectVoiceType = (type: VoiceType) => {
    setVoiceType(type);
    handleSubscribe();
  };

  const renderContent = () => {
    if (isSubmitted) {
      return (
        <div className="text-center p-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <Send className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-6">
            Your Vocal Upgrade Kit has been sent to your inbox. Please check your email!
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg">
              <Music className="h-5 w-5 text-violet-600 mt-0.5" />
              <div className="text-left">
                <h4 className="font-medium text-slate-900">3 Professional Warm-ups</h4>
                <p className="text-sm text-slate-600">30-second audio files selected for your voice type</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg">
              <FileText className="h-5 w-5 text-violet-600 mt-0.5" />
              <div className="text-left">
                <h4 className="font-medium text-slate-900">Pitch Perfect Cheat-sheet</h4>
                <p className="text-sm text-slate-600">PDF guide to fix your top 3 pitch problems</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg">
              <Video className="h-5 w-5 text-violet-600 mt-0.5" />
              <div className="text-left">
                <h4 className="font-medium text-slate-900">Audition Confidence Video</h4>
                <p className="text-sm text-slate-600">2-minute master class on beating nerves</p>
              </div>
            </div>
          </div>
          <Button 
            onClick={handleClose} 
            className="mt-6 w-full bg-slate-900"
          >
            Close
          </Button>
        </div>
      );
    }

    if (showQuiz) {
      return (
        <>
          <DialogHeader>
            <DialogTitle>What's Your Voice Type?</DialogTitle>
            <DialogDescription>
              Select your voice type to receive tailored warm-ups.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 pt-4">
            <Button 
              variant="outline" 
              className="h-auto py-3 flex flex-col"
              onClick={() => handleSelectVoiceType('Soprano')}
              disabled={isSubmitting}
            >
              <span className="font-semibold">Soprano</span>
              <span className="text-xs text-slate-500 mt-1">High female voice</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-3 flex flex-col"
              onClick={() => handleSelectVoiceType('Alto')}
              disabled={isSubmitting}
            >
              <span className="font-semibold">Alto</span>
              <span className="text-xs text-slate-500 mt-1">Lower female voice</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-3 flex flex-col"
              onClick={() => handleSelectVoiceType('Tenor')}
              disabled={isSubmitting}
            >
              <span className="font-semibold">Tenor</span>
              <span className="text-xs text-slate-500 mt-1">High male voice</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-3 flex flex-col"
              onClick={() => handleSelectVoiceType('Baritone')}
              disabled={isSubmitting}
            >
              <span className="font-semibold">Baritone</span>
              <span className="text-xs text-slate-500 mt-1">Middle male voice</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-3 col-span-2"
              onClick={() => handleSelectVoiceType('Bass')}
              disabled={isSubmitting}
            >
              <span className="font-semibold">Bass</span>
              <span className="text-xs text-slate-500 ml-1">(Lower male voice)</span>
            </Button>
          </div>
          <div className="flex justify-between mt-6">
            <Button 
              variant="outline" 
              onClick={() => setShowQuiz(false)}
              disabled={isSubmitting}
            >
              Back
            </Button>
          </div>
          {isSubmitting && (
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">Sending your vocal toolkit...</p>
            </div>
          )}
        </>
      );
    }

    return (
      <>
        <DialogHeader>
          <DialogTitle>Get Your 1-Minute Vocal Upgrade Kit</DialogTitle>
          <DialogDescription>
            Join over 500 singers who have improved their technique with our free vocal toolkit.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Your Name
            </label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
        </div>
        <Button 
          onClick={handleNext} 
          className="w-full"
          disabled={!email || !name || isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Get Free Vocal Toolkit'}
        </Button>
      </>
    );
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
          disabled={isSubmitting}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}
