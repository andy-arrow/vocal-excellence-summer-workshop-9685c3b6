
import { supabase } from "./supabaseClient.ts";
import { FileUpload, ProcessedFile } from "./types.ts";

export async function processFiles(
  formData: FormData, 
  applicationId: string
): Promise<ProcessedFile[]> {
  const uploadedFiles: ProcessedFile[] = [];
  const files: FileUpload[] = [];
  const submissionId = formData.get('submissionId') || 'unknown';

  console.log(`[${submissionId}] processFiles: Starting to process files for application ID:`, applicationId);
  console.log(`[${submissionId}] All form data keys:`, [...formData.keys()]);

  // Check for audio files
  const audioFiles = ['audioFile1', 'audioFile2'];
  for (const name of audioFiles) {
    const file = formData.get(name) as File;
    if (file && file.size > 0) {
      console.log(`[${submissionId}] Found ${name}:`, file.name, file.size, file.type);
      files.push({ name, file, type: 'audio' });
    } else {
      console.log(`[${submissionId}] No ${name} found or file was empty`);
    }
  }

  // Check for document files
  const docFiles = ['cvFile', 'recommendationFile'];
  for (const name of docFiles) {
    const file = formData.get(name) as File;
    if (file && file.size > 0) {
      console.log(`[${submissionId}] Found ${name}:`, file.name, file.size, file.type);
      files.push({ name, file, type: 'document' });
    } else {
      console.log(`[${submissionId}] No ${name} found or file was empty`);
    }
  }

  if (files.length === 0) {
    console.log(`[${submissionId}] No valid files found to process`);
    return [];
  }

  console.log(`[${submissionId}] Found ${files.length} files to process:`, files.map(f => `${f.name}: ${f.file.name}`));

  // Ensure bucket exists by checking first
  try {
    const { data: buckets, error: bucketsError } = await supabase.storage
      .listBuckets();
    
    console.log(`[${submissionId}] Checking if bucket exists:`, buckets);
    
    let bucketExists = false;
    if (buckets) {
      bucketExists = buckets.some(bucket => bucket.name === 'application_materials');
    }
    
    if (!bucketExists) {
      console.log(`[${submissionId}] Creating application_materials bucket`);
      await supabase.storage.createBucket('application_materials', {
        public: true,
      });
    } else {
      console.log(`[${submissionId}] application_materials bucket already exists`);
    }
  } catch (error) {
    console.error(`[${submissionId}] Error checking/creating bucket:`, error);
    throw new Error('Failed to initialize storage bucket');
  }

  // Upload files with retries
  for (const fileObj of files) {
    try {
      // Create a more reliable file extension extraction
      const fileNameParts = fileObj.file.name.split('.');
      const fileExt = fileNameParts.length > 1 ? fileNameParts.pop() : 'bin';
      
      // Create a unique file path that includes timestamp to avoid collisions
      const timestamp = Date.now();
      const filePath = `${applicationId}/${fileObj.name}_${timestamp}.${fileExt}`;
      
      console.log(`[${submissionId}] Uploading ${fileObj.name} to ${filePath} (${fileObj.file.size} bytes)`);
      
      // Convert File to ArrayBuffer
      const arrayBuffer = await fileObj.file.arrayBuffer();
      console.log(`[${submissionId}] Converted ${fileObj.name} to ArrayBuffer of length: ${arrayBuffer.byteLength}`);
      
      // Retry logic for uploads
      let retries = 3;
      let success = false;
      let uploadError = null;
      
      while (retries > 0 && !success) {
        try {
          const { data, error } = await supabase.storage
            .from('application_materials')
            .upload(filePath, arrayBuffer, {
              contentType: fileObj.file.type,
              upsert: true
            });
          
          if (error) {
            console.error(`[${submissionId}] Error uploading ${fileObj.name} (attempt ${4-retries}):`, error);
            uploadError = error;
            retries--;
            
            // Wait before retrying
            if (retries > 0) {
              await new Promise(resolve => setTimeout(resolve, 1000));
            }
          } else {
            success = true;
            console.log(`[${submissionId}] Successfully uploaded ${fileObj.name} to ${filePath}`);
            uploadedFiles.push({
              name: fileObj.name,
              path: filePath,
              type: fileObj.type
            });
          }
        } catch (error) {
          console.error(`[${submissionId}] Exception uploading ${fileObj.name} (attempt ${4-retries}):`, error);
          uploadError = error;
          retries--;
          
          // Wait before retrying
          if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
      }
      
      if (!success) {
        throw uploadError || new Error(`Failed to upload ${fileObj.name} after multiple attempts`);
      }
    } catch (error) {
      console.error(`[${submissionId}] Error processing file ${fileObj.name}:`, error);
      throw error;
    }
  }

  console.log(`[${submissionId}] Successfully processed ${uploadedFiles.length} files`);
  return uploadedFiles;
}
