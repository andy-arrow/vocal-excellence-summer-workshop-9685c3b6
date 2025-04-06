
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
        <p>Your account is now active, and you can access our admin platform to review applications and manage programme content.</p>
        <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
        <p>Best regards,<br>The Vocal Excellence Team</p>
      </div>
      <div class="footer">
        <p>&copy; 2025 Vocal Excellence Summer Programme. All rights reserved.</p>
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
      </div>
    </body>
    </html>
  `;
}
