
import { supabase } from "./supabaseClient.ts";
import { FileUpload, ProcessedFile } from "./types.ts";

/**
 * Process uploaded files and save them to storage
 */
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
    if (file && file instanceof File && file.size > 0) {
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
    if (file && file instanceof File && file.size > 0) {
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
    // First check if bucket exists
    const { data: buckets, error: bucketsError } = await supabase.storage
      .listBuckets();
    
    console.log(`[${submissionId}] Checking if bucket exists:`, buckets?.map(b => b.name));
    
    let bucketExists = false;
    if (buckets) {
      bucketExists = buckets.some(bucket => bucket.name === 'application_materials');
    }
    
    if (!bucketExists) {
      console.log(`[${submissionId}] Creating application_materials bucket`);
      try {
        const { data, error } = await supabase.storage.createBucket('application_materials', {
          public: true,
        });
        
        if (error) {
          console.error(`[${submissionId}] Error creating bucket:`, error);
          // Continue anyway as the bucket might exist but not be visible
        } else {
          console.log(`[${submissionId}] Bucket created:`, data);
        }
      } catch (createError) {
        console.error(`[${submissionId}] Exception creating bucket:`, createError);
        // Continue anyway as the bucket might exist but not be visible
      }
    } else {
      console.log(`[${submissionId}] application_materials bucket already exists`);
    }
  } catch (error) {
    console.error(`[${submissionId}] Error checking/creating bucket:`, error);
    // Continue - we'll find out during the upload if there's a real issue
  }

  // Process each file with enhanced error handling and retries
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
      
      // Retry logic for uploads with exponential backoff
      let retries = 3;
      let success = false;
      let uploadError = null;
      let backoffMs = 1000;
      
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
            
            // Wait before retrying with exponential backoff
            if (retries > 0) {
              await new Promise(resolve => setTimeout(resolve, backoffMs));
              backoffMs *= 2; // Double the wait time for next retry
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
          
          // Wait before retrying with exponential backoff
          if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, backoffMs));
            backoffMs *= 2; // Double the wait time for next retry
          }
        }
      }
      
      if (!success) {
        console.error(`[${submissionId}] All upload attempts failed for ${fileObj.name}`);
        // Continue with other files rather than failing the entire process
      }
    } catch (error) {
      console.error(`[${submissionId}] Error processing file ${fileObj.name}:`, error);
      // Continue with other files
    }
  }

  console.log(`[${submissionId}] Successfully processed ${uploadedFiles.length} of ${files.length} files`);
  return uploadedFiles;
}
