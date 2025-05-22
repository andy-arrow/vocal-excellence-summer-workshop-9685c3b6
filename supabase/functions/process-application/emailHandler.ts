import { Resend } from "npm:resend@2.0.0";
import { ApplicationData } from "./types.ts";

export class EmailHandler {
  private resend: Resend;
  private readonly fromEmail: string = "Vocal Excellence <info@vocalexcellence.cy>";
  private readonly adminEmail: string = "info@vocalexcellence.cy";

  constructor(apiKey: string) {
    if (!apiKey) {
      console.error("EmailHandler initialized with empty API key");
      throw new Error("EmailHandler requires a valid API key");
    }
    
    this.resend = new Resend(apiKey);
    console.log("EmailHandler initialized with API key");
  }

  /**
   * Send all notification emails with retry logic
   */
  async sendNotifications(
    applicationData: ApplicationData, 
    fileAttachments: { filename: string; content: Uint8Array; type: string }[] = []
  ) {
    try {
      console.log("Starting email notification process");
      
      if (!this.resend) {
        throw new Error("Resend client not initialized");
      }
      
      // Log RESEND_API_KEY value (masked) to verify it's set
      const apiKey = Deno.env.get("RESEND_API_KEY") || "";
      console.log("RESEND_API_KEY available:", apiKey ? "Yes (masked)" : "No");
      
      // Handle missing email which is a common issue
      if (!applicationData.email) {
        console.error("Application is missing email address, cannot send applicant confirmation");
        // Still try to send admin notification
        const adminResult = await this.sendWithRetry(() => 
          this.sendAdminNotification(applicationData, fileAttachments)
        );
        console.log("Admin notification email result:", adminResult ? "Success" : "Failed");
        
        if (!adminResult) {
          throw new Error("Failed to send admin notification and applicant email is missing");
        } else {
          console.log("Admin notification sent, but applicant email was missing");
          return true;
        }
      }
      
      // Prepare attachments for email
      const formattedAttachments = fileAttachments.map(attachment => ({
        filename: attachment.filename,
        content: attachment.content
      }));
      
      console.log(`Prepared ${formattedAttachments.length} attachments for email`);
      
      // Send admin notification with retry logic
      const adminResult = await this.sendWithRetry(() => 
        this.sendAdminNotification(applicationData, formattedAttachments)
      );
      console.log("Admin notification email result:", adminResult ? "Success" : "Failed");
      
      // Send applicant confirmation with retry logic
      const applicantResult = await this.sendWithRetry(() =>  
        this.sendApplicantConfirmation(applicationData)
      );
      console.log("Applicant confirmation email result:", applicantResult ? "Success" : "Failed");
      
      // If both emails failed, try one more time with direct API fallback
      if (!adminResult && !applicantResult) {
        console.log("Both emails failed, trying direct API fallback");
        
        // Final fallback for admin
        try {
          const adminFallbackResult = await this.fallbackDirectSend(
            this.adminEmail,
            "**Vocal Excellence** New Application Submission",
            this.getAdminFallbackTemplate(applicationData)
          );
          console.log("Admin fallback result:", adminFallbackResult ? "Success" : "Failed");
        } catch (adminFallbackError) {
          console.error("Admin fallback email failed:", adminFallbackError);
        }
        
        // Final fallback for applicant
        if (applicationData.email) {
          try {
            const applicantFallbackResult = await this.fallbackDirectSend(
              applicationData.email,
              "Application Received - Vocal Excellence Summer Programme",
              this.getApplicantFallbackTemplate(applicationData.firstName)
            );
            console.log("Applicant fallback result:", applicantFallbackResult ? "Success" : "Failed");
          } catch (applicantFallbackError) {
            console.error("Applicant fallback email failed:", applicantFallbackError);
          }
        }
        
        throw new Error("Both primary email methods failed, attempted fallback send");
      }
      
      return true;
    } catch (error) {
      console.error("Error in email notification process:", error);
      throw error;
    }
  }

