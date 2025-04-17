
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
      <h3 className="text-2xl font-semibold text-[#1d1d1f] tracking-tight">
        Personal Information
      </h3>
      
      <div className="space-y-8">
        <div className="space-y-6 p-6 rounded-xl bg-white border border-[#e6e6e6] hover:border-[#d2d2d7] transition-colors shadow-sm">
          <h4 className="text-lg font-medium text-[#1d1d1f]">Basic Information</h4>
          <BasicInfoFields />
        </div>
        
        <div className="space-y-6 p-6 rounded-xl bg-white border border-[#e6e6e6] hover:border-[#d2d2d7] transition-colors shadow-sm">
          <h4 className="text-lg font-medium text-[#1d1d1f]">Contact Information</h4>
          <ContactInfoFields />
        </div>
        
        <div className="space-y-6 p-6 rounded-xl bg-white border border-[#e6e6e6] hover:border-[#d2d2d7] transition-colors shadow-sm">
          <h4 className="text-lg font-medium text-[#1d1d1f]">Address</h4>
          <AddressFields />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
