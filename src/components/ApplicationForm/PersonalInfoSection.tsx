
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ApplicationFormValues } from './schema';
import BasicInfoFields from './PersonalInfo/BasicInfoFields';
import AddressFields from './PersonalInfo/AddressFields';
import ContactInfoFields from './PersonalInfo/ContactInfoFields';

const PersonalInfoSection = () => {
  const form = useFormContext<ApplicationFormValues>();
  
  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-medium text-violet-100 tracking-tight">Personal Information</h3>
      
      <div className="space-y-8">
        <div className="space-y-6 p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-violet-500/20 hover:border-violet-500/30 transition-colors shadow-lg">
          <h4 className="text-lg font-medium text-violet-100">Basic Information</h4>
          <BasicInfoFields />
        </div>
        
        <div className="space-y-6 p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-violet-500/20 hover:border-violet-500/30 transition-colors shadow-lg">
          <h4 className="text-lg font-medium text-violet-100">Contact Information</h4>
          <ContactInfoFields />
        </div>
        
        <div className="space-y-6 p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-violet-500/20 hover:border-violet-500/30 transition-colors shadow-lg">
          <h4 className="text-lg font-medium text-violet-100">Address</h4>
          <AddressFields />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
