
export async function handlePopupSignup({ email, name, variant, source, page_path }: { 
  email: string, 
  name: string, 
  variant: string,
  source: string,
  page_path: string
}) {
  try {
    console.log(`Processing popup signup for ${email} (${name}) with variant ${variant}`);
    
    if (!email) {
      console.error("No recipient email provided for popup signup");
      return { success: false, error: "No recipient email provided" };
    }
    
    const variantTitle = variant === 'A' ? 'Vocal Excellence Resources' : 'Unlock Your Voice';
    const ADMIN_EMAIL = "info@vocalexcellence.cy";
    
    // Use the same sendEmail function that other parts of the app use
    const emailSender = (await import('./index.ts')).sendEmail;
    
    // Send welcome email to user
    const userHtmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">${variantTitle}</h1>
        <p style="font-size: 16px; line-height: 1.5; color: #444;">Dear ${name || 'Vocalist'},</p>
        <p style="font-size: 16px; line-height: 1.5; color: #444;">Thank you for joining our vocal excellence community!</p>
        <p style="font-size: 16px; line-height: 1.5; color: #444;">We're excited to share our exclusive vocal techniques and resources with you. Watch your inbox for upcoming tips, workshop announcements, and special offers.</p>
        
        <div style="background-color: #f8f9fa; border-left: 4px solid #4f6e72; padding: 20px; margin: 20px 0;">
          <h3 style="color: #4f6e72; margin-top: 0;">What's included in your free toolkit:</h3>
          <ul style="font-size: 16px; line-height: 1.8; color: #444; margin: 10px 0;">
            <li><strong>3 Professional Warm-ups:</strong> Audio files tailored for your voice</li>
            <li><strong>Pitch Perfect Cheat Sheet:</strong> PDF guide to fix common pitch problems</li>
            <li><strong>Audition Confidence Video:</strong> Master class on beating performance nerves</li>
            <li><strong>Workshop Early Access:</strong> Be first to know about our programs</li>
          </ul>
        </div>
        
        <p style="font-size: 16px; line-height: 1.5; color: #444;">Keep an eye on your inbox - your toolkit will arrive within the next few minutes!</p>
        <p style="font-size: 16px; line-height: 1.5; color: #444;">Best regards,</p>
        <p style="font-size: 16px; line-height: 1.5; color: #444;"><strong>The Vocal Excellence Team</strong></p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666;">
          <p>Visit us at <a href="https://vocalexcellence.cy" style="color: #4f6e72;">vocalexcellence.cy</a></p>
          <p>Questions? Reply to this email or contact us at info@vocalexcellence.cy</p>
        </div>
      </div>
    `;
    
    console.log(`Sending welcome email to user: ${email}`);
    const userResult = await emailSender(email, "Welcome to Vocal Excellence - Your Free Toolkit Awaits!", userHtmlContent);
    
    if (!userResult.success) {
      console.error("Failed to send welcome email to user:", userResult.error);
    } else {
      console.log("Welcome email sent successfully to user");
    }
    
    // Send notification email to admin
    const adminHtmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Popup Signup</h1>
        <p style="font-size: 16px; line-height: 1.5; color: #444;">A new user has signed up via the popup on your website.</p>
        
        <div style="background-color: #f7f9fc; border-left: 4px solid #0066cc; padding: 15px; margin: 20px 0;">
          <h2 style="color: #0066cc; margin-top: 0;">Signup Details</h2>
          <p style="margin: 5px 0;"><strong>Name:</strong> ${name || 'Not provided'}</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 5px 0;"><strong>Variant:</strong> ${variant}</p>
          <p style="margin: 5px 0;"><strong>Source:</strong> ${source}</p>
          <p style="margin: 5px 0;"><strong>Page:</strong> ${page_path}</p>
          <p style="margin: 5px 0;"><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        </div>
        
        <p style="font-size: 16px; line-height: 1.5; color: #444;">The user has been automatically added to your email list and sent the welcome email with the vocal toolkit.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666;">
          <p>This notification was sent automatically from your Vocal Excellence website popup.</p>
        </div>
      </div>
    `;
    
    console.log(`Sending admin notification to: ${ADMIN_EMAIL}`);
    const adminResult = await emailSender(ADMIN_EMAIL, `New Popup Signup: ${name || 'Unknown'} (${email})`, adminHtmlContent);
    
    if (!adminResult.success) {
      console.error("Failed to send admin notification:", adminResult.error);
    } else {
      console.log("Admin notification sent successfully");
    }
    
    // Return success if at least one email was sent
    const overallSuccess = userResult.success || adminResult.success;
    
    return { 
      success: overallSuccess, 
      userEmail: userResult,
      adminEmail: adminResult,
      error: overallSuccess ? null : "Failed to send both emails"
    };
    
  } catch (error) {
    console.error("Error in popup signup handler:", error);
    return { success: false, error: error.message || "Popup signup handler error" };
  }
}
