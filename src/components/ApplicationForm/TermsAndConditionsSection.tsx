
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { ApplicationFormValues } from './schema';

const TermsAndConditionsSection = () => {
  const form = useFormContext<ApplicationFormValues>();

  return (
    <FormField
      control={form.control}
      name="termsAgreed"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel className="font-light text-gray-700">
              I agree to the <a href="/terms" className="text-gray-800 underline">Terms and Conditions</a> and <a href="/privacy" className="text-gray-800 underline">Privacy Policy</a>. I confirm that all information provided is accurate and complete.
            </FormLabel>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default TermsAndConditionsSection;
