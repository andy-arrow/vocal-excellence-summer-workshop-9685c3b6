
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { DietaryRestrictionType, ApplicationFormValues } from './schema';
import { Salad, Vegan } from 'lucide-react';

const DietaryRestrictions = () => {
  const form = useFormContext<ApplicationFormValues>();
  const watchDietary = form.watch('dietaryRestrictions.type');
  
  const handleDietaryChange = (value: DietaryRestrictionType) => {
    form.setValue('dietaryRestrictions.type', value);
    if (value !== 'other') {
      form.setValue('dietaryRestrictions.details', '');
    }
  };

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="dietaryRestrictions.type"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-apple-text font-medium text-base">
              Dietary Restrictions
              <span className="text-red-700 ml-1">*</span>
            </FormLabel>
            <FormDescription className="text-apple-grey mt-0.5 mb-1.5">
              Please select any dietary restrictions you have
            </FormDescription>
            <FormControl>
              <RadioGroup 
                onValueChange={(value) => handleDietaryChange(value as DietaryRestrictionType)} 
                defaultValue={field.value} 
                className="space-y-3"
              >
                <div className="flex items-center space-x-2 rounded-md border border-slate-200 p-3 hover:bg-slate-100">
                  <RadioGroupItem value="none" id="none" />
                  <Label htmlFor="none" className="flex-grow cursor-pointer">None</Label>
                </div>
                
                <div className="flex items-center space-x-2 rounded-md border border-slate-200 p-3 hover:bg-slate-100">
                  <RadioGroupItem value="vegetarian" id="vegetarian" />
                  <Label htmlFor="vegetarian" className="flex items-center space-x-2 flex-grow cursor-pointer">
                    <Salad className="h-4 w-4" />
                    <span>Vegetarian</span>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 rounded-md border border-slate-200 p-3 hover:bg-slate-100">
                  <RadioGroupItem value="vegan" id="vegan" />
                  <Label htmlFor="vegan" className="flex items-center space-x-2 flex-grow cursor-pointer">
                    <Vegan className="h-4 w-4" />
                    <span>Vegan</span>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 rounded-md border border-slate-200 p-3 hover:bg-slate-100">
                  <RadioGroupItem value="gluten-free" id="gluten-free" />
                  <Label htmlFor="gluten-free" className="flex-grow cursor-pointer">Gluten Free</Label>
                </div>
                
                <div className="flex items-center space-x-2 rounded-md border border-slate-200 p-3 hover:bg-slate-100">
                  <RadioGroupItem value="lactose-free" id="lactose-free" />
                  <Label htmlFor="lactose-free" className="flex-grow cursor-pointer">Lactose Free</Label>
                </div>
                
                <div className="flex items-center space-x-2 rounded-md border border-slate-200 p-3 hover:bg-slate-100">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other" className="flex-grow cursor-pointer">Other</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage className="text-red-700 font-medium" />
          </FormItem>
        )}
      />
      
      {watchDietary === 'other' && (
        <FormField
          control={form.control}
          name="dietaryRestrictions.details"
          render={({ field }) => (
            <FormItem className="pl-6 border-l-2 border-slate-200">
              <FormLabel className="text-apple-text font-medium">
                Please specify
                <span className="text-red-700 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  placeholder="Please specify your dietary restrictions..."
                  className="bg-white border-apple-border text-apple-text"
                />
              </FormControl>
              <FormMessage className="text-red-700 font-medium" />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};

export default DietaryRestrictions;
