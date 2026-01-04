
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
    <div className="space-y-4 md:space-y-5">
      <div className="mb-4 md:mb-5">
        <h4 className="text-base md:text-lg text-[#1d1d1f] font-medium mb-1 md:mb-2">Why Join Our Programme?</h4>
        <p className="text-[#666666] text-sm md:text-base">
          Tell us about your aspirations and what you hope to achieve.
        </p>
      </div>
      
      <div className="space-y-4 md:space-y-5">
        <div className="bg-[#f9f9f9] rounded-lg md:rounded-xl p-3 md:p-4 border border-[#e5e5e5]">
          <FormField
            control={form.control}
            name="reasonForApplying"
            render={({ field }) => (
              <FormItem className="space-y-1.5 md:space-y-2">
                <FormLabel className="flex items-center gap-2 text-[#1d1d1f] font-medium text-sm md:text-base">
                  Why do you want to join this programme?
                  <span className="text-red-600">*</span>
                </FormLabel>
                <FormDescription className="text-xs md:text-sm text-[#666666]">
                  Share your vocal goals and what attracts you to our workshop.
                </FormDescription>
                <FormControl>
                  <Textarea 
                    placeholder="I want to join this programme because..."
                    className="min-h-[120px] md:min-h-[150px] rounded-lg md:rounded-xl border-[#e5e5e5] focus:border-apple-blue focus:ring-0 text-[#1d1d1f] placeholder:text-[#999999] text-sm md:text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600 font-medium text-xs md:text-sm" />
              </FormItem>
            )}
          />
        </div>
        
        <div className="bg-[#f9f9f9] rounded-lg md:rounded-xl p-3 md:p-4 border border-[#e5e5e5]">
          <FormField
            control={form.control}
            name="heardAboutUs"
            render={({ field }) => (
              <FormItem className="space-y-1.5 md:space-y-2">
                <FormLabel className="flex items-center gap-2 text-[#1d1d1f] font-medium text-sm md:text-base">
                  How did you hear about us?
                  <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Social media, website, referral, etc." 
                    className="rounded-lg md:rounded-xl border-[#e5e5e5] focus:border-apple-blue focus:ring-0 text-[#1d1d1f] placeholder:text-[#999999] text-sm md:text-base" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-red-600 font-medium text-xs md:text-sm" />
              </FormItem>
            )}
          />
        </div>

        <div className="bg-[#f9f9f9] rounded-lg md:rounded-xl p-3 md:p-4 border border-[#e5e5e5]">
          <FormField
            control={form.control}
            name="areasOfInterest"
            render={({ field }) => (
              <FormItem className="space-y-1.5 md:space-y-2">
                <FormLabel className="text-[#1d1d1f] font-medium text-sm md:text-base">
                  Areas of Vocal Interest (Optional)
                </FormLabel>
                <FormDescription className="text-xs md:text-sm text-[#666666]">
                  Specific styles or techniques you'd like to explore?
                </FormDescription>
                <FormControl>
                  <Textarea 
                    placeholder="e.g., jazz, classical, extended techniques"
                    className="min-h-[80px] md:min-h-[100px] rounded-lg md:rounded-xl border-[#e5e5e5] focus:border-apple-blue focus:ring-0 text-[#1d1d1f] placeholder:text-[#999999] text-sm md:text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600 font-medium text-xs md:text-sm" />
              </FormItem>
            )}
          />
        </div>
        
        <div className="bg-[#f9f9f9] rounded-lg md:rounded-xl p-3 md:p-4 border border-[#e5e5e5]">
          <DietaryRestrictions />
        </div>
        
        <div className="bg-[#f0f7ff] rounded-lg md:rounded-xl p-3 md:p-4 border border-[#d0e5ff]">
          <FormField
            control={form.control}
            name="scholarshipInterest"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className={`${field.value ? 'border-apple-blue bg-apple-blue text-white' : 'border-[#999999] bg-white'} h-4 w-4 md:h-5 md:w-5 rounded-md mt-0.5`}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-[#1d1d1f] font-medium text-sm md:text-base">
                    I wish to be considered for financial aid
                  </FormLabel>
                  {field.value && (
                    <p className="text-xs md:text-sm text-[#666666] mt-1.5">
                      If selected, we will contact you with further instructions.
                    </p>
                  )}
                </div>
              </FormItem>
            )}
          />
        </div>
        
        <div className="bg-[#f9f9f9] rounded-lg md:rounded-xl p-3 md:p-4 border border-[#e5e5e5]">
          <FormField
            control={form.control}
            name="specialNeeds"
            render={({ field }) => (
              <FormItem className="space-y-1.5 md:space-y-2">
                <FormLabel className="text-[#1d1d1f] font-medium text-sm md:text-base">
                  Accessibility Requirements (Optional)
                </FormLabel>
                <FormDescription className="text-xs md:text-sm text-[#666666]">
                  Tell us about any accommodations or special needs.
                </FormDescription>
                <FormControl>
                  <Textarea 
                    placeholder="e.g., mobility accommodations"
                    className="min-h-[80px] md:min-h-[100px] rounded-lg md:rounded-xl border-[#e5e5e5] focus:border-apple-blue focus:ring-0 text-[#1d1d1f] placeholder:text-[#999999] text-sm md:text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600 font-medium text-xs md:text-sm" />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgrammeApplicationSection;
