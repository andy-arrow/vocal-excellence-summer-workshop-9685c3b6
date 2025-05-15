
import React, { useEffect } from 'react';
import ApplicationFormComponent from '../ApplicationForm';

// Re-export the ApplicationForm component with proper naming
const ApplicationForm = () => {
  // Ensure application files are initialized
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.applicationFiles) {
      window.applicationFiles = {};
      console.log('ApplicationForm/index: Initialized window.applicationFiles');
    }
  }, []);
  
  return <ApplicationFormComponent />;
};

export default ApplicationForm;
