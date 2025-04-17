
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ApplicationFormValues } from './schema';
import BasicInfoFields from './PersonalInfo/BasicInfoFields';
import AddressFields from './PersonalInfo/AddressFields';
import ContactInfoFields from './PersonalInfo/ContactInfoFields';

const PersonalInfoSection = () => {
  const form = useFormContext<ApplicationFormValues>();
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-[#1d1d1f] mb-6">Personal Information</h3>
      
      <div className="space-y-8">
        <div className="space-y-6 p-5 rounded-xl bg-[#f5f5f7]">
          <h4 className="text-base font-medium text-[#1d1d1f]">Basic Information</h4>
          <BasicInfoFields />
        </div>
        
        <div className="space-y-6 p-5 rounded-xl bg-[#f5f5f7]">
          <h4 className="text-base font-medium text-[#1d1d1f]">Contact Information</h4>
          <ContactInfoFields />
        </div>
        
        <div className="space-y-6 p-5 rounded-xl bg-[#f5f5f7]">
          <h4 className="text-base font-medium text-[#1d1d1f]">Address</h4>
          <AddressFields />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
