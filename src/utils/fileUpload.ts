
import { supabase } from "@/integrations/supabase/client";
import { ApplicationFormValues } from "@/components/ApplicationForm/schema";
import { submitApplicationForm } from "@/services/formSubmissionService";
import { validateFileUpload } from "./security";

const ALLOWED_AUDIO_TYPES = ['audio/mp3', 'audio/mpeg', 'audio/wav'];
const ALLOWED_DOCUMENT_TYPES = ['application/pdf'];

export const uploadFile = async (
  file: File,
  userId: string,
  category: string
): Promise<{ path: string; error: Error | null }> => {
  try {
    // Validate file based on category
    const isAudio = category.includes('audio');
    const validationError = validateFileUpload(
      file,
      isAudio ? ALLOWED_AUDIO_TYPES : ALLOWED_DOCUMENT_TYPES,
      Number.MAX_VALUE // Remove size limit
    );

    if (validationError) {
      throw new Error(validationError);
    }

    // Create a unique file path including user ID to maintain isolation
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${category}/${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('application_materials')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true // Switch to true to allow overwriting
      });

    if (error) throw error;
    
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
): Promise<{ success: boolean; error?: any; data?: any }> => {
  try {
    // Get CSRF token from session storage
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
    
    // Add files
    Object.entries(files).forEach(([key, file]) => {
      if (file) {
        formDataObject.append(key, file);
      }
    });
    
    // Call the Supabase Edge Function to process the application
    const response = await supabase.functions.invoke('process-application', {
      body: formDataObject,
      headers: csrfToken ? { 'x-csrf-token': csrfToken } : {}
    });
    
    if (response.error) {
      throw new Error(response.error.message || 'Failed to process application');
    }
    
    // Clear CSRF token after successful submission
    if (csrfToken) {
      sessionStorage.removeItem('formCsrfToken');
    }
    
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error submitting application with files:", error);
    return { success: false, error };
  }
};
