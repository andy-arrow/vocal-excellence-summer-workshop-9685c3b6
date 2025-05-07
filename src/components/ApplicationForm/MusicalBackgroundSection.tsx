
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
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Music className="h-5 w-5 text-apple-blue" />
        <h3 className="text-xl font-bold text-apple-text">Vocal Information</h3>
      </div>
      
      <div className="space-y-8 bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm">
        {/* Vocal Range Selection */}
        <FormField
          control={form.control}
          name="vocalRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-apple-text font-medium text-base">
                Vocal Range
                <span className="text-red-700 ml-1">*</span>
              </FormLabel>
              <FormDescription className="text-apple-grey mt-0.5 mb-1.5">
                Select the vocal range that best describes your voice
              </FormDescription>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="bg-white border-apple-border text-apple-text">
                    <SelectValue placeholder="Select your vocal range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="soprano">Soprano</SelectItem>
                    <SelectItem value="mezzo-soprano">Mezzo-soprano</SelectItem>
                    <SelectItem value="contralto">Contralto</SelectItem>
                    <SelectItem value="countertenor">Countertenor</SelectItem>
                    <SelectItem value="tenor">Tenor</SelectItem>
                    <SelectItem value="baritone">Baritone</SelectItem>
                    <SelectItem value="bass">Bass</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-red-700 font-medium" />
            </FormItem>
          )}
        />

        {/* Years of Singing */}
        <FormField
          control={form.control}
          name="yearsOfExperience"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-apple-text font-medium text-base">
                Years of Singing
                <span className="text-red-700 ml-1">*</span>
              </FormLabel>
              <FormDescription className="text-apple-grey mt-0.5 mb-1.5">
                How many years have you been singing? (Enter 0 if you're just starting)
              </FormDescription>
              <FormControl>
                <Input 
                  {...field}
                  type="number"
                  min="0"
                  className="bg-white border-apple-border text-apple-text placeholder:text-apple-grey"
                  placeholder="Enter number of years"
                />
              </FormControl>
              <FormMessage className="text-red-700 font-medium" />
            </FormItem>
          )}
        />

        {/* Vocal Background */}
        <FormField
          control={form.control}
          name="musicalBackground"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-apple-text font-medium text-base">
                Your Singing Journey
                <span className="text-red-700 ml-1">*</span>
              </FormLabel>
              <FormDescription className="text-apple-grey mt-0.5 mb-1.5">
                Tell us about your relationship with singing (formal or informal)
              </FormDescription>
              <FormControl>
                <Textarea 
                  {...field}
                  className="bg-white border-apple-border text-apple-text placeholder:text-apple-grey min-h-[120px] resize-y"
                  placeholder="Share anything about your singing journey so far..."
                />
              </FormControl>
              <FormMessage className="text-red-700 font-medium" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default MusicalBackgroundSection;
