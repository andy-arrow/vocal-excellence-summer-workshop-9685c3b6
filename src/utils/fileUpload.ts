
import { supabase } from "@/integrations/supabase/client";

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
