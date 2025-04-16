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
  const { control } = useFormContext<ApplicationFormValues>();

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-violet-100 mb-4">Programme Application</h3>
      
      <FormField
        control={control}
        name="reasonForApplying"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              Why do you want to join this programme?
              <span className="text-red-400">*</span>
            </FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Please explain your interest in the programme and what you hope to achieve (minimum 100 characters)"
                className="min-h-[150px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="heardAboutUs"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              How did you hear about us?
              <span className="text-red-400">*</span>
            </FormLabel>
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
                className="data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="text-violet-100">
                I wish to be considered for financial aid (additional documentation will be required)
              </FormLabel>
              {field.value && (
                <p className="text-sm text-violet-300/80 mt-2">
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
            <FormLabel className="text-violet-100">Accessibility Needs or Special Accommodations (Optional)</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Please inform us of any accessibility requirements or accommodations you may need during the programme"
                className="min-h-[100px] bg-slate-800/50 border-violet-500/20 focus:border-violet-500/50 text-violet-50 placeholder:text-violet-400/50"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProgrammeApplicationSection;
