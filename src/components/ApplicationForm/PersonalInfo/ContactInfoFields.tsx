
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { countryPhoneCodes } from '@/data/countryCodes';

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
        name="phoneCountryCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-900 font-medium" htmlFor="phoneCountryCode">
              Phone Number
              <span className="text-red-700 ml-1">*</span>
            </FormLabel>
            <FormDescription className="text-sm text-apple-grey mt-0.5 mb-1.5">
              Please select your country code
            </FormDescription>
            <div className="flex gap-2">
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value || "+1"}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-[120px] flex-shrink-0" id="phoneCountryCode">
                    <SelectValue placeholder="+1" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[300px]">
                  {countryPhoneCodes.map((country) => (
                    <SelectItem key={country.code} value={country.dial_code}>
                      <span className="flex items-center">
                        <span className="mr-1">{country.flag}</span>
                        <span>{country.dial_code}</span>
                        <span className="ml-1 text-gray-500 text-xs">({country.code})</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field: phoneField }) => (
                  <FormControl className="flex-1">
                    <Input 
                      {...phoneField}
                      type="tel"
                      id="phone"
                      placeholder="123 456 7890"
                      autoComplete="tel"
                      aria-required="true"
                      className="text-gray-900 placeholder:text-gray-500 flex-1"
                    />
                  </FormControl>
                )}
              />
            </div>
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