  /**
   * Helper method to retry email sending operations
   */
  private async sendWithRetry(
    sendFn: () => Promise<any>, 
    maxRetries: number = 3,
    initialBackoffMs: number = 1000
  ): Promise<boolean> {
    let retries = 0;
    let backoffMs = initialBackoffMs;
    
    while (retries <= maxRetries) {
      try {
        await sendFn();
        return true;
      } catch (error) {
        console.error(`Email sending failed (attempt ${retries + 1}/${maxRetries + 1}):`, error);
        retries++;
        
        if (retries <= maxRetries) {
          console.log(`Retrying in ${backoffMs}ms...`);
          await new Promise(resolve => setTimeout(resolve, backoffMs));
          backoffMs *= 2; // Exponential backoff
        } else {
          console.error("All retry attempts failed");
          return false;
        }
      }
    }
    
    return false;
  }

  /**
   * Send admin notification email
   */
  private async sendAdminNotification(
    applicationData: ApplicationData,
    attachments: { filename: string; content: Uint8Array }[] = []
  ) {
    try {
      console.log("Preparing admin notification email");
      
      if (!this.adminEmail) {
        throw new Error("Admin email address is not configured");
      }
      
      const adminEmailHtml = this.getDetailedAdminNotificationTemplate(applicationData);
      
      console.log(`Sending admin email to: ${this.adminEmail}`);
      console.log("File attachments:", attachments.map(f => f.filename).join(", ") || "None");
      
      const result = await this.resend.emails.send({
        from: this.fromEmail,
        to: [this.adminEmail],
        subject: "**Vocal Excellence** New Application Submission",
        html: adminEmailHtml,
        attachments: attachments.length > 0 ? attachments : undefined,
      });
      
      console.log("Admin email send result:", result);
      return result;
    } catch (error) {
      console.error("Error sending admin notification email:", error);
      throw error;
    }
  }

