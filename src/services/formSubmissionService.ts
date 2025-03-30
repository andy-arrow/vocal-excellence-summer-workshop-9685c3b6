
/**
 * Form Submission Service
 * 
 * This service handles sending form data to a real endpoint.
 * In a production environment, replace the example URL with your actual API endpoint.
 */

interface ContactFormData {
  name: string;
  email: string;
  vocal_type: string;
  message?: string;
}

interface ApplicationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  vocalRange: string;
  yearsOfExperience: string;
  musicalBackground: string;
  teacherName?: string;
  teacherEmail?: string;
  performanceExperience: string;
  reasonForApplying: string;
  heardAboutUs: string;
  scholarshipInterest: boolean;
  specialNeeds?: string;
  termsAgreed: boolean;
}

// Replace this URL with your actual backend API endpoint
const SUBMISSION_API_URL = "https://api.veasummer.com/submissions";
const CONTACT_API_URL = "https://api.veasummer.com/contact";

/**
 * Submits contact form data to the server
 */
export const submitContactForm = async (data: ContactFormData): Promise<Response> => {
  // Real API call
  return fetch(CONTACT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      timestamp: new Date().toISOString(),
      source: window.location.href,
    }),
  });
};

/**
 * Submits application form data to the server
 */
export const submitApplicationForm = async (data: ApplicationFormData): Promise<Response> => {
  // Real API call
  return fetch(SUBMISSION_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      timestamp: new Date().toISOString(),
      source: window.location.href,
    }),
  });
};
