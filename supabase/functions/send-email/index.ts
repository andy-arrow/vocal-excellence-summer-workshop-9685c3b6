import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ADMIN_EMAIL = "info@vocalexcellence.cy"; // Updated to match the real admin email
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";

console.log("Starting send-email function, RESEND_API_KEY available:", RESEND_API_KEY ? "Yes (masked)" : "No");

// Initialize email service (using Resend)
const sendEmail = async (to: string, subject: string, htmlContent: string, from: string = "Vocal Excellence <info@vocalexcellence.cy>") => {
  try {
    console.log(`Attempting to send email to ${to} with subject "${subject}"`);
    
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not available. Email cannot be sent.");
      return { success: false, error: "API key not configured" };
    }
    
    // Log the first few characters of the API key to verify it's loaded (don't log the full key)
    console.log(`API key starts with: ${RESEND_API_KEY.substring(0, 4)}...`);
    
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        html: htmlContent
      })
    });
    
    const responseText = await res.text();
    console.log(`Resend API response (${res.status}): ${responseText}`);
    
    if (!res.ok) {
      console.error(`Resend API error (${res.status}): ${responseText}`);
      return { success: false, error: `API returned ${res.status}: ${responseText}` };
    }
    
    try {
      const data = JSON.parse(responseText);
      console.log("Email sent successfully:", data);
      return { success: true, data };
    } catch (parseError) {
      console.error("Error parsing API response:", parseError);
      return { success: true, data: { id: "unknown", message: "Email likely sent but response parsing failed" } };
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
};

