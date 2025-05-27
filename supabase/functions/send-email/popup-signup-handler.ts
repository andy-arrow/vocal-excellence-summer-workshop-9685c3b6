
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
    
    // Send notification email to admin with professional copy
    const adminHtmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 700px; margin: 0 auto; padding: 30px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #f0f0f0;">
          <h1 style="color: #2c3e50; font-size: 28px; margin: 0; font-weight: 600;">New Email Subscriber</h1>
          <p style="color: #7f8c8d; font-size: 16px; margin: 8px 0 0 0;">Vocal Excellence Website</p>
        </div>
        
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
          <p style="font-size: 18px; margin: 0; font-weight: 500;">🎉 Great news! A new visitor has joined your email list through the website popup.</p>
        </div>
        
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 25px; margin-bottom: 25px;">
          <h2 style="color: #4a5568; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">Subscriber Information</h2>
          
          <div style="display: grid; gap: 12px;">
            <div style="display: flex; padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
              <span style="font-weight: 600; color: #4a5568; width: 120px;">Name:</span>
              <span style="color: #2d3748;">${name || 'Not provided'}</span>
            </div>
            <div style="display: flex; padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
              <span style="font-weight: 600; color: #4a5568; width: 120px;">Email:</span>
              <span style="color: #2d3748;"><a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></span>
            </div>
            <div style="display: flex; padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
              <span style="font-weight: 600; color: #4a5568; width: 120px;">Page:</span>
              <span style="color: #2d3748;">${page_path || 'Homepage'}</span>
            </div>
            <div style="display: flex; padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
              <span style="font-weight: 600; color: #4a5568; width: 120px;">Variant:</span>
              <span style="color: #2d3748; background-color: #e2e8f0; padding: 2px 8px; border-radius: 4px; font-size: 14px;">${variant}</span>
            </div>
            <div style="display: flex; padding: 8px 0;">
              <span style="font-weight: 600; color: #4a5568; width: 120px;">Date & Time:</span>
              <span style="color: #2d3748;">${new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
              })}</span>
            </div>
          </div>
        </div>
        
        <div style="background-color: #f0fff4; border-left: 4px solid #38a169; padding: 20px; margin-bottom: 25px; border-radius: 0 8px 8px 0;">
          <h3 style="color: #2f855a; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">✅ Actions Completed</h3>
          <ul style="color: #2f855a; margin: 0; padding-left: 20px; line-height: 1.6;">
            <li>Subscriber automatically added to your email list</li>
            <li>Welcome email with vocal toolkit sent successfully</li>
            <li>Lead captured and ready for follow-up</li>
          </ul>
        </div>
        
        <div style="background-color: #fffbf0; border: 1px solid #f6e05e; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
          <h3 style="color: #b7791f; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">💡 Next Steps</h3>
          <p style="color: #744210; margin: 0; line-height: 1.6;">Consider reaching out personally within 24-48 hours to welcome them and offer additional value. This is a warm lead who showed interest in your vocal programs.</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <p style="color: #718096; font-size: 14px; margin: 0;">
            This notification was generated automatically by your Vocal Excellence website.<br>
            <a href="https://vocalexcellence.cy" style="color: #667eea; text-decoration: none;">Visit website</a> | 
            <a href="mailto:info@vocalexcellence.cy" style="color: #667eea; text-decoration: none;">Contact support</a>
          </p>
        </div>
      </div>
    `;
    
    console.log(`Sending admin notification to: ${ADMIN_EMAIL}`);
    const adminResult = await emailSender(ADMIN_EMAIL, `🎵 New Lead: ${name || 'New Subscriber'} joined your email list`, adminHtmlContent);
    
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
