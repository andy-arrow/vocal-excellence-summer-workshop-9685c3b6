
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
import { Info } from 'lucide-react';

const ProgrammeApplicationSection = () => {
  const form = useFormContext<ApplicationFormValues>();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">Programme Application</h3>
        <div className="flex items-center text-sm text-gray-800 gap-1.5 font-medium">
          <Info className="w-4 h-4" />
          <span>All fields are required unless marked optional</span>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white rounded-xl p-4 border border-gray-300 shadow-sm">
          <FormField
            control={form.control}
            name="reasonForApplying"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="flex items-center gap-2 text-gray-900 font-medium">
                  Why do you want to join this programme?
                  <span className="text-red-700">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Please explain your interest in the programme and what you hope to achieve"
                    className="min-h-[150px] rounded-xl border-gray-300 focus:border-blue-700 focus:ring-0 text-gray-900 placeholder:text-gray-600"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-700 font-medium" />
              </FormItem>
            )}
          />
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-gray-300 shadow-sm">
          <FormField
            control={form.control}
            name="heardAboutUs"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="flex items-center gap-2 text-gray-900 font-medium">
                  How did you hear about us?
                  <span className="text-red-700">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Social media, website, referral, etc." 
                    className="rounded-xl border-gray-300 focus:border-blue-700 focus:ring-0 text-gray-900 placeholder:text-gray-600" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-red-700 font-medium" />
              </FormItem>
            )}
          />
        </div>
        
        <div className="bg-gray-100 rounded-xl p-4 border border-gray-300">
          <FormField
            control={form.control}
            name="scholarshipInterest"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className={`${field.value ? 'border-blue-700 bg-blue-700 text-white' : 'border-gray-400 bg-white'} h-5 w-5 rounded-md`}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-gray-900 font-medium">
                    I wish to be considered for financial aid
                  </FormLabel>
                  {field.value && (
                    <p className="text-sm text-gray-800 mt-2 font-medium">
                      If selected, we will contact you with further instructions on how to complete the financial aid application.
                    </p>
                  )}
                </div>
              </FormItem>
            )}
          />
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-gray-300 shadow-sm">
          <FormField
            control={form.control}
            name="specialNeeds"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-gray-900 font-medium">
                  Accessibility Needs or Special Accommodations (Optional)
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Please inform us of any accessibility requirements or accommodations you may need"
                    className="min-h-[100px] rounded-xl border-gray-300 focus:border-blue-700 focus:ring-0 text-gray-900 placeholder:text-gray-600"
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
