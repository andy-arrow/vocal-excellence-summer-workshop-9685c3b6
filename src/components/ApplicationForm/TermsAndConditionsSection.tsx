import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { useFormContext } from 'react-hook-form';
import { ApplicationFormValues } from './schema';
import { Info, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const TermsAndConditionsSection = () => {
  const form = useFormContext<ApplicationFormValues>();
  const [showTips, setShowTips] = useState(false);

  return (
    <div className="bg-primary/5 p-8 rounded-xl border-2 border-primary/10 focus-section">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-primary flex items-center">
          <Star className="mr-2 w-5 h-5 text-accent" />
          Almost There!
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowTips(!showTips)}
          className="text-xs font-medium text-primary/70 hover:text-primary"
        >
          {showTips ? 'Hide Tips' : 'Show Tips'} 
          <Info className="ml-1 w-3 h-3" />
        </Button>
      </div>
      
      {showTips && (
        <Alert className="mb-6 bg-accent/10 border-accent/30">
          <AlertTitle className="text-accent font-medium flex items-center">
            <Star className="w-4 h-4 mr-2" />
            Quick Tip
          </AlertTitle>
          <AlertDescription className="text-foreground/70">
            Be sure to review the Terms and Privacy Policy so you know your rights. We've made them 
            easy to read with highlighted key points to help you focus on what matters!
          </AlertDescription>
        </Alert>
      )}
      
      <p className="text-foreground/70 mb-6">
        Please review our Terms and Privacy Policy before submitting. We've worked hard to make these 
        documents clear and straightforward - they explain how we'll work together and protect your information.
      </p>

      <div className="mb-6">
        <div className="bg-white rounded-lg p-4 border border-border mb-4 hover:border-primary/20 transition-colors">
          <h4 className="font-medium mb-2 flex items-center">
            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs mr-2">1</span>
            Terms and Conditions Key Points:
          </h4>
          <ul className="space-y-2 text-sm text-foreground/70 pl-8 list-disc">
            <li>You can cancel up to 30 days before the program for a full refund</li>
            <li>Photos and recordings from the program may be used for promotional purposes</li>
            <li>We have a strict anti-harassment policy to keep everyone safe</li>
          </ul>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-border hover:border-secondary/20 transition-colors">
          <h4 className="font-medium mb-2 flex items-center">
            <span className="w-6 h-6 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-xs mr-2">2</span>
            Privacy Policy Key Points:
          </h4>
          <ul className="space-y-2 text-sm text-foreground/70 pl-8 list-disc">
            <li>Your contact info will only be used for program communications</li>
            <li>We'll never sell your personal data to third parties</li>
            <li>You can request deletion of your information after the program ends</li>
          </ul>
        </div>
      </div>

      <FormField
        control={form.control}
        name="termsAgreed"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <div className="bg-white rounded-lg p-4 border border-border relative overflow-hidden">
              {field.value && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
              )}
              <div className="flex flex-row items-start space-x-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className={`${field.value ? 'border-primary text-primary' : ''} h-5 w-5`}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-foreground/80">
                    I agree to the <Link to="/terms-and-conditions" className="text-primary underline font-medium">Terms and Conditions</Link> and <Link to="/privacy-policy" className="text-primary underline font-medium">Privacy Policy</Link>. 
                    <span className="block mt-1 text-sm">I confirm that all information I've provided is accurate and complete.</span>
                  </FormLabel>
                  <FormMessage />
                </div>
              </div>
            </div>
            
            {field.value && (
              <div className="text-sm text-accent font-medium flex items-center animate-fade-in">
                <Star className="w-4 h-4 mr-1 animate-pulse-slow" />
                Great! You're ready to submit your application
                <ArrowRight className="ml-2 w-3 h-3" />
              </div>
            )}
          </FormItem>
        )}
      />
    </div>
  );
};

export default TermsAndConditionsSection;
