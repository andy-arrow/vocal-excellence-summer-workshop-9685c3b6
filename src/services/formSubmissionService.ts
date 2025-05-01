import { supabase } from "@/integrations/supabase/client";
import { trackError } from "@/utils/monitoring";
import { ApplicationFormValues } from "@/components/ApplicationForm/schema";
import { toast } from '@/hooks/use-toast';

export const submitApplicationForm = async (data: ApplicationFormValues, files?: { [key: string]: File }): Promise<any> => {
  try {
    console.log('submitApplicationForm: Starting submission for', data.email);
    console.log('Received form data:', JSON.stringify(data, null, 2));
    
    if (files) {
      console.log('Files received directly:', Object.keys(files).map(key => `${key}: ${files[key]?.name || 'null'} (${files[key]?.size || 0} bytes)`));
    } else {
      console.log('No files received directly with submission');
      // Try to get files from window.applicationFiles if available
      if (typeof window !== 'undefined' && window.applicationFiles) {
        const appFiles: { [key: string]: File } = {};
        let hasFiles = false;
        
        Object.entries(window.applicationFiles).forEach(([key, file]) => {
          if (file) {
            appFiles[key] = file;
            hasFiles = true;
            console.log(`Retrieved ${key} from window.applicationFiles: ${file.name} (${file.size} bytes)`);
          }
        });
        
        if (hasFiles) {
          files = appFiles;
          console.log('Using files from window.applicationFiles');
        } else {
          console.log('No files found in window.applicationFiles');
        }
      }
    }

    // Prepare form data for database
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
      teachername: data.teacherName || null,
      teacheremail: data.teacherEmail || null,
      performanceexperience: data.performanceExperience,
      reasonforapplying: data.reasonForApplying,
      heardaboutus: data.heardAboutUs,
      scholarshipinterest: data.scholarshipInterest,
      specialneeds: data.specialNeeds || null,
      termsagreed: data.termsAgreed,
      timestamp: new Date().toISOString(),
      source: window.location.href
    };

    console.log('Prepared form data for database:', JSON.stringify(formData, null, 2));

    // Insert application data into database
    const { data: result, error } = await supabase
      .from('applications')
      .insert([formData])
      .select();

    console.log('Supabase insert result:', { result, error });

    if (error) {
      console.error('Database insertion error:', error);
      trackError('component_error', error, {
        formType: 'application',
        email: data.email
      });
      
      return { 
        success: false, 
        error: {
          message: error.message,
          details: error.details,
          code: error.code || 'SUBMISSION_FAILED'
        }
      };
    }

    console.log('Application saved successfully:', result);
    const applicationId = result[0].id;

    // Try to send emails directly if process-application fails
    let emailSent = false;
    let fileProcessingSuccess = false;

    // Handle file processing if files exist
    if (files && Object.keys(files).length > 0 && Object.values(files).some(f => f !== null)) {
      console.log('Processing files using edge function');
      try {
        const formData = new FormData();
        formData.append('applicationData', JSON.stringify(data));
        formData.append('applicationId', applicationId);
        
        // Log all files being added to FormData
        Object.entries(files).forEach(([key, file]) => {
          if (file) {
            console.log(`Adding file to formData: ${key}, ${file.name}, ${file.size} bytes`);
            formData.append(key, file);
          }
        });
        
        // Log all form data entries for debugging
        console.log('FormData entries before edge function call:');
        for (const entry of formData.entries()) {
          console.log(entry[0], entry[1] instanceof File ? `File: ${(entry[1] as File).name} (${(entry[1] as File).size} bytes)` : entry[1]);
        }
        
        // Call edge function to process files
        const response = await supabase.functions.invoke('process-application', {
          body: formData,
        });
        
        console.log('File processing response:', response);
        
        if (response.error) {
          console.error('File processing error:', response.error);
          // If process-application fails, we'll try to send emails directly
          await sendEmailsDirectly(data, applicationId);
          emailSent = true;
        } else {
          // Check if emails were sent successfully
          if (response.data && response.data.emailStatus) {
            if (response.data.emailStatus.error) {
              console.error('Email error from process-application:', response.data.emailStatus.error);
              // Try sending emails directly as a fallback
              await sendEmailsDirectly(data, applicationId);
              emailSent = true;
            } else {
              // Emails were sent successfully by process-application
              emailSent = true;
            }
          }
          fileProcessingSuccess = true;
        }
      } catch (fileError) {
        console.error('Error processing files:', fileError);
        trackError('component_error', fileError, {
          formType: 'application',
          email: data.email
        });
        
        // Try sending emails directly as a fallback
        await sendEmailsDirectly(data, applicationId);
        emailSent = true;
        
        return { 
          success: true, 
          data: result[0],
          fileError: fileError.message || 'Error processing files'
        };
      }
    } else {
      console.log('No files to process with application');
      // No files, so send emails directly
      await sendEmailsDirectly(data, applicationId);
      emailSent = true;
    }
    
    return { 
      success: true, 
      data: result[0], 
      emailSent, 
      fileProcessingSuccess 
    };
    
  } catch (error: any) {
    console.error("Unhandled error submitting application form:", error);
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

async function sendEmailsDirectly(data: ApplicationFormValues, applicationId: string) {
  try {
    console.log('Attempting to send emails directly via send-email function');
    
    // Send admin notification
    const adminResponse = await supabase.functions.invoke('send-email', {
      body: {
        type: 'admin_notification',
        applicantData: data,
        applicationId: applicationId
      },
    });
    
    if (adminResponse.error) {
      console.error('Error sending admin notification:', adminResponse.error);
    } else {
      console.log('Admin notification sent directly:', adminResponse);
    }
    
    // Send applicant confirmation
    const applicantResponse = await supabase.functions.invoke('send-email', {
      body: {
        type: 'application_confirmation',
        name: data.firstName,
        email: data.email
      },
    });
    
    if (applicantResponse.error) {
      console.error('Error sending applicant confirmation:', applicantResponse.error);
    } else {
      console.log('Applicant confirmation sent directly:', applicantResponse);
    }
    
    return {
      admin: adminResponse,
      applicant: applicantResponse
    };
  } catch (error) {
    console.error('Error sending emails directly:', error);
    throw error;
  }
}

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
      source: window.location.href
    };

    console.log('Prepared contact form data:', JSON.stringify(formData, null, 2));

    const { data: result, error } = await supabase
      .from('contact_submissions')
      .insert([formData])
      .select();

    console.log('Supabase contact form insert result:', { result, error });

    if (error) {
      console.error('Database insertion error:', error);
      trackError('component_error', error, {
        formType: 'contact',
        email: data.email
      });
      
      return { 
        success: false, 
        error: {
          message: error.message,
          details: error.details,
          code: error.code || 'SUBMISSION_FAILED'
        }
      };
    }

    console.log('Contact form saved successfully:', result);
    
    return { success: true, data: result[0] };
    
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
