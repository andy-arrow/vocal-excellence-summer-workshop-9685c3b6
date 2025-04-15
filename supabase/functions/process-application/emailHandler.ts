
import { Resend } from "npm:resend@2.0.0";
import { ApplicationData } from "./types.ts";

export class EmailHandler {
  private resend: Resend;

  constructor(apiKey: string) {
    this.resend = new Resend(apiKey);
    console.log("EmailHandler initialized");
  }

  async sendNotifications(
    applicationData: ApplicationData, 
    fileAttachments: { filename: string; content: Uint8Array; type: string }[] = []
  ) {
    try {
      console.log("Sending email notifications");
      
      if (!this.resend) {
        throw new Error("Resend client not initialized");
      }
      
      // Log RESEND_API_KEY value (masked) to verify it's set
      const apiKey = Deno.env.get("RESEND_API_KEY") || "";
      console.log("RESEND_API_KEY available:", apiKey ? "Yes (masked)" : "No");
      
      // Prepare attachments for email
      const formattedAttachments = fileAttachments.map(attachment => ({
        filename: attachment.filename,
        content: attachment.content
      }));
      
      console.log(`Prepared ${formattedAttachments.length} attachments for email`);
      
      // Send admin notification
      await this.sendAdminNotification(applicationData, formattedAttachments);
      console.log("Admin notification email sent successfully");
      
      // Send applicant confirmation
      await this.sendApplicantConfirmation(applicationData);
      console.log("Applicant confirmation email sent successfully");
    } catch (error) {
      console.error("Error sending email notifications:", error);
      throw error;
    }
  }

  private async sendAdminNotification(
    applicationData: ApplicationData,
    attachments: { filename: string; content: Uint8Array }[]
  ) {
    try {
      console.log("Preparing admin notification email");
      const adminEmailHtml = this.getDetailedAdminNotificationTemplate(applicationData);
      
      console.log("Sending admin email to: aroditis.andreas@gmail.com");
      console.log("File attachments:", attachments.map(f => f.filename).join(", ") || "None");
      
      const result = await this.resend.emails.send({
        from: "Vocal Excellence <onboarding@resend.dev>", // Changed to use Resend's default domain
        to: ["aroditis.andreas@gmail.com"],
        subject: "**Vocal Excellence** New Application Submission",
        html: adminEmailHtml,
        attachments: attachments,
      });
      
      console.log("Admin email send result:", result);
      return result;
    } catch (error) {
      console.error("Error sending admin notification email:", error);
      throw error;
    }
  }

  private async sendApplicantConfirmation(applicationData: ApplicationData) {
    try {
      console.log("Preparing applicant confirmation email");
      const applicantEmailHtml = this.getApplicationConfirmationTemplate(applicationData.firstName);
      
      console.log("Sending confirmation email to:", applicationData.email);
      
      const result = await this.resend.emails.send({
        from: "Vocal Excellence <onboarding@resend.dev>", // Changed to use Resend's default domain
        to: [applicationData.email],
        subject: "Application Received - Vocal Excellence Summer Programme",
        html: applicantEmailHtml
      });
      
      console.log("Applicant email send result:", result);
      return result;
    } catch (error) {
      console.error("Error sending applicant confirmation email:", error);
      throw error;
    }
  }

  private getDetailedAdminNotificationTemplate(applicationData: ApplicationData): string {
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
            <div class="field-value">${applicationData.firstName} ${applicationData.lastName}</div>
          </div>
          <div class="field">
            <div class="field-label">Email Address</div>
            <div class="field-value">${applicationData.email}</div>
          </div>
          <div class="field">
            <div class="field-label">Phone Number</div>
            <div class="field-value">${applicationData.phone}</div>
          </div>
          <div class="field">
            <div class="field-label">Date of Birth</div>
            <div class="field-value">${applicationData.dateOfBirth}</div>
          </div>
          <div class="field">
            <div class="field-label">Nationality</div>
            <div class="field-value">${applicationData.nationality}</div>
          </div>
          <div class="field">
            <div class="field-label">Address</div>
            <div class="field-value">
              ${applicationData.address}<br>
              ${applicationData.city}, ${applicationData.country}<br>
              ${applicationData.postalCode}
            </div>
          </div>
        </div>
        
        <div class="section">
          <h2>Musical Background</h2>
          <div class="field">
            <div class="field-label">Vocal Range</div>
            <div class="field-value">${applicationData.vocalRange}</div>
          </div>
          <div class="field">
            <div class="field-label">Years of Experience</div>
            <div class="field-value">${applicationData.yearsOfExperience}</div>
          </div>
          <div class="field">
            <div class="field-label">Musical Background</div>
            <div class="field-value">${applicationData.musicalBackground}</div>
          </div>
          <div class="field">
            <div class="field-label">Teacher Information</div>
            <div class="field-value">
              ${applicationData.teacherName ? `Name: ${applicationData.teacherName}<br>` : ''}
              ${applicationData.teacherEmail ? `Email: ${applicationData.teacherEmail}` : 'Not provided'}
            </div>
          </div>
          <div class="field">
            <div class="field-label">Performance Experience</div>
            <div class="field-value">${applicationData.performanceExperience}</div>
          </div>
        </div>
        
        <div class="section">
          <h2>Programme Application</h2>
          <div class="field">
            <div class="field-label">Reason for Applying</div>
            <div class="field-value">${applicationData.reasonForApplying}</div>
          </div>
          <div class="field">
            <div class="field-label">How They Heard About Us</div>
            <div class="field-value">${applicationData.heardAboutUs}</div>
          </div>
          <div class="field">
            <div class="field-label">Scholarship Interest</div>
            <div class="field-value">${applicationData.scholarshipInterest ? 'Yes' : 'No'}</div>
          </div>
          <div class="field">
            <div class="field-label">Special Needs or Accommodations</div>
            <div class="field-value">${applicationData.specialNeeds || 'None specified'}</div>
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

  private getApplicationConfirmationTemplate(firstName: string): string {
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
        <p>Dear ${firstName},</p>
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
}
