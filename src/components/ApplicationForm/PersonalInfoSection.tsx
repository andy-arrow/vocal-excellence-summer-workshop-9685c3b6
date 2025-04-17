
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries, nationalities } from '@/data/countries';
import { ApplicationFormValues } from '../ApplicationForm/schema';
import BasicInfoFields from './PersonalInfo/BasicInfoFields';
import AddressFields from './PersonalInfo/AddressFields';
import ContactInfoFields from './PersonalInfo/ContactInfoFields';

const PersonalInfoSection = () => {
  const form = useFormContext<ApplicationFormValues>();
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-violet-100 mb-6">Personal Information</h3>
      
      <div className="space-y-8 bg-slate-950/50 p-6 rounded-xl border border-violet-500/20">
        <BasicInfoFields />
        <ContactInfoFields />
        <AddressFields />
      </div>
    </div>
  );
};

export default PersonalInfoSection;
