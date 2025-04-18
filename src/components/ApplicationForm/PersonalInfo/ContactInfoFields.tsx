
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
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
            <FormLabel className="text-gray-900 font-medium" htmlFor="email">Email Address</FormLabel>
            <FormControl>
              <Input 
                {...field}
                type="email"
                id="email"
                placeholder="Your email"
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
            <FormLabel className="text-gray-900 font-medium" htmlFor="phone">Phone Number</FormLabel>
            <FormControl>
              <Input 
                {...field}
                type="tel"
                id="phone"
                placeholder="Your phone number"
                autoComplete="tel"
                aria-required="true"
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
