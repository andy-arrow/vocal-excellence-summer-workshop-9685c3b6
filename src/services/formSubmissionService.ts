
/**
 * Form Submission Service
 * 
 * This service handles sending form data to Supabase.
 */

import { ApplicationFormValues } from "@/components/ApplicationForm/schema";
import { createClient } from '@supabase/supabase-js';

interface ContactFormData {
  name: string;
  email: string;
  vocal_type: string;
  message?: string;
}

// Create a Supabase client
const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseAnonKey = 'your-anon-key';

// Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Submits contact form data to Supabase
 */
export const submitContactForm = async (data: ContactFormData): Promise<any> => {
  try {
    // Add timestamp and source information
    const formData = {
      ...data,
      timestamp: new Date().toISOString(),
      source: window.location.href,
    };

    // Insert data into the 'contact_submissions' table
    const { data: response, error } = await supabase
      .from('contact_submissions')
      .insert([formData]);

    if (error) throw error;
    return { success: true, data: response };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, error };
  }
};

/**
 * Submits application form data to Supabase
 */
export const submitApplicationForm = async (data: ApplicationFormValues): Promise<any> => {
  try {
    // Add timestamp and source information
    const formData = {
      ...data,
      timestamp: new Date().toISOString(),
      source: window.location.href,
    };

    // Insert data into the 'application_submissions' table
    const { data: response, error } = await supabase
      .from('application_submissions')
      .insert([formData]);

    if (error) throw error;
    return { success: true, data: response };
  } catch (error) {
    console.error("Error submitting application form:", error);
    return { success: false, error };
  }
};
