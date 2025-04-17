
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
      <div className="flex items-center justify-between mb-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowTips(!showTips)}
          className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50"
        >
          {showTips ? 'Hide Tips' : 'Show Tips'} 
          <Info className="ml-1 w-3 h-3" />
        </Button>
      </div>
      
      {showTips && (
        <Alert className="mb-6 bg-blue-50 border border-blue-100 text-gray-800">
          <AlertTitle className="text-blue-700 font-medium flex items-center">
            Quick Tip
          </AlertTitle>
          <AlertDescription className="text-gray-600">
            Be sure to review the Terms and Privacy Policy so you know your rights. We've made them 
            easy to read with highlighted key points to help you focus on what matters.
          </AlertDescription>
        </Alert>
      )}

      <div className="mb-6 space-y-4">
        <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 mb-4">
          <h4 className="font-medium mb-3 text-gray-900">
            Terms and Conditions Key Points:
          </h4>
          <ul className="space-y-2 text-gray-700 pl-8 list-disc">
            <li>You can cancel up to 30 days before the program for a full refund</li>
            <li>Photos and recordings from the program may be used for promotional purposes</li>
            <li>We have a strict anti-harassment policy to keep everyone safe</li>
          </ul>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
          <h4 className="font-medium mb-3 text-gray-900">
            Privacy Policy Key Points:
          </h4>
          <ul className="space-y-2 text-gray-700 pl-8 list-disc">
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
            <div className="bg-white rounded-lg p-5 border-2 border-gray-200 relative overflow-hidden">
              {field.value && (
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
              )}
              <div className="flex flex-row items-start space-x-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className={`${field.value ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 bg-white'} h-5 w-5 rounded`}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-gray-800">
                    I agree to the <Link to="/terms-and-conditions" className="text-blue-600 hover:underline font-medium">Terms and Conditions</Link> and <Link to="/privacy-policy" className="text-blue-600 hover:underline font-medium">Privacy Policy</Link>. 
                    <span className="block mt-2 text-sm text-gray-600">I confirm that all information I've provided is accurate and complete.</span>
                  </FormLabel>
                  <FormMessage />
                </div>
              </div>
            </div>
            
            {field.value && (
              <div className="text-sm text-blue-600 font-medium flex items-center animate-fade-in">
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
