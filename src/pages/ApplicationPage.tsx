
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * This component is a simple redirect to the Application page.
 * It exists to maintain compatibility with the original import in App.tsx.
 */
const ApplicationPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Ensure window.applicationFiles is initialized
    if (typeof window !== 'undefined') {
      if (!window.applicationFiles) {
        window.applicationFiles = {
          audioFile1: null,
          audioFile2: null, 
          cvFile: null,
          recommendationFile: null
        };
        console.log('ApplicationPage: Initialized window.applicationFiles');
      } else {
        console.log('ApplicationPage: Found existing window.applicationFiles');
      }
    }
    
    // Navigate to the application page
    navigate('/apply', { replace: true });
  }, [navigate]);
  
  return null;
};

export default ApplicationPage;
