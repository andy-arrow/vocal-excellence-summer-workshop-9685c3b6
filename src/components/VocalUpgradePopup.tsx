
import React, { useState } from 'react';
import { X, Send, Music, FileText, Video } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast'; // Fixed import path

type VoiceType = 'Soprano' | 'Alto' | 'Tenor' | 'Baritone' | 'Bass';

interface VocalUpgradePopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VocalUpgradePopup({ open, onOpenChange }: VocalUpgradePopupProps) {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [showQuiz, setShowQuiz] = useState(false);
  const [voiceType, setVoiceType] = useState<VoiceType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(r => setTimeout(r, 800));
      
      // Success state
      setIsSubmitted(true);
      // This is correct because we're using the toast function from the useToast hook
      toast({
        title: "Success!",
        description: "Your Vocal Upgrade Kit is on its way to your inbox!",
        duration: 5000,
      });
      
      // In a real implementation, you would send this data to your backend
      console.log('Subscription data:', { email, name, voiceType });
      
      // Reset form in 5 seconds or close immediately based on UI needs
      setTimeout(() => {
        onOpenChange(false);
        // Reset state after modal is closed
        setTimeout(() => {
          setIsSubmitted(false);
          setShowQuiz(false);
          setVoiceType(null);
          setEmail('');
          setName('');
        }, 300);
      }, 5000);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Unable to subscribe. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVoiceTypeSelect = (type: VoiceType) => {
    setVoiceType(type);
    setShowQuiz(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {!isSubmitted ? (
          <>
            {!showQuiz && !voiceType ? (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl sm:text-2xl font-bold text-center">
                    🚀 Ready for a 1-minute vocal glow-up?
                  </DialogTitle>
                  <DialogDescription className="text-center mt-2">
                    Get 3 pro warm-ups + a pitch-fix cheat-sheet, free.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-6 py-4">
                  <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="grid grid-cols-3 gap-4 w-full">
                      <div className="flex flex-col items-center gap-1 bg-blue-50 p-3 rounded-lg">
                        <Music className="h-8 w-8 text-blue-500" />
                        <p className="text-xs font-medium">3 Pro Warm-ups</p>
                      </div>
                      <div className="flex flex-col items-center gap-1 bg-green-50 p-3 rounded-lg">
                        <FileText className="h-8 w-8 text-green-500" />
                        <p className="text-xs font-medium">Pitch-Fix PDF</p>
                      </div>
                      <div className="flex flex-col items-center gap-1 bg-purple-50 p-3 rounded-lg">
                        <Video className="h-8 w-8 text-purple-500" />
                        <p className="text-xs font-medium">Audition Tips</p>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => setShowQuiz(true)} 
                      className="w-full"
                    >
                      What's your voice type?
                    </Button>
                    
                    <p className="text-sm text-muted-foreground mt-2">
                      🎧 Already downloaded by 2,147 singers prepping for auditions.
                    </p>
                  </div>
                </div>
              </>
            ) : showQuiz ? (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-center">
                    What's your voice type?
                  </DialogTitle>
                  <DialogDescription className="text-center mt-2">
                    We'll customize your warm-ups accordingly.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-2 gap-3 py-4">
                  {(['Soprano', 'Alto', 'Tenor', 'Baritone', 'Bass'] as VoiceType[]).map((type) => (
                    <Button 
                      key={type} 
                      variant="outline" 
                      onClick={() => handleVoiceTypeSelect(type)}
                      className="py-6"
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">
                    Cool! Want exercises tailored to a {voiceType}?
                  </DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Input
                      id="name"
                      placeholder="Your name (optional)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Input
                      id="email"
                      placeholder="Your email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="col-span-3"
                      required
                    />
                    <Button type="submit" disabled={isSubmitting} className="w-full">
                      {isSubmitting ? (
                        <div className="animate-spin">↻</div>
                      ) : (
                        <>SEND MY KIT</>
                      )}
                    </Button>
                  </div>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    We'll send you singing tips; unsubscribe anytime.
                  </p>
                  
                  <p className="text-sm text-muted-foreground text-center mt-2">
                    🎧 Already downloaded by 2,147 singers prepping for auditions.
                  </p>
                </form>
              </>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center text-center py-6 space-y-4">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold">Thank you!</h2>
            <p>Your Vocal Upgrade Kit is on the way!</p>
            
            <div className="bg-slate-100 p-4 rounded-lg w-full">
              <h3 className="font-medium text-sm">Try this warm-up now:</h3>
              <div className="mt-3 bg-white p-3 rounded flex items-center gap-3">
                <button className="bg-blue-500 text-white rounded-full p-2 h-10 w-10 flex items-center justify-center">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                <div className="text-left">
                  <p className="text-sm font-medium">Quick Vocal Resonance</p>
                  <p className="text-xs text-slate-500">30 sec • Beginner</p>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Check your inbox in the next 5 minutes for the complete kit!
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
