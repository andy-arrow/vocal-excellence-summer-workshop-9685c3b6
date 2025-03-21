
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
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ApplicationFormValues } from './schema';

const ProgrammeApplicationSection = () => {
  const form = useFormContext<ApplicationFormValues>();

  return (
    <div className="bg-apple-gray-light/20 p-8 rounded-xl">
      <h3 className="text-xl font-semibold text-apple-dark mb-6">Programme Application</h3>
      
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="reasonForApplying"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Why do you want to join this programme?</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Please explain your interest in the programme and what you hope to achieve"
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="heardAboutUs"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How did you hear about us?</FormLabel>
              <FormControl>
                <Input placeholder="Social media, website, referral, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="scholarshipInterest"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I would like to be considered for a scholarship (separate application required)
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="specialNeeds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Special Accommodations or Accessibility Needs (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Please let us know if you have any specific requirements"
                  className="min-h-[100px]"
                  {...field}
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

export default ProgrammeApplicationSection;
