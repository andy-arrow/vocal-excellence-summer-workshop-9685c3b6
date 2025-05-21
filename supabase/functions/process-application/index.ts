
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { supabase } from "./supabaseClient.ts";
import { processFiles } from "./fileHandler.ts";
import { EmailHandler } from "./emailHandler.ts";
import { ApplicationData, ErrorResponse, SuccessResponse } from "./types.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-submission-id, x-csrf-token",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Max-Age": "86400"
};

function handleError(error: Error, details?: any): ErrorResponse {
  console.error("Error processing application:", error);
  console.error("Error details:", details || { stack: error.stack });
  return {
    success: false,
    error: error.message,
    details: details || { stack: error.stack }
  };
}

async function processFormData(formData: FormData): Promise<ApplicationData> {
  try {
    const appDataStr = formData.get("applicationData");
    console.log("Received form data with keys:", [...formData.keys()]);
    
    if (!appDataStr) {
      console.error("Missing applicationData in form data");
      throw new Error("Missing applicationData in form data");
    }
    
    if (typeof appDataStr !== 'string') {
      console.error("Invalid applicationData format:", typeof appDataStr);
      throw new Error("Invalid applicationData format");
    }
    
    try {
      return JSON.parse(appDataStr);
    } catch (parseError) {
      console.error("Failed to parse applicationData JSON:", parseError);
      throw new Error(`Failed to parse applicationData JSON: ${parseError.message}`);
    }
  } catch (error) {
    console.error("Error in processFormData:", error);
    throw error;
  }
}

async function processJsonData(request: Request): Promise<ApplicationData> {
  try {
    const json = await request.json();
    console.log("Received JSON data:", json);
    
    if (!json.applicationData) {
      console.error("Missing applicationData in JSON request");
      throw new Error("Missing applicationData in request");
    }
    
    return typeof json.applicationData === 'string' 
      ? JSON.parse(json.applicationData) 
      : json.applicationData;
  } catch (error) {
    console.error("Error in processJsonData:", error);
    throw error;
  }
}

async function saveApplicationToDatabase(data: ApplicationData): Promise<string> {
  try {
    console.log("Attempting to save application to database for:", `${data.firstName} ${data.lastName}`);
    
    const dietaryDetailsText = data.dietaryRestrictions?.details || '';
    const dietaryTypeText = data.dietaryRestrictions?.type || 'none';
    
    // Create dietary restrictions string
    const dietaryRestrictionText = dietaryTypeText === 'other' && dietaryDetailsText
      ? `${dietaryTypeText}: ${dietaryDetailsText}`
      : dietaryTypeText;
    
    const formData = {
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      phone: data.phone,
      dateofbirth: data.dateOfBirth,
      nationality: data.nationality,
      address: data.whereFrom, // Using the whereFrom field for address
      city: '', // No longer used but required by DB schema
      country: '', // No longer used but required by DB schema
      postalcode: '', // No longer used but required by DB schema
      vocalrange: data.vocalRange,
      yearsofexperience: data.yearsOfSinging,
      musicalbackground: data.musicalBackground,
      teachername: data.teacherName || null,
      teacheremail: data.teacherEmail || null,
      performanceexperience: data.areasOfInterest || '', // Store areas of interest in performanceexperience
      reasonforapplying: data.reasonForApplying,
      heardaboutus: data.heardAboutUs,
      scholarshipinterest: data.scholarshipInterest,
      specialneeds: data.specialNeeds 
        ? `${data.specialNeeds}\n\nDietary Restrictions: ${dietaryRestrictionText}`
        : `Dietary Restrictions: ${dietaryRestrictionText}`,
      termsagreed: data.termsAgreed,
      timestamp: new Date().toISOString(),
      source: "edge_function",
    };

    console.log("Prepared application data for database insertion:", formData);

    // Add retry logic for database operations
    let retries = 3;
    let lastError = null;
    
    while (retries > 0) {
      try {
        const { data: applicationRecord, error: dbError } = await supabase
          .from('applications')
          .insert(formData)
          .select();

        if (dbError) {
          console.error(`Database error (attempts left: ${retries - 1}):`, dbError);
          lastError = dbError;
          retries--;
          
          if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            continue;
          }
          
          throw dbError;
        }

        if (!applicationRecord || applicationRecord.length === 0) {
          console.error("No application record returned after insertion");
          throw new Error("Failed to retrieve application record after insertion");
        }

        console.log("Application saved successfully with ID:", applicationRecord[0].id);
        return applicationRecord[0].id;
      } catch (error) {
        console.error(`Error in saveApplicationToDatabase attempt ${4 - retries}:`, error);
        lastError = error;
        retries--;
        
        if (retries > 0) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        } else {
          throw error;
        }
      }
    }
    
    throw lastError || new Error("Failed to save application after multiple attempts");
  } catch (error) {
    console.error("Error in saveApplicationToDatabase:", error);
    throw error;
  }
}