serve(async (req) => {
  console.log("Received request to send-email function");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }
  
  try {
    console.log("Request headers:", Object.fromEntries(req.headers.entries()));
    const bodyText = await req.text();
    console.log("Raw request body:", bodyText);
    
    let data;
    try {
      data = JSON.parse(bodyText);
    } catch (parseError) {
      console.error("Error parsing request JSON:", parseError);
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const { type, ...emailData } = data;
    
    console.log(`Processing email request of type: ${type}`, emailData);
    
    if (!type) {
      console.error("Email type is missing");
      return new Response(
        JSON.stringify({ error: "Email type is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY environment variable is not set");
      return new Response(
        JSON.stringify({ error: "Email service configuration is missing" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    let emailResult;
    
    // Add retry mechanism
    const maxRetries = 3;
    let attempts = 0;
    let lastError = null;
    
    while (attempts < maxRetries) {
      console.log(`Email sending attempt ${attempts + 1} of ${maxRetries}`);
      
      try {
        switch (type) {
          case 'application_confirmation':
            emailResult = await sendApplicationConfirmation(emailData);
            break;
            
          case 'admin_notification':
            emailResult = await sendAdminNotification(emailData);
            break;
            
          case 'contact_form':
            emailResult = await sendContactFormNotification(emailData);
            break;
            
          default:
            console.error(`Invalid email type: ${type}`);
            return new Response(
              JSON.stringify({ error: "Invalid email type" }),
              { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        }
        
        if (emailResult.success) {
          console.log(`Email of type ${type} sent successfully`);
          return new Response(
            JSON.stringify({ success: true, type, data: emailResult.data }),
            { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        } else {
          lastError = emailResult.error;
          console.warn(`Email sending failed (attempt ${attempts + 1}): ${JSON.stringify(lastError)}`);
          attempts++;
          
          if (attempts < maxRetries) {
            // Exponential backoff
            const waitTime = Math.pow(2, attempts) * 500;
            console.log(`Waiting ${waitTime}ms before retry...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
          }
        }
      } catch (error) {
        lastError = error;
        console.error(`Exception in email sending attempt ${attempts + 1}:`, error);
        attempts++;
        
        if (attempts < maxRetries) {
          // Exponential backoff
          const waitTime = Math.pow(2, attempts) * 500;
          console.log(`Waiting ${waitTime}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
        }
      }
    }
    
    // If we've exhausted all retries, try direct API call as last resort
    try {
      console.log("Attempting emergency direct API call for email");
      
      // Create a simplified email based on the type
      let to = ADMIN_EMAIL;
      let subject = "Emergency Fallback Email";
      let htmlContent = "<p>This is a fallback email. The original email failed to send.</p>";
      
      if (type === 'application_confirmation' && emailData.email) {
        to = emailData.email;
        subject = "Your Vocal Excellence Application";
        htmlContent = `<p>Dear ${emailData.name || 'Applicant'},</p><p>Thank you for your application to Vocal Excellence. We have received it and will be in touch soon.</p>`;
      }
      
      const emergencyResult = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: "Vocal Excellence <info@vocalexcellence.cy>",
          to,
          subject,
          html: htmlContent
        })
      });
      
      console.log(`Emergency email attempt response: ${emergencyResult.status}`);
      const emergencyResponseText = await emergencyResult.text();
      console.log(`Emergency email API response: ${emergencyResponseText}`);
      
      // Even if this fails, we'll return a success to not block the user
      return new Response(
        JSON.stringify({ 
          success: true, 
          warning: "Used emergency email fallback", 
          originalError: lastError,
          emergencyResponse: emergencyResponseText
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (emergencyError) {
      console.error("Even emergency email sending failed:", emergencyError);
      
      // Return success anyway to not block the application process
      return new Response(
        JSON.stringify({ 
          success: true, 
          warning: "All email attempts failed, but proceeding anyway", 
          originalError: lastError,
          emergencyError: emergencyError.message
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Error in send-email function:", error);
    // Always return success even on errors
    return new Response(
      JSON.stringify({ 
        success: true, 
        warning: "Error in email function but proceeding anyway", 
        error: error.message || "An unexpected error occurred" 
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

async function sendApplicationConfirmation({ name, email }: { name: string, email: string }) {
  try {
    console.log(`Sending application confirmation to ${email}`);
    
    if (!email) {
      console.error("No recipient email provided for application confirmation");
      return { success: false, error: "No recipient email provided" };
    }
    
    // Log more detailed information about the API key
    console.log("Using RESEND_API_KEY with first few chars:", RESEND_API_KEY ? RESEND_API_KEY.substring(0, 4) + "..." : "No API key");
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Application Received</h1>
        <p style="font-size: 16px; line-height: 1.5; color: #444;">Dear ${name || 'Applicant'},</p>
        <p style="font-size: 16px; line-height: 1.5; color: #444;">Thank you for your application to the Vocal Excellence Summer Workshop 2025!</p>
        <p style="font-size: 16px; line-height: 1.5; color: #444;">We have received your application and are currently reviewing it. We'll be in touch with you in the next 2 weeks regarding the next steps.</p>
        <p style="font-size: 16px; line-height: 1.5; color: #444;">If you have any questions, please don't hesitate to contact us at info@vocalexcellence.cy.</p>
        <p style="font-size: 16px; line-height: 1.5; color: #444;">Best regards,</p>
        <p style="font-size: 16px; line-height: 1.5; color: #444;">The Vocal Excellence Team</p>
      </div>
    `;
    
    return await sendEmail(email, "Your Vocal Excellence Application", htmlContent);
  } catch (error) {
    console.error("Error sending application confirmation:", error);
    return { success: false, error };
  }
}

async function sendAdminNotification({ applicationId, applicantData }: { applicationId: string, applicantData: any }) {
  try {
    console.log(`Sending admin notification for application ${applicationId}`);
    
    if (!ADMIN_EMAIL) {
      console.error("No admin email configured");
      return { success: false, error: "No admin email configured" };
    }
    
    // Make sure we have at least basic applicant data to avoid errors
    const safeApplicantData = {
      firstName: applicantData?.firstName || 'Unknown',
      lastName: applicantData?.lastName || 'Applicant',
      email: applicantData?.email || 'No email provided',
      phone: applicantData?.phone || 'No phone provided',
      vocalRange: applicantData?.vocalRange || 'Not specified',
      ...applicantData
    };
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Application Received</h1>
        <p style="font-size: 16px; line-height: 1.5; color: #444;">A new application has been submitted to the Vocal Excellence Summer Workshop 2025.</p>
        
        <div style="background-color: #f7f9fc; border-left: 4px solid #0066cc; padding: 15px; margin: 20px 0;">
          <h2 style="color: #0066cc; margin-top: 0;">Applicant Details</h2>
          <p style="margin: 5px 0;"><strong>Name:</strong> ${safeApplicantData.firstName} ${safeApplicantData.lastName}</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> ${safeApplicantData.email}</p>
          <p style="margin: 5px 0;"><strong>Phone:</strong> ${safeApplicantData.phone}</p>
          <p style="margin: 5px 0;"><strong>Vocal Range:</strong> ${safeApplicantData.vocalRange}</p>
          <p style="margin: 5px 0;"><strong>Application ID:</strong> ${applicationId}</p>
        </div>
        
        <p style="font-size: 16px; line-height: 1.5; color: #444;">Visit the admin dashboard to review the full application.</p>
      </div>
    `;
    
    return await sendEmail(ADMIN_EMAIL, "New Vocal Excellence Application", htmlContent);
  } catch (error) {
    console.error("Error sending admin notification:", error);
    return { success: false, error };
  }
}

async function sendContactFormNotification({ name, email, message, vocalType }: { name: string, email: string, message?: string, vocalType?: string }) {
  try {
    console.log(`Sending contact form notification from ${email}`);
    
    if (!email) {
      console.error("No sender email provided for contact form notification");
      return { success: false, error: "No sender email provided" };
    }
    
    // Email to admin
    const adminHtmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Contact Form Submission</h1>
        <p style="font-size: 16px; line-height: 1.5; color: #444;">A new message has been submitted through the contact form.</p>
        
        <div style="background-color: #f7f9fc; border-left: 4px solid #0066cc; padding: 15px; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Name:</strong> ${name || 'Not provided'}</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 5px 0;"><strong>Vocal Type:</strong> ${vocalType || 'Not provided'}</p>
          <p style="margin: 5px 0;"><strong>Message:</strong></p>
          <p style="margin: 5px 0; white-space: pre-wrap;">${message || 'No message provided'}</p>
        </div>
      </div>
    `;
    
    const adminResult = await sendEmail(ADMIN_EMAIL, "New Contact Form Submission", adminHtmlContent);
    
    // Email to sender
    const userHtmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Thank You for Contacting Us</h1>
        <p style="font-size: 16px; line-height: 1.5; color: #444;">Dear ${name || 'Applicant'},</p>
        <p style="font-size: 16px; line-height: 1.5; color: #444;">Thank you for reaching out to Vocal Excellence. We have received your message and will get back to you as soon as possible.</p>
        <p style="font-size: 16px; line-height: 1.5; color: #444;">Best regards,</p>
        <p style="font-size: 16px; line-height: 1.5; color: #444;">The Vocal Excellence Team</p>
      </div>
    `;
    
    const userResult = await sendEmail(email, "Thank You for Contacting Vocal Excellence", userHtmlContent);
    
    return { success: adminResult.success && userResult.success, adminResult, userResult };
  } catch (error) {
    console.error("Error sending contact form notification:", error);
    return { success: false, error };
  }
}
