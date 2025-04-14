
import { supabase } from "./supabaseClient.ts";
import { FileUpload, ProcessedFile } from "./types.ts";

export async function processFiles(
  formData: FormData, 
  applicationId: string
): Promise<ProcessedFile[]> {
  const uploadedFiles: ProcessedFile[] = [];
  const files: FileUpload[] = [];

  // Check for audio files
  const audioFiles = ['audioFile1', 'audioFile2'];
  for (const name of audioFiles) {
    const file = formData.get(name) as File;
    if (file?.size > 0) {
      console.log(`Found ${name}:`, file.name, file.size);
      files.push({ name, file, type: 'audio' });
    }
  }

  // Check for document files
  const docFiles = ['cvFile', 'recommendationFile'];
  for (const name of docFiles) {
    const file = formData.get(name) as File;
    if (file?.size > 0) {
      console.log(`Found ${name}:`, file.name, file.size);
      files.push({ name, file, type: 'document' });
    }
  }

  if (files.length === 0) return [];

  // Ensure bucket exists
  try {
    const { error: bucketError } = await supabase.storage
      .getBucket('application_materials');

    if (bucketError) {
      console.log('Creating application_materials bucket');
      await supabase.storage.createBucket('application_materials', {
        public: true,
      });
    }
  } catch (error) {
    console.error('Error checking/creating bucket:', error);
    throw new Error('Failed to initialize storage bucket');
  }

  // Upload files
  for (const fileObj of files) {
    try {
      const fileExt = fileObj.file.name.split('.').pop();
      const filePath = `${applicationId}/${fileObj.name}.${fileExt}`;
      
      console.log(`Uploading ${fileObj.name} to ${filePath}`);
      
      const arrayBuffer = await fileObj.file.arrayBuffer();
      
      const { error: uploadError } = await supabase.storage
        .from('application_materials')
        .upload(filePath, arrayBuffer, {
          contentType: fileObj.file.type,
          upsert: true
        });
      
      if (uploadError) {
        console.error(`Error uploading ${fileObj.name}:`, uploadError);
        throw uploadError;
      }
      
      console.log(`Successfully uploaded ${fileObj.name} to ${filePath}`);
      uploadedFiles.push({
        name: fileObj.name,
        path: filePath,
        type: fileObj.type
      });
    } catch (error) {
      console.error(`Error processing file ${fileObj.name}:`, error);
      throw error;
    }
  }

  return uploadedFiles;
}

