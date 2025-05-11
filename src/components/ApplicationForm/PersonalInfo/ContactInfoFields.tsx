
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage,
  FormDescription 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ApplicationFormValues } from '../schema';

const ContactInfoFields = () => {
  const form = useFormContext<ApplicationFormValues>();

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium" htmlFor="email">
              Email Address
              <span className="text-red-700 ml-1">*</span>
            </FormLabel>
            <FormControl>
              <Input 
                {...field}
                type="email"
                id="email"
                placeholder="your.email@example.com"
                autoComplete="email"
                aria-required="true"
                className="text-gray-900 placeholder:text-gray-500"
              />
            </FormControl>
            <FormMessage className="text-red-700" />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium" htmlFor="phone">
              Phone Number
              <span className="text-red-700 ml-1">*</span>
            </FormLabel>
            <FormDescription className="text-sm text-apple-grey mt-0.5 mb-1.5">
              Please include your country code (e.g. +357)
            </FormDescription>
            <FormControl>
              <Input 
                {...field}
                type="tel"
                id="phone"
                placeholder="+357 XX XXX XXX"
                autoComplete="tel"
                aria-required="true"
                className="text-gray-900 placeholder:text-gray-500"
              />
            </FormControl>
            <FormMessage className="text-red-700" />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="socialMedia"
        render={({ field }) => (
          <FormItem className="sm:col-span-2">
            <FormLabel className="text-gray-900 font-medium" htmlFor="socialMedia">
              Social Media or Website (Optional)
            </FormLabel>
            <FormControl>
              <Input 
                {...field}
                type="text"
                id="socialMedia"
                placeholder="Instagram, Facebook, personal website, etc."
                className="text-gray-900 placeholder:text-gray-500"
              />
            </FormControl>
            <FormMessage className="text-red-700" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ContactInfoFields;
