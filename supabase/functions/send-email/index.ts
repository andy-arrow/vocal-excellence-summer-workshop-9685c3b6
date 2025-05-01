
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { supabase } from "./supabaseClient.ts";

// Initialize Resend with API key
const resendApiKey = Deno.env.get("RESEND_API_KEY");
if (!resendApiKey) {
  console.error("RESEND_API_KEY environment variable is not set");
}
const resend = new Resend(resendApiKey);

console.log("Send-email function loaded, Resend initialized:", !!resend);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ApplicationEmailRequest {
  type: string;
  name?: string;
  email?: string;
  applicantData?: any;
  applicationId?: string;
  actionUrl?: string;
}

serve(async (req) => {
  console.log("Send-email function invoked");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS preflight request");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check if Resend API key is set
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY not configured");
    }
    
    // Parse request body
    const body = await req.json();
    console.log("Request body:", JSON.stringify(body, null, 2));
    
    const { type, email, name, applicantData, applicationId, actionUrl } = body as ApplicationEmailRequest;
    
    if (!type) {
      throw new Error("Email type is required");
    }
    
    console.log(`Sending ${type} email`);
    
    let subject, htmlContent;
    let toEmail = email || "";
    let attachments = [];
    let fromEmail = "Vocal Excellence Summer Workshop <info@vocalexcellence.cy>";

    // Determine which template to use based on the type
    switch (type) {
      case "welcome":
        subject = "Welcome to Vocal Excellence Summer Workshop";
        htmlContent = getWelcomeEmailTemplate(name || "");
        break;
      case "magic_link":
        subject = "Your Magic Link to Sign In";
        htmlContent = getMagicLinkEmailTemplate(name || "", actionUrl || "");
        break;
      case "password_reset":
        subject = "Reset Your Password";
        htmlContent = getPasswordResetEmailTemplate(name || "", actionUrl || "");
        break;
      case "application_confirmation":
        subject = "Application Received - Vocal Excellence Summer Workshop";
        htmlContent = getApplicationConfirmationTemplate(name || "");
        toEmail = email || "";
        break;
      case "information_request":
        subject = "Your Requested Information - Vocal Excellence Summer Workshop";
        htmlContent = getInformationRequestTemplate(name || "");
        break;
      case "admin_notification":
        if (applicantData) {
          subject = "**Vocal Excellence Summer Workshop** New Application Submission";
          htmlContent = getDetailedAdminNotificationTemplate(applicantData);
          toEmail = "info@vocalexcellence.cy";
          
          // If we have an applicationId, attempt to retrieve file attachments
          if (applicationId) {
            try {
              console.log("Retrieving attachments for application:", applicationId);
              attachments = await getApplicationAttachments(applicationId);
              console.log(`Retrieved ${attachments.length} attachments`);
            } catch (attachmentError) {
              console.error("Error getting application attachments:", attachmentError);
            }
          }
        } else {
          subject = "New Application Submission - Vocal Excellence Summer Workshop";
          htmlContent = getSimpleAdminNotificationTemplate(name || "", email || "");
          toEmail = "info@vocalexcellence.cy";
        }
        break;
      default:
        throw new Error("Invalid email template type");
    }

    console.log(`Sending email to ${toEmail} with subject "${subject}"`);
    console.log(`With ${attachments.length} attachments`);
    console.log(`From: ${fromEmail}`);

    try {
      const emailResponse = await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        subject: subject,
        html: htmlContent,
        attachments: attachments,
      });

      console.log("Email sent successfully:", emailResponse);

      return new Response(JSON.stringify(emailResponse), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    } catch (emailError) {
      console.error("Error sending email via Resend:", emailError);
      
      // If this is a domain verification error, provide a more helpful message
      const errorMessage = emailError.message || "Unknown error";
      const helpfulMessage = errorMessage.includes("domain") 
        ? "Domain verification error: Please verify your domain at https://resend.com/domains" 
        : errorMessage;
      
      return new Response(
        JSON.stringify({ 
          error: helpfulMessage,
          details: "Please verify your domain is properly configured in Resend"
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: error.message, stack: error.stack }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});

// Helper function to retrieve application attachments from storage
async function getApplicationAttachments(applicationId: string) {
  try {
    // Initialize Supabase client
    const { data, error } = await supabase
      .storage
      .from('application_files')
      .list(applicationId);

    if (error) {
      console.error("Error listing files:", error);
      return [];
    }

    console.log(`Found ${data.length} files for application ${applicationId}`);

    // Get each file and convert to base64 for attachment
    const attachmentPromises = data.map(async (file) => {
      try {
        const { data: fileData, error: fileError } = await supabase
          .storage
          .from('application_files')
          .download(`${applicationId}/${file.name}`);

        if (fileError || !fileData) {
          console.error("Error downloading file:", fileError);
          return null;
        }

        console.log(`Downloaded file: ${file.name}, size: ${fileData.size} bytes`);

        // Convert to base64
        const buffer = await fileData.arrayBuffer();
        const base64 = btoa(
          new Uint8Array(buffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );

        return {
          filename: file.name,
          content: base64,
        };
      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error);
        return null;
      }
    });

    const attachments = (await Promise.all(attachmentPromises)).filter(Boolean);
    console.log(`Successfully processed ${attachments.length} attachments`);
    return attachments;
  } catch (error) {
    console.error("Error processing attachments:", error);
    throw error;
  }
}

// Email template functions
function getWelcomeEmailTemplate(name: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Welcome to Vocal Excellence Summer Workshop</title>
      <style>
        body { 
          font-family: 'Helvetica', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(to right, #4f46e5, #7c3aed);
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .content {
          background-color: #f9fafb;
          padding: 30px;
          border-radius: 0 0 8px 8px;
          border: 1px solid #e5e7eb;
          border-top: none;
        }
        h1 { color: #4f46e5; margin-top: 0; }
        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: #6b7280;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>Vocal Excellence Summer Workshop</h2>
      </div>
      <div class="content">
        <h1>Welcome, ${name}!</h1>
        <p>Thank you for creating an account with the Vocal Excellence Summer Workshop. We're delighted to have you join us.</p>
        <p>Your account is now active, and you can access our platform to manage your applications and workshop content.</p>
        <p>If you have any questions or need assistance, please contact us at support@vocalexcellence.org.</p>
        <p>Best regards,<br>The Vocal Excellence Team</p>
      </div>
      <div class="footer">
        <p>&copy; 2025 Vocal Excellence Summer Workshop. All rights reserved.</p>
        <p>Limassol, Cyprus</p>
      </div>
    </body>
    </html>
  `;
}

function getMagicLinkEmailTemplate(name: string, actionUrl: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Your Sign In Link</title>
      <style>
        body { 
          font-family: 'Helvetica', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(to right, #4f46e5, #7c3aed);
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .content {
          background-color: #f9fafb;
          padding: 30px;
          border-radius: 0 0 8px 8px;
          border: 1px solid #e5e7eb;
          border-top: none;
        }
        h1 { color: #4f46e5; margin-top: 0; }
        .button {
          display: inline-block;
          background: linear-gradient(to right, #4f46e5, #7c3aed);
          color: white;
          text-decoration: none;
          padding: 12px 25px;
          border-radius: 4px;
          margin: 20px 0;
          font-weight: bold;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: #6b7280;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>Vocal Excellence Summer Workshop</h2>
      </div>
      <div class="content">
        <h1>Sign in to your account</h1>
        <p>Hello${name ? ` ${name}` : ''},</p>
        <p>Click the button below to sign in to your Vocal Excellence Summer Workshop account. This link is valid for the next 24 hours.</p>
        <p style="text-align: center;">
          <a href="${actionUrl}" class="button">Sign In to Your Account</a>
        </p>
        <p>If you didn't request this email, you can safely ignore it.</p>
        <p>Best regards,<br>The Vocal Excellence Team</p>
      </div>
      <div class="footer">
        <p>&copy; 2025 Vocal Excellence Summer Workshop. All rights reserved.</p>
        <p>Limassol, Cyprus</p>
      </div>
    </body>
    </html>
  `;
}

function getPasswordResetEmailTemplate(name: string, actionUrl: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Reset Your Password</title>
      <style>
        body { 
          font-family: 'Helvetica', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(to right, #4f46e5, #7c3aed);
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .content {
          background-color: #f9fafb;
          padding: 30px;
          border-radius: 0 0 8px 8px;
          border: 1px solid #e5e7eb;
          border-top: none;
        }
        h1 { color: #4f46e5; margin-top: 0; }
        .button {
          display: inline-block;
          background: linear-gradient(to right, #4f46e5, #7c3aed);
          color: white;
          text-decoration: none;
          padding: 12px 25px;
          border-radius: 4px;
          margin: 20px 0;
          font-weight: bold;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: #6b7280;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>Vocal Excellence Summer Workshop</h2>
      </div>
      <div class="content">
        <h1>Reset Your Password</h1>
        <p>Hello${name ? ` ${name}` : ''},</p>
        <p>We received a request to reset your password. Click the button below to create a new password. This link is valid for the next hour.</p>
        <p style="text-align: center;">
          <a href="${actionUrl}" class="button">Reset Your Password</a>
        </p>
        <p>If you didn't request a password reset, you can safely ignore this email.</p>
        <p>Best regards,<br>The Vocal Excellence Team</p>
      </div>
      <div class="footer">
        <p>&copy; 2025 Vocal Excellence Summer Workshop. All rights reserved.</p>
        <p>Limassol, Cyprus</p>
      </div>
    </body>
    </html>
  `;
}

function getApplicationConfirmationTemplate(name: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Application Received - Vocal Excellence Summer Workshop</title>
      <style>
        body { 
          font-family: 'Helvetica', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(to right, #eb4f77, #ed3c7c);
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .content {
          background-color: #f9fafb;
          padding: 30px;
          border-radius: 0 0 8px 8px;
          border: 1px solid #e5e7eb;
          border-top: none;
        }
        h1 { color: #eb4f77; margin-top: 0; }
        .steps {
          margin: 25px 0;
          padding: 0;
        }
        .steps li {
          margin-bottom: 15px;
          list-style-type: none;
          padding-left: 25px;
          position: relative;
        }
        .steps li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #eb4f77;
          font-weight: bold;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: #6b7280;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>Vocal Excellence Summer Workshop</h2>
      </div>
      <div class="content">
        <h1>Application Received</h1>
        <p>Dear ${name},</p>
        <p>Thank you for applying to the Vocal Excellence Summer Workshop 2025. We have successfully received your application.</p>
        
        <p>Here's what happens next:</p>
        <ul class="steps">
          <li>Our selection committee will review your application within 10 business days</li>
          <li>You may be contacted for a brief interview or additional materials</li>
          <li>Final selections will be made by June 1, 2025</li>
          <li>All applicants will be notified of their status by email</li>
        </ul>
        
        <p>If you have any questions or need to update your application, please contact us at info@vocalexcellence.cy.</p>
        
        <p>Best regards,<br>The Vocal Excellence Admissions Team</p>
      </div>
      <div class="footer">
        <p>&copy; 2025 Vocal Excellence Summer Workshop. All rights reserved.</p>
        <p>Limassol, Cyprus</p>
      </div>
    </body>
    </html>
  `;
}

function getInformationRequestTemplate(name: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Your Requested Information - Vocal Excellence Summer Workshop</title>
      <style>
        body { 
          font-family: 'Helvetica', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(to right, #eb4f77, #ed3c7c);
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .content {
          background-color: #f9fafb;
          padding: 30px;
          border-radius: 0 0 8px 8px;
          border: 1px solid #e5e7eb;
          border-top: none;
        }
        h1 { color: #eb4f77; margin-top: 0; }
        .info-section {
          margin: 20px 0;
          padding: 15px;
          background-color: #fdf2f6;
          border-left: 4px solid #eb4f77;
          border-radius: 4px;
        }
        .info-section h3 {
          margin-top: 0;
          color: #eb4f77;
        }
        .button {
          display: inline-block;
          background: linear-gradient(to right, #eb4f77, #ed3c7c);
          color: white;
          text-decoration: none;
          padding: 12px 25px;
          border-radius: 4px;
          margin: 20px 0;
          font-weight: bold;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: #6b7280;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>Vocal Excellence Summer Workshop</h2>
      </div>
      <div class="content">
        <h1>Your Requested Information</h1>
        <p>Dear ${name},</p>
        <p>Thank you for your interest in the Vocal Excellence Summer Workshop 2025. As requested, here is the detailed information about our workshop.</p>
        
        <div class="info-section">
          <h3>Workshop Details</h3>
          <p>Our intensive 5-day workshop runs from July 14-18, 2025 in Limassol, Cyprus. With world-class instructors and a limited enrollment of 20 participants, this is an unparalleled opportunity to develop your vocal technique, performance skills, and artistic expression.</p>
        </div>
        
        <div class="info-section">
          <h3>Curriculum Highlights</h3>
          <ul>
            <li>Daily vocal masterclasses with renowned faculty</li>
            <li>Alexander technique for performers</li>
            <li>Acting workshops for singers</li>
            <li>Individual coaching sessions</li>
            <li>Ensemble and choir rehearsals</li>
            <li>Final showcase concert</li>
          </ul>
        </div>
        
        <div class="info-section">
          <h3>Application Information</h3>
          <p>Tuition: €500 (Early application discount: €75 off before April 30)</p>
          <p>Application deadline: May 15, 2025</p>
          <p>Scholarships: Available based on merit and need</p>
        </div>
        
        <p style="text-align: center; margin: 30px 0;">
          <a href="https://vocalexcellence.org/apply" class="button">Apply Now</a>
        </p>
        
        <p>If you have any further questions, please don't hesitate to contact us at info@vocalexcellence.com.</p>
        
        <p>Best regards,<br>The Vocal Excellence Team</p>
      </div>
      <div class="footer">
        <p>&copy; 2025 Vocal Excellence Summer Workshop. All rights reserved.</p>
        <p>Limassol, Cyprus</p>
      </div>
    </body>
    </html>
  `;
}

function getSimpleAdminNotificationTemplate(name: string, applicantEmail: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Application Submission</title>
      <style>
        body { 
          font-family: 'Helvetica', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(to right, #4f46e5, #7c3aed);
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .content {
          background-color: #f9fafb;
          padding: 30px;
          border-radius: 0 0 8px 8px;
          border: 1px solid #e5e7eb;
          border-top: none;
        }
        h1 { color: #4f46e5; margin-top: 0; }
        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: #6b7280;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>New Application Submission</h2>
      </div>
      <div class="content">
        <h1>New Application Received</h1>
        <p>A new application has been submitted to the Vocal Excellence Summer Workshop.</p>
        <p><strong>Applicant Details:</strong></p>
        <ul>
          <li>Name: ${name}</li>
          <li>Email: ${applicantEmail}</li>
        </ul>
        <p>Please log in to the admin dashboard to review the complete application or email info@vocalexcellence.cy.</p>
      </div>
      <div class="footer">
        <p>&copy; 2025 Vocal Excellence Summer Workshop. All rights reserved.</p>
        <p>Limassol, Cyprus</p>
      </div>
    </body>
    </html>
  `;
}

function getDetailedAdminNotificationTemplate(applicantData: any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>**Vocal Excellence Summer Workshop** New Application Submission</title>
      <style>
        body { 
          font-family: 'Helvetica', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(to right, #4f46e5, #7c3aed);
          color: white;
          padding: 25px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .content {
          background-color: #f9fafb;
          padding: 30px;
          border-radius: 0 0 8px 8px;
          border: 1px solid #e5e7eb;
          border-top: none;
        }
        h1 { color: #4f46e5; margin-top: 0; font-size: 26px; }
        h2 { color: #6d28d9; font-size: 22px; margin-top: 30px; }
        .section {
          margin-bottom: 25px;
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .field {
          margin-bottom: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid #f3f4f6;
        }
        .field-label {
          font-weight: bold;
          color: #4f46e5;
          display: block;
          margin-bottom: 4px;
        }
        .field-value {
          color: #374151;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: #6b7280;
        }
        .file-notice {
          margin-top: 20px;
          padding: 15px;
          background-color: #f0f9ff;
          border-left: 4px solid #38bdf8;
          border-radius: 4px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>**Vocal Excellence Summer Workshop** New Application Submission</h2>
      </div>
      <div class="content">
        <h1>Complete Application Details</h1>
        <p>A new application has been submitted to the Vocal Excellence Summer Workshop with the following details:</p>
        
        <div class="section">
          <h2>Personal Information</h2>
          <div class="field">
            <div class="field-label">Full Name</div>
            <div class="field-value">${applicantData.firstName} ${applicantData.lastName}</div>
          </div>
          <div class="field">
            <div class="field-label">Email Address</div>
            <div class="field-value">${applicantData.email}</div>
          </div>
          <div class="field">
            <div class="field-label">Phone Number</div>
            <div class="field-value">${applicantData.phone}</div>
          </div>
          <div class="field">
            <div class="field-label">Date of Birth</div>
            <div class="field-value">${applicantData.dateOfBirth}</div>
          </div>
          <div class="field">
            <div class="field-label">Nationality</div>
            <div class="field-value">${applicantData.nationality}</div>
          </div>
          <div class="field">
            <div class="field-label">Address</div>
            <div class="field-value">
              ${applicantData.address}<br>
              ${applicantData.city}, ${applicantData.country}<br>
              ${applicantData.postalCode}
            </div>
          </div>
        </div>
        
        <div class="section">
          <h2>Musical Background</h2>
          <div class="field">
            <div class="field-label">Vocal Range</div>
            <div class="field-value">${applicantData.vocalRange}</div>
          </div>
          <div class="field">
            <div class="field-label">Years of Experience</div>
            <div class="field-value">${applicantData.yearsOfExperience}</div>
          </div>
          <div class="field">
            <div class="field-label">Musical Background</div>
            <div class="field-value">${applicantData.musicalBackground}</div>
          </div>
          <div class="field">
            <div class="field-label">Teacher Information</div>
            <div class="field-value">
              ${applicantData.teacherName ? `Name: ${applicantData.teacherName}<br>` : ''}
              ${applicantData.teacherEmail ? `Email: ${applicantData.teacherEmail}` : 'Not provided'}
            </div>
          </div>
          <div class="field">
            <div class="field-label">Performance Experience</div>
            <div class="field-value">${applicantData.performanceExperience}</div>
          </div>
        </div>
        
        <div class="section">
          <h2>Workshop Application</h2>
          <div class="field">
            <div class="field-label">Reason for Applying</div>
            <div class="field-value">${applicantData.reasonForApplying}</div>
          </div>
          <div class="field">
            <div class="field-label">How They Heard About Us</div>
            <div class="field-value">${applicantData.heardAboutUs}</div>
          </div>
          <div class="field">
            <div class="field-label">Scholarship Interest</div>
            <div class="field-value">${applicantData.scholarshipInterest ? 'Yes' : 'No'}</div>
          </div>
          <div class="field">
            <div class="field-label">Special Needs or Accommodations</div>
            <div class="field-value">${applicantData.specialNeeds || 'None specified'}</div>
          </div>
        </div>
        
        <div class="section">
          <h2>Supporting Materials</h2>
          <div class="file-notice">
            <strong>Note:</strong> Supporting materials (audition recordings, CV, recommendation letter)
            are attached to this email. If you don't see the attachments, they may be available in your
            Supabase storage under the application files bucket. Contact info@vocalexcellence.cy for help.
          </div>
        </div>
      </div>
      <div class="footer">
        <p>&copy; 2025 Vocal Excellence Summer Workshop. All rights reserved.</p>
        <p>Limassol, Cyprus</p>
      </div>
    </body>
    </html>
  `;
}
