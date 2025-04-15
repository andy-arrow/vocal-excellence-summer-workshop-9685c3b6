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
              <FormLabel className="text-violet-100" htmlFor="address">Address</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  id="address"
                  placeholder="Street address"
                  autoComplete="street-address"
                  aria-required="true"
                />
              </FormControl>
              <FormMessage />
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
              <FormLabel className="text-violet-100" htmlFor="city">City</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  id="city"
                  placeholder="City"
                  autoComplete="address-level2"
                  aria-required="true"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-violet-100">Country</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-violet-100" htmlFor="postalCode">Postal/Zip Code</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  id="postalCode"
                  placeholder="Postal/Zip code"
                  autoComplete="postal-code"
                  aria-required="true"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default AddressFields;
