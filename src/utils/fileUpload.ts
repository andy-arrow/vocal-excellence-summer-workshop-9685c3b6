
import { supabase } from "@/integrations/supabase/client";
import { ApplicationFormValues } from "@/components/ApplicationForm/schema";
import { toast } from '@/hooks/use-toast';
import { validateFileUpload } from "./security";

const ALLOWED_AUDIO_TYPES = ['audio/mp3', 'audio/mpeg', 'audio/wav'];
const ALLOWED_DOCUMENT_TYPES = ['application/pdf'];

export const uploadFile = async (
  file: File,
  userId: string,
  category: string
): Promise<{ path: string; error: Error | null }> => {
  try {
    console.log(`uploadFile: Starting upload for ${file.name}, size: ${file.size} bytes, type: ${file.type}`);
    
    // Very permissive validation, only check file type
    const isAudio = category.includes('audio');
    const validationError = validateFileUpload(
      file,
      isAudio ? ALLOWED_AUDIO_TYPES : ALLOWED_DOCUMENT_TYPES,
      Number.MAX_VALUE // Remove size limit completely
    );

    if (validationError) {
      console.error(`uploadFile: Validation error: ${validationError}`);
      throw new Error(validationError);
    }

    // Create a unique file path including user ID to maintain isolation
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${category}/${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    console.log(`uploadFile: Uploading to path ${fileName}`);
    
    // Ensure the storage bucket exists
    try {
      const { data: bucketData } = await supabase.storage.getBucket('application_materials');
      console.log('uploadFile: Bucket exists', bucketData);
    } catch (error) {
      console.log('uploadFile: Creating application_materials bucket');
      await supabase.storage.createBucket('application_materials', { public: true });
    }
    
    const { data, error } = await supabase.storage
      .from('application_materials')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true // Allow overwriting
      });

    if (error) {
      console.error('uploadFile: Supabase storage error:', error);
      throw error;
    }
    
    console.log(`uploadFile: Success. Path: ${data.path}`);
    return { path: data.path, error: null };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { path: '', error: error as Error };
  }
};

export const getFileUrl = (path: string): string => {
  const { data } = supabase.storage
    .from('application_materials')
    .getPublicUrl(path);
    
  return data.publicUrl;
};

/**
 * Submit application form with files
 */
export const submitApplicationWithFiles = async (
  formData: ApplicationFormValues,
  files: { [key: string]: File }
): Promise<{ success: boolean; error?: any; data?: any; fileError?: string }> => {
  try {
    console.log('submitApplicationWithFiles: Starting submission with files for', formData.email);
    console.log('Files to upload:', Object.keys(files).map(key => `${key}: ${files[key]?.name || 'null'} (${files[key]?.size || 0} bytes)`));
    
    // Get CSRF token if available
    const csrfToken = sessionStorage.getItem('formCsrfToken');
    
    // Create FormData for the submission
    const formDataObject = new FormData();
    
    // Add application data as JSON
    formDataObject.append('applicationData', JSON.stringify(formData));
    formDataObject.append('source', window.location.href);
    
    // Add the CSRF token if available
    if (csrfToken) {
      formDataObject.append('csrfToken', csrfToken);
    }
    
    // Add files to FormData
    Object.entries(files).forEach(([key, file]) => {
      if (file && file.size > 0) {
        console.log(`Adding file to formData: ${key}, ${file.name}, ${file.size} bytes`);
        formDataObject.append(key, file);
      } else {
        console.warn(`Skipping file ${key}: Invalid file object or zero size`);
      }
    });
    
    // Log form data entries for debugging
    console.log('FormData entries:');
    for (const entry of formDataObject.entries()) {
      console.log(entry[0], entry[1] instanceof File ? `File: ${(entry[1] as File).name} (${(entry[1] as File).size} bytes)` : entry[1]);
    }
    
    // Create custom headers
    const headers: Record<string, string> = {};
    if (csrfToken) {
      headers['x-csrf-token'] = csrfToken;
    }
    
    console.log('Calling process-application edge function with files');
    
    // Call the Supabase Edge Function to process the application
    const response = await supabase.functions.invoke('process-application', {
      body: formDataObject,
      headers: headers
    });
    
    console.log('Edge function response:', response);
    
    if (response.error) {
      console.error('Edge function error:', response.error);
      throw new Error(response.error.message || 'Failed to process application');
    }
    
    // Clear CSRF token after successful submission
    if (csrfToken) {
      sessionStorage.removeItem('formCsrfToken');
    }

    console.log('Application submitted successfully with files!');
    
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("Error submitting application with files:", error);
    
    // Let's try the fallback mechanism
    try {
      console.log('Attempting direct form submission as fallback');
      
      // Add files directly to window.applicationFiles just in case it wasn't set
      if (typeof window !== 'undefined') {
        window.applicationFiles = window.applicationFiles || {};
        Object.entries(files).forEach(([key, file]) => {
          if (file) window.applicationFiles[key] = file;
        });
      }
      
      const result = await import('@/services/formSubmissionService').then(module => {
        return module.submitApplicationForm(formData);
      });
      
      if (result.success) {
        return { 
          success: true, 
          data: result.data,
          fileError: 'Files were not processed through the edge function, but your application was submitted'
        };
      }
      
      return { success: false, error };
    } catch (fallbackError) {
      console.error("Even fallback submission failed:", fallbackError);
      return { success: false, error };
    }
  }
};
