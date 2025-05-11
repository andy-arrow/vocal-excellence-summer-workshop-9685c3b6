
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
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ApplicationFormValues } from './schema';
import { Info } from 'lucide-react';
import DietaryRestrictions from './DietaryRestrictions';

const ProgrammeApplicationSection = () => {
  const form = useFormContext<ApplicationFormValues>();

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h4 className="text-lg text-apple-text font-medium mb-2">Why Join Our Programme?</h4>
        <p className="text-apple-grey">
          Tell us about your aspirations and what you hope to achieve.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white rounded-xl p-4 border border-apple-border shadow-sm">
          <FormField
            control={form.control}
            name="reasonForApplying"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="flex items-center gap-2 text-apple-text font-medium">
                  Why do you want to join this programme?
                  <span className="text-red-700">*</span>
                </FormLabel>
                <FormDescription className="text-sm text-apple-grey">
                  Share your vocal goals and what attracts you to our workshop.
                </FormDescription>
                <FormControl>
                  <Textarea 
                    placeholder="I want to join this programme because..."
                    className="min-h-[150px] rounded-xl border-apple-border focus:border-apple-blue focus:ring-0 text-apple-text placeholder:text-apple-grey"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-700 font-medium" />
              </FormItem>
            )}
          />
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-apple-border shadow-sm">
          <FormField
            control={form.control}
            name="heardAboutUs"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="flex items-center gap-2 text-apple-text font-medium">
                  How did you hear about us?
                  <span className="text-red-700">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Social media, website, referral, etc." 
                    className="rounded-xl border-apple-border focus:border-apple-blue focus:ring-0 text-apple-text placeholder:text-apple-grey" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-red-700 font-medium" />
              </FormItem>
            )}
          />
        </div>

        <div className="bg-white rounded-xl p-4 border border-apple-border shadow-sm">
          <FormField
            control={form.control}
            name="areasOfInterest"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-apple-text font-medium">
                  Areas of Vocal Interest (Optional)
                </FormLabel>
                <FormDescription className="text-sm text-apple-grey">
                  Are there specific styles or techniques you're interested in exploring?
                </FormDescription>
                <FormControl>
                  <Textarea 
                    placeholder="e.g., jazz improvisation, extended vocal techniques, classical repertoire"
                    className="min-h-[100px] rounded-xl border-apple-border focus:border-apple-blue focus:ring-0 text-apple-text placeholder:text-apple-grey"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-700 font-medium" />
              </FormItem>
            )}
          />
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-apple-border shadow-sm">
          <DietaryRestrictions />
        </div>
        
        <div className="bg-apple-light rounded-xl p-4 border border-apple-border">
          <FormField
            control={form.control}
            name="scholarshipInterest"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className={`${field.value ? 'border-apple-blue bg-apple-blue text-white' : 'border-apple-grey bg-white'} h-5 w-5 rounded-md`}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-apple-text font-medium">
                    I wish to be considered for financial aid
                  </FormLabel>
                  {field.value && (
                    <p className="text-sm text-apple-grey mt-2 font-medium">
                      If selected, we will contact you with further instructions.
                    </p>
                  )}
                </div>
              </FormItem>
            )}
          />
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-apple-border shadow-sm">
          <FormField
            control={form.control}
            name="specialNeeds"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-apple-text font-medium">
                  Accessibility Requirements (Optional)
                </FormLabel>
                <FormDescription className="text-sm text-apple-grey">
                  Tell us about any accommodations or special needs.
                </FormDescription>
                <FormControl>
                  <Textarea 
                    placeholder="e.g., mobility accommodations, accessibility requirements"
                    className="min-h-[100px] rounded-xl border-apple-border focus:border-apple-blue focus:ring-0 text-apple-text placeholder:text-apple-grey"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-700 font-medium" />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgrammeApplicationSection;
