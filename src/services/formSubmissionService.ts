
import { supabase } from "@/integrations/supabase/client";
import { trackError } from "@/utils/monitoring";
import { ApplicationFormValues } from "@/components/ApplicationForm/schema";
import { toast } from '@/hooks/use-toast';

/**
 * Submit application form data to Supabase
 * This is the primary submission function used when the edge function isn't available
 */
export const submitApplicationForm = async (data: ApplicationFormValues, files?: { [key: string]: File }): Promise<any> => {
  try {
    console.log('submitApplicationForm: Starting submission for', data.email);
    console.log('Received form data:', JSON.stringify(data, null, 2));
    
    // Collect files either from parameter or window object
    const applicationFiles = files || (typeof window !== 'undefined' && window.applicationFiles) || {};
    console.log('Available files:', Object.keys(applicationFiles).filter(key => applicationFiles[key]).map(key => key));

    // Create submission ID for tracking
    const submissionId = Math.random().toString(36).substring(2, 15);
    console.log('Generated submission ID:', submissionId);

    // Prepare form data for database
    const formData = {
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      phone: data.phone,
      dateofbirth: data.dateOfBirth,
      nationality: data.nationality,
      address: data.whereFrom, // Using whereFrom as the address field
      city: '', // Set empty string as we don't collect this anymore
      country: '', // Set empty string as we don't collect this anymore
      postalcode: '', // Set empty string as we don't collect this anymore
      vocalrange: data.vocalRange,
      yearsofexperience: data.yearsOfSinging, // Map to the field name expected by the database
      musicalbackground: data.musicalBackground,
      teachername: data.teacherName || null,
      teacheremail: data.teacherEmail || null,
      performanceexperience: data.areasOfInterest || '', // Use areasOfInterest for performance experience
      reasonforapplying: data.reasonForApplying,
      heardaboutus: data.heardAboutUs,
      scholarshipinterest: data.scholarshipInterest,
      specialneeds: data.specialNeeds || null,
      termsagreed: data.termsAgreed,
      timestamp: new Date().toISOString(),
      source: typeof window !== 'undefined' ? window.location.href : 'direct_api'
    };

    console.log('Prepared form data for database:', JSON.stringify(formData, null, 2));

    // Insert application data into database with retry logic
    let applicationId = null;
    let retries = 3;
    let lastError = null;
    
    while (retries > 0) {
      try {
        const { data: result, error } = await supabase
          .from('applications')
          .insert(formData)
          .select();

        if (error) {
          console.error(`Database insertion error (attempts left: ${retries - 1}):`, error);
          lastError = error;
          retries--;
          if (retries > 0) await new Promise(r => setTimeout(r, 1000)); // Wait before retrying
          continue;
        }

        console.log('Application saved successfully:', result);
        applicationId = result[0].id;
        break; // Success, exit retry loop
      } catch (error) {
        console.error(`Unexpected error during database insertion (attempts left: ${retries - 1}):`, error);
        lastError = error;
        retries--;
        if (retries > 0) await new Promise(r => setTimeout(r, 1000)); // Wait before retrying
      }
    }
    
    if (!applicationId) {
      // If all retries failed
      console.error('All database insertion attempts failed');
      return { 
        success: false, 
        error: lastError || { message: 'Failed to save application after multiple attempts' }
      };
    }

    // Process files and send emails via edge function if files exist
    let emailStatus = { success: false, error: null };
    let fileStatus = { success: false, error: null };
    
    // Check if there are any non-null files
    const hasFiles = Object.values(applicationFiles).some(f => f !== null && f instanceof File);
    
    if (hasFiles) {
      try {
        const { success, error } = await processFilesAndSendEmails(data, applicationId, applicationFiles, submissionId);
        fileStatus = { success, error: error || null };
        
        // If edge function was successful, it also sent emails
        if (success) {
          emailStatus = { success: true, error: null };
        } else {
          // Try direct email sending as fallback
          const emailResult = await sendEmailsDirectly(data, applicationId);
          emailStatus = { 
            success: !!emailResult, 
            error: emailResult ? null : 'Failed to send emails via fallback method'
          };
        }
      } catch (error) {
        console.error('Error processing files:', error);
        fileStatus = { success: false, error };
        
        // Try direct email sending as fallback
        const emailResult = await sendEmailsDirectly(data, applicationId);
        emailStatus = { 
          success: !!emailResult, 
          error: emailResult ? null : 'Failed to send emails via fallback method'
        };
      }
    } else {
      console.log('No files to process, sending emails directly');
      const emailResult = await sendEmailsDirectly(data, applicationId);
      emailStatus = { 
        success: !!emailResult, 
        error: emailResult ? null : 'Failed to send emails directly'
      };
    }
    
    return { 
      success: true, 
      data: { id: applicationId },
      fileStatus,
      emailStatus
    };
    
  } catch (error: any) {
    console.error("Unhandled error submitting application form:", error);
    trackError('submission_error', error, {
      formType: 'application',
      errorType: 'unhandled'
    });
    
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

/**
 * Process application files and send emails using the edge function
 */
async function processFilesAndSendEmails(
  data: ApplicationFormValues,
  applicationId: string,
  files: { [key: string]: File },
  submissionId: string
): Promise<{ success: boolean; error?: any }> {
  console.log(`Processing files and sending emails for application ${applicationId}`);
  
  try {
    // Create form data for the edge function
    const formData = new FormData();
    formData.append('applicationData', JSON.stringify(data));
    formData.append('applicationId', applicationId);
    formData.append('submissionId', submissionId);
    
    // Add CSRF token if available
    const csrfToken = sessionStorage.getItem('formCsrfToken');
    if (csrfToken) {
      formData.append('csrfToken', csrfToken);
    }
    
    // Add files to FormData
    Object.entries(files).forEach(([key, file]) => {
      if (file && file instanceof File && file.size > 0) {
        console.log(`Adding file to formData: ${key}, ${file.name}, ${file.size} bytes`);
        formData.append(key, file);
      }
    });
    
    // Add headers
    const headers: Record<string, string> = {
      'X-Submission-ID': submissionId
    };
    
    if (csrfToken) {
      headers['x-csrf-token'] = csrfToken;
    }
    
    console.log('Calling process-application edge function with retry logic');
    
    // Call the edge function with retry logic
    let attempts = 0;
    const maxAttempts = 3;
    let lastError = null;
    
    while (attempts < maxAttempts) {
      try {
        console.log(`Edge function attempt ${attempts + 1}`);
        
        // Use timeout promise to handle potential timeouts
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Edge function timeout')), 30000);
        });
        
        const responsePromise = supabase.functions.invoke('process-application', {
          body: formData,
          headers: headers
        });
        
        // Race the promises to handle timeouts
        const response: any = await Promise.race([responsePromise, timeoutPromise]);
        
        console.log(`Edge function response (attempt ${attempts + 1}):`, response);
        
        if (response.error) {
          console.error(`Edge function error (attempt ${attempts + 1}):`, response.error);
          lastError = response.error;
          attempts++;
          
          if (attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            continue;
          }
          
          return { success: false, error: lastError };
        }
        
        // Clear CSRF token after successful submission
        if (csrfToken) {
          sessionStorage.removeItem('formCsrfToken');
        }
        
        console.log('Files processed successfully');
        return { success: true, data: response.data };
      } catch (error) {
        console.error(`Error calling edge function (attempt ${attempts + 1}):`, error);
        lastError = error;
        attempts++;
        
        if (attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        } else {
          return { success: false, error: lastError };
        }
      }
    }
    
    return { success: false, error: lastError || new Error('Failed to process files after multiple attempts') };
  } catch (error) {
    console.error('Unexpected error in processFilesAndSendEmails:', error);
    return { success: false, error };
  }
}

