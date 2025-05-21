
import { supabase } from "@/integrations/supabase/client";
import { ApplicationFormValues } from "@/components/ApplicationForm/schema";
import { toast } from '@/hooks/use-toast';
import { validateFileUpload } from "./security";

const ALLOWED_AUDIO_TYPES = ['audio/mp3', 'audio/mpeg', 'audio/wav'];
const ALLOWED_DOCUMENT_TYPES = ['application/pdf'];

/**
 * Upload a file to Supabase storage with validation and retry logic
 */
export const uploadFile = async (
  file: File,
  userId: string,
  category: string
): Promise<{ path: string; error: Error | null }> => {
  try {
    console.log(`uploadFile: Starting upload for ${file.name}, size: ${file.size} bytes, type: ${file.type}`);
    
    // Basic validation to prevent server errors
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

    // Create a unique file path including user ID for isolation
    const fileExt = file.name.split('.').pop() || 'bin';
    const timestamp = Date.now(); // Add timestamp to prevent collisions
    const fileName = `${userId}/${category}/${Math.random().toString(36).substring(2)}_${timestamp}.${fileExt}`;
    
    console.log(`uploadFile: Uploading to path ${fileName}`);
    
    // Ensure the storage bucket exists
    try {
      const { data: bucketData } = await supabase.storage.getBucket('application_materials');
      console.log('uploadFile: Bucket exists', bucketData);
    } catch (error) {
      console.log('uploadFile: Creating application_materials bucket');
      try {
        await supabase.storage.createBucket('application_materials', { public: true });
      } catch (bucketError) {
        console.error('uploadFile: Error creating bucket:', bucketError);
        // Continue anyway, the bucket might already exist
      }
    }
    
    // Upload with improved retry mechanism
    let attempts = 0;
    const maxAttempts = 3;
    let lastError = null;
    
    while (attempts < maxAttempts) {
      try {
        console.log(`uploadFile: Attempt ${attempts + 1} of ${maxAttempts}`);
        
        // Convert file to ArrayBuffer for more reliable uploads
        const arrayBuffer = await file.arrayBuffer();
        console.log(`uploadFile: Converted file to ArrayBuffer (${arrayBuffer.byteLength} bytes)`);
        
        const { data, error } = await supabase.storage
          .from('application_materials')
          .upload(fileName, arrayBuffer, {
            contentType: file.type,
            cacheControl: '3600',
            upsert: true // Allow overwriting
          });

        if (error) {
          console.error(`uploadFile: Supabase storage error (attempt ${attempts + 1}):`, error);
          lastError = error;
          attempts++;
          
          if (attempts < maxAttempts) {
            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, 1000));
            continue;
          } else {
            throw error;
          }
        }
        
        console.log(`uploadFile: Success on attempt ${attempts + 1}. Path: ${data.path}`);
        return { path: data.path, error: null };
      } catch (error) {
        console.error(`uploadFile: Error on attempt ${attempts + 1}:`, error);
        lastError = error as Error;
        attempts++;
        
        if (attempts < maxAttempts) {
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, 2000)); // Increased timeout
        }
      }
    }
    
    throw lastError || new Error("Failed to upload file after multiple attempts");
  } catch (error) {
    console.error('Error uploading file:', error);
    return { path: '', error: error as Error };
  }
};

/**
 * Get a public URL for a file in Supabase storage
 */
export const getFileUrl = (path: string): string => {
  const { data } = supabase.storage
    .from('application_materials')
    .getPublicUrl(path);
    
  return data.publicUrl;
};

/**
 * Submit application form with files to Supabase directly or via edge function
 * This is a more streamlined version of the submission function
 */
