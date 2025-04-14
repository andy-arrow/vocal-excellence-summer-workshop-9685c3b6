
import React from 'react';
import BasicInfoFields from './PersonalInfo/BasicInfoFields';
import ContactInfoFields from './PersonalInfo/ContactInfoFields';
import AddressFields from './PersonalInfo/AddressFields';

const PersonalInfoSection = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white mb-6">Personal Information</h3>
      
      <BasicInfoFields />
      <ContactInfoFields />
      <AddressFields />
    </div>
  );
};

export default PersonalInfoSection;
