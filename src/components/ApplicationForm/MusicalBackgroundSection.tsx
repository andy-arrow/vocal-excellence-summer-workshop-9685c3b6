
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApplicationFormValues } from './schema';
import { Music } from 'lucide-react';

const MusicalBackgroundSection = () => {
  const form = useFormContext<ApplicationFormValues>();

  return (
    <div className="space-y-5 md:space-y-6">
      <div className="flex items-center gap-2 md:gap-3">
        <Music className="h-4 w-4 md:h-5 md:w-5 text-apple-blue flex-shrink-0" />
        <h3 className="text-base md:text-lg font-bold text-[#1d1d1f]">Vocal Information</h3>
      </div>
      
      <div className="space-y-5 md:space-y-6 bg-[#f9f9f9] p-4 md:p-5 rounded-lg md:rounded-xl border border-[#e5e5e5]">
        <FormField
          control={form.control}
          name="vocalRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#1d1d1f] font-medium text-sm md:text-base">
                Vocal Range
                <span className="text-red-600 ml-1">*</span>
              </FormLabel>
              <FormDescription className="text-[#666666] mt-0.5 mb-1.5 text-xs md:text-sm">
                Select the vocal range that best describes your voice
              </FormDescription>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="h-10 sm:h-11 bg-white border-[#e5e5e5] text-[#1d1d1f] text-sm md:text-base">
                    <SelectValue placeholder="Select your vocal range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="soprano" className="text-sm sm:text-base">Soprano</SelectItem>
                    <SelectItem value="mezzo-soprano" className="text-sm sm:text-base">Mezzo-soprano</SelectItem>
                    <SelectItem value="contralto" className="text-sm sm:text-base">Contralto</SelectItem>
                    <SelectItem value="countertenor" className="text-sm sm:text-base">Countertenor</SelectItem>
                    <SelectItem value="tenor" className="text-sm sm:text-base">Tenor</SelectItem>
                    <SelectItem value="baritone" className="text-sm sm:text-base">Baritone</SelectItem>
                    <SelectItem value="bass" className="text-sm sm:text-base">Bass</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-red-600 font-medium text-xs md:text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="yearsOfSinging"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#1d1d1f] font-medium text-sm md:text-base">
                Years of Singing
                <span className="text-red-600 ml-1">*</span>
              </FormLabel>
              <FormDescription className="text-[#666666] mt-0.5 mb-1.5 text-xs md:text-sm">
                How many years have you been singing?
              </FormDescription>
              <FormControl>
                <Input 
                  {...field}
                  type="number"
                  inputMode="numeric"
                  min="0"
                  className="h-10 sm:h-11 bg-white border-[#e5e5e5] text-[#1d1d1f] placeholder:text-[#999999] text-sm md:text-base"
                  placeholder="Enter number of years"
                />
              </FormControl>
              <FormMessage className="text-red-600 font-medium text-xs md:text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="musicalBackground"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#1d1d1f] font-medium text-sm md:text-base">
                Your Singing Journey
                <span className="text-red-600 ml-1">*</span>
              </FormLabel>
              <FormDescription className="text-[#666666] mt-0.5 mb-1.5 text-xs md:text-sm">
                Tell us about your singing journey. Have you had formal lessons?
              </FormDescription>
              <FormControl>
                <Textarea 
                  {...field}
                  className="bg-white border-[#e5e5e5] text-[#1d1d1f] placeholder:text-[#999999] min-h-[100px] md:min-h-[120px] resize-y text-sm md:text-base"
                  placeholder="Share your vocal background..."
                />
              </FormControl>
              <FormMessage className="text-red-600 font-medium text-xs md:text-sm" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default MusicalBackgroundSection;