export const submitApplicationWithFiles = async (
  formData: ApplicationFormValues,
  files: { [key: string]: File }
): Promise<{ success: boolean; error?: any; data?: any; fileError?: string }> => {
  try {
    console.log('submitApplicationWithFiles: Starting submission with files for', formData.email);
    console.log('Files to upload:', Object.keys(files).map(key => `${key}: ${files[key]?.name || 'null'} (${files[key]?.size || 0} bytes)`));
    
    // Store files in window.applicationFiles for fallback methods
    if (typeof window !== 'undefined') {
      window.applicationFiles = window.applicationFiles || {
        audioFile1: null,
        audioFile2: null,
        cvFile: null,
        recommendationFile: null
      };
      
      Object.entries(files).forEach(([key, file]) => {
        if (file && (key in window.applicationFiles)) {
          window.applicationFiles[key] = file;
        }
      });
      
      console.log('Updated window.applicationFiles for fallback mechanisms');
    }
    
    // Get CSRF token if available
    const csrfToken = sessionStorage.getItem('formCsrfToken');
    
    // Generate a submission ID for tracking
    const submissionId = Math.random().toString(36).substring(2, 15);
    console.log('Generated submission ID:', submissionId);
    
    // Try using the process-application edge function first (most reliable path)
    let edgeFunctionSuccess = false;
    let edgeFunctionError = null;
    
    try {
      console.log('Attempting submission via edge function...');
      
      // Create FormData for the submission
      const formDataObj = new FormData();
      formDataObj.append('applicationData', JSON.stringify(formData));
      formDataObj.append('source', window.location.href);
      formDataObj.append('submissionId', submissionId);
      
      // Add the CSRF token if available
      if (csrfToken) {
        formDataObj.append('csrfToken', csrfToken);
      }
      
      // Add files to FormData
      Object.entries(files).forEach(([key, file]) => {
        if (file && file instanceof File && file.size > 0) {
          console.log(`Adding file to formData: ${key}, ${file.name}, ${file.size} bytes, ${file.type}`);
          formDataObj.append(key, file, file.name);
        }
      });
      
      // Create custom headers
      const headers: Record<string, string> = {
        'X-Submission-ID': submissionId
      };
      
      if (csrfToken) {
        headers['x-csrf-token'] = csrfToken;
      }
      
      // Call the edge function with timeout handling
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Edge function timeout')), 30000);
      });
      
      const responsePromise = supabase.functions.invoke('process-application', {
        body: formDataObj,
        headers: headers
      });
      
      // Race the promises to handle timeouts
      const response = await Promise.race([responsePromise, timeoutPromise]) as any;
      
      if (response.error) {
        throw new Error(`Edge function error: ${response.error.message || JSON.stringify(response.error)}`);
      }
      
      console.log('Edge function submission successful!', response);
      
      // Clear CSRF token after successful submission
      if (csrfToken) {
        sessionStorage.removeItem('formCsrfToken');
      }
      
      edgeFunctionSuccess = true;
      return { success: true, data: response.data };
      
    } catch (error: any) {
      console.error('Edge function submission failed:', error);
      edgeFunctionError = error;
      // Continue to fallback method
    }
    
    // If edge function failed, try the direct submission method
    console.log('Falling back to direct form submission');
    try {
      const result = await import('@/services/formSubmissionService').then(module => {
        return module.submitApplicationForm(formData, files);
      });
      
      if (result.success) {
        return { 
          success: true, 
          data: result.data,
          fileError: edgeFunctionError ? 
            `Edge function failed: ${edgeFunctionError.message}, but application was submitted via fallback` : 
            undefined
        };
      }
      
      throw result.error || new Error('Fallback submission failed with unknown error');
    } catch (fallbackError: any) {
      console.error("Fallback submission failed:", fallbackError);
      return { 
        success: false, 
        error: fallbackError,
        fileError: `Edge function failed: ${edgeFunctionError?.message}, and fallback also failed: ${fallbackError.message}`
      };
    }
  } catch (error: any) {
    console.error("Error submitting application with files:", error);
    return { 
      success: false, 
      error: error 
    };
  }
};
