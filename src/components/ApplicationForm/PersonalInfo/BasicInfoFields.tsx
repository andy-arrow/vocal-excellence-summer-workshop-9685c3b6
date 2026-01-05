
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
    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-apple-text font-medium text-sm sm:text-base" htmlFor="firstName">
              First Name
              <span className="text-red-700 ml-1">*</span>
            </FormLabel>
            <FormControl>
              <Input 
                {...field}
                id="firstName"
                placeholder="First name"
                autoComplete="given-name"
                aria-required="true"
                className="h-10 sm:h-11 text-sm sm:text-base text-apple-text placeholder:text-apple-grey"
              />
            </FormControl>
            <FormMessage className="text-red-700 text-xs sm:text-sm" />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-apple-text font-medium text-sm sm:text-base" htmlFor="lastName">
              Last Name
              <span className="text-red-700 ml-1">*</span>
            </FormLabel>
            <FormControl>
              <Input 
                {...field}
                id="lastName"
                placeholder="Last name"
                autoComplete="family-name"
                aria-required="true"
                className="h-10 sm:h-11 text-sm sm:text-base text-apple-text placeholder:text-apple-grey"
              />
            </FormControl>
            <FormMessage className="text-red-700 text-xs sm:text-sm" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="age"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-apple-text font-medium text-sm sm:text-base" htmlFor="age">
              How old are you?
              <span className="text-red-700 ml-1">*</span>
            </FormLabel>
            <FormControl>
              <Input 
                {...field}
                id="age"
                type="number"
                inputMode="numeric"
                min="16"
                max="100"
                placeholder="Enter your age"
                aria-required="true"
                className="h-10 sm:h-11 text-sm sm:text-base text-apple-text bg-white"
              />
            </FormControl>
            <FormMessage className="text-red-700 text-xs sm:text-sm" />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="nationality"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-apple-text font-medium text-sm sm:text-base">
              Nationality
              <span className="text-red-700 ml-1">*</span>
            </FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value || ""}>
                <SelectTrigger className="h-10 sm:h-11 text-sm sm:text-base bg-white text-apple-text">
                  <SelectValue placeholder="Select your nationality" />
                </SelectTrigger>
                <SelectContent className="max-h-[280px]">
                  {nationalities.map((nationality) => (
                    <SelectItem 
                      key={nationality.value} 
                      value={nationality.value}
                      className="text-sm sm:text-base"
                    >
                      {nationality.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage className="text-red-700 text-xs sm:text-sm" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="whereFrom"
        render={({ field }) => (
          <FormItem className="sm:col-span-2">
            <FormLabel className="text-apple-text font-medium text-sm sm:text-base" htmlFor="whereFrom">
              Where are you from?
              <span className="text-red-700 ml-1">*</span>
            </FormLabel>
            <FormControl>
              <Input 
                {...field}
                id="whereFrom"
                placeholder="City, Country or Region"
                aria-required="true" 
                className="h-10 sm:h-11 text-sm sm:text-base text-apple-text placeholder:text-apple-grey"
              />
            </FormControl>
            <FormMessage className="text-red-700 text-xs sm:text-sm" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default BasicInfoFields;
