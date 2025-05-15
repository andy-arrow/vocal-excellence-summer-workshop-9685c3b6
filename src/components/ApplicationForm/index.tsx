
import React, { useEffect } from 'react';
import ApplicationFormComponent from '../ApplicationForm';

// Re-export the ApplicationForm component with proper naming
const ApplicationForm = () => {
  // Ensure application files are initialized at the index level too
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!window.applicationFiles) {
        window.applicationFiles = {
          audioFile1: null,
          audioFile2: null,
          cvFile: null,
          recommendationFile: null
        };
        console.log('ApplicationForm/index: Initialized window.applicationFiles with default structure');
      } else {
        console.log('ApplicationForm/index: Found existing window.applicationFiles');
      }
    }
  }, []);
  
  return <ApplicationFormComponent />;
};

export default ApplicationForm;
