
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
        
        // Make sure all required keys exist
        const requiredKeys = ['audioFile1', 'audioFile2', 'cvFile', 'recommendationFile'];
        let updated = false;
        
        requiredKeys.forEach(key => {
          if (!(key in window.applicationFiles)) {
            window.applicationFiles[key] = null;
            updated = true;
          }
        });
        
        if (updated) {
          console.log('ApplicationForm/index: Updated window.applicationFiles with missing keys');
        }
      }
    }
  }, []);
  
  return <ApplicationFormComponent />;
};

export default ApplicationForm;
