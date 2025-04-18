
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApplicationFormValues } from '../schema';
import { nationalities } from '@/data/countries';

const BasicInfoFields = () => {
  const form = useFormContext<ApplicationFormValues>();

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium" htmlFor="firstName">First Name</FormLabel>
            <FormControl>
              <Input 
                {...field}
                id="firstName"
                placeholder="First name"
                autoComplete="given-name"
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
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium" htmlFor="lastName">Last Name</FormLabel>
            <FormControl>
              <Input 
                {...field}
                id="lastName"
                placeholder="Last name"
                autoComplete="family-name"
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
        name="dateOfBirth"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium" htmlFor="dateOfBirth">Date of Birth</FormLabel>
            <FormControl>
              <Input 
                {...field}
                type="date"
                id="dateOfBirth"
                autoComplete="bday"
                aria-required="true"
                className="text-gray-900"
              />
            </FormControl>
            <FormMessage className="text-red-700" />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="nationality"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium">Nationality</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger className="text-gray-900">
                  <SelectValue placeholder="Select your nationality" className="text-gray-900" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="text-gray-900">
                {nationalities.map((nationality) => (
                  <SelectItem 
                    key={nationality.value} 
                    value={nationality.value}
                    className="text-gray-900"
                  >
                    {nationality.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage className="text-red-700" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default BasicInfoFields;
