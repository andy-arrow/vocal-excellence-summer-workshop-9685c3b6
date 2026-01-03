import { ApplicationFormValues } from "@/components/ApplicationForm/schema";
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
    
    const isAudio = category.includes('audio');
    const validationError = validateFileUpload(
      file,
      isAudio ? ALLOWED_AUDIO_TYPES : ALLOWED_DOCUMENT_TYPES,
      Number.MAX_VALUE
    );

    if (validationError) {
      console.error(`uploadFile: Validation error: ${validationError}`);
      throw new Error(validationError);
    }

    return { path: file.name, error: null };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { path: '', error: error as Error };
  }
};

export const getFileUrl = (path: string): string => {
  return `/uploads/${path}`;
};

export const submitApplicationWithFiles = async (
  formData: ApplicationFormValues,
  files: { [key: string]: File }
): Promise<{ success: boolean; error?: any; data?: any; fileError?: string }> => {
  try {
    console.log('submitApplicationWithFiles: Starting submission with files for', formData.email);
    console.log('Files to upload:', Object.keys(files).map(key => `${key}: ${files[key]?.name || 'null'} (${files[key]?.size || 0} bytes)`));
    
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
    }
    
    const formDataObj = new FormData();
    formDataObj.append('applicationData', JSON.stringify(formData));
    
    Object.entries(files).forEach(([key, file]) => {
      if (file && file instanceof File && file.size > 0) {
        console.log(`Adding file to formData: ${key}, ${file.name}, ${file.size} bytes`);
        formDataObj.append(key, file, file.name);
      }
    });

    const response = await fetch('/api/applications', {
      method: 'POST',
      body: formDataObj,
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      console.error('Application submission failed:', result);
      return { 
        success: false, 
        error: { message: result.error || 'Failed to submit application' }
      };
    }

    console.log('Application submitted successfully:', result);
    return { success: true, data: result };
      
  } catch (error: any) {
    console.error("Error submitting application with files:", error);
    return { 
      success: false, 
      error: error 
    };
  }
};
