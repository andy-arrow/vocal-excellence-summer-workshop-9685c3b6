
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
      <div className="space-y-6">
        <div className="p-5 rounded-lg bg-gray-50 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
          <BasicInfoFields />
        </div>
        
        <div className="p-5 rounded-lg bg-gray-50 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
          <ContactInfoFields />
        </div>
        
        <div className="p-5 rounded-lg bg-gray-50 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Address</h3>
          <AddressFields />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
