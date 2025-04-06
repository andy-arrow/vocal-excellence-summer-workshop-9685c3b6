
/**
 * Form Submission Service
 * 
 * This service handles form data submission with proper error handling and validation.
 */

import { ApplicationFormValues } from "@/components/ApplicationForm/schema";
import { supabase } from "@/integrations/supabase/client";

interface ContactFormData {
  name: string;
  email: string;
  vocal_type: string;
  message?: string;
}

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

    const { data: result, error } = await supabase
      .from('contact_submissions')
      .insert([formData])
      .select();

    if (error) throw error;
    
    return { success: true, data: result };
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
    // Transform form data to match database column names (all lowercase)
    const formData = {
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      phone: data.phone,
      dateofbirth: data.dateOfBirth,
      nationality: data.nationality,
      address: data.address,
      city: data.city,
      country: data.country,
      postalcode: data.postalCode,
      vocalrange: data.vocalRange,
      yearsofexperience: data.yearsOfExperience,
      musicalbackground: data.musicalBackground,
      teachername: data.teacherName,
      teacheremail: data.teacherEmail,
      performanceexperience: data.performanceExperience,
      reasonforapplying: data.reasonForApplying,
      heardaboutus: data.heardAboutUs,
      scholarshipinterest: data.scholarshipInterest,
      specialneeds: data.specialNeeds,
      termsagreed: data.termsAgreed,
      timestamp: new Date().toISOString(),
      source: window.location.href,
    };

    const { data: result, error } = await supabase
      .from('applications')
      .insert([formData])
      .select();

    if (error) throw error;
    
    return { success: true, data: result };
  } catch (error) {
    console.error("Error submitting application form:", error);
    return { success: false, error };
  }
};
