
import { supabase } from "@/integrations/supabase/client";
import { ApplicationFormValues } from "@/components/ApplicationForm/schema";
import { toast } from "@/hooks/use-toast";

/**
 * Interface for file uploads associated with an application
 */
export interface ApplicationFiles {
  audioFile1: File | null;
  audioFile2: File | null;
  cvFile: File | null;
  recommendationFile: File | null;
  [key: string]: File | null;
}

/**
 * Response from the application submission process
 */
export interface ApplicationSubmissionResult {
  success: boolean;
  applicationId?: string;
  error?: {
    message: string;
    code?: string;
  };
  filesUploaded?: string[];
}

/**
 * Submit an application with associated files
 */
export async function submitApplication(
  formData: ApplicationFormValues,
  files: ApplicationFiles
): Promise<ApplicationSubmissionResult> {
  console.log("Starting application submission process");
  
  try {
    // 1. First insert the application data
    const { data: applicationData, error: applicationError } = await supabase
      .from("applications")
      .insert({
        // Ensure these fields exactly match the database schema column names
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        dateofbirth: formData.dateOfBirth,
        nationality: formData.nationality,
        address: formData.whereFrom || "",
        city: "", // Required field with default
        country: "", // Required field with default
        postalcode: "", // Required field with default
        vocalrange: formData.vocalRange || "other",
        yearsofexperience: formData.yearsOfSinging || "0",
        musicalbackground: formData.musicalBackground || "",
        teachername: formData.teacherName || null,
        teacheremail: formData.teacherEmail || null,
        performanceexperience: formData.areasOfInterest || '',
        reasonforapplying: formData.reasonForApplying,
        heardaboutus: formData.heardAboutUs,
        scholarshipinterest: formData.scholarshipInterest,
        specialneeds: formData.specialNeeds || null,
        termsagreed: formData.termsAgreed,
        source: typeof window !== 'undefined' ? window.location.href : 'direct_api'
      })
      .select();

    if (applicationError) {
      console.error("Error submitting application data:", applicationError);
      return {
        success: false,
        error: {
          message: applicationError.message || "Failed to submit application",
          code: applicationError.code
        }
      };
    }

    if (!applicationData || applicationData.length === 0) {
      console.error("No application data returned after submission");
      return {
        success: false,
        error: {
          message: "Application submission failed - no data returned",
          code: "DATA_ERROR"
        }
      };
    }

    const applicationId = applicationData[0].id;
    console.log(`Application submitted successfully with ID: ${applicationId}`);
    
    // 2. Upload any files if they exist
    const uploadedFiles: string[] = [];
    const fileUploadPromises: Promise<void>[] = [];
    
    // Process each file type
    for (const [fileType, file] of Object.entries(files)) {
      if (file instanceof File && file.size > 0) {
        const uploadPromise = uploadApplicationFile(applicationId, fileType, file)
          .then(filePath => {
            if (filePath) {
              uploadedFiles.push(filePath);
              console.log(`File ${fileType} uploaded successfully: ${filePath}`);
            }
          })
          .catch(error => {
            console.error(`Error uploading ${fileType}:`, error);
            // Continue with other files even if one fails
          });
          
        fileUploadPromises.push(uploadPromise);
      }
    }
    
    // Wait for all file uploads to complete
    await Promise.allSettled(fileUploadPromises);
    
    // 3. Send confirmation emails
    await sendConfirmationEmails(applicationId, formData.email, formData.firstName);
    
    return {
      success: true,
      applicationId,
      filesUploaded: uploadedFiles
    };
    
  } catch (error: any) {
    console.error("Unhandled error in application submission:", error);
    return {
      success: false,
      error: {
        message: error.message || "An unexpected error occurred",
        code: error.code || "UNKNOWN_ERROR"
      }
    };
  }
}

/**
 * Upload a single file associated with an application
 */
async function uploadApplicationFile(
  applicationId: string,
  fileType: string,
  file: File
): Promise<string | null> {
  try {
    // Create unique path for the file including applicant ID and timestamp
    const fileExt = file.name.split('.').pop() || 'bin';
    const timestamp = Date.now();
    const filePath = `applications/${applicationId}/${fileType}_${timestamp}.${fileExt}`;
    
    // Check if storage bucket exists first
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
    
    if (bucketError) {
      console.error('Error checking buckets:', bucketError);
      throw new Error(`Could not check storage buckets: ${bucketError.message}`);
    }
    
    // Create bucket if it doesn't exist
    const bucketExists = buckets?.some(bucket => bucket.name === 'application_materials');
    
    if (!bucketExists) {
      const { error: createError } = await supabase.storage.createBucket('application_materials', {
        public: true
      });
      
      if (createError) {
        console.error('Error creating bucket:', createError);
        throw new Error(`Could not create storage bucket: ${createError.message}`);
      }
    }
    
    // Upload the file
    const { data, error } = await supabase.storage
      .from('application_materials')
      .upload(filePath, file, {
        contentType: file.type,
        upsert: true
      });
      
    if (error) {
      console.error(`Error uploading ${fileType}:`, error);
      return null;
    }
    
    return data.path;
  } catch (error) {
    console.error(`Unexpected error uploading ${fileType}:`, error);
    return null;
  }
}

/**
 * Send confirmation emails after application submission
 */
async function sendConfirmationEmails(
  applicationId: string,
  email: string,
  firstName: string
): Promise<boolean> {
  try {
    // Send confirmation to applicant
    const { error: applicantEmailError } = await supabase.functions.invoke('send-email', {
      body: {
        type: 'application_confirmation',
        name: firstName,
        email: email
      },
    });
    
    if (applicantEmailError) {
      console.error('Error sending applicant confirmation email:', applicantEmailError);
    }
    
    // Send notification to admin
    const { error: adminEmailError } = await supabase.functions.invoke('send-email', {
      body: {
        type: 'admin_notification',
        applicationId: applicationId
      },
    });
    
    if (adminEmailError) {
      console.error('Error sending admin notification email:', adminEmailError);
    }
    
    return !applicantEmailError && !adminEmailError;
  } catch (error) {
    console.error('Error sending confirmation emails:', error);
    return false;
  }
}
