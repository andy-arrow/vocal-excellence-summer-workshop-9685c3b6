
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { supabase } from "./supabaseClient.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-csrf-token",
};

// Rate limiting using a simple in-memory store
const rateLimitStore = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000; // 24 hours
const MAX_REQUESTS = 2; // Maximum 2 submissions per 24 hours

const checkRateLimit = (email: string): boolean => {
  const now = Date.now();
  const userLimit = rateLimitStore.get(email);

  if (!userLimit) {
    rateLimitStore.set(email, { count: 1, timestamp: now });
    return true;
  }

  if (now - userLimit.timestamp > RATE_LIMIT_WINDOW) {
    // Reset if window has passed
    rateLimitStore.set(email, { count: 1, timestamp: now });
    return true;
  }

  if (userLimit.count >= MAX_REQUESTS) {
    return false;
  }

  userLimit.count++;
  return true;
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate CSRF token
    const csrfToken = req.headers.get("x-csrf-token");
    if (!csrfToken) {
      throw new Error("Missing CSRF token");
    }

    // Parse the request body
    const formData = await req.formData();
    
    // Get the CSRF token from the form data and verify it matches the header
    const formCsrfToken = formData.get("csrfToken");
    if (!formCsrfToken || formCsrfToken !== csrfToken) {
      throw new Error("Invalid CSRF token");
    }
    
    const applicationData = JSON.parse(formData.get("applicationData") as string);

    // Rate limiting check
    if (!checkRateLimit(applicationData.email)) {
      return new Response(
        JSON.stringify({
          error: "Rate limit exceeded. Please try again later.",
        }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Extract form fields
    const applicantEmail = applicationData.email;
    const applicantName = `${applicationData.firstName} ${applicationData.lastName}`;
    
    // Process files - convert to array to handle multiple files
    const files = [];
    let audioFile1, audioFile2, cvFile, recommendationFile;
    
    // Check for audio files
    if (formData.has("audioFile1")) {
      audioFile1 = formData.get("audioFile1") as File;
      files.push({
        name: "audioFile1",
        file: audioFile1,
        type: "audio"
      });
    }
    
    if (formData.has("audioFile2")) {
      audioFile2 = formData.get("audioFile2") as File;
      files.push({
        name: "audioFile2",
        file: audioFile2,
        type: "audio"
      });
    }
    
    // Check for CV file
    if (formData.has("cvFile")) {
      cvFile = formData.get("cvFile") as File;
      files.push({
        name: "cvFile",
        file: cvFile,
        type: "document"
      });
    }
    
    // Check for recommendation letter
    if (formData.has("recommendationFile")) {
      recommendationFile = formData.get("recommendationFile") as File;
      files.push({
        name: "recommendationFile",
        file: recommendationFile,
        type: "document"
      });
    }

    // 1. Store application data in Supabase
    const { data: applicationRecord, error: dbError } = await supabase
      .from('applications')
      .insert([
        {
          firstname: applicationData.firstName,
          lastname: applicationData.lastName,
          email: applicationData.email,
          phone: applicationData.phone,
          dateofbirth: applicationData.dateOfBirth,
          nationality: applicationData.nationality,
          address: applicationData.address,
          city: applicationData.city,
          country: applicationData.country,
          postalcode: applicationData.postalCode,
          vocalrange: applicationData.vocalRange,
          yearsofexperience: applicationData.yearsOfExperience,
          musicalbackground: applicationData.musicalBackground,
          teachername: applicationData.teacherName || null,
          teacheremail: applicationData.teacherEmail || null,
          performanceexperience: applicationData.performanceExperience,
          reasonforapplying: applicationData.reasonForApplying,
          heardaboutus: applicationData.heardAboutUs,
          scholarshipinterest: applicationData.scholarshipInterest,
          specialneeds: applicationData.specialNeeds || null,
          termsagreed: applicationData.termsAgreed,
          timestamp: new Date().toISOString(),
          source: formData.get("source") as string || "website",
        }
      ])
      .select();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error(`Failed to store application data: ${dbError.message}`);
    }

    const applicationId = applicationRecord[0].id;
    console.log("Application ID:", applicationId);
    
    // 2. Upload files to Supabase Storage
    const uploadedFiles = [];
    const fileAttachments = [];
    
    // Create the bucket if it doesn't exist
    const { data: bucketData, error: bucketError } = await supabase.storage
      .getBucket('application_materials');
    
    if (bucketError && bucketError.message.includes('not found')) {
      await supabase.storage.createBucket('application_materials', {
        public: false,
      });
    }
    
    // Upload each file
    for (const fileObj of files) {
      if (!fileObj.file) continue;
      
      const fileExt = fileObj.file.name.split('.').pop();
      const filePath = `${applicationId}/${fileObj.name}.${fileExt}`;
      
      // Convert File to ArrayBuffer for upload
      const arrayBuffer = await fileObj.file.arrayBuffer();
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('application_materials')
        .upload(filePath, arrayBuffer, {
          contentType: fileObj.file.type,
          upsert: true
        });
      
      if (uploadError) {
        console.error(`Error uploading ${fileObj.name}:`, uploadError);
      } else {
        uploadedFiles.push({
          name: fileObj.name,
          path: filePath,
          type: fileObj.type
        });
        
        // Create file attachment for email
        const fileContent = new Uint8Array(arrayBuffer);
        fileAttachments.push({
          filename: fileObj.file.name,
          content: fileContent
        });
      }
    }
    
    // 3. Send emails using Resend
    // A. Admin notification with all application details and attachments
    const adminEmailHtml = getDetailedAdminNotificationTemplate(applicationData);
    
    const adminEmailResult = await resend.emails.send({
      from: "Vocal Excellence <noreply@vocalexcellence.org>",
      to: ["aroditis.andreas@gmail.com"],
      subject: "**Vocal Excellence** New Application Submission",
      html: adminEmailHtml,
      attachments: fileAttachments,
    });
    
    // B. Confirmation email to the applicant
    const applicantEmailHtml = getApplicationConfirmationTemplate(applicationData.firstName);
    
    const applicantEmailResult = await resend.emails.send({
      from: "Vocal Excellence <noreply@vocalexcellence.org>",
      to: [applicantEmail],
      subject: "Application Received - Vocal Excellence Summer Programme",
      html: applicantEmailHtml
    });
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Application processed successfully",
        applicationId: applicationId,
        uploadedFiles: uploadedFiles,
        adminEmail: adminEmailResult,
        applicantEmail: applicantEmailResult
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
        error: error.message
      }),
      {
        status: error.message.includes("Rate limit") ? 429 : 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    );
  }
});

// Email template for administrator with detailed application information
function getDetailedAdminNotificationTemplate(applicantData: any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>**Vocal Excellence** New Application Submission</title>
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
        <h2>**Vocal Excellence** New Application Submission</h2>
      </div>
      <div class="content">
        <h1>Complete Application Details</h1>
        <p>A new application has been submitted to the Vocal Excellence Summer Programme with the following details:</p>
        
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
          <h2>Programme Application</h2>
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
            are attached to this email.
          </div>
        </div>
      </div>
      <div class="footer">
        <p>&copy; 2025 Vocal Excellence Summer Programme. All rights reserved.</p>
        <p>Limassol, Cyprus</p>
      </div>
    </body>
    </html>
  `;
}

// Email template for applicant confirmation
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
