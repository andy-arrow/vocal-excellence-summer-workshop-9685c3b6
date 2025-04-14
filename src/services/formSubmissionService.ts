
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
      trackError('component_error', error, {
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
    
    // Insert application data into Supabase
    const { data: result, error: insertError } = await supabase
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
        source: window.location.href
      }])
      .select();

    if (insertError) {
      console.error('Database insertion error:', insertError);
      trackError('component_error', insertError, {
        formType: 'application',
        email: data.email
      });
      throw insertError;
    }

    console.log('Application data saved successfully:', result);

    // If there are files, handle them using the edge function
    if (files && Object.keys(files).length > 0) {
      console.log('Processing files using edge function');
      try {
        const formData = new FormData();
        formData.append('applicationData', JSON.stringify(data));
        formData.append('applicationId', result[0].id);
        
        Object.entries(files).forEach(([key, file]) => {
          if (file) {
            console.log(`Adding file to formData: ${key}, ${file.name}`);
            formData.append(key, file);
          }
        });
        
        const response = await supabase.functions.invoke('process-application', {
          body: formData,
        });
        
        if (response.error) {
          console.error('File processing error:', response.error);
          // Don't throw here - we've already saved the application data
          trackError('component_error', response.error, {
            formType: 'application',
            email: data.email
          });
        }
      } catch (fileError) {
        console.error('Error processing files:', fileError);
        // Don't throw here - we've already saved the application data
        trackError('component_error', fileError, {
          formType: 'application',
          email: data.email
        });
      }
    }
    
    return { success: true, data: result[0] };
    
  } catch (error: any) {
    console.error("Error submitting application form:", error);
    return { 
      success: false, 
      error: {
        message: error.message || 'Unknown error occurred',
        details: error.details || JSON.stringify(error),
        code: error.code || 'SUBMISSION_FAILED'
      }
    };
  }
};
