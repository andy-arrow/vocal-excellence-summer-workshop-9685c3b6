
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
import { Info, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const TermsAndConditionsSection = () => {
  const form = useFormContext<ApplicationFormValues>();
  const [showTips, setShowTips] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-[#1d1d1f]">Terms & Conditions</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowTips(!showTips)}
          className="text-xs font-medium text-[#0066cc] hover:text-[#0077ed] hover:bg-transparent"
        >
          {showTips ? 'Hide Tips' : 'Show Tips'} 
          <Info className="ml-1 w-3 h-3" />
        </Button>
      </div>
      
      {showTips && (
        <Alert className="mb-6 bg-[#f2f7fd] border border-[#d6e5f5] text-[#1d1d1f]">
          <AlertTitle className="text-[#0066cc] font-medium flex items-center">
            Quick Tip
          </AlertTitle>
          <AlertDescription className="text-[#86868b]">
            Be sure to review the Terms and Privacy Policy so you know your rights. We've made them 
            easy to read with highlighted key points to help you focus on what matters.
          </AlertDescription>
        </Alert>
      )}
      
      <p className="text-[#86868b] mb-6">
        Please review our Terms and Privacy Policy before submitting. We've worked hard to make these 
        documents clear and straightforward - they explain how we'll work together and protect your information.
      </p>

      <div className="mb-6 space-y-4">
        <div className="bg-white rounded-xl p-4 border border-[#e6e6e6] mb-4 hover:border-[#d2d2d7] transition-colors">
          <h4 className="font-medium mb-2 flex items-center text-[#1d1d1f]">
            <span className="w-6 h-6 rounded-full bg-[#f5f5f7] text-[#1d1d1f] flex items-center justify-center text-xs mr-2">1</span>
            Terms and Conditions Key Points:
          </h4>
          <ul className="space-y-2 text-sm text-[#86868b] pl-8 list-disc">
            <li>You can cancel up to 30 days before the program for a full refund</li>
            <li>Photos and recordings from the program may be used for promotional purposes</li>
            <li>We have a strict anti-harassment policy to keep everyone safe</li>
          </ul>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-[#e6e6e6] hover:border-[#d2d2d7] transition-colors">
          <h4 className="font-medium mb-2 flex items-center text-[#1d1d1f]">
            <span className="w-6 h-6 rounded-full bg-[#f5f5f7] text-[#1d1d1f] flex items-center justify-center text-xs mr-2">2</span>
            Privacy Policy Key Points:
          </h4>
          <ul className="space-y-2 text-sm text-[#86868b] pl-8 list-disc">
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
            <div className="bg-white rounded-xl p-4 border border-[#e6e6e6] relative overflow-hidden">
              {field.value && (
                <div className="absolute top-0 left-0 w-full h-1 bg-[#0077ed]"></div>
              )}
              <div className="flex flex-row items-start space-x-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className={`${field.value ? 'border-[#0077ed] bg-[#0077ed] text-white' : 'border-[#d2d2d7] bg-white'} h-5 w-5 rounded-md`}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-[#1d1d1f]">
                    I agree to the <Link to="/terms-and-conditions" className="text-[#0066cc] hover:underline font-medium">Terms and Conditions</Link> and <Link to="/privacy-policy" className="text-[#0066cc] hover:underline font-medium">Privacy Policy</Link>. 
                    <span className="block mt-1 text-sm text-[#86868b]">I confirm that all information I've provided is accurate and complete.</span>
                  </FormLabel>
                  <FormMessage />
                </div>
              </div>
            </div>
            
            {field.value && (
              <div className="text-sm text-[#0066cc] font-medium flex items-center animate-fade-in">
                Great! You're ready to submit your application
                <ChevronRight className="ml-2 w-3 h-3" />
              </div>
            )}
          </FormItem>
        )}
      />
    </div>
  );
};

export default TermsAndConditionsSection;
