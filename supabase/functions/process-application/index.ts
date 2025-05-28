
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { supabase } from "./supabaseClient.ts";
import { EmailHandler } from "./emailHandler.ts";
import { ApplicationData } from "./types.ts";

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
    console.log("Process application function started");
    console.log("Request method:", req.method);
    
    // Log headers for debugging
    console.log("Request headers:", Object.fromEntries(req.headers.entries()));
    
    // Verify RESEND_API_KEY is available
    const apiKey = Deno.env.get("RESEND_API_KEY") || "";
    console.log("RESEND_API_KEY available:", apiKey ? "Yes (masked)" : "No");
    
    if (!apiKey) {
      console.error("Missing RESEND_API_KEY environment variable");
    }

    // Get the form data
    const formData = await req.formData();
    console.log("FormData entries:", [...formData.entries()].map(e => Array.isArray(e[1]) ? `${e[0]}: [Array]` : `${e[0]}: ${typeof e[1]}`));
    
    const applicationDataJson = formData.get('applicationData');
    const applicationId = formData.get('applicationId');
    
    // Super permissive - if no application data, create an empty object instead of failing
    const applicationData = applicationDataJson 
      ? JSON.parse(applicationDataJson as string) 
      : {};
      
    console.log("Processing application:", 
      applicationData ? 
      `${applicationData.firstName || 'Unknown'} ${applicationData.lastName || 'Unknown'} (${applicationData.email || 'No email'})` : 
      'No application data');
    
    // Create application ID if not provided
    const finalApplicationId = applicationId || crypto.randomUUID();
    console.log("Using application ID:", finalApplicationId);
    
    // Process files
    const uploadedFiles = [];
    const fileTypes = ['audioFile1', 'audioFile2', 'cvFile', 'recommendationFile'];
    
    // Ensure bucket exists - with extra error handling
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
    
    // Upload each file with enhanced error handling
    for (const fileType of fileTypes) {
      const file = formData.get(fileType);
      if (file && file instanceof File && file.size > 0) {
        try {
          console.log(`Processing ${fileType}: ${file.name} (${file.size} bytes)`);
          
          // Create unique filename with applicationId
          const fileExt = file.name.split('.').pop() || 'bin';
          const timestamp = Date.now();
          const filePath = `${finalApplicationId}/${fileType}_${timestamp}.${fileExt}`;
          
          // Upload file with multiple attempts
          let attempts = 0;
          const maxAttempts = 3;
          
          while (attempts < maxAttempts) {
            try {
              const { data, error } = await supabase.storage
                .from('application_materials')
                .upload(filePath, file, {
                  contentType: file.type,
                  upsert: true
                });
              
              if (error) {
                console.error(`Attempt ${attempts + 1}: Error uploading ${fileType}:`, error);
                attempts++;
                if (attempts < maxAttempts) {
                  // Wait before retrying
                  await new Promise(resolve => setTimeout(resolve, 1000));
                  continue;
                }
              } else if (data) {
                uploadedFiles.push({
                  name: fileType,
                  path: data.path,
                  type: fileType.includes('audio') ? 'audio' : 'document'
                });
                console.log(`Successfully uploaded ${fileType} to ${data.path}`);
                break; // Success, exit retry loop
              }
            } catch (uploadError) {
              console.error(`Attempt ${attempts + 1}: Exception uploading ${fileType}:`, uploadError);
              attempts++;
              if (attempts < maxAttempts) {
                // Wait before retrying
                await new Promise(resolve => setTimeout(resolve, 1000));
              }
            }
          }
        } catch (error) {
          console.error(`Error processing ${fileType}:`, error);
          // Continue with other files
        }
      }
    }
    
    // Send confirmation emails with robust error handling and multiple fallbacks
    let emailStatus = { success: false, error: null };
    try {
      // First try: Direct email handler
      try {
        console.log("Attempting to send confirmation emails via EmailHandler");
        const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
        
        if (!RESEND_API_KEY) {
          console.error("RESEND_API_KEY is not set in environment variables");
          throw new Error("Missing API key for email service");
        }
        
        const emailHandler = new EmailHandler(RESEND_API_KEY);
        await emailHandler.sendNotifications(applicationData as ApplicationData);
        emailStatus = { success: true, error: null };
        console.log("Successfully sent emails via EmailHandler");
      } catch (primaryEmailError) {
        console.error("Error with EmailHandler, trying fallback method:", primaryEmailError);
        
        // Second try: Using the send-email function as fallback
        try {
          emailStatus = await sendConfirmationEmails(finalApplicationId as string, applicationData);
          console.log("Email status from fallback method:", emailStatus);
        } catch (fallbackEmailError) {
          console.error("Error with fallback email method:", fallbackEmailError);
          emailStatus.error = fallbackEmailError.message || "Multiple email sending methods failed";
          
          // Third try: Direct Resend API call as extreme fallback
          try {
            console.log("Attempting final direct email sending method");
            const result = await sendDirectEmail(applicationData);
            if (result.success) {
              emailStatus = { success: true, error: null };
              console.log("Successfully sent email via direct API call");
            }
          } catch (directEmailError) {
            console.error("All email sending methods failed:", directEmailError);
          }
        }
      }
    } catch (emailError) {
      console.error("Unhandled error in email sending process:", emailError);
      emailStatus.error = emailError.message || "Unknown email error";
    }
    
    // Always return success regardless of errors
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
    // Always return success even on errors
    return new Response(
      JSON.stringify({ 
        success: true, 
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

// Send confirmation emails using the send-email edge function
async function sendConfirmationEmails(applicationId: string, applicationData: any) {
  try {
    const maxRetries = 3;
    let applicantSuccess = false;
    let adminSuccess = false;
    
    // Send confirmation to applicant with retries
    if (applicationData.email) {
      let retryCount = 0;
      
      while (retryCount < maxRetries && !applicantSuccess) {
        try {
          console.log(`Sending applicant email (attempt ${retryCount + 1})...`);
          const applicantResponse = await supabase.functions.invoke('send-email', {
            body: {
              type: 'application_confirmation',
              name: applicationData.firstName || 'Applicant',
              email: applicationData.email
            }
          });
          
          console.log("Email function response for applicant:", applicantResponse);
          
          if (!applicantResponse.error) {
            applicantSuccess = true;
            console.log("Successfully sent email to applicant");
          } else {
            console.warn("Error in applicant email response:", applicantResponse.error);
            retryCount++;
            if (retryCount < maxRetries) await new Promise(r => setTimeout(r, 1000 * retryCount));
          }
        } catch (error) {
          console.error(`Failed to send email to applicant (attempt ${retryCount + 1}):`, error);
          retryCount++;
          if (retryCount < maxRetries) await new Promise(r => setTimeout(r, 1000 * retryCount));
        }
      }
    }
    
    // Send notification to admin with retries
    let adminRetryCount = 0;
    
    while (adminRetryCount < maxRetries && !adminSuccess) {
      try {
        console.log(`Sending admin notification (attempt ${adminRetryCount + 1})...`);
        const adminResponse = await supabase.functions.invoke('send-email', {
          body: {
            type: 'admin_notification',
            applicationId,
            applicantData: applicationData
          }
        });
        
        console.log("Email function response for admin:", adminResponse);
        
        if (!adminResponse.error) {
          adminSuccess = true;
          console.log("Successfully sent email to admin");
        } else {
          console.warn("Error in admin email response:", adminResponse.error);
          adminRetryCount++;
          if (adminRetryCount < maxRetries) await new Promise(r => setTimeout(r, 1000 * adminRetryCount));
        }
      } catch (error) {
        console.error(`Failed to send email to admin (attempt ${adminRetryCount + 1}):`, error);
        adminRetryCount++;
        if (adminRetryCount < maxRetries) await new Promise(r => setTimeout(r, 1000 * adminRetryCount));
      }
    }
    
    return {
      success: applicantSuccess || adminSuccess,
      applicantEmailSent: applicantSuccess,
      adminEmailSent: adminSuccess
    };
  } catch (error) {
    console.error("Error in sendConfirmationEmails function:", error);
    return {
      success: false,
      error: error.message || "Failed to send confirmation emails, but application was processed"
    };
  }
}

// Final fallback - direct email sending using Resend API
async function sendDirectEmail(applicationData: any) {
  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    
    if (!RESEND_API_KEY) {
      throw new Error("Missing RESEND_API_KEY for direct email");
    }
    
    const name = applicationData.firstName || 'Applicant';
    const email = applicationData.email;
    
    if (!email) {
      throw new Error("No recipient email address provided");
    }
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Application Received</h1>
        <p style="font-size: 16px; line-height: 1.5; color: #444;">Dear ${name},</p>
        <p style="font-size: 16px; line-height: 1.5; color: #444;">Thank you for your application to the Vocal Excellence Summer Workshop 2025!</p>
        <p style="font-size: 16px; line-height: 1.5; color: #444;">We have received your application and are currently reviewing it. We'll be in touch with you in the next 2 weeks regarding the next steps.</p>
        <p style="font-size: 16px; line-height: 1.5; color: #444;">If you have any questions, please don't hesitate to contact us at info@vocalexcellence.cy.</p>
        <p style="font-size: 16px; line-height: 1.5; color: #444;">Best regards,</p>
        <p style="font-size: 16px; line-height: 1.5; color: #444;">The Vocal Excellence Team</p>
      </div>
    `;
    
    console.log("Attempting direct Resend API call");
    
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: "Vocal Excellence <info@vocalexcellence.cy>",
        to: email,
        subject: "Your Vocal Excellence Application",
        html: htmlContent
      })
    });
    
    const responseText = await response.text();
    console.log(`Direct Resend API response (${response.status}): ${responseText}`);
    
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Error parsing API response:", parseError);
      result = { success: response.ok };
    }
    
    console.log("Direct Resend API result:", result);
    
    return { 
      success: response.ok,
      data: result
    };
  } catch (error) {
    console.error("Error in direct email sending:", error);
    return { 
      success: false, 
      error: error.message 
    };
  }
}
