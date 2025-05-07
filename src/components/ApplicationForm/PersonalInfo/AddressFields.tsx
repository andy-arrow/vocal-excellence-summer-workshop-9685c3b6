
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
import { countries } from '@/data/countries';

const AddressFields = () => {
  const form = useFormContext<ApplicationFormValues>();

  return (
    <>
      <div className="mt-6">
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-apple-text font-medium text-base" htmlFor="address">
                Address
                <span className="text-red-700 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  id="address"
                  placeholder="Street address"
                  autoComplete="street-address"
                  aria-required="true"
                  className="text-apple-text placeholder:text-apple-grey"
                />
              </FormControl>
              <FormMessage className="text-red-700" />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid sm:grid-cols-2 gap-6 mt-6">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-apple-text font-medium text-base" htmlFor="city">
                City
                <span className="text-red-700 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  id="city"
                  placeholder="City"
                  autoComplete="address-level2"
                  aria-required="true"
                  className="text-apple-text placeholder:text-apple-grey"
                />
              </FormControl>
              <FormMessage className="text-red-700" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-apple-text font-medium text-base">
                Country
                <span className="text-red-700 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value || ""}>
                  <SelectTrigger className="bg-white text-apple-text">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[280px]">
                    {countries.map((country) => (
                      <SelectItem 
                        key={country.value} 
                        value={country.value}
                      >
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-red-700" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-apple-text font-medium text-base" htmlFor="postalCode">
                Postal/Zip Code
                <span className="text-red-700 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  id="postalCode"
                  placeholder="Postal/Zip code"
                  autoComplete="postal-code"
                  aria-required="true"
                  className="text-apple-text placeholder:text-apple-grey"
                />
              </FormControl>
              <FormMessage className="text-red-700" />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default AddressFields;
