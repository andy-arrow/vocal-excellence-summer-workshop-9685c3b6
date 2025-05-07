import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { supabase } from "./supabaseClient.ts";
import { processFiles } from "./fileHandler.ts";
import { EmailHandler } from "./emailHandler.ts";
import { ApplicationData, ErrorResponse, SuccessResponse } from "./types.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
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
    console.log("applicationData as string:", appDataStr);
    
    if (typeof appDataStr !== 'string') {
      console.error("Invalid applicationData format:", appDataStr);
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
    
    const formData = {
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      phone: data.phone,
      dateofbirth: data.dateOfBirth,
      nationality: data.nationality,
      address: data.address,
      city: data.city,
      country: data.country,
      postalcode: data.postalCode,
      vocalrange: data.vocalRange,
      yearsofSinging: data.yearsOfSinging,
      musicalbackground: data.musicalBackground,
      teachername: data.teacherName || null,
      teacheremail: data.teacherEmail || null,
      reasonforapplying: data.reasonForApplying,
      heardaboutus: data.heardAboutUs,
      scholarshipinterest: data.scholarshipInterest,
      specialneeds: data.specialNeeds || null,
      termsagreed: data.termsAgreed,
      timestamp: new Date().toISOString(),
      source: "website",
    };

    console.log("Prepared application data for database insertion:", formData);

    const { data: applicationRecord, error: dbError } = await supabase
      .from('applications')
      .insert([formData])
      .select();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error(`Failed to store application data: ${dbError.message}`);
    }

    if (!applicationRecord || applicationRecord.length === 0) {
      console.error("No application record returned after insertion");
      throw new Error("Failed to retrieve application record after insertion");
    }

    console.log("Application saved successfully with ID:", applicationRecord[0].id);
    return applicationRecord[0].id;
  } catch (error) {
    console.error("Error in saveApplicationToDatabase:", error);
    throw error;
  }
}

serve(async (req) => {
  console.log("Process-application function invoked with method:", req.method);
  console.log("Content-Type:", req.headers.get("content-type"));
  
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
    console.log("Processing request with content type:", contentType);
    
    let applicationData: ApplicationData;
    
    try {
      if (contentType.includes("multipart/form-data")) {
        const formData = await req.formData();
        applicationData = await processFormData(formData);
      } else if (contentType.includes("application/json")) {
        applicationData = await processJsonData(req);
      } else {
        throw new Error(`Unsupported content type: ${contentType}`);
      }
    } catch (parseError) {
      console.error("Error parsing request data:", parseError);
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

    console.log("Processing application for:", 
      `${applicationData.firstName} ${applicationData.lastName}`,
      applicationData.email
    );

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth'];
    const missingFields = requiredFields.filter(field => !applicationData[field]);
    
    if (missingFields.length > 0) {
      console.error("Missing required fields:", missingFields);
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

    // Save to database
    let applicationId: string;
    try {
      applicationId = await saveApplicationToDatabase(applicationData);
      console.log("Application saved with ID:", applicationId);
    } catch (dbError) {
      console.error("Database error:", dbError);
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

    // Process files if present
    let uploadedFiles = [];
    let fileAttachments = [];
    
    if (contentType.includes("multipart/form-data")) {
      try {
        const formData = await reqClone.formData();
        uploadedFiles = await processFiles(formData, applicationId);
        console.log("Processed files:", uploadedFiles);
        
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
                  console.error(`Error downloading file ${file.path}:`, fileError);
                  return null;
                }
                
                // Convert blob to ArrayBuffer
                const buffer = await fileData.arrayBuffer();
                console.log(`Created attachment for ${file.name}: ${fileName} (${buffer.byteLength} bytes)`);
                
                return {
                  filename: fileName,
                  content: new Uint8Array(buffer),
                  type: file.type.includes('audio') ? 'audio' : 'document'
                };
              } catch (error) {
                console.error(`Error creating attachment for ${file.name}:`, error);
                return null;
              }
            })
          );
          
          fileAttachments = fileAttachments.filter(Boolean);
          console.log(`Created ${fileAttachments.length} attachments for email`);
        }
      } catch (fileError) {
        console.error("Error processing files:", fileError);
        // Continue despite file errors - we've already saved the application
      }
    }

    // Send email notifications
    let emailError = null;
    try {
      // Check if RESEND_API_KEY is set
      const resendApiKey = Deno.env.get("RESEND_API_KEY");
      if (!resendApiKey) {
        console.error("RESEND_API_KEY not set in environment");
        throw new Error("RESEND_API_KEY not configured");
      }
      
      console.log("Initializing EmailHandler with API key");
      const emailHandler = new EmailHandler(resendApiKey);
      
      // Send emails with attachments
      await emailHandler.sendNotifications(applicationData, fileAttachments);
      console.log("Email notifications sent successfully with attachments");
    } catch (emailError) {
      console.error("Error sending email notifications:", emailError);
      // Store the error but continue - we don't want to fail the whole request
      emailError = {
        message: emailError.message,
        stack: emailError.stack
      };
    }

    const response: SuccessResponse = {
      success: true,
      message: "Application processed successfully",
      applicationId,
      uploadedFiles: uploadedFiles.length > 0 ? uploadedFiles : undefined,
      emailStatus: emailError ? { error: emailError } : { success: true }
    };

    console.log("Returning success response");
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
    
  } catch (error) {
    console.error("Unhandled error in process-application function:", error);
    const errorResponse = handleError(error);
    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
