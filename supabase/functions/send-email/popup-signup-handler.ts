
export async function handlePopupSignup({ email, name, variant, source, page_path }: { 
  email: string, 
  name: string, 
  variant: string,
  source: string,
  page_path: string
}) {
  try {
    console.log(`Sending popup signup email to ${email}`);
    
    if (!email) {
      console.error("No recipient email provided for popup signup");
      return { success: false, error: "No recipient email provided" };
    }
    
    const variantTitle = variant === 'A' ? 'Vocal Excellence Resources' : 'Unlock Your Voice';
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">${variantTitle}</h1>
        <p style="font-size: 16px; line-height: 1.5; color: #444;">Dear ${name || 'Vocalist'},</p>
        <p style="font-size: 16px; line-height: 1.5; color: #444;">Thank you for joining our vocal excellence community!</p>
        <p style="font-size: 16px; line-height: 1.5; color: #444;">We're excited to share our exclusive vocal techniques and resources with you. Watch your inbox for upcoming tips, workshop announcements, and special offers.</p>
        <ul style="font-size: 16px; line-height: 1.5; color: #444;">
          <li>Expert vocal techniques</li>
          <li>Workshop early access</li>
          <li>Free master-class previews</li>
        </ul>
        <p style="font-size: 16px; line-height: 1.5; color: #444;">Best regards,</p>
        <p style="font-size: 16px; line-height: 1.5; color: #444;">The Vocal Excellence Team</p>
      </div>
    `;
    
    // Use the same sendEmail function that other parts of the app use
    const emailSender = (await import('./index.ts')).sendEmail;
    return await emailSender(email, "Welcome to Vocal Excellence", htmlContent);
  } catch (error) {
    console.error("Error sending popup signup email:", error);
    return { success: false, error };
  }
}
