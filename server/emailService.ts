/**
 * Email Service for Vocal Excellence Summer Workshop
 * Handles all email notifications including:
 * - Welcome/confirmation emails to applicants
 * - Comprehensive application notifications to admin
 * - Contact form notifications
 */

interface ApplicationEmailData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age?: string | null;
  socialMedia?: string | null;
  dateOfBirth?: string | null;
  nationality?: string | null;
  whereFrom?: string | null;
  vocalRange?: string | null;
  yearsOfSinging?: string | null;
  musicalBackground?: string | null;
  teacherName?: string | null;
  teacherEmail?: string | null;
  areasOfInterest?: string | null;
  reasonForApplying?: string | null;
  heardAboutUs?: string | null;
  scholarshipInterest?: boolean | null;
  dietaryRestrictions?: string[] | string | null;
  specialNeeds?: string | null;
  hasAudioFile1?: boolean;
  hasAudioFile2?: boolean;
  hasCvFile?: boolean;
  hasRecommendationFile?: boolean;
  applicationId?: number;
}

interface ContactEmailData {
  name: string;
  email: string;
  message?: string;
  vocalType?: string;
}

export class EmailService {
  private apiKey: string;
  private adminEmail: string;
  private fromEmail: string = "Vocal Excellence <info@vocalexcellence.cy>";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    // Use the secret ADMIN_NOTIFICATION_EMAIL, fallback to default
    this.adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "info@vocalexcellence.cy";
    console.log("EmailService initialized - API key:", apiKey ? "present" : "missing", "Admin email configured:", this.adminEmail ? "yes" : "no");
  }

  /**
   * Send all notifications for a new application
   */
  async sendApplicationNotifications(data: ApplicationEmailData): Promise<{ success: boolean; error?: any }> {
    console.log("EmailService.sendApplicationNotifications called for:", data.email);

    const results: {
      applicant: { success: boolean; error?: any };
      admin: { success: boolean; error?: any };
    } = {
      applicant: { success: false },
      admin: { success: false }
    };

    try {
      // Send welcome email to applicant
      if (data.email) {
        results.applicant = await this.sendWelcomeEmail(data);
        console.log("Applicant welcome email result:", results.applicant.success);
      }

      // Send comprehensive notification to admin
      results.admin = await this.sendAdminApplicationNotification(data);
      console.log("Admin notification result:", results.admin.success);

      return { 
        success: results.applicant.success || results.admin.success,
        error: results.applicant.error || results.admin.error
      };
    } catch (error) {
      console.error("Error sending application notifications:", error);
      return { success: false, error };
    }
  }

  /**
   * Legacy method for backwards compatibility
   */
  async sendNotifications(data: { firstName?: string; lastName?: string; email: string; phone?: string; vocalRange?: string }): Promise<{ success: boolean; error?: any }> {
    return this.sendApplicationNotifications({
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      email: data.email,
      phone: data.phone || "",
      vocalRange: data.vocalRange
    });
  }

  /**
   * Beautiful, warm welcome email to applicants
   */
  private async sendWelcomeEmail(data: ApplicationEmailData): Promise<{ success: boolean; error?: any }> {
    try {
      const firstName = data.firstName || "Artist";
      
      const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f7;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f7; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
          
          <!-- Header with gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #0066cc 0%, #004499 100%); padding: 40px 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
                Vocal Excellence
              </h1>
              <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 14px; letter-spacing: 1px; text-transform: uppercase;">
                Summer Workshop 2026
              </p>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; color: #1d1d1f; font-size: 24px; font-weight: 600;">
                Welcome, ${firstName}!
              </h2>
              
              <p style="margin: 0 0 20px; color: #424245; font-size: 16px; line-height: 1.6;">
                Thank you for taking this important step in your vocal journey. We are truly excited to have received your application for the Vocal Excellence Summer Workshop.
              </p>
              
              <p style="margin: 0 0 20px; color: #424245; font-size: 16px; line-height: 1.6;">
                Your passion for vocal artistry shines through in your application, and we can already tell you're someone who takes their craft seriously.
              </p>
              
              <!-- What happens next box -->
              <div style="background-color: #f5f5f7; border-radius: 12px; padding: 24px; margin: 30px 0;">
                <h3 style="margin: 0 0 16px; color: #1d1d1f; font-size: 18px; font-weight: 600;">
                  What Happens Next?
                </h3>
                <table cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td width="32" valign="top" style="padding-right: 12px;">
                      <div style="width: 24px; height: 24px; background-color: #0066cc; border-radius: 50%; text-align: center; line-height: 24px; color: white; font-size: 12px; font-weight: 600;">1</div>
                    </td>
                    <td style="padding-bottom: 16px;">
                      <p style="margin: 0; color: #424245; font-size: 15px; line-height: 1.5;">
                        <strong style="color: #1d1d1f;">Review Period</strong><br>
                        Our artistic team will carefully review your application, audio recordings, and materials over the next 2 weeks.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td width="32" valign="top" style="padding-right: 12px;">
                      <div style="width: 24px; height: 24px; background-color: #0066cc; border-radius: 50%; text-align: center; line-height: 24px; color: white; font-size: 12px; font-weight: 600;">2</div>
                    </td>
                    <td style="padding-bottom: 16px;">
                      <p style="margin: 0; color: #424245; font-size: 15px; line-height: 1.5;">
                        <strong style="color: #1d1d1f;">Personal Response</strong><br>
                        You'll receive a personalized email from us with feedback and next steps.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td width="32" valign="top" style="padding-right: 12px;">
                      <div style="width: 24px; height: 24px; background-color: #0066cc; border-radius: 50%; text-align: center; line-height: 24px; color: white; font-size: 12px; font-weight: 600;">3</div>
                    </td>
                    <td>
                      <p style="margin: 0; color: #424245; font-size: 15px; line-height: 1.5;">
                        <strong style="color: #1d1d1f;">Join the Experience</strong><br>
                        If selected, you'll receive detailed information about the workshop, accommodation, and preparation materials.
                      </p>
                    </td>
                  </tr>
                </table>
              </div>
              
              <!-- Workshop details -->
              <div style="border-left: 4px solid #0066cc; padding-left: 20px; margin: 30px 0;">
                <p style="margin: 0 0 8px; color: #86868b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">
                  Workshop Details
                </p>
                <p style="margin: 0; color: #1d1d1f; font-size: 16px; font-weight: 500;">
                  June 29 - July 5, 2026
                </p>
                <p style="margin: 4px 0 0; color: #424245; font-size: 15px;">
                  Limassol, Cyprus
                </p>
              </div>
              
              <p style="margin: 30px 0 20px; color: #424245; font-size: 16px; line-height: 1.6;">
                In the meantime, feel free to explore our <a href="https://vocalexcellence.cy" style="color: #0066cc; text-decoration: none;">website</a> to learn more about our world-class instructors and the transformative experience that awaits.
              </p>
              
              <p style="margin: 0 0 8px; color: #424245; font-size: 16px; line-height: 1.6;">
                Warmly,
              </p>
              <p style="margin: 0; color: #1d1d1f; font-size: 16px; font-weight: 600;">
                The Vocal Excellence Team
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f5f5f7; padding: 24px 40px; text-align: center;">
              <p style="margin: 0 0 8px; color: #86868b; font-size: 13px;">
                Questions? Reach out to us at
              </p>
              <a href="mailto:info@vocalexcellence.cy" style="color: #0066cc; text-decoration: none; font-size: 14px; font-weight: 500;">
                info@vocalexcellence.cy
              </a>
              <p style="margin: 16px 0 0; color: #86868b; font-size: 12px;">
                Vocal Excellence Summer Workshop | Limassol, Cyprus
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `;

      return await this.sendEmailWithRetry(
        data.email, 
        "Welcome to Vocal Excellence - Application Received", 
        htmlContent
      );
    } catch (error) {
      console.error("Error sending welcome email:", error);
      return { success: false, error };
    }
  }

  /**
   * Comprehensive admin notification with all application details
   */
  private async sendAdminApplicationNotification(data: ApplicationEmailData): Promise<{ success: boolean; error?: any }> {
    try {
      const formatValue = (value: any): string => {
        if (value === undefined || value === null || value === "") return '<span style="color: #86868b;">Not provided</span>';
        if (Array.isArray(value)) return value.length > 0 ? value.join(", ") : '<span style="color: #86868b;">None selected</span>';
        if (typeof value === "boolean") return value ? "Yes" : "No";
        return String(value);
      };

      const formatDietaryRestrictions = (restrictions: any): string => {
        if (!restrictions) return '<span style="color: #86868b;">None specified</span>';
        if (Array.isArray(restrictions) && restrictions.length > 0) return restrictions.join(", ");
        if (typeof restrictions === "string" && restrictions.length > 0) return restrictions;
        return '<span style="color: #86868b;">None specified</span>';
      };

      const submissionDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      });

      const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f7;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f7; padding: 20px;">
    <tr>
      <td align="center">
        <table width="700" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #34c759 0%, #28a745 100%); padding: 24px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 600;">
                      New Application Received
                    </h1>
                  </td>
                  <td align="right">
                    <span style="background-color: rgba(255,255,255,0.2); color: #ffffff; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 500;">
                      ${data.applicationId ? `ID: #${data.applicationId}` : 'New'}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Quick Summary -->
          <tr>
            <td style="padding: 24px 32px; border-bottom: 1px solid #e5e5e7;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="70%">
                    <h2 style="margin: 0 0 4px; color: #1d1d1f; font-size: 22px; font-weight: 600;">
                      ${data.firstName} ${data.lastName}
                    </h2>
                    <p style="margin: 0; color: #0066cc; font-size: 15px;">
                      <a href="mailto:${data.email}" style="color: #0066cc; text-decoration: none;">${data.email}</a>
                    </p>
                    <p style="margin: 4px 0 0; color: #424245; font-size: 14px;">
                      ${data.phone || "No phone provided"}
                    </p>
                  </td>
                  <td width="30%" align="right" valign="top">
                    <p style="margin: 0; color: #86868b; font-size: 12px;">
                      Submitted
                    </p>
                    <p style="margin: 4px 0 0; color: #424245; font-size: 13px;">
                      ${submissionDate}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Personal Information -->
          <tr>
            <td style="padding: 24px 32px; border-bottom: 1px solid #e5e5e7;">
              <h3 style="margin: 0 0 16px; color: #1d1d1f; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                Personal Information
              </h3>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" style="padding: 8px 0;">
                    <p style="margin: 0; color: #86868b; font-size: 12px;">Date of Birth</p>
                    <p style="margin: 4px 0 0; color: #1d1d1f; font-size: 14px;">${formatValue(data.dateOfBirth)}</p>
                  </td>
                  <td width="50%" style="padding: 8px 0;">
                    <p style="margin: 0; color: #86868b; font-size: 12px;">Nationality</p>
                    <p style="margin: 4px 0 0; color: #1d1d1f; font-size: 14px;">${formatValue(data.nationality)}</p>
                  </td>
                </tr>
                <tr>
                  <td width="50%" style="padding: 8px 0;">
                    <p style="margin: 0; color: #86868b; font-size: 12px;">Age</p>
                    <p style="margin: 4px 0 0; color: #1d1d1f; font-size: 14px;">${formatValue(data.age)}</p>
                  </td>
                  <td width="50%" style="padding: 8px 0;">
                    <p style="margin: 0; color: #86868b; font-size: 12px;">Location</p>
                    <p style="margin: 4px 0 0; color: #1d1d1f; font-size: 14px;">${formatValue(data.whereFrom)}</p>
                  </td>
                </tr>
                <tr>
                  <td width="50%" style="padding: 8px 0;">
                    <p style="margin: 0; color: #86868b; font-size: 12px;">How They Heard About Us</p>
                    <p style="margin: 4px 0 0; color: #1d1d1f; font-size: 14px;">${formatValue(data.heardAboutUs)}</p>
                  </td>
                  <td width="50%" style="padding: 8px 0;">
                    <p style="margin: 0; color: #86868b; font-size: 12px;">Social Media / Website</p>
                    <p style="margin: 4px 0 0; color: #1d1d1f; font-size: 14px;">${formatValue(data.socialMedia)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Musical Background -->
          <tr>
            <td style="padding: 24px 32px; border-bottom: 1px solid #e5e5e7;">
              <h3 style="margin: 0 0 16px; color: #1d1d1f; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                Musical Background
              </h3>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" style="padding: 8px 0;">
                    <p style="margin: 0; color: #86868b; font-size: 12px;">Vocal Range</p>
                    <p style="margin: 4px 0 0; color: #1d1d1f; font-size: 14px; font-weight: 500;">${formatValue(data.vocalRange)}</p>
                  </td>
                  <td width="50%" style="padding: 8px 0;">
                    <p style="margin: 0; color: #86868b; font-size: 12px;">Years of Singing</p>
                    <p style="margin: 4px 0 0; color: #1d1d1f; font-size: 14px;">${formatValue(data.yearsOfSinging)}</p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 8px 0;">
                    <p style="margin: 0; color: #86868b; font-size: 12px;">Musical Background</p>
                    <p style="margin: 4px 0 0; color: #1d1d1f; font-size: 14px; line-height: 1.5;">${formatValue(data.musicalBackground)}</p>
                  </td>
                </tr>
                <tr>
                  <td width="50%" style="padding: 8px 0;">
                    <p style="margin: 0; color: #86868b; font-size: 12px;">Teacher Name</p>
                    <p style="margin: 4px 0 0; color: #1d1d1f; font-size: 14px;">${formatValue(data.teacherName)}</p>
                  </td>
                  <td width="50%" style="padding: 8px 0;">
                    <p style="margin: 0; color: #86868b; font-size: 12px;">Teacher Email</p>
                    <p style="margin: 4px 0 0; color: #1d1d1f; font-size: 14px;">${data.teacherEmail ? `<a href="mailto:${data.teacherEmail}" style="color: #0066cc; text-decoration: none;">${data.teacherEmail}</a>` : formatValue(null)}</p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 8px 0;">
                    <p style="margin: 0; color: #86868b; font-size: 12px;">Areas of Interest</p>
                    <p style="margin: 4px 0 0; color: #1d1d1f; font-size: 14px;">${formatValue(data.areasOfInterest)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Motivation -->
          <tr>
            <td style="padding: 24px 32px; border-bottom: 1px solid #e5e5e7;">
              <h3 style="margin: 0 0 16px; color: #1d1d1f; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                Motivation & Goals
              </h3>
              <div style="background-color: #f5f5f7; border-radius: 8px; padding: 16px;">
                <p style="margin: 0; color: #1d1d1f; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${formatValue(data.reasonForApplying)}</p>
              </div>
            </td>
          </tr>
          
          <!-- Additional Info -->
          <tr>
            <td style="padding: 24px 32px; border-bottom: 1px solid #e5e5e7;">
              <h3 style="margin: 0 0 16px; color: #1d1d1f; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                Additional Information
              </h3>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" style="padding: 8px 0;">
                    <p style="margin: 0; color: #86868b; font-size: 12px;">Scholarship Interest</p>
                    <p style="margin: 4px 0 0; color: #1d1d1f; font-size: 14px;">
                      ${data.scholarshipInterest ? '<span style="color: #34c759; font-weight: 500;">Yes - Interested</span>' : 'No'}
                    </p>
                  </td>
                  <td width="50%" style="padding: 8px 0;">
                    <p style="margin: 0; color: #86868b; font-size: 12px;">Dietary Restrictions</p>
                    <p style="margin: 4px 0 0; color: #1d1d1f; font-size: 14px;">${formatDietaryRestrictions(data.dietaryRestrictions)}</p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 8px 0;">
                    <p style="margin: 0; color: #86868b; font-size: 12px;">Special Needs / Accessibility</p>
                    <p style="margin: 4px 0 0; color: #1d1d1f; font-size: 14px;">${formatValue(data.specialNeeds)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Uploaded Files -->
          <tr>
            <td style="padding: 24px 32px;">
              <h3 style="margin: 0 0 16px; color: #1d1d1f; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                Uploaded Files
              </h3>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 6px 0;">
                    ${data.hasAudioFile1 ? 
                      '<span style="display: inline-block; background-color: #34c759; color: white; padding: 2px 8px; border-radius: 4px; font-size: 11px; margin-right: 8px;">Uploaded</span>' : 
                      '<span style="display: inline-block; background-color: #ff3b30; color: white; padding: 2px 8px; border-radius: 4px; font-size: 11px; margin-right: 8px;">Missing</span>'
                    }
                    <span style="color: #424245; font-size: 14px;">Audio Recording 1</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0;">
                    ${data.hasAudioFile2 ? 
                      '<span style="display: inline-block; background-color: #34c759; color: white; padding: 2px 8px; border-radius: 4px; font-size: 11px; margin-right: 8px;">Uploaded</span>' : 
                      '<span style="display: inline-block; background-color: #86868b; color: white; padding: 2px 8px; border-radius: 4px; font-size: 11px; margin-right: 8px;">Optional</span>'
                    }
                    <span style="color: #424245; font-size: 14px;">Audio Recording 2</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0;">
                    ${data.hasCvFile ? 
                      '<span style="display: inline-block; background-color: #34c759; color: white; padding: 2px 8px; border-radius: 4px; font-size: 11px; margin-right: 8px;">Uploaded</span>' : 
                      '<span style="display: inline-block; background-color: #86868b; color: white; padding: 2px 8px; border-radius: 4px; font-size: 11px; margin-right: 8px;">Optional</span>'
                    }
                    <span style="color: #424245; font-size: 14px;">CV / Resume</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0;">
                    ${data.hasRecommendationFile ? 
                      '<span style="display: inline-block; background-color: #34c759; color: white; padding: 2px 8px; border-radius: 4px; font-size: 11px; margin-right: 8px;">Uploaded</span>' : 
                      '<span style="display: inline-block; background-color: #86868b; color: white; padding: 2px 8px; border-radius: 4px; font-size: 11px; margin-right: 8px;">Optional</span>'
                    }
                    <span style="color: #424245; font-size: 14px;">Recommendation Letter</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer with CTA -->
          <tr>
            <td style="background-color: #f5f5f7; padding: 20px 32px; text-align: center;">
              <p style="margin: 0; color: #86868b; font-size: 13px;">
                View full application details and uploaded files in the admin dashboard
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `;

      return await this.sendEmailWithRetry(
        this.adminEmail,
        `New Application: ${data.firstName} ${data.lastName} - Vocal Excellence`,
        htmlContent
      );
    } catch (error) {
      console.error("Error sending admin notification:", error);
      return { success: false, error };
    }
  }

  /**
   * Send notification for contact form submissions
   */
  async sendContactNotification(data: ContactEmailData): Promise<{ success: boolean; error?: any }> {
    try {
      const submissionDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f7;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f7; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);">
          
          <tr>
            <td style="background: linear-gradient(135deg, #0066cc 0%, #004499 100%); padding: 24px 32px;">
              <h1 style="margin: 0; color: #ffffff; font-size: 18px; font-weight: 600;">
                New Contact Message
              </h1>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom: 16px;">
                    <p style="margin: 0; color: #86868b; font-size: 12px;">From</p>
                    <p style="margin: 4px 0 0; color: #1d1d1f; font-size: 16px; font-weight: 500;">${data.name}</p>
                    <p style="margin: 4px 0 0;">
                      <a href="mailto:${data.email}" style="color: #0066cc; text-decoration: none; font-size: 14px;">${data.email}</a>
                    </p>
                  </td>
                </tr>
                ${data.vocalType ? `
                <tr>
                  <td style="padding-bottom: 16px;">
                    <p style="margin: 0; color: #86868b; font-size: 12px;">Vocal Type</p>
                    <p style="margin: 4px 0 0; color: #1d1d1f; font-size: 14px;">${data.vocalType}</p>
                  </td>
                </tr>
                ` : ''}
                ${data.message ? `
                <tr>
                  <td>
                    <p style="margin: 0 0 8px; color: #86868b; font-size: 12px;">Message</p>
                    <div style="background-color: #f5f5f7; border-radius: 8px; padding: 16px;">
                      <p style="margin: 0; color: #1d1d1f; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
                    </div>
                  </td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>
          
          <tr>
            <td style="background-color: #f5f5f7; padding: 16px 32px; text-align: center;">
              <p style="margin: 0; color: #86868b; font-size: 12px;">
                Received on ${submissionDate}
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `;

      return await this.sendEmailWithRetry(
        this.adminEmail,
        `Contact: ${data.name} - Vocal Excellence`,
        htmlContent
      );
    } catch (error) {
      console.error("Error sending contact notification:", error);
      return { success: false, error };
    }
  }

  /**
   * Legacy method for backwards compatibility
   */
  async sendNotificationToAdmin(data: { firstName?: string; email: string }): Promise<{ success: boolean; error?: any }> {
    return this.sendContactNotification({
      name: data.firstName || "Unknown",
      email: data.email
    });
  }

  /**
   * Legacy method for backwards compatibility  
   */
  async sendConfirmationToApplicant(data: { firstName?: string; lastName?: string; email: string }): Promise<{ success: boolean; error?: any }> {
    return this.sendWelcomeEmail({
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      email: data.email,
      phone: ""
    });
  }

  /**
   * Send email with retry logic
   */
  private async sendEmailWithRetry(
    to: string,
    subject: string,
    htmlContent: string,
    maxRetries: number = 3
  ): Promise<{ success: boolean; error?: any; data?: any }> {
    let attempts = 0;
    let lastError;

    while (attempts < maxRetries) {
      try {
        console.log(`Sending email attempt ${attempts + 1}/${maxRetries} to ${to}`);

        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify({
            from: this.fromEmail,
            to,
            subject,
            html: htmlContent,
          }),
        });

        const responseText = await response.text();
        console.log(`Resend API response (${response.status}): ${responseText.substring(0, 200)}`);

        if (response.ok) {
          console.log("Email sent successfully!");
          try {
            const data = JSON.parse(responseText);
            return { success: true, data };
          } catch (parseError) {
            return { success: true, data: { message: "Email sent" } };
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
        const waitTime = Math.pow(2, attempts) * 500;
        console.log(`Waiting ${waitTime}ms before retry...`);
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
    }

    console.error(`All ${maxRetries} attempts to send email failed`);
    return { success: false, error: lastError };
  }
}
