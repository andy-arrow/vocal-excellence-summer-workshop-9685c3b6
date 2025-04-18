
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
      <div className="space-y-8">
        <div className="p-6 rounded-xl bg-white border-2 border-blue-100 shadow-sm">
          <h3 className="text-xl font-bold text-gray-800 mb-4">About You</h3>
          <p className="text-gray-600 mb-6">Let's start with your basic information</p>
          <BasicInfoFields />
        </div>
        
        <div className="p-6 rounded-xl bg-white border-2 border-blue-100 shadow-sm">
          <h3 className="text-xl font-bold text-gray-800 mb-4">How to Reach You</h3>
          <p className="text-gray-600 mb-6">Your contact information is important so we can keep you updated</p>
          <ContactInfoFields />
        </div>
        
        <div className="p-6 rounded-xl bg-white border-2 border-blue-100 shadow-sm">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Where You Live</h3>
          <p className="text-gray-600 mb-6">Please tell us your home address</p>
          <AddressFields />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
