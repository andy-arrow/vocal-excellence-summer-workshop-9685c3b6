import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { supabase } from "./supabaseClient.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-csrf-token",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS"
};

serve(async (req) => {
  console.log("Process-application function invoked");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS preflight request");
    return new Response(null, { 
      status: 204, 
      headers: corsHeaders 
    });
  }

  try {
    console.log("Process-application: Function invoked");
    
    // Parse the request body
    let formData;
    let applicationData;
    let source = "website";
    let directInsert = false;
    
    // Check if the request is a FormData request or a JSON request
    const contentType = req.headers.get("content-type") || "";
    
    if (contentType.includes("multipart/form-data")) {
      console.log("Process-application: Processing multipart/form-data request");
      try {
        // Parse form data
        formData = await req.formData();
        const appDataStr = formData.get("applicationData");
        console.log("applicationData as string:", appDataStr);
        
        if (typeof appDataStr === 'string') {
          applicationData = JSON.parse(appDataStr);
        } else {
          throw new Error("Invalid applicationData format");
        }
        
        source = formData.get("source") as string || "website";
        
        // CSRF validation is skipped intentionally for permissiveness
      } catch (formError) {
        console.error("Form data parsing error:", formError);
        throw new Error(`Failed to parse form data: ${formError.message}`);
      }
    } else {
      console.log("Process-application: Processing JSON request");
      try {
        // Parse JSON data
        const json = await req.json();
        applicationData = typeof json.applicationData === 'string' 
          ? JSON.parse(json.applicationData) 
          : json.applicationData;
        source = json.source || "website";
        directInsert = json.directInsert || false;
      } catch (jsonError) {
        console.error("JSON parsing error:", jsonError);
        throw new Error(`Failed to parse JSON: ${jsonError.message}`);
      }
    }

    const applicantEmail = applicationData.email;
    const applicantName = `${applicationData.firstName} ${applicationData.lastName}`;
    
    console.log("Processing application for:", applicantName, applicantEmail);

    // Process files if there are any
    const files = [];
    let audioFile1, audioFile2, cvFile, recommendationFile;
    
    if (formData) {
      console.log("Checking for uploaded files");
      
      // Check for audio files
      if (formData.has("audioFile1")) {
        audioFile1 = formData.get("audioFile1") as File;
        console.log("Found audioFile1:", audioFile1.name, audioFile1.size);
        files.push({
          name: "audioFile1",
          file: audioFile1,
          type: "audio"
        });
      }
      
      if (formData.has("audioFile2")) {
        audioFile2 = formData.get("audioFile2") as File;
        console.log("Found audioFile2:", audioFile2.name, audioFile2.size);
        files.push({
          name: "audioFile2",
          file: audioFile2,
          type: "audio"
        });
      }
      
      // Check for CV file
      if (formData.has("cvFile")) {
        cvFile = formData.get("cvFile") as File;
        console.log("Found cvFile:", cvFile.name, cvFile.size);
        files.push({
          name: "cvFile",
          file: cvFile,
          type: "document"
        });
      }
      
      // Check for recommendation letter
      if (formData.has("recommendationFile")) {
        recommendationFile = formData.get("recommendationFile") as File;
        console.log("Found recommendationFile:", recommendationFile.name, recommendationFile.size);
        files.push({
          name: "recommendationFile",
          file: recommendationFile,
          type: "document"
        });
      }
      
      console.log(`Total files found: ${files.length}`);
    }

    // 1. Store application data in Supabase
    // Using the service role key in the edge function to bypass RLS
    const formData = {
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
      source: source,
    };
    
    console.log("Inserting application data for:", { 
      name: formData.firstname + " " + formData.lastname,
      email: formData.email
    });

    const { data: applicationRecord, error: dbError } = await supabase
      .from('applications')
      .insert([formData])
      .select();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error(`Failed to store application data: ${dbError.message}`);
    }

    const applicationId = applicationRecord[0].id;
    console.log("Application saved with ID:", applicationId);
    
    // 2. Upload files to Supabase Storage if we have any
    const uploadedFiles = [];
    const fileAttachments = [];
    
    if (files.length > 0) {
      console.log(`Processing ${files.length} files for upload`);
      
      // Create the bucket if it doesn't exist
      try {
        const { data: bucketData, error: bucketError } = await supabase.storage
          .getBucket('application_materials');
        
        if (bucketError) {
          console.log("Bucket does not exist, creating:", bucketError);
          await supabase.storage.createBucket('application_materials', {
            public: true, // Make bucket public to ensure maximum permissiveness
          });
        } else {
          console.log("Bucket exists:", bucketData);
        }
      } catch (bucketError) {
        console.error("Error checking/creating bucket:", bucketError);
        // Continue even if bucket check fails
      }
      
      // Upload each file
      for (const fileObj of files) {
        if (!fileObj.file) {
          console.log(`Skipping empty file: ${fileObj.name}`);
          continue;
        }
        
        try {
          const fileExt = fileObj.file.name.split('.').pop();
          const filePath = `${applicationId}/${fileObj.name}.${fileExt}`;
          
          console.log(`Uploading ${fileObj.name} to ${filePath}`);
          
          // Convert File to ArrayBuffer for upload
          const arrayBuffer = await fileObj.file.arrayBuffer();
          
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('application_materials')
            .upload(filePath, arrayBuffer, {
              contentType: fileObj.file.type,
              upsert: true // Set to true to allow overwriting
            });
          
          if (uploadError) {
            console.error(`Error uploading ${fileObj.name}:`, uploadError);
            // Continue with the process even if a file upload fails
          } else {
            console.log(`Successfully uploaded ${fileObj.name} to ${filePath}`);
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
        } catch (fileError) {
          console.error(`Error processing file ${fileObj.name}:`, fileError);
          // Continue with next file
        }
      }
      
      console.log(`Successfully uploaded ${uploadedFiles.length} files out of ${files.length}`);
    }
    
    // 3. Send emails using Resend - but continue the process even if email sending fails
    try {
      console.log("Attempting to send email notifications");
      
      // A. Admin notification with all application details and attachments
      const adminEmailHtml = getDetailedAdminNotificationTemplate(applicationData);
      
      await resend.emails.send({
        from: "Vocal Excellence <noreply@vocalexcellence.org>",
        to: ["aroditis.andreas@gmail.com"],
        subject: "**Vocal Excellence** New Application Submission",
        html: adminEmailHtml,
        attachments: fileAttachments,
      });
      
      console.log("Admin notification email sent successfully");
      
      // B. Confirmation email to the applicant
      const applicantEmailHtml = getApplicationConfirmationTemplate(applicationData.firstName);
      
      await resend.emails.send({
        from: "Vocal Excellence <noreply@vocalexcellence.org>",
        to: [applicantEmail],
        subject: "Application Received - Vocal Excellence Summer Programme",
        html: applicantEmailHtml
      });
      
      console.log("Applicant confirmation email sent successfully");
    } catch (emailError) {
      console.error("Error sending email notifications:", emailError);
      // Don't throw here, we still want to return success for the submission
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Application processed successfully",
        applicationId: applicationId,
        uploadedFiles: uploadedFiles.length > 0 ? uploadedFiles : undefined
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
        status: 500,
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
