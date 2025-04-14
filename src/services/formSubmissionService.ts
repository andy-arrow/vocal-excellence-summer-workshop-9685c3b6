import { supabase } from "@/integrations/supabase/client";
import { trackError } from "@/utils/monitoring";

export const submitApplicationForm = async (data: ApplicationFormValues, files?: { [key: string]: File }): Promise<any> => {
  try {
    console.log('submitApplicationForm: Starting submission for', data.email);
    console.log('Received form data:', JSON.stringify(data, null, 2));
    
    if (files) {
      console.log('Files received:', Object.keys(files).map(key => `${key}: ${files[key]?.name || 'null'}`));
    }

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

    console.log('Prepared form data:', JSON.stringify(formData, null, 2));

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
        
        console.log('File processing response:', response);
        
        if (response.error) {
          console.error('File processing error:', response.error);
          trackError('component_error', response.error, {
            formType: 'application',
            email: data.email
          });
        }
      } catch (fileError) {
        console.error('Error processing files:', fileError);
        trackError('component_error', fileError, {
          formType: 'application',
          email: data.email
        });
      }
    }
    
    return { success: true, data: result[0] };
    
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
      .from('contact_requests')
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
