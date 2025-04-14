
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
      trackError('form_submission', error, {
        formType: 'contact',
        email: data.email
      });
      throw error;
    }
    
    return { success: true, data: result };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, error };
  }
};

/**
 * Rate limit check for form submissions
 * Prevents abuse by limiting submissions from the same IP
 */
const checkRateLimit = async (email: string): Promise<boolean> => {
  try {
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
    
    console.log('Checking rate limit for email:', email);
    console.log('Twenty-four hours ago:', twentyFourHoursAgo.toISOString());

    // Use a direct count query for public access without authentication requirements
    const { count, error } = await supabase
      .from('applications')
      .select('*', { count: 'exact', head: true })
      .eq('email', email)
      .gte('timestamp', twentyFourHoursAgo.toISOString());
      
    if (error) {
      console.error('Rate limit check error:', error);
      // In case of error, allow the submission to proceed
      return true;
    }
    
    console.log('Submission count in last 24 hours:', count);
    
    // Limit to 2 submissions per 24 hours per email
    return count !== null && count < 2;
  } catch (error) {
    console.error("Rate limit check error:", error);
    // In case of error, allow the submission to proceed
    return true;
  }
};

/**
 * Submits application form data to Supabase
 */
export const submitApplicationForm = async (data: ApplicationFormValues, files?: { [key: string]: File }): Promise<any> => {
  try {
    // Check rate limiting
    const isWithinRateLimit = await checkRateLimit(data.email);
    
    console.log('Is within rate limit:', isWithinRateLimit);

    if (!isWithinRateLimit) {
      console.warn('Rate limit exceeded for email:', data.email);
      return { 
        success: false, 
        error: { 
          message: "Maximum submission limit reached. Please try again later."
        }
      };
    }

    // For files support, use FormData and the process-application edge function
    if (files && Object.keys(files).length > 0) {
      // When using files, use the process-application edge function (which bypasses RLS)
      const formData = new FormData();
      
      // Add application data as JSON
      formData.append('applicationData', JSON.stringify(data));
      formData.append('source', window.location.href);
      
      // Add files
      Object.entries(files).forEach(([key, file]) => {
        if (file) {
          formData.append(key, file);
        }
      });
      
      // Use the edge function (which bypasses RLS) to process the application with files
      const response = await supabase.functions.invoke('process-application', {
        body: formData,
      });
      
      if (response.error) {
        trackError('form_submission', response.error, {
          formType: 'application',
          email: data.email
        });
        throw new Error(response.error.message || 'Failed to process application');
      }
      
      return { success: true, data: response.data };
    }
    
    // For non-file submissions, also use the edge function to bypass RLS
    console.log('Submitting application without files via edge function');
    
    // Prepare the data
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
    
    console.log('Submitting via edge function with formData:', formData);
    
    // Call the process-application edge function
    const response = await supabase.functions.invoke('process-application', {
      body: {
        applicationData: JSON.stringify(data),
        directInsert: true,
        source: window.location.href
      },
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
    
    // For backward compatibility - attempt to use direct insert as fallback
    if (!response.data) {
      console.log('Attempting direct insert as fallback');
      const { data: result, error } = await supabase
        .from('applications')
        .insert([formData])
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
    return { success: false, error };
  }
};
