
import React from 'react';
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

const TermsAndConditionsSection = () => {
  const form = useFormContext<ApplicationFormValues>();

  return (
    <div className="bg-apple-gray-light/20 p-8 rounded-xl">
      <h3 className="text-xl font-semibold text-apple-dark mb-6">Legal Agreements</h3>
      <p className="text-apple-dark/70 mb-6">
        Please review our Terms and Conditions and Privacy Policy carefully before submitting your application.
      </p>

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
              <FormLabel>
                I agree to the <Link to="/cancellation-policy" className="text-apple-blue underline">Terms and Conditions</Link> and <Link to="/privacy-policy" className="text-apple-blue underline">Privacy Policy</Link>. I confirm that all information provided is accurate and complete.
              </FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};

export default TermsAndConditionsSection;
