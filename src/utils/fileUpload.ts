import { supabase } from "@/integrations/supabase/client";
import { ApplicationFormValues } from "@/components/ApplicationForm/schema";
import { submitApplicationForm } from "@/services/formSubmissionService";
import { validateFileUpload } from "./security";

const ALLOWED_AUDIO_TYPES = ['audio/mp3', 'audio/wav'];
const ALLOWED_DOCUMENT_TYPES = ['application/pdf'];
const MAX_AUDIO_SIZE_MB = 10;
const MAX_DOCUMENT_SIZE_MB = 2;

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
      isAudio ? MAX_AUDIO_SIZE_MB : MAX_DOCUMENT_SIZE_MB
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
        upsert: false
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
    const response = await submitApplicationForm(formData, files);
    return response;
  } catch (error) {
    console.error("Error submitting application with files:", error);
    return { success: false, error };
  }
};
