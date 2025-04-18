
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
    <div className="space-y-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Musical Background</h3>
      
      <div className="space-y-8 bg-slate-100 p-6 rounded-xl border border-slate-300">
        {/* Vocal Range Selection */}
        <FormField
          control={form.control}
          name="vocalRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-900 font-medium">
                Vocal Range
                <span className="text-red-700 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                    <SelectValue placeholder="Select your vocal range" />
                  </SelectTrigger>
                  <SelectContent className="text-gray-900">
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

        {/* Years of Experience */}
        <FormField
          control={form.control}
          name="yearsOfExperience"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-900 font-medium">
                Years of Experience
                <span className="text-red-700 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  type="number"
                  min="0"
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-600"
                  placeholder="Enter number of years"
                />
              </FormControl>
              <FormMessage className="text-red-700 font-medium" />
            </FormItem>
          )}
        />

        {/* Musical Background */}
        <FormField
          control={form.control}
          name="musicalBackground"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-900 font-medium">
                Musical Background
                <span className="text-red-700 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Textarea 
                  {...field}
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-600 min-h-[100px]"
                  placeholder="Tell us about your musical education, training, and experience..."
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
