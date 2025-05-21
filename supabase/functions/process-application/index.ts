
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabase } from "./supabaseClient.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    // Get the form data
    const formData = await req.formData();
    const applicationDataJson = formData.get('applicationData');
    const applicationId = formData.get('applicationId');
    
    if (!applicationDataJson || !applicationId) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Missing required fields" 
        }),
        { 
          status: 400, 
          headers: { 
            "Content-Type": "application/json", 
            ...corsHeaders 
          } 
        }
      );
    }
    
    const applicationData = JSON.parse(applicationDataJson as string);
    console.log("Processing application with ID:", applicationId);
    
    // Process files
    const uploadedFiles = [];
    const fileTypes = ['audioFile1', 'audioFile2', 'cvFile', 'recommendationFile'];
    
    // Ensure bucket exists
    try {
      const { data: buckets } = await supabase.storage.listBuckets();
      let bucketExists = buckets.some(bucket => bucket.name === 'application_materials');
      
      if (!bucketExists) {
        await supabase.storage.createBucket('application_materials', {
          public: true,
        });
      }
    } catch (error) {
      console.error("Error checking/creating bucket:", error);
      // Continue anyway - let the upload attempt handle any real issues
    }
    
    // Upload each file
    for (const fileType of fileTypes) {
      const file = formData.get(fileType);
      if (file && file instanceof File && file.size > 0) {
        try {
          console.log(`Processing ${fileType}: ${file.name} (${file.size} bytes)`);
          
          // Create unique filename with applicationId
          const fileExt = file.name.split('.').pop() || 'bin';
          const timestamp = Date.now();
          const filePath = `${applicationId}/${fileType}_${timestamp}.${fileExt}`;
          
          // Upload file
          const { data, error } = await supabase.storage
            .from('application_materials')
            .upload(filePath, file, {
              contentType: file.type,
              upsert: true
            });
          
          if (error) {
            console.error(`Error uploading ${fileType}:`, error);
          } else {
            uploadedFiles.push({
              name: fileType,
              path: data.path,
              type: fileType.includes('audio') ? 'audio' : 'document'
            });
          }
        } catch (error) {
          console.error(`Error processing ${fileType}:`, error);
          // Continue with other files
        }
      }
    }
    
    // Send confirmation emails
    const emailStatus = await sendConfirmationEmails(applicationId as string, applicationData);
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Application processed successfully",
        applicationId,
        uploadedFiles,
        emailStatus
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    );
  } catch (error) {
    console.error("Error processing application:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "An unexpected error occurred" 
      }),
      { 
        status: 500, 
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        } 
      }
    );
  }
});

async function sendConfirmationEmails(applicationId: string, applicationData: any) {
  try {
    // Send confirmation to applicant
    const applicantResponse = await supabase.functions.invoke('send-email', {
      body: {
        type: 'application_confirmation',
        name: applicationData.firstName,
        email: applicationData.email
      }
    });
    
    // Send notification to admin
    const adminResponse = await supabase.functions.invoke('send-email', {
      body: {
        type: 'admin_notification',
        applicationId,
        applicantData: applicationData
      }
    });
    
    return {
      success: true
    };
  } catch (error) {
    console.error("Error sending confirmation emails:", error);
    return {
      error: error.message || "Failed to send confirmation emails"
    };
  }
}
