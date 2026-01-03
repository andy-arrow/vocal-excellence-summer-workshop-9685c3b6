import { trackError } from "@/utils/monitoring";
import { ApplicationFormValues } from "@/components/ApplicationForm/schema";

export const submitApplicationForm = async (data: ApplicationFormValues, files?: { [key: string]: File }): Promise<any> => {
  try {
    console.log('submitApplicationForm: Starting submission for', data.email);
    
    const applicationFiles = files || (typeof window !== 'undefined' && window.applicationFiles) || {};
    console.log('Available files:', Object.keys(applicationFiles).filter(key => applicationFiles[key]).map(key => key));

    const formData = new FormData();
    
    const applicationData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      dateOfBirth: data.dateOfBirth,
      nationality: data.nationality,
      whereFrom: data.whereFrom,
      vocalRange: data.vocalRange,
      yearsOfSinging: data.yearsOfSinging,
      musicalBackground: data.musicalBackground,
      teacherName: data.teacherName || null,
      teacherEmail: data.teacherEmail || null,
      areasOfInterest: data.areasOfInterest,
      reasonForApplying: data.reasonForApplying,
      heardAboutUs: data.heardAboutUs,
      scholarshipInterest: data.scholarshipInterest,
      dietaryRestrictions: data.dietaryRestrictions,
      specialNeeds: data.specialNeeds || null,
      termsAgreed: data.termsAgreed,
    };

    formData.append('applicationData', JSON.stringify(applicationData));

    Object.entries(applicationFiles).forEach(([key, file]) => {
      if (file && file instanceof File && file.size > 0) {
        console.log(`Adding file: ${key}, ${file.name}, ${file.size} bytes`);
        formData.append(key, file, file.name);
      }
    });

    const response = await fetch('/api/applications', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      console.error('Application submission failed:', result);
      return { 
        success: false, 
        error: { message: result.error || 'Failed to submit application' }
      };
    }

    console.log('Application saved successfully:', result);
    return { 
      success: true, 
      data: { id: result.applicationId },
      emailStatus: result.emailStatus
    };
    
  } catch (error: any) {
    console.error("Error submitting application form:", error);
    trackError('form_submission_error', error, {
      formType: 'application',
      errorType: 'unhandled'
    });
    
    return { 
      success: false, 
      error: {
        message: error.message || 'Unknown error occurred',
        code: 'SUBMISSION_FAILED'
      }
    };
  }
};

export const submitContactForm = async (data: {
  name: string;
  email: string;
  vocal_type: string;
  message?: string;
}): Promise<{ success: boolean; error?: any; }> => {
  try {
    console.log('submitContactForm: Starting submission for', data.email);
    
    const response = await fetch('/api/contact-submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        vocalType: data.vocal_type,
        message: data.message || null,
        source: typeof window !== 'undefined' ? window.location.href : 'direct_api'
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      console.error('Contact form submission failed:', result);
      return { 
        success: false, 
        error: { message: result.error || 'Failed to submit contact form' }
      };
    }

    console.log('Contact form saved successfully:', result);
    return { success: true };
    
  } catch (error: any) {
    console.error("Error submitting contact form:", error);
    return { 
      success: false, 
      error: {
        message: error.message || 'Unknown error occurred',
        code: 'SUBMISSION_FAILED'
      }
    };
  }
};
