
/**
 * Form Submission Service
 * 
 * This service handles form data submission with proper error handling and validation.
 */

import { ApplicationFormValues } from "@/components/ApplicationForm/schema";
import { supabase } from "@/integrations/supabase/client";
import { trackError } from "@/utils/monitoring";

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
    console.log('submitContactForm: Starting submission for', data.email);
    
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

    if (error) {
      console.error('submitContactForm: Supabase error', error);
      trackError('form_submission', error, {
        formType: 'contact',
        email: data.email
      });
      throw error;
    }
    
    console.log('submitContactForm: Success', result);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, error };
  }
};

/**
 * Submits application form data to Supabase
 */
export const submitApplicationForm = async (data: ApplicationFormValues, files?: { [key: string]: File }): Promise<any> => {
  try {
    console.log('submitApplicationForm: Starting submission for', data.email);

    // For files support, use FormData and the process-application edge function
    if (files && Object.keys(files).length > 0) {
      console.log('Files detected, using process-application edge function');
      
      // When using files, use the process-application edge function (which bypasses RLS)
      const formData = new FormData();
      
      // Add application data as JSON
      formData.append('applicationData', JSON.stringify(data));
      formData.append('source', window.location.href);
      
      // Add files
      Object.entries(files).forEach(([key, file]) => {
        if (file) {
          console.log(`Adding file to formData: ${key}, ${file.name}, size: ${file.size}`);
          formData.append(key, file);
        }
      });
      
      console.log('Calling process-application edge function with files');
      
      // Use the edge function to process the application with files
      const response = await supabase.functions.invoke('process-application', {
        body: formData,
      });
      
      if (response.error) {
        console.error('Edge function error:', response.error);
        trackError('form_submission', response.error, {
          formType: 'application',
          email: data.email
        });
        throw new Error(response.error.message || 'Failed to process application');
      }
      
      console.log('Edge function response:', response);
      return { success: true, data: response.data };
    }
    
    // For non-file submissions, also use the edge function to bypass RLS
    console.log('Submitting application without files via edge function');
    
    // Call the process-application edge function
    const response = await supabase.functions.invoke('process-application', {
      body: {
        applicationData: JSON.stringify(data),
        directInsert: true,
        source: window.location.href
      },
    });
    
    console.log('Edge function response:', response);
    
    if (response.error) {
      console.error('Edge function error:', response.error);
      trackError('form_submission', response.error, {
        formType: 'application',
        email: data.email
      });
      throw new Error(response.error.message || 'Failed to process application');
    }
    
    console.log('Edge function processed application successfully');
    
    // As an ultimate fallback, attempt to use direct insert
    if (!response.data) {
      console.log('Attempting direct insert as fallback');
      const { data: result, error } = await supabase
        .from('applications')
        .insert([{
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
        }])
        .select();

      console.log('Direct insert result:', result);
      console.log('Direct insert error:', error);

      if (error) {
        trackError('form_submission', error, {
          formType: 'application',
          email: data.email
        });
        throw error;
      }
      
      return { success: true, data: result };
    }
    
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error submitting application form:", error);
    
    // Last resort fallback - try direct insert without any bells and whistles
    try {
      console.log("Attempting last resort direct insert fallback");
      
      const { data: result, error } = await supabase
        .from('applications')
        .insert([{
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
        }])
        .select();
        
      if (error) {
        console.error("Even last resort fallback failed:", error);
        return { success: false, error };
      }
      
      return { success: true, data: result };
    } catch (fallbackError) {
      console.error("All attempts failed:", fallbackError);
      return { success: false, error };
    }
  }
};