serve(async (req) => {
  console.log("Process-application function invoked with method:", req.method);
  console.log("Content-Type:", req.headers.get("content-type"));
  
  // Get submission ID if provided
  const submissionId = req.headers.get("x-submission-id") || "unknown";
  console.log("Submission ID:", submissionId);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS preflight request");
    return new Response(null, { 
      status: 204, 
      headers: corsHeaders 
    });
  }

  if (req.method !== "POST") {
    console.error("Invalid request method:", req.method);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Only POST requests are supported" 
      }),
      { 
        status: 405, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }

  try {
    // Clone the request for processing files later
    const reqClone = req.clone();
    
    // Parse request data
    const contentType = req.headers.get("content-type") || "";
    console.log(`[${submissionId}] Processing request with content type:`, contentType);
    
    let applicationData: ApplicationData;
    let applicationId: string | undefined;
    
    try {
      // Check if applicationId was provided in the form data
      if (contentType.includes("multipart/form-data")) {
        const formData = await req.formData();
        applicationData = await processFormData(formData);
        applicationId = formData.get("applicationId") as string;
        console.log(`[${submissionId}] Application ID from form data:`, applicationId);
      } else if (contentType.includes("application/json")) {
        applicationData = await processJsonData(req);
        const jsonBody = await req.json();
        applicationId = jsonBody.applicationId;
        console.log(`[${submissionId}] Application ID from JSON:`, applicationId);
      } else {
        throw new Error(`Unsupported content type: ${contentType}`);
      }
    } catch (parseError) {
      console.error(`[${submissionId}] Error parsing request data:`, parseError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Failed to parse request data: ${parseError.message}` 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log(`[${submissionId}] Processing application for:`, 
      `${applicationData.firstName} ${applicationData.lastName}`,
      applicationData.email
    );

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'whereFrom'];
    const missingFields = requiredFields.filter(field => !applicationData[field]);
    
    if (missingFields.length > 0) {
      console.error(`[${submissionId}] Missing required fields:`, missingFields);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Missing required fields: ${missingFields.join(', ')}` 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Save to database if applicationId was not provided
    if (!applicationId) {
      try {
        applicationId = await saveApplicationToDatabase(applicationData);
        console.log(`[${submissionId}] Application saved with ID:`, applicationId);
      } catch (dbError) {
        console.error(`[${submissionId}] Database error:`, dbError);
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: `Database error: ${dbError.message}` 
          }),
          { 
            status: 500, 
            headers: { ...corsHeaders, "Content-Type": "application/json" } 
          }
        );
      }
    } else {
      console.log(`[${submissionId}] Using provided application ID:`, applicationId);
    }

    // Process files if present
    let uploadedFiles = [];
    let fileAttachments = [];
    
    if (contentType.includes("multipart/form-data")) {
      try {
        const formData = await reqClone.formData();
        uploadedFiles = await processFiles(formData, applicationId);
        console.log(`[${submissionId}] Processed files:`, uploadedFiles);
        
        // Create file attachments for email
        if (uploadedFiles.length > 0) {
          fileAttachments = await Promise.all(
            uploadedFiles.map(async (file: any) => {
              try {
                const fileName = file.path.split('/').pop();
                // Get file content from Supabase storage
                const { data: fileData, error: fileError } = await supabase.storage
                  .from('application_materials')
                  .download(file.path);
                
                if (fileError || !fileData) {
                  console.error(`[${submissionId}] Error downloading file ${file.path}:`, fileError);
                  return null;
                }
                
                // Convert blob to ArrayBuffer
                const buffer = await fileData.arrayBuffer();
                console.log(`[${submissionId}] Created attachment for ${file.name}: ${fileName} (${buffer.byteLength} bytes)`);
                
                return {
                  filename: fileName,
                  content: new Uint8Array(buffer),
                  type: file.type.includes('audio') ? 'audio' : 'document'
                };
              } catch (error) {
                console.error(`[${submissionId}] Error creating attachment for ${file.name}:`, error);
                return null;
              }
            })
          );
          
          fileAttachments = fileAttachments.filter(Boolean);
          console.log(`[${submissionId}] Created ${fileAttachments.length} attachments for email`);
        }
      } catch (fileError) {
        console.error(`[${submissionId}] Error processing files:`, fileError);
        // Continue despite file errors - we've already saved the application
        // But we'll add this info to the response
      }
    }

    // Send email notifications
    let emailError = null;
    try {
      // Check if RESEND_API_KEY is set
      const resendApiKey = Deno.env.get("RESEND_API_KEY");
      if (!resendApiKey) {
        console.error(`[${submissionId}] RESEND_API_KEY not set in environment`);
        throw new Error("RESEND_API_KEY not configured");
      }
      
      console.log(`[${submissionId}] Initializing EmailHandler with API key`);
      const emailHandler = new EmailHandler(resendApiKey);
      
      // Try sending emails with retry logic
      let emailRetries = 2;
      let emailSent = false;
      
      while (emailRetries >= 0 && !emailSent) {
        try {
          // Send emails with attachments
          await emailHandler.sendNotifications(applicationData, fileAttachments);
          console.log(`[${submissionId}] Email notifications sent successfully with attachments`);
          emailSent = true;
          break;
        } catch (error) {
          console.error(`[${submissionId}] Error sending email (attempts left: ${emailRetries}):`, error);
          emailError = error;
          
          if (emailRetries > 0) {
            emailRetries--;
            await new Promise(resolve => setTimeout(resolve, 2000));
          } else {
            break;
          }
        }
      }
    } catch (error) {
      console.error(`[${submissionId}] Error in email notification process:`, error);
      // Store the error but continue - we don't want to fail the whole request
      emailError = {
        message: error.message,
        stack: error.stack
      };
    }

    const response: SuccessResponse = {
      success: true,
      message: "Application processed successfully",
      applicationId,
      submissionId,
      uploadedFiles: uploadedFiles.length > 0 ? uploadedFiles : undefined,
      emailStatus: emailError ? { error: emailError } : { success: true }
    };

    console.log(`[${submissionId}] Returning success response`);
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
    
  } catch (error) {
    console.error(`[${submissionId}] Unhandled error in process-application function:`, error);
    const errorResponse = handleError(error);
    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
