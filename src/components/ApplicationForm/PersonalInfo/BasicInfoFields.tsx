
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

const BasicInfoFields = () => {
  const form = useFormContext<ApplicationFormValues>();

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-violet-100" htmlFor="firstName">First Name</FormLabel>
            <FormControl>
              <Input 
                {...field}
                id="firstName"
                placeholder="First name"
                autoComplete="given-name"
                aria-required="true"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-violet-100" htmlFor="lastName">Last Name</FormLabel>
            <FormControl>
              <Input 
                {...field}
                id="lastName"
                placeholder="Last name"
                autoComplete="family-name"
                aria-required="true"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="dateOfBirth"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-violet-100" htmlFor="dateOfBirth">Date of Birth</FormLabel>
            <FormControl>
              <Input 
                {...field}
                type="date"
                id="dateOfBirth"
                autoComplete="bday"
                aria-required="true"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="nationality"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-violet-100" htmlFor="nationality">Nationality</FormLabel>
            <FormControl>
              <Input 
                {...field}
                id="nationality"
                placeholder="Your nationality"
                autoComplete="country-name"
                aria-required="true"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default BasicInfoFields;
