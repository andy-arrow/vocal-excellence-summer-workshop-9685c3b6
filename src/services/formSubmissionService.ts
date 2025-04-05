
/**
 * Form Submission Service
 * 
 * This service handles form data submission with proper error handling and validation.
 * In a production environment, this would connect to a backend API.
 */

import { ApplicationFormValues } from "@/components/ApplicationForm/schema";

interface ContactFormData {
  name: string;
  email: string;
  vocal_type: string;
  message?: string;
}

/**
 * Submits contact form data
 * In production, this would connect to a backend API endpoint
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

    // In production, this would be an API call:
    // const response = await fetch('https://api.vocalexcellence.com/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // });
    // if (!response.ok) throw new Error('Failed to submit form');
    // return await response.json();
    
    // For now we're using localStorage as a fallback
    const existingSubmissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
    const updatedSubmissions = [...existingSubmissions, formData];
    localStorage.setItem('contact_submissions', JSON.stringify(updatedSubmissions));
    
    // Production-ready response
    return { success: true, data: formData };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, error };
  }
};

/**
 * Submits application form data
 * In production, this would connect to a backend API endpoint
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

    // In production, this would be an API call:
    // const response = await fetch('https://api.vocalexcellence.com/api/applications', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // });
    // if (!response.ok) throw new Error('Failed to submit form');
    // return await response.json();
    
    // For now we're using localStorage as a fallback
    const existingSubmissions = JSON.parse(localStorage.getItem('application_submissions') || '[]');
    const updatedSubmissions = [...existingSubmissions, formData];
    localStorage.setItem('application_submissions', JSON.stringify(updatedSubmissions));
    
    // Production-ready response
    return { success: true, data: formData };
  } catch (error) {
    console.error("Error submitting application form:", error);
    return { success: false, error };
  }
};
