
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
      
      try {
        const response = await supabase.functions.invoke('process-application', {
          body: formData,
        });
        
        if (response.error) {
          console.error('Edge function error:', response.error);
          trackError('form_submission', response.error, {
            formType: 'application',
            email: data.email
          });
          
          const errorDetails = {
            message: response.error.message || 'Edge function error occurred',
            details: JSON.stringify(response.error),
            code: response.error.code || 'EDGE_FUNCTION_ERROR',
            timestamp: new Date().toISOString()
          };
          
          throw Object.assign(new Error(errorDetails.message), errorDetails);
        }
        
        console.log('Edge function response:', response);
        return { success: true, data: response.data };
      } catch (functionError: any) {
        console.error('Edge function call failed:', functionError);
        
        const errorInfo = {
          message: `Edge function call failed: ${functionError.message || 'Unknown error'}`,
          details: JSON.stringify(functionError),
          stack: functionError.stack || 'No stack trace',
          code: functionError.code || 'EDGE_FUNCTION_CALL_FAILED',
          timestamp: new Date().toISOString()
        };
        
        throw Object.assign(new Error(errorInfo.message), errorInfo);
      }
    }
    
    // For non-file submissions, try the edge function first
    console.log('Submitting application without files via edge function');
    
    try {
      const response = await supabase.functions.invoke('process-application', {
        body: {
          applicationData: JSON.stringify(data),
          directInsert: true,
          source: window.location.href
        },
      });
      
      if (response.error) {
        console.error('Edge function error:', response.error);
        
        const errorDetails = {
          message: `Edge function error: ${response.error.message || 'Unknown error'}`,
          details: JSON.stringify(response.error),
          code: response.error.code || 'EDGE_FUNCTION_ERROR',
          timestamp: new Date().toISOString()
        };
        
        throw Object.assign(new Error(errorDetails.message), errorDetails);
      }
      
      return { success: true, data: response.data };
    } catch (functionError: any) {
      console.error('Edge function call failed:', functionError);
      
      // Try direct database insert as a fallback
      console.log('FALLBACK: Attempting direct database insert');
      return await performDirectDatabaseInsert(data);
    }
  } catch (error: any) {
    console.error("Error submitting application form:", error);
    
    // If all else fails, try direct database insert
    try {
      console.log('FINAL FALLBACK: Attempting direct database insert after all other methods failed');
      return await performDirectDatabaseInsert(data);
    } catch (fallbackError: any) {
      console.error("Even fallback direct insert failed:", fallbackError);
      
      return { 
        success: false, 
        error: {
          message: error.message || 'Unknown error occurred',
          details: error.details || JSON.stringify(error),
          stack: error.stack || 'No stack trace available',
          code: error.code || 'SUBMISSION_FAILED',
          timestamp: new Date().toISOString(),
          fallbackError: fallbackError.message || 'Fallback also failed'
        }
      };
    }
  }
};

/**
 * Direct database insert as absolute fallback
 */
async function performDirectDatabaseInsert(data: ApplicationFormValues): Promise<any> {
  console.log('performDirectDatabaseInsert: Starting direct database insert for', data.email);
  
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
    console.error('Database insert error:', error);
    trackError('form_submission', error, {
      formType: 'application',
      email: data.email
    });
    
    const errorDetails = {
      message: `Database insert error: ${error.message}`,
      details: JSON.stringify(error),
      code: error.code || 'DATABASE_INSERT_ERROR',
      timestamp: new Date().toISOString()
    };
    
    throw Object.assign(new Error(errorDetails.message), errorDetails);
  }
  
  console.log('Direct database insert successful:', result);
  return { success: true, data: result, method: 'direct_insert' };
}
