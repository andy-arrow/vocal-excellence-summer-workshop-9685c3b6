
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
              <FormLabel>Statement of Purpose <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Please explain your artistic goals, what you hope to achieve during the programme, and how this experience will contribute to your development as a vocalist"
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
              <FormLabel>How did you hear about the Summer Voice Programme? <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Faculty recommendation, website, social media, alumni, etc." {...field} />
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
                  I wish to be considered for financial aid (additional documentation will be required)
                </FormLabel>
                {field.value && (
                  <p className="text-sm text-gray-600 mt-2">
                    If selected, we will contact you with further instructions on how to complete the financial aid application.
                  </p>
                )}
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="specialNeeds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Accessibility Needs or Special Accommodations (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Please inform us of any accessibility requirements or accommodations you may need during the programme"
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
