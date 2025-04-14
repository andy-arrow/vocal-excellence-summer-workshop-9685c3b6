
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const PersonalInfoSection = () => {
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <FormField
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="firstName">First Name</FormLabel>
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
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="lastName">Last Name</FormLabel>
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  type="email"
                  id="email"
                  placeholder="Your email"
                  autoComplete="email"
                  aria-required="true"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="phone">Phone Number</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  type="tel"
                  id="phone"
                  placeholder="Your phone number"
                  autoComplete="tel"
                  aria-required="true"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="dateOfBirth">Date of Birth</FormLabel>
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
          name="nationality"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="nationality">Nationality</FormLabel>
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

      <FormField
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="address">Address</FormLabel>
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

      <div className="grid sm:grid-cols-2 gap-6">
        <FormField
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="city">City</FormLabel>
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
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="country">Country</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  id="country"
                  placeholder="Country"
                  autoComplete="country"
                  aria-required="true"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="postalCode">Postal/Zip Code</FormLabel>
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
    </div>
  );
};

export default PersonalInfoSection;
