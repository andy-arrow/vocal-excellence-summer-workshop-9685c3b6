
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
  return {
    success: false,
    error: error.message,
    details: details || { stack: error.stack }
  };
}

async function processFormData(formData: FormData): Promise<ApplicationData> {
  const appDataStr = formData.get("applicationData");
  console.log("applicationData as string:", appDataStr);
  
  if (typeof appDataStr !== 'string') {
    throw new Error("Invalid applicationData format");
  }
  
  return JSON.parse(appDataStr);
}

async function processJsonData(request: Request): Promise<ApplicationData> {
  const json = await request.json();
  return typeof json.applicationData === 'string' 
    ? JSON.parse(json.applicationData) 
    : json.applicationData;
}

async function saveApplicationToDatabase(data: ApplicationData): Promise<string> {
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
    yearsofexperience: data.yearsOfExperience,
    musicalbackground: data.musicalBackground,
    teachername: data.teacherName || null,
    teacheremail: data.teacherEmail || null,
    performanceexperience: data.performanceExperience,
    reasonforapplying: data.reasonForApplying,
    heardaboutus: data.heardAboutUs,
    scholarshipinterest: data.scholarshipInterest,
    specialneeds: data.specialNeeds || null,
    termsagreed: data.termsAgreed,
    timestamp: new Date().toISOString(),
    source: "website",
  };

  const { data: applicationRecord, error: dbError } = await supabase
    .from('applications')
    .insert([formData])
    .select();

  if (dbError) {
    console.error("Database error:", dbError);
    throw new Error(`Failed to store application data: ${dbError.message}`);
  }

  return applicationRecord[0].id;
}

serve(async (req) => {
  console.log("Process-application function invoked with method:", req.method);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS preflight request");
    return new Response(null, { 
      status: 204, 
      headers: corsHeaders 
    });
  }

  try {
    // Parse request data
    const contentType = req.headers.get("content-type") || "";
    const applicationData = contentType.includes("multipart/form-data")
      ? await processFormData(await req.formData())
      : await processJsonData(req);

    console.log("Processing application for:", 
      `${applicationData.firstName} ${applicationData.lastName}`,
      applicationData.email
    );

    // Save to database
    const applicationId = await saveApplicationToDatabase(applicationData);
    console.log("Application saved with ID:", applicationId);

    // Process files if present
    const uploadedFiles = contentType.includes("multipart/form-data")
      ? await processFiles(await req.formData(), applicationId)
      : [];

    // Send email notifications
    const emailHandler = new EmailHandler(Deno.env.get("RESEND_API_KEY") || "");
    
    // Create file attachments for email
    const fileAttachments = uploadedFiles.length > 0 
      ? await Promise.all(uploadedFiles.map(async (file) => {
          const formData = await req.formData();
          const fileContent = formData.get(file.name) as File;
          return {
            filename: fileContent.name,
            content: new Uint8Array(await fileContent.arrayBuffer())
          };
        }))
      : [];

    try {
      await emailHandler.sendNotifications(applicationData, fileAttachments);
    } catch (emailError) {
      console.error("Error sending email notifications:", emailError);
      // Continue despite email errors
    }

    const response: SuccessResponse = {
      success: true,
      message: "Application processed successfully",
      applicationId,
      uploadedFiles: uploadedFiles.length > 0 ? uploadedFiles : undefined
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
    
  } catch (error) {
    const errorResponse = handleError(error);
    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});

