
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
        <h3 className="text-xl font-semibold text-[#1d1d1f]">Programme Application</h3>
        <div className="flex items-center text-sm text-[#86868b] gap-1.5">
          <Info className="w-4 h-4" />
          <span>All fields are required unless marked optional</span>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white rounded-xl p-4 border border-[#e6e6e6] hover:border-[#d2d2d7] transition-colors">
          <FormField
            control={form.control}
            name="reasonForApplying"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="flex items-center gap-2 text-[#1d1d1f] font-medium">
                  Why do you want to join this programme?
                  <span className="text-[#bf4800]">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Please explain your interest in the programme and what you hope to achieve"
                    className="min-h-[150px] rounded-xl border-[#e6e6e6] focus:border-[#0077ed] focus:ring-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[#bf4800]" />
              </FormItem>
            )}
          />
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-[#e6e6e6] hover:border-[#d2d2d7] transition-colors">
          <FormField
            control={form.control}
            name="heardAboutUs"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="flex items-center gap-2 text-[#1d1d1f] font-medium">
                  How did you hear about us?
                  <span className="text-[#bf4800]">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Social media, website, referral, etc." 
                    className="rounded-xl border-[#e6e6e6] focus:border-[#0077ed] focus:ring-0" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-[#bf4800]" />
              </FormItem>
            )}
          />
        </div>
        
        <div className="bg-[#f5f5f7] rounded-xl p-4">
          <FormField
            control={form.control}
            name="scholarshipInterest"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className={`${field.value ? 'border-[#0077ed] bg-[#0077ed] text-white' : 'border-[#d2d2d7] bg-white'} h-5 w-5 rounded-md`}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-[#1d1d1f] font-medium">
                    I wish to be considered for financial aid
                  </FormLabel>
                  {field.value && (
                    <p className="text-sm text-[#86868b] mt-2">
                      If selected, we will contact you with further instructions on how to complete the financial aid application.
                    </p>
                  )}
                </div>
              </FormItem>
            )}
          />
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-[#e6e6e6] hover:border-[#d2d2d7] transition-colors">
          <FormField
            control={form.control}
            name="specialNeeds"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-[#1d1d1f] font-medium">
                  Accessibility Needs or Special Accommodations (Optional)
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Please inform us of any accessibility requirements or accommodations you may need"
                    className="min-h-[100px] rounded-xl border-[#e6e6e6] focus:border-[#0077ed] focus:ring-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[#bf4800]" />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgrammeApplicationSection;
