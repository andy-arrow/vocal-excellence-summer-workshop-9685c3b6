import React, { useState } from 'react';
import { X, Send, Music, FileText, Video } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast'; // Use the re-exported toast

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
    if (!email) return;
    
    setIsSubmitting(true);
    
    try {
      // In production, this would send the data to your CRM/email marketing system
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success state
      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: "Your Vocal Upgrade Kit is on its way to your inbox!",
        className: "bg-green-700 text-white border-green-800",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
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
            >
              <span className="font-semibold">Soprano</span>
              <span className="text-xs text-slate-500 mt-1">High female voice</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-3 flex flex-col"
              onClick={() => handleSelectVoiceType('Alto')}
            >
              <span className="font-semibold">Alto</span>
              <span className="text-xs text-slate-500 mt-1">Lower female voice</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-3 flex flex-col"
              onClick={() => handleSelectVoiceType('Tenor')}
            >
              <span className="font-semibold">Tenor</span>
              <span className="text-xs text-slate-500 mt-1">High male voice</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-3 flex flex-col"
              onClick={() => handleSelectVoiceType('Baritone')}
            >
              <span className="font-semibold">Baritone</span>
              <span className="text-xs text-slate-500 mt-1">Middle male voice</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-3 col-span-2"
              onClick={() => handleSelectVoiceType('Bass')}
            >
              <span className="font-semibold">Bass</span>
              <span className="text-xs text-slate-500 ml-1">(Lower male voice)</span>
            </Button>
          </div>
          <div className="flex justify-between mt-6">
            <Button 
              variant="outline" 
              onClick={() => setShowQuiz(false)}
            >
              Back
            </Button>
          </div>
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
            />
          </div>
        </div>
        <Button 
          onClick={handleNext} 
          className="w-full"
          disabled={!email || !name}
        >
          Get Free Vocal Toolkit
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
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}