/**
 * Send confirmation emails directly via edge functions as a fallback
 */
async function sendEmailsDirectly(data: ApplicationFormValues, applicationId: string): Promise<boolean> {
  try {
    console.log('Attempting to send emails directly via send-email function');
    let success = false;
    
    // Send admin notification with retry
    let adminRetries = 2;
    while (adminRetries >= 0) {
      try {
        const adminResponse = await supabase.functions.invoke('send-email', {
          body: {
            type: 'admin_notification',
            applicantData: data,
            applicationId: applicationId
          },
        });
        
        if (adminResponse.error) {
          console.error('Error sending admin notification:', adminResponse.error);
          if (adminRetries > 0) {
            adminRetries--;
            await new Promise(r => setTimeout(r, 1000));
            continue;
          }
        } else {
          console.log('Admin notification sent directly:', adminResponse);
          success = true;
          break;
        }
      } catch (error) {
        console.error('Exception sending admin notification:', error);
        if (adminRetries > 0) {
          adminRetries--;
          await new Promise(r => setTimeout(r, 1000));
        } else {
          break;
        }
      }
    }
    
    // Send applicant confirmation with retry
    let applicantRetries = 2;
    while (applicantRetries >= 0) {
      try {
        const applicantResponse = await supabase.functions.invoke('send-email', {
          body: {
            type: 'application_confirmation',
            name: data.firstName,
            email: data.email
          },
        });
        
        if (applicantResponse.error) {
          console.error('Error sending applicant confirmation:', applicantResponse.error);
          if (applicantRetries > 0) {
            applicantRetries--;
            await new Promise(r => setTimeout(r, 1000));
            continue;
          }
        } else {
          console.log('Applicant confirmation sent directly:', applicantResponse);
          success = true;
          break;
        }
      } catch (error) {
        console.error('Exception sending applicant confirmation:', error);
        if (applicantRetries > 0) {
          applicantRetries--;
          await new Promise(r => setTimeout(r, 1000));
        } else {
          break;
        }
      }
    }
    
    return success;
  } catch (error) {
    console.error('Error sending emails directly:', error);
    return false;
  }
}

