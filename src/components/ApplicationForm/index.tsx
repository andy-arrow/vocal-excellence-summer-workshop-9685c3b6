
import React, { useEffect } from 'react';
import ApplicationFormComponent from '../ApplicationForm';
import { applicationFilesStore } from '@/stores/applicationFilesStore';

// Re-export the ApplicationForm component with proper naming
const ApplicationForm = () => {
  // Ensure application files are initialized at the index level
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
      
      // Initialize the application files store
      const existingFiles = applicationFilesStore.getFiles();
      console.log('ApplicationForm/index: Current files in store:', 
        Object.keys(existingFiles).map(key => 
          `${key}: ${existingFiles[key] ? `${existingFiles[key]?.name} (${existingFiles[key]?.size} bytes)` : 'null'}`
        )
      );
    }
  }, []);
  
  return <ApplicationFormComponent />;
};

export default ApplicationForm;
