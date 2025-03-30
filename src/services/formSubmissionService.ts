
/**
 * Form Submission Service
 * 
 * This service handles storing form data locally using localStorage.
 */

import { ApplicationFormValues } from "@/components/ApplicationForm/schema";

interface ContactFormData {
  name: string;
  email: string;
  vocal_type: string;
  message?: string;
}

/**
 * Submits contact form data to localStorage
 */
export const submitContactForm = async (data: ContactFormData): Promise<any> => {
  try {
    // Add timestamp and source information
    const formData = {
      ...data,
      id: `contact_${Date.now()}`,
      timestamp: new Date().toISOString(),
      source: window.location.href,
    };

    // Get existing submissions or initialize empty array
    const existingSubmissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
    
    // Add new submission
    const updatedSubmissions = [...existingSubmissions, formData];
    
    // Save to localStorage
    localStorage.setItem('contact_submissions', JSON.stringify(updatedSubmissions));
    
    console.log('Contact form submitted:', formData);
    return { success: true, data: formData };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, error };
  }
};

/**
 * Submits application form data to localStorage
 */
export const submitApplicationForm = async (data: ApplicationFormValues): Promise<any> => {
  try {
    // Add timestamp and source information
    const formData = {
      ...data,
      id: `application_${Date.now()}`,
      timestamp: new Date().toISOString(),
      source: window.location.href,
    };

    // Get existing submissions or initialize empty array
    const existingSubmissions = JSON.parse(localStorage.getItem('application_submissions') || '[]');
    
    // Add new submission
    const updatedSubmissions = [...existingSubmissions, formData];
    
    // Save to localStorage
    localStorage.setItem('application_submissions', JSON.stringify(updatedSubmissions));
    
    console.log('Application form submitted:', formData);
    return { success: true, data: formData };
  } catch (error) {
    console.error("Error submitting application form:", error);
    return { success: false, error };
  }
};
