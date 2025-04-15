
import { supabase } from "./supabaseClient.ts";
import { FileUpload, ProcessedFile } from "./types.ts";

export async function processFiles(
  formData: FormData, 
  applicationId: string
): Promise<ProcessedFile[]> {
  const uploadedFiles: ProcessedFile[] = [];
  const files: FileUpload[] = [];

  console.log("processFiles: Starting to process files for application ID:", applicationId);
  console.log("All form data keys:", [...formData.keys()]);

  // Check for audio files
  const audioFiles = ['audioFile1', 'audioFile2'];
  for (const name of audioFiles) {
    const file = formData.get(name) as File;
    if (file && file.size > 0) {
      console.log(`Found ${name}:`, file.name, file.size, file.type);
      files.push({ name, file, type: 'audio' });
    } else {
      console.log(`No ${name} found or file was empty`);
    }
  }

  // Check for document files
  const docFiles = ['cvFile', 'recommendationFile'];
  for (const name of docFiles) {
    const file = formData.get(name) as File;
    if (file && file.size > 0) {
      console.log(`Found ${name}:`, file.name, file.size, file.type);
      files.push({ name, file, type: 'document' });
    } else {
      console.log(`No ${name} found or file was empty`);
    }
  }

  if (files.length === 0) {
    console.log("No valid files found to process");
    return [];
  }

  console.log(`Found ${files.length} files to process:`, files.map(f => `${f.name}: ${f.file.name}`));

  // Ensure bucket exists by checking first
  try {
    const { data: buckets, error: bucketsError } = await supabase.storage
      .listBuckets();
    
    console.log("Checking if bucket exists:", buckets);
    
    let bucketExists = false;
    if (buckets) {
      bucketExists = buckets.some(bucket => bucket.name === 'application_materials');
    }
    
    if (!bucketExists) {
      console.log('Creating application_materials bucket');
      await supabase.storage.createBucket('application_materials', {
        public: true,
      });
    } else {
      console.log('application_materials bucket already exists');
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
      
      console.log(`Uploading ${fileObj.name} to ${filePath} (${fileObj.file.size} bytes)`);
      
      // Convert File to ArrayBuffer
      const arrayBuffer = await fileObj.file.arrayBuffer();
      console.log(`Converted ${fileObj.name} to ArrayBuffer of length: ${arrayBuffer.byteLength}`);
      
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

  console.log(`Successfully processed ${uploadedFiles.length} files`);
  return uploadedFiles;
}
