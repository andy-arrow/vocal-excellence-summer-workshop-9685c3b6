
import React, { useState, useMemo } from 'react';
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
} from '@/components/ui/select';
import { ApplicationFormValues } from '../schema';
import { COUNTRY_CODES, POPULAR_COUNTRIES } from '@/constants/countryCodes';

const ContactInfoFields = () => {
  const form = useFormContext<ApplicationFormValues>();
  const [selectedValue, setSelectedValue] = useState("+357|CY");
  const [phoneNumber, setPhoneNumber] = useState("");

  const sortedCountries = useMemo(() => {
    const popular = COUNTRY_CODES.filter(c => POPULAR_COUNTRIES.includes(c.code));
    const rest = COUNTRY_CODES.filter(c => !POPULAR_COUNTRIES.includes(c.code));
    return { popular, rest };
  }, []);

  const getDialCode = (value: string) => value.split('|')[0];

  const handleCountryChange = (value: string) => {
    setSelectedValue(value);
    const dialCode = getDialCode(value);
    const fullNumber = phoneNumber ? `${dialCode} ${phoneNumber}` : dialCode;
    form.setValue('phone', fullNumber, { shouldValidate: true });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    const dialCode = getDialCode(selectedValue);
    const fullNumber = value ? `${dialCode} ${value}` : dialCode;
    form.setValue('phone', fullNumber, { shouldValidate: true });
  };

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="text-gray-900 font-medium" htmlFor="email">
              Email Address
              <span className="text-red-700 ml-1">*</span>
            </FormLabel>
            <FormDescription className="text-sm text-apple-grey mt-0.5 mb-1.5">
              We'll use this to send you updates about your application
            </FormDescription>
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
          <FormItem className="flex flex-col">
            <FormLabel className="text-gray-900 font-medium" htmlFor="phone">
              Phone Number
              <span className="text-red-700 ml-1">*</span>
            </FormLabel>
            <FormDescription className="text-sm text-apple-grey mt-0.5 mb-1.5">
              Select your country code and enter your number
            </FormDescription>
            <div className="flex gap-2">
              <Select value={selectedValue} onValueChange={handleCountryChange}>
                <SelectTrigger className="w-[140px] text-gray-900" data-testid="select-country-code">
                  <SelectValue placeholder="Code" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  <div className="px-2 py-1.5 text-xs font-semibold text-gray-500">Popular</div>
                  {sortedCountries.popular.map((country) => (
                    <SelectItem 
                      key={`popular-${country.code}`} 
                      value={`${country.dial}|${country.code}`}
                      className="text-gray-900"
                    >
                      {country.dial} {country.name}
                    </SelectItem>
                  ))}
                  <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 border-t mt-1 pt-2">All Countries</div>
                  {sortedCountries.rest.map((country) => (
                    <SelectItem 
                      key={`rest-${country.code}`} 
                      value={`${country.dial}|${country.code}`}
                      className="text-gray-900"
                    >
                      {country.dial} {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormControl>
                <Input 
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="123 456 7890"
                  autoComplete="tel-national"
                  aria-required="true"
                  className="flex-1 text-gray-900 placeholder:text-gray-500"
                  data-testid="input-phone-number"
                />
              </FormControl>
            </div>
            <input type="hidden" {...field} />
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