/**
 * Submit contact form to Supabase
 */
export const submitContactForm = async (data: {
  name: string;
  email: string;
  vocal_type: string;
  message?: string;
}): Promise<any> => {
  try {
    console.log('submitContactForm: Starting submission for', data.email);
    
    const formData = {
      name: data.name,
      email: data.email,
      vocal_type: data.vocal_type,
      message: data.message || null,
      timestamp: new Date().toISOString(),
      source: typeof window !== 'undefined' ? window.location.href : 'direct_api'
    };

    console.log('Prepared contact form data:', JSON.stringify(formData, null, 2));

    // Submit with retry logic
    let retries = 3;
    let lastError = null;
    
    while (retries > 0) {
      try {
        const { data: result, error } = await supabase
          .from('contact_submissions')
          .insert(formData)
          .select();

        if (error) {
          console.error(`Database insertion error (attempts left: ${retries - 1}):`, error);
          lastError = error;
          retries--;
          if (retries > 0) await new Promise(r => setTimeout(r, 1000)); // Wait before retrying
          continue;
        }

        console.log('Contact form saved successfully:', result);
        return { success: true, data: result[0] };
      } catch (error) {
        console.error(`Unexpected error during contact form submission (attempts left: ${retries - 1}):`, error);
        lastError = error;
        retries--;
        if (retries > 0) await new Promise(r => setTimeout(r, 1000)); // Wait before retrying
      }
    }
    
    // If all retries failed
    trackError('component_error', lastError, {
      formType: 'contact',
      email: data.email
    });
    
    return { 
      success: false, 
      error: {
        message: lastError?.message || 'Failed to submit contact form after multiple attempts',
        details: lastError?.details || {},
        code: lastError?.code || 'SUBMISSION_FAILED'
      }
    };
    
  } catch (error: any) {
    console.error("Unhandled error submitting contact form:", error);
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
