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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApplicationFormValues } from './schema';

const MusicalBackgroundSection = () => {
  const form = useFormContext<ApplicationFormValues>();

  return (
    <div className="space-y-8 text-violet-100">
      <h3 className="text-xl font-semibold mb-6">Musical Background</h3>
      
      <div className="space-y-8 bg-slate-950/50 p-6 rounded-xl border border-violet-500/20">
        {/* Vocal Range Selection */}
        <FormField
          control={form.control}
          name="vocalRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-violet-200">
                Vocal Range
                <span className="text-red-400 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="bg-slate-900/80 border-violet-500/30 text-violet-100">
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
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        {/* Years of Experience */}
        <FormField
          control={form.control}
          name="yearsOfExperience"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-violet-200">
                Years of Experience
                <span className="text-red-400 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  type="number"
                  min="0"
                  className="bg-slate-900/80 border-violet-500/30 text-violet-100 placeholder:text-violet-400/50"
                  placeholder="Enter number of years"
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        {/* Musical Background */}
        <FormField
          control={form.control}
          name="musicalBackground"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-violet-200">
                Musical Background
                <span className="text-red-400 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Textarea 
                  {...field}
                  className="bg-slate-900/80 border-violet-500/30 text-violet-100 placeholder:text-violet-400/50 min-h-[100px]"
                  placeholder="Tell us about your musical education, training, and experience..."
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default MusicalBackgroundSection;
