
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
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Resend API error (${res.status}): ${errorText}`);
      return { success: false, error: `API returned ${res.status}: ${errorText}` };
    }
    
    const data = await res.json();
    console.log("Email sent successfully:", data);
    return { success: true, data };
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
    const { type, ...data } = await req.json();
    
    console.log(`Processing email request of type: ${type}`, data);
    
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
            emailResult = await sendApplicationConfirmation(data);
            break;
            
          case 'admin_notification':
            emailResult = await sendAdminNotification(data);
            break;
            
          case 'contact_form':
            emailResult = await sendContactFormNotification(data);
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
            JSON.stringify({ success: true, type }),
            { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        } else {
          lastError = emailResult.error;
          console.warn(`Email sending failed (attempt ${attempts + 1}): ${lastError}`);
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
    
    // If we've exhausted all retries
    console.error(`All ${maxRetries} attempts to send email failed`);
    return new Response(
      JSON.stringify({ success: false, error: lastError || "Failed to send email after multiple attempts" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "An unexpected error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
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
    
    return { success: adminResult.success && userResult.success };
  } catch (error) {
    console.error("Error sending contact form notification:", error);
    return { success: false, error };
  }
}
