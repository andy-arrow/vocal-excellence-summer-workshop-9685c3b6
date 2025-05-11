
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ApplicationFormValues } from './schema';
import BasicInfoFields from './PersonalInfo/BasicInfoFields';
import ContactInfoFields from './PersonalInfo/ContactInfoFields';

const PersonalInfoSection = () => {
  const form = useFormContext<ApplicationFormValues>();
  
  return (
    <div className="space-y-8">
      <div className="space-y-8">
        <div className="p-6 rounded-xl bg-white border border-apple-border shadow-sm">
          <h3 className="text-xl font-bold text-apple-text mb-4">About You</h3>
          <p className="text-apple-grey mb-6 text-base font-medium">Let's start with your basic information</p>
          <BasicInfoFields />
        </div>
        
        <div className="p-6 rounded-xl bg-white border border-apple-border shadow-sm">
          <h3 className="text-xl font-bold text-apple-text mb-4">How to Reach You</h3>
          <p className="text-apple-grey mb-6 text-base font-medium">Your contact information is important so we can keep you updated</p>
          <ContactInfoFields />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
