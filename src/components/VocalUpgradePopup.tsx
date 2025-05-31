
import React, { useState } from 'react';
import { X, Send, Music, Award, GraduationCap } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
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
    if (!email || !name) {
      toast({
        title: "Please Complete All Fields",
        description: "We need your name and email to send scholarship information.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log('Starting scholarship inquiry process', { email, name });
      
      // Step 1: Save to Supabase email_signups table
      const signupData = {
        email: email.trim().toLowerCase(),
        source: 'scholarship_popup',
        variant: 'merit_scholarship_v1',
        page_path: window.location.pathname,
      };
      
      console.log('Saving scholarship inquiry to database:', signupData);
      const { error: dbError } = await supabase
        .from('email_signups')
        .insert(signupData);
      
      if (dbError) {
        console.error('Database save error:', dbError);
        throw new Error(`Failed to save inquiry: ${dbError.message}`);
      }
      
      console.log('Successfully saved scholarship inquiry');
      
      // Step 2: Send scholarship information via edge function
      const emailPayload = {
        type: 'popup_signup',
        email: email.trim().toLowerCase(),
        name: name.trim(),
        variant: 'merit_scholarship_v1',
        source: 'scholarship_popup',
        page_path: window.location.pathname
      };
      
      console.log('Sending scholarship information via email:', emailPayload);
      const { data: emailResponse, error: emailError } = await supabase.functions.invoke('send-email', {
        body: emailPayload,
      });
      
      if (emailError) {
        console.error('Email error:', emailError);
        toast({
          title: "Inquiry Received!",
          description: "Your scholarship inquiry has been received. We'll be in touch with details soon.",
          className: "bg-green-700 text-white border-green-800",
        });
      } else {
        console.log('Scholarship information sent successfully:', emailResponse);
        toast({
          title: "Scholarship Information Sent!",
          description: "Check your inbox for merit-based scholarship details and application guidance.",
          className: "bg-green-700 text-white border-green-800",
        });
      }
      
      setIsSubmitted(true);
      
    } catch (error) {
      console.error('Scholarship inquiry error:', error);
      toast({
        title: "Inquiry Received!",
        description: "We've received your scholarship inquiry and will contact you with details soon.",
        className: "bg-blue-700 text-white border-blue-800",
      });
      
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (!email || !name) {
      toast({
        title: "Please Complete All Fields",
        description: "We need your name and email to proceed.",
        variant: "destructive",
      });
      return;
    }
    setShowQuiz(true);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      if (!isSubmitted) {
        setEmail('');
        setName('');
        setShowQuiz(false);
        setVoiceType(null);
        setIsSubmitted(false);
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
        <div className="text-center p-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-violet-100 flex items-center justify-center mx-auto mb-6">
            <Award className="h-10 w-10 text-purple-600" />
          </div>
          <h3 className="text-2xl font-semibold mb-3 text-gray-900">Scholarship Information Sent!</h3>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Your merit-based scholarship inquiry has been received. Check your inbox for detailed information about available awards and how to apply.
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-4 bg-purple-50 p-4 rounded-lg text-left">
              <Award className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Merit-Based Awards</h4>
                <p className="text-sm text-gray-600">Scholarships based on vocal talent and potential</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 bg-purple-50 p-4 rounded-lg text-left">
              <GraduationCap className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Application Process</h4>
                <p className="text-sm text-gray-600">Step-by-step guidance for your submission</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 bg-purple-50 p-4 rounded-lg text-left">
              <Music className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Selection Criteria</h4>
                <p className="text-sm text-gray-600">What our scholarship committee looks for</p>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handleClose} 
            className="w-full bg-gray-900 hover:bg-gray-800 text-white"
          >
            Close
          </Button>
        </div>
      );
    }

    if (showQuiz) {
      return (
        <>
          <DialogHeader className="text-center">
            <DialogTitle className="text-xl">What's Your Voice Type?</DialogTitle>
            <DialogDescription className="text-gray-600">
              This helps us match you with the most relevant scholarship opportunities for your voice type.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-3 pt-6">
            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col border-2 hover:border-purple-300 hover:bg-purple-50"
              onClick={() => handleSelectVoiceType('Soprano')}
              disabled={isSubmitting}
            >
              <span className="font-semibold text-gray-900">Soprano</span>
              <span className="text-xs text-gray-500 mt-1">High female voice</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col border-2 hover:border-purple-300 hover:bg-purple-50"
              onClick={() => handleSelectVoiceType('Alto')}
              disabled={isSubmitting}
            >
              <span className="font-semibold text-gray-900">Alto</span>
              <span className="text-xs text-gray-500 mt-1">Lower female voice</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col border-2 hover:border-purple-300 hover:bg-purple-50"
              onClick={() => handleSelectVoiceType('Tenor')}
              disabled={isSubmitting}
            >
              <span className="font-semibold text-gray-900">Tenor</span>
              <span className="text-xs text-gray-500 mt-1">High male voice</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col border-2 hover:border-purple-300 hover:bg-purple-50"
              onClick={() => handleSelectVoiceType('Baritone')}
              disabled={isSubmitting}
            >
              <span className="font-semibold text-gray-900">Baritone</span>
              <span className="text-xs text-gray-500 mt-1">Middle male voice</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-auto py-4 col-span-2 border-2 hover:border-purple-300 hover:bg-purple-50"
              onClick={() => handleSelectVoiceType('Bass')}
              disabled={isSubmitting}
            >
              <span className="font-semibold text-gray-900">Bass</span>
              <span className="text-xs text-gray-500 ml-2">(Lower male voice)</span>
            </Button>
          </div>
          
          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={() => setShowQuiz(false)}
              disabled={isSubmitting}
              className="px-8"
            >
              Back
            </Button>
          </div>
          
          {isSubmitting && (
            <div className="text-center mt-6">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-gray-600">Sending scholarship information...</p>
              </div>
            </div>
          )}
        </>
      );
    }

    return (
      <>
        <DialogHeader className="text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-violet-100 flex items-center justify-center mx-auto mb-4">
            <Award className="h-8 w-8 text-purple-600" />
          </div>
          <DialogTitle className="text-2xl font-semibold text-gray-900">
            Merit-Based Scholarships Available
          </DialogTitle>
          <DialogDescription className="text-gray-600 text-base leading-relaxed mt-3">
            Don't let finances limit your vocal potential. We award scholarships to exceptional singers who demonstrate outstanding talent, dedication, and passion for vocal excellence.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-6">
          <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-100">
            <h3 className="font-semibold text-purple-900 mb-4 flex items-center">
              <Award className="h-5 w-5 mr-2" />
              What We Offer
            </h3>
            <ul className="text-sm text-purple-800 space-y-2">
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-3"></span>
                Partial and full program scholarships available
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-3"></span>
                Awards based purely on vocal merit and potential
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-3"></span>
                Rolling applications reviewed monthly
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-3"></span>
                No hidden fees or additional requirements
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
                className="h-12"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="h-12"
              />
            </div>
          </div>
        </div>
        
        <Button 
          onClick={handleNext} 
          className="w-full h-12 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-medium"
          disabled={!email || !name || isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </div>
          ) : (
            'Get Scholarship Information'
          )}
        </Button>
        
        <p className="text-xs text-gray-500 text-center mt-4">
          Free scholarship guide • No spam • Unsubscribe anytime
        </p>
      </>
    );
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 z-10"
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