  /**
   * Send applicant confirmation email
   */
  private async sendApplicantConfirmation(applicationData: ApplicationData) {
    try {
      console.log("Preparing applicant confirmation email");
      
      if (!applicationData.email) {
        throw new Error("Applicant email address is missing");
      }
      
      const applicantEmailHtml = this.getApplicationConfirmationTemplate(applicationData.firstName);
      
      console.log("Sending confirmation email to:", applicationData.email);
      
      const result = await this.resend.emails.send({
        from: this.fromEmail,
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

  /**
   * Fallback method using direct API call when Resend client fails
   */
  private async fallbackDirectSend(
    to: string,
    subject: string,
    htmlContent: string
  ): Promise<boolean> {
    try {
      console.log(`Attempting fallback email send to ${to}`);
      
      const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
      
      if (!RESEND_API_KEY) {
        throw new Error("Missing API key for fallback email");
      }
      
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: this.fromEmail,
          to: [to],
          subject: subject,
          html: htmlContent
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Fallback email API error (${response.status}): ${errorText}`);
        return false;
      }
      
      const result = await response.json();
      console.log("Fallback email send result:", result);
      return true;
    } catch (error) {
      console.error("Error in fallback email sending:", error);
      return false;
    }
  }
  
  /**
   * Simple fallback template for admin notification
   */
  private getAdminFallbackTemplate(applicationData: ApplicationData): string {
    const safeData = {
      firstName: applicationData.firstName || 'Unknown',
      lastName: applicationData.lastName || 'Applicant',
      email: applicationData.email || 'No email provided',
      phone: applicationData.phone || 'No phone provided'
    };
    
    return `
      <div style="font-family: Arial, sans-serif;">
        <h1>New Application Submission</h1>
        <p>A new application has been received from ${safeData.firstName} ${safeData.lastName}.</p>
        <p>Email: ${safeData.email}</p>
        <p>Phone: ${safeData.phone}</p>
        <p>Please check the admin dashboard for complete details.</p>
      </div>
    `;
  }
  
  /**
   * Simple fallback template for applicant confirmation
   */
  private getApplicantFallbackTemplate(firstName: string): string {
    return `
      <div style="font-family: Arial, sans-serif;">
        <h1>Application Received</h1>
        <p>Dear ${firstName || 'Applicant'},</p>
        <p>Thank you for your application to the Vocal Excellence Summer Programme 2025.</p>
        <p>We've received your application and will be in touch soon.</p>
        <p>Best regards,<br>The Vocal Excellence Team</p>
      </div>
    `;
  }

  /**
   * Get HTML template for admin notification email
   */
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
            <div class="field-value">${applicationData.firstName || 'Not provided'} ${applicationData.lastName || 'Not provided'}</div>
          </div>
          <div class="field">
            <div class="field-label">Email Address</div>
            <div class="field-value">${applicationData.email || 'Not provided'}</div>
          </div>
          <div class="field">
            <div class="field-label">Phone Number</div>
            <div class="field-value">${applicationData.phone || 'Not provided'}</div>
          </div>
          <div class="field">
            <div class="field-label">Date of Birth</div>
            <div class="field-value">${applicationData.dateOfBirth || 'Not provided'}</div>
          </div>
          <div class="field">
            <div class="field-label">Nationality</div>
            <div class="field-value">${applicationData.nationality || 'Not provided'}</div>
          </div>
          <div class="field">
            <div class="field-label">Address</div>
            <div class="field-value">
              ${applicationData.whereFrom || 'Not provided'}
            </div>
          </div>
        </div>
        
        <div class="section">
          <h2>Musical Background</h2>
          <div class="field">
            <div class="field-label">Vocal Range</div>
            <div class="field-value">${applicationData.vocalRange || 'Not provided'}</div>
          </div>
          <div class="field">
            <div class="field-label">Years of Experience</div>
            <div class="field-value">${applicationData.yearsOfSinging || 'Not provided'}</div>
          </div>
          <div class="field">
            <div class="field-label">Musical Background</div>
            <div class="field-value">${applicationData.musicalBackground || 'Not provided'}</div>
          </div>
          <div class="field">
            <div class="field-label">Teacher Information</div>
            <div class="field-value">
              ${applicationData.teacherName ? `Name: ${applicationData.teacherName}<br>` : 'Not provided<br>'}
              ${applicationData.teacherEmail ? `Email: ${applicationData.teacherEmail}` : 'Not provided'}
            </div>
          </div>
          <div class="field">
            <div class="field-label">Areas of Interest</div>
            <div class="field-value">${applicationData.areasOfInterest || 'Not provided'}</div>
          </div>
        </div>
        
        <div class="section">
          <h2>Programme Application</h2>
          <div class="field">
            <div class="field-label">Reason for Applying</div>
            <div class="field-value">${applicationData.reasonForApplying || 'Not provided'}</div>
          </div>
          <div class="field">
            <div class="field-label">How They Heard About Us</div>
            <div class="field-value">${applicationData.heardAboutUs || 'Not provided'}</div>
          </div>
          <div class="field">
            <div class="field-label">Scholarship Interest</div>
            <div class="field-value">${applicationData.scholarshipInterest ? 'Yes' : 'No'}</div>
          </div>
          <div class="field">
            <div class="field-label">Special Needs or Accommodations</div>
            <div class="field-value">${applicationData.specialNeeds || 'None specified'}</div>
          </div>
          <div class="field">
            <div class="field-label">Dietary Restrictions</div>
            <div class="field-value">
              ${applicationData.dietaryRestrictions?.type === 'other' && applicationData.dietaryRestrictions?.details
                ? `${applicationData.dietaryRestrictions.type}: ${applicationData.dietaryRestrictions.details}`
                : applicationData.dietaryRestrictions?.type || 'None specified'}
            </div>
          </div>
        </div>
        
        <div class="section">
          <h2>Supporting Materials</h2>
          <div class="file-notice">
            <strong>Note:</strong> Supporting materials (audition recordings, CV, recommendation letter) 
            are attached to this email. For issues, contact info@vocalexcellence.cy.
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

  /**
   * Get HTML template for applicant confirmation email
   */
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
        <p>Dear ${firstName || 'Applicant'},</p>
        <p>Thank you for applying to the Vocal Excellence Summer Programme 2025. We have successfully received your application.</p>
        
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
        <p>&copy; 2025 Vocal Excellence Summer Programme. All rights reserved.</p>
        <p>Limassol, Cyprus</p>
      </div>
    </body>
    </html>
  `;
  }
}
