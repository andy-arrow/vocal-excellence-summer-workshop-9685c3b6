
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, email, name, actionUrl } = await req.json();
    let subject, htmlContent;

    // Determine which template to use based on the type
    switch (type) {
      case "welcome":
        subject = "Welcome to Vocal Excellence Summer Programme";
        htmlContent = getWelcomeEmailTemplate(name);
        break;
      case "magic_link":
        subject = "Your Magic Link to Sign In";
        htmlContent = getMagicLinkEmailTemplate(name, actionUrl);
        break;
      case "password_reset":
        subject = "Reset Your Password";
        htmlContent = getPasswordResetEmailTemplate(name, actionUrl);
        break;
      case "application_confirmation":
        subject = "Application Received - Vocal Excellence Summer Programme";
        htmlContent = getApplicationConfirmationTemplate(name);
        break;
      case "information_request":
        subject = "Your Requested Information - Vocal Excellence Summer Programme";
        htmlContent = getInformationRequestTemplate(name);
        break;
      default:
        throw new Error("Invalid email template type");
    }

    const emailResponse = await resend.emails.send({
      from: "Vocal Excellence <noreply@vocalexcellence.org>",
      to: [email],
      subject: subject,
      html: htmlContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});

// Email template functions
function getWelcomeEmailTemplate(name: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Welcome to Vocal Excellence Summer Programme</title>
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
        <h2>Vocal Excellence Summer Programme</h2>
      </div>
      <div class="content">
        <h1>Welcome, ${name}!</h1>
        <p>Thank you for creating an account with the Vocal Excellence Summer Programme. We're delighted to have you join us.</p>
        <p>Your account is now active, and you can access our platform to manage your applications and programme content.</p>
        <p>If you have any questions or need assistance, please contact us at support@vocalexcellence.org.</p>
        <p>Best regards,<br>The Vocal Excellence Team</p>
      </div>
      <div class="footer">
        <p>&copy; 2025 Vocal Excellence Summer Programme. All rights reserved.</p>
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
        <h2>Vocal Excellence Summer Programme</h2>
      </div>
      <div class="content">
        <h1>Sign in to your account</h1>
        <p>Hello${name ? ` ${name}` : ''},</p>
        <p>Click the button below to sign in to your Vocal Excellence Summer Programme account. This link is valid for the next 24 hours.</p>
        <p style="text-align: center;">
          <a href="${actionUrl}" class="button">Sign In to Your Account</a>
        </p>
        <p>If you didn't request this email, you can safely ignore it.</p>
        <p>Best regards,<br>The Vocal Excellence Team</p>
      </div>
      <div class="footer">
        <p>&copy; 2025 Vocal Excellence Summer Programme. All rights reserved.</p>
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
        <h2>Vocal Excellence Summer Programme</h2>
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
        <p>&copy; 2025 Vocal Excellence Summer Programme. All rights reserved.</p>
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
      <title>Application Received - Vocal Excellence Summer Programme</title>
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
        <h2>Vocal Excellence Summer Programme</h2>
      </div>
      <div class="content">
        <h1>Application Received</h1>
        <p>Dear ${name},</p>
        <p>Thank you for applying to the Vocal Excellence Summer Programme 2025. We have successfully received your application.</p>
        
        <p>Here's what happens next:</p>
        <ul class="steps">
          <li>Our selection committee will review your application within 10 business days</li>
          <li>You may be contacted for a brief interview or additional materials</li>
          <li>Final selections will be made by June 1, 2025</li>
          <li>All applicants will be notified of their status by email</li>
        </ul>
        
        <p>If you have any questions or need to update your application, please contact us at applications@vocalexcellence.org.</p>
        
        <p>Best regards,<br>The Vocal Excellence Admissions Team</p>
      </div>
      <div class="footer">
        <p>&copy; 2025 Vocal Excellence Summer Programme. All rights reserved.</p>
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
      <title>Your Requested Information - Vocal Excellence Summer Programme</title>
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
        <h2>Vocal Excellence Summer Programme</h2>
      </div>
      <div class="content">
        <h1>Your Requested Information</h1>
        <p>Dear ${name},</p>
        <p>Thank you for your interest in the Vocal Excellence Summer Programme 2025. As requested, here is the detailed information about our programme.</p>
        
        <div class="info-section">
          <h3>Programme Details</h3>
          <p>Our intensive 5-day programme runs from July 14-18, 2025 in Limassol, Cyprus. With world-class instructors and a limited enrollment of 20 participants, this is an unparalleled opportunity to develop your vocal technique, performance skills, and artistic expression.</p>
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
        
        <p>If you have any further questions, please don't hesitate to contact us at info@vocalexcellence.org.</p>
        
        <p>Best regards,<br>The Vocal Excellence Team</p>
      </div>
      <div class="footer">
        <p>&copy; 2025 Vocal Excellence Summer Programme. All rights reserved.</p>
        <p>Limassol, Cyprus</p>
      </div>
    </body>
    </html>
  `;
}
