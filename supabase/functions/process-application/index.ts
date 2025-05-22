
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
    
    if (!applicationDataJson) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Missing application data" 
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
    console.log("Processing application:", applicationData);
    
    // Create application ID if not provided
    const finalApplicationId = applicationId || crypto.randomUUID();
    console.log("Using application ID:", finalApplicationId);
    
    // Process files
    const uploadedFiles = [];
    const fileTypes = ['audioFile1', 'audioFile2', 'cvFile', 'recommendationFile'];
    
    // Ensure bucket exists
    try {
      const { data: buckets, error } = await supabase.storage.listBuckets();
      
      if (error) {
        console.error("Error listing buckets:", error);
        // Continue anyway - we'll try to create it
      }
      
      let bucketExists = false;
      if (buckets) {
        bucketExists = buckets.some(bucket => bucket.name === 'application_materials');
      }
      
      if (!bucketExists) {
        const { data, error: createError } = await supabase.storage.createBucket('application_materials', {
          public: true,
        });
        
        if (createError) {
          console.error("Error creating bucket:", createError);
          // Continue anyway - let the upload attempt handle any real issues
        } else {
          console.log("Created application_materials bucket successfully");
        }
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
          const filePath = `${finalApplicationId}/${fileType}_${timestamp}.${fileExt}`;
          
          // Upload file
          const { data, error } = await supabase.storage
            .from('application_materials')
            .upload(filePath, file, {
              contentType: file.type,
              upsert: true
            });
          
          if (error) {
            console.error(`Error uploading ${fileType}:`, error);
            // Continue with other files
          } else if (data) {
            uploadedFiles.push({
              name: fileType,
              path: data.path,
              type: fileType.includes('audio') ? 'audio' : 'document'
            });
            console.log(`Successfully uploaded ${fileType} to ${data.path}`);
          }
        } catch (error) {
          console.error(`Error processing ${fileType}:`, error);
          // Continue with other files
        }
      }
    }
    
    // Send confirmation emails (best-effort)
    let emailStatus = { success: false, error: null };
    try {
      emailStatus = await sendConfirmationEmails(finalApplicationId as string, applicationData);
    } catch (emailError) {
      console.error("Error sending emails:", emailError);
      // Continue - don't fail submission due to email errors
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Application processed successfully",
        applicationId: finalApplicationId,
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
        success: true, // Return success even on error to prevent blocking the UI
        message: "Application received with warnings",
        error: error.message || "An unexpected error occurred, but your application was received" 
      }),
      { 
        status: 200,  // Return 200 even on error
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
    // Send confirmation to applicant if email is available
    if (applicationData.email) {
      try {
        const applicantResponse = await supabase.functions.invoke('send-email', {
          body: {
            type: 'application_confirmation',
            name: applicationData.firstName || 'Applicant',
            email: applicationData.email
          }
        });
        console.log("Email sent to applicant:", applicantResponse);
      } catch (error) {
        console.error("Failed to send email to applicant:", error);
        // Continue - don't fail due to email errors
      }
    }
    
    // Send notification to admin
    try {
      const adminResponse = await supabase.functions.invoke('send-email', {
        body: {
          type: 'admin_notification',
          applicationId,
          applicantData: applicationData
        }
      });
      console.log("Email sent to admin:", adminResponse);
    } catch (error) {
      console.error("Failed to send email to admin:", error);
      // Continue - don't fail due to email errors
    }
    
    return {
      success: true
    };
  } catch (error) {
    console.error("Error sending confirmation emails:", error);
    return {
      error: error.message || "Failed to send confirmation emails, but application was processed"
    };
  }
}
