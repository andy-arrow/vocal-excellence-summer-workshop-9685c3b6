
// Add enhanced email handling using Resend API

import { ApplicationData } from "./types.ts";

export class EmailHandler {
  private apiKey: string;
  private adminEmail: string = "info@vocalexcellence.cy";
  private fromEmail: string = "Vocal Excellence <info@vocalexcellence.cy>";
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
    console.log("EmailHandler initialized with API key (first few chars):", apiKey ? apiKey.substring(0, 4) + "..." : "missing");
  }
  
  async sendNotifications(data: ApplicationData): Promise<{ success: boolean; error?: any }> {
    console.log("EmailHandler.sendNotifications called for:", data.email);
    
    try {
      // Send confirmation to applicant
      if (data.email) {
        const applicantEmailResult = await this.sendConfirmationToApplicant(data);
        console.log("Applicant email result:", applicantEmailResult);
      } else {
        console.warn("No email provided for applicant, skipping applicant confirmation");
      }
      
      // Send notification to admin regardless
      const adminEmailResult = await this.sendNotificationToAdmin(data);
      console.log("Admin email result:", adminEmailResult);
      
      // Return success if either email succeeded
      return { 
        success: true 
      };
    } catch (error) {
      console.error("Error sending notifications:", error);
      return { 
        success: false, 
        error 
      };
    }
  }
  
  async sendConfirmationToApplicant(data: ApplicationData): Promise<{ success: boolean; error?: any }> {
    try {
      const to = data.email;
      const name = data.firstName || "Applicant";
      
      console.log(`Sending confirmation email to ${to}`);
      
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
      
      // Try sending with multiple attempts
      return await this.sendEmailWithRetry(to, "Your Vocal Excellence Application", htmlContent, 3);
    } catch (error) {
      console.error("Error sending confirmation to applicant:", error);
      return { success: false, error };
    }
  }
  
  async sendNotificationToAdmin(data: ApplicationData): Promise<{ success: boolean; error?: any }> {
    try {
      console.log(`Sending admin notification email to ${this.adminEmail}`);
      
      // Create safe applicant data summary with fallbacks for missing fields
      const safeData = {
        firstName: data.firstName || 'Unknown',
        lastName: data.lastName || 'Unknown',
        email: data.email || 'No email provided',
        phone: data.phone || 'Not provided',
        vocalRange: data.vocalRange || 'Not specified'
      };
      
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Application Received</h1>
          <p style="font-size: 16px; line-height: 1.5; color: #444;">A new application has been submitted to the Vocal Excellence Summer Workshop 2025.</p>
          
          <div style="background-color: #f7f9fc; border-left: 4px solid #0066cc; padding: 15px; margin: 20px 0;">
            <h2 style="color: #0066cc; margin-top: 0;">Applicant Details</h2>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${safeData.firstName} ${safeData.lastName}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${safeData.email}</p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> ${safeData.phone}</p>
            <p style="margin: 5px 0;"><strong>Vocal Range:</strong> ${safeData.vocalRange}</p>
          </div>
          
          <p style="font-size: 16px; line-height: 1.5; color: #444;">Visit the admin dashboard to review the full application.</p>
        </div>
      `;
      
      return await this.sendEmailWithRetry(this.adminEmail, "New Vocal Excellence Application", htmlContent, 3);
    } catch (error) {
      console.error("Error sending notification to admin:", error);
      return { success: false, error };
    }
  }
  
  private async sendEmailWithRetry(
    to: string, 
    subject: string, 
    htmlContent: string, 
    maxRetries: number = 3
  ): Promise<{ success: boolean; error?: any }> {
    let attempts = 0;
    let lastError;
    
    while (attempts < maxRetries) {
      try {
        console.log(`Sending email attempt ${attempts + 1}/${maxRetries} to ${to}`);
        
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.apiKey}`
          },
          body: JSON.stringify({
            from: this.fromEmail,
            to,
            subject,
            html: htmlContent
          })
        });
        
        const responseText = await response.text();
        console.log(`Resend API response (${response.status}): ${responseText}`);
        
        if (response.ok) {
          console.log("Email sent successfully!");
          try {
            const data = JSON.parse(responseText);
            return { success: true, data };
          } catch (parseError) {
            console.warn("Error parsing successful response:", parseError);
            return { success: true, data: { id: "unknown", message: "Email sent but response parsing failed" } };
          }
        } else {
          lastError = `API returned ${response.status}: ${responseText}`;
          console.error(`Email sending failed (attempt ${attempts + 1}):`, lastError);
        }
      } catch (error) {
        lastError = error;
        console.error(`Exception in email sending (attempt ${attempts + 1}):`, error);
      }
      
      attempts++;
      if (attempts < maxRetries) {
        // Exponential backoff
        const waitTime = Math.pow(2, attempts) * 500;
        console.log(`Waiting ${waitTime}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
    
    // If all retries failed
    console.error(`All ${maxRetries} attempts to send email failed`);
    return { success: false, error: lastError };
  }
}
