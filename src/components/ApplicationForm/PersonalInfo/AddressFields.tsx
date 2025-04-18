
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
              <FormLabel className="text-gray-900 font-medium" htmlFor="address">Address</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  id="address"
                  placeholder="Street address"
                  autoComplete="street-address"
                  aria-required="true"
                  className="text-gray-900 placeholder:text-gray-500"
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
              <FormLabel className="text-gray-900 font-medium" htmlFor="city">City</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  id="city"
                  placeholder="City"
                  autoComplete="address-level2"
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
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-900 font-medium">Country</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ""}>
                <FormControl>
                  <SelectTrigger className="text-gray-900">
                    <SelectValue placeholder="Select your country" className="text-gray-900" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="text-gray-900">
                  {countries.map((country) => (
                    <SelectItem 
                      key={country.value} 
                      value={country.value}
                      className="text-gray-900"
                    >
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-red-700" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-900 font-medium" htmlFor="postalCode">Postal/Zip Code</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  id="postalCode"
                  placeholder="Postal/Zip code"
                  autoComplete="postal-code"
                  aria-required="true"
                  className="text-gray-900 placeholder:text-gray-500"
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
