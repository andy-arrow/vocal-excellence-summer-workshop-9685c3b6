
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ApplicationFormValues } from './schema';

const MusicalBackgroundSection = () => {
  const form = useFormContext<ApplicationFormValues>();

  return (
    <div className="bg-apple-gray-light/20 p-8 rounded-xl">
      <h3 className="text-xl font-semibold text-apple-dark mb-6">Musical Background</h3>
      
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="vocalRange"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Vocal Range</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid sm:grid-cols-2 gap-2"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="soprano" />
                    </FormControl>
                    <FormLabel className="font-normal">Soprano</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="mezzo-soprano" />
                    </FormControl>
                    <FormLabel className="font-normal">Mezzo-Soprano</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="alto" />
                    </FormControl>
                    <FormLabel className="font-normal">Alto</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="tenor" />
                    </FormControl>
                    <FormLabel className="font-normal">Tenor</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="baritone" />
                    </FormControl>
                    <FormLabel className="font-normal">Baritone</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="bass" />
                    </FormControl>
                    <FormLabel className="font-normal">Bass</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="other" />
                    </FormControl>
                    <FormLabel className="font-normal">Other/Unsure</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="yearsOfExperience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Years of Vocal Training</FormLabel>
              <FormControl>
                <Input placeholder="Years of experience" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="musicalBackground"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Musical Background & Training</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your musical education, training, and significant learning experiences"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="teacherName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current/Past Vocal Teacher</FormLabel>
                <FormControl>
                  <Input placeholder="Teacher's name (optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="teacherEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teacher's Email (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Teacher's email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="performanceExperience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Performance Experience</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe any performances, competitions, or public appearances"
                  className="min-h-[120px]"
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

export default MusicalBackgroundSection;
