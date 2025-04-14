
import { supabase } from "@/integrations/supabase/client";
import { ApplicationFormValues } from "@/components/ApplicationForm/schema";
import { submitApplicationForm } from "@/services/formSubmissionService";

export const uploadFile = async (
  file: File,
  userId: string,
  category: string
): Promise<{ path: string; error: Error | null }> => {
  try {
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
