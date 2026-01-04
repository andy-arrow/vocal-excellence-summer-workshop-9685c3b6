
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ApplicationFormValues } from './schema';
import BasicInfoFields from './PersonalInfo/BasicInfoFields';
import ContactInfoFields from './PersonalInfo/ContactInfoFields';

const PersonalInfoSection = () => {
  const form = useFormContext<ApplicationFormValues>();
  
  return (
    <div className="space-y-5 md:space-y-6">
      <div className="p-4 md:p-5 rounded-lg md:rounded-xl bg-[#f9f9f9] border border-[#e5e5e5]">
        <h3 className="text-base md:text-lg font-bold text-[#1d1d1f] mb-2 md:mb-3">About You</h3>
        <p className="text-[#666666] mb-4 md:mb-5 text-sm md:text-base">Let's start with your basic information</p>
        <BasicInfoFields />
      </div>
      
      <div className="p-4 md:p-5 rounded-lg md:rounded-xl bg-[#f9f9f9] border border-[#e5e5e5]">
        <h3 className="text-base md:text-lg font-bold text-[#1d1d1f] mb-2 md:mb-3">How to Reach You</h3>
        <p className="text-[#666666] mb-4 md:mb-5 text-sm md:text-base">Your contact information is important so we can keep you updated</p>
        <ContactInfoFields />
      </div>
    </div>
  );
};

export default PersonalInfoSection;
