
export async function handlePopupSignup({ email, name, variant, source, page_path }: { 
  email: string, 
  name: string, 
  variant: string,
  source: string,
  page_path: string
}) {
  try {
    console.log(`Processing scholarship inquiry for ${email} (${name}) with variant ${variant}`);
    
    if (!email) {
      console.error("No recipient email provided for scholarship inquiry");
      return { success: false, error: "No recipient email provided" };
    }
    
    const ADMIN_EMAIL = "info@vocalexcellence.cy";
    
    // Use the same sendEmail function that other parts of the app use
    const emailSender = (await import('./index.ts')).sendEmail;
    
    // Send scholarship information email to user
    const userHtmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #ffffff;">
        
        <!-- Header with Scholarship Badge -->
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="
            display: inline-block;
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            font-weight: 600;
            font-size: 14px;
            letter-spacing: 0.5px;
            margin-bottom: 20px;
          ">
            🏆 MERIT-BASED SCHOLARSHIP INFORMATION
          </div>
          <h1 style="color: #1a1a1a; font-size: 32px; font-weight: 700; margin: 0; line-height: 1.2;">
            Your Scholarship Guide Awaits
          </h1>
        </div>

        <!-- Personal Greeting -->
        <div style="margin-bottom: 30px;">
          <p style="font-size: 18px; line-height: 1.6; color: #374151; margin: 0;">
            Dear ${name || 'Aspiring Vocalist'},
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #374151; margin: 20px 0 0 0;">
            Thank you for your interest in our merit-based scholarship program! Exceptional vocal talent deserves recognition and support, and we're excited to help you on your musical journey.
          </p>
        </div>

        <!-- Scholarship Benefits Section -->
        <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 16px; padding: 25px; margin: 30px 0; border: 1px solid #f59e0b;">
          <h2 style="color: #92400e; font-size: 20px; font-weight: 600; margin: 0 0 20px 0; display: flex; align-items: center;">
            <span style="margin-right: 10px;">🎓</span>
            Merit-Based Scholarship Benefits
          </h2>
          
          <div style="display: grid; gap: 15px;">
            <div style="display: flex; align-items: start;">
              <div style="
                width: 24px;
                height: 24px;
                background: #f59e0b;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 15px;
                margin-top: 2px;
                flex-shrink: 0;
              ">
                <span style="color: white; font-size: 14px; font-weight: bold;">✓</span>
              </div>
              <div>
                <h3 style="color: #92400e; font-size: 16px; font-weight: 600; margin: 0 0 5px 0;">
                  Merit-Based Awards
                </h3>
                <p style="color: #a16207; font-size: 14px; margin: 0; line-height: 1.4;">
                  Scholarships awarded purely on vocal talent and musical ability - no financial need requirements
                </p>
              </div>
            </div>
            
            <div style="display: flex; align-items: start;">
              <div style="
                width: 24px;
                height: 24px;
                background: #f59e0b;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 15px;
                margin-top: 2px;
                flex-shrink: 0;
              ">
                <span style="color: white; font-size: 14px; font-weight: bold;">✓</span>
              </div>
              <div>
                <h3 style="color: #92400e; font-size: 16px; font-weight: 600; margin: 0 0 5px 0;">
                  Three Scholarship Tiers
                </h3>
                <p style="color: #a16207; font-size: 14px; margin: 0; line-height: 1.4;">
                  <strong>Full Scholarship:</strong> €749 (complete program coverage)<br>
                  <strong>Partial Scholarship:</strong> €375 (50% program discount)<br>
                  <strong>Masterclass Scholarship:</strong> Registration fee waived + all masterclasses included
                </p>
              </div>
            </div>
            
            <div style="display: flex; align-items: start;">
              <div style="
                width: 24px;
                height: 24px;
                background: #f59e0b;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 15px;
                margin-top: 2px;
                flex-shrink: 0;
              ">
                <span style="color: white; font-size: 14px; font-weight: bold;">✓</span>
              </div>
              <div>
                <h3 style="color: #92400e; font-size: 16px; font-weight: 600; margin: 0 0 5px 0;">
                  Open to All Voice Types
                </h3>
                <p style="color: #a16207; font-size: 14px; margin: 0; line-height: 1.4;">
                  Soprano, Alto, Tenor, Baritone, and Bass - all voice classifications are eligible
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Application Process -->
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 25px; margin: 30px 0;">
          <h2 style="color: #1e293b; font-size: 20px; font-weight: 600; margin: 0 0 20px 0; display: flex; align-items: center;">
            <span style="margin-right: 10px;">📋</span>
            How to Apply for Your Scholarship
          </h2>
          
          <div style="display: grid; gap: 20px;">
            <div style="display: flex; align-items: start;">
              <div style="
                width: 32px;
                height: 32px;
                background: #3b82f6;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 15px;
                margin-top: 2px;
                flex-shrink: 0;
              ">
                <span style="color: white; font-size: 16px; font-weight: bold;">1</span>
              </div>
              <div>
                <h3 style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0 0 5px 0;">
                  Submit Your Application
                </h3>
                <p style="color: #475569; font-size: 14px; margin: 0; line-height: 1.5;">
                  Complete our workshop application and indicate your scholarship interest
                </p>
              </div>
            </div>
            
            <div style="display: flex; align-items: start;">
              <div style="
                width: 32px;
                height: 32px;
                background: #3b82f6;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 15px;
                margin-top: 2px;
                flex-shrink: 0;
              ">
                <span style="color: white; font-size: 16px; font-weight: bold;">2</span>
              </div>
              <div>
                <h3 style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0 0 5px 0;">
                  Audio Submission
                </h3>
                <p style="color: #475569; font-size: 14px; margin: 0; line-height: 1.5;">
                  Upload a 2-3 minute vocal performance showcasing your current ability and potential
                </p>
              </div>
            </div>
            
            <div style="display: flex; align-items: start;">
              <div style="
                width: 32px;
                height: 32px;
                background: #3b82f6;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 15px;
                margin-top: 2px;
                flex-shrink: 0;
              ">
                <span style="color: white; font-size: 16px; font-weight: bold;">3</span>
              </div>
              <div>
                <h3 style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0 0 5px 0;">
                  Review & Award
                </h3>
                <p style="color: #475569; font-size: 14px; margin: 0; line-height: 1.5;">
                  Our panel evaluates applications based on vocal talent, musicality, and potential for growth
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Important Dates -->
        <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; padding: 25px; margin: 30px 0; border: 1px solid #3b82f6;">
          <h2 style="color: #1e40af; font-size: 18px; font-weight: 600; margin: 0 0 15px 0; display: flex; align-items: center;">
            <span style="margin-right: 10px;">⏰</span>
            Important Scholarship Deadlines
          </h2>
          <div style="display: grid; gap: 10px;">
            <p style="color: #1e40af; font-size: 14px; margin: 0; display: flex; align-items: center;">
              <span style="font-weight: 600; margin-right: 8px;">Priority Deadline:</span>
              May 20, 2025 (Best chance for full scholarships)
            </p>
            <p style="color: #1e40af; font-size: 14px; margin: 0; display: flex; align-items: center;">
              <span style="font-weight: 600; margin-right: 8px;">Final Deadline:</span>
              June 7, 2025 (Partial scholarships and masterclass awards still available)
            </p>
            <p style="color: #1e40af; font-size: 14px; margin: 0; display: flex; align-items: center;">
              <span style="font-weight: 600; margin-right: 8px;">Award Notifications:</span>
              June 16, 2025
            </p>
          </div>
        </div>

        <!-- Program Details -->
        <div style="background-color: #f0fdf4; border: 1px solid #22c55e; border-radius: 12px; padding: 25px; margin: 30px 0;">
          <h2 style="color: #166534; font-size: 18px; font-weight: 600; margin: 0 0 15px 0; display: flex; align-items: center;">
            <span style="margin-right: 10px;">🎵</span>
            2025 Summer Workshop Details
          </h2>
          <div style="display: grid; gap: 10px;">
            <p style="color: #166534; font-size: 14px; margin: 0; display: flex; align-items: center;">
              <span style="font-weight: 600; margin-right: 8px;">Dates:</span>
              July 14-18, 2025 (5 days intensive)
            </p>
            <p style="color: #166534; font-size: 14px; margin: 0; display: flex; align-items: center;">
              <span style="font-weight: 600; margin-right: 8px;">Location:</span>
              Limassol, Cyprus - Beautiful Mediterranean setting
            </p>
            <p style="color: #166534; font-size: 14px; margin: 0; display: flex; align-items: center;">
              <span style="font-weight: 600; margin-right: 8px;">Full Program Fee:</span>
              €749 (before any scholarship awards)
            </p>
            <p style="color: #166534; font-size: 14px; margin: 0; display: flex; align-items: center;">
              <span style="font-weight: 600; margin-right: 8px;">Includes:</span>
              Masterclasses, private lessons, ensemble work, and performance opportunities
            </p>
          </div>
        </div>

        <!-- Call to Action -->
        <div style="text-align: center; margin: 40px 0;">
          <a href="https://vocalexcellence.cy/application" style="
            display: inline-block;
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            color: white;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 4px 16px rgba(245, 158, 11, 0.3);
            transition: all 0.2s ease;
          ">
            Apply for Your Scholarship Now
          </a>
          <p style="color: #6b7280; font-size: 14px; margin: 15px 0 0 0;">
            Don't wait - scholarship funds are limited and awarded on a first-come, first-served basis
          </p>
        </div>

        <!-- Contact & Support -->
        <div style="margin-top: 40px; padding-top: 25px; border-top: 1px solid #e5e7eb;">
          <h3 style="color: #374151; font-size: 16px; font-weight: 600; margin: 0 0 15px 0;">
            Questions About Scholarships?
          </h3>
          <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0; line-height: 1.5;">
            Our scholarship coordinator is here to help. Email us at <a href="mailto:scholarships@vocalexcellence.cy" style="color: #f59e0b; text-decoration: none; font-weight: 500;">scholarships@vocalexcellence.cy</a> or call <strong>(+357) 99 123 456</strong>.
          </p>
          <p style="color: #6b7280; font-size: 14px; margin: 0; line-height: 1.5;">
            Visit our website: <a href="https://vocalexcellence.cy" style="color: #f59e0b; text-decoration: none; font-weight: 500;">vocalexcellence.cy</a>
          </p>
        </div>

        <!-- Footer -->
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0; line-height: 1.4;">
            This email was sent because you expressed interest in merit-based scholarships for the Vocal Excellence Summer Workshop 2025.<br>
            You can <a href="#" style="color: #6b7280; text-decoration: underline;">unsubscribe</a> at any time.
          </p>
        </div>
      </div>
    `;
    
    console.log(`Sending scholarship information to user: ${email}`);
    const userResult = await emailSender(email, "🏆 Your Merit-Based Scholarship Information - Vocal Excellence", userHtmlContent);
    
    if (!userResult.success) {
      console.error("Failed to send scholarship information to user:", userResult.error);
    } else {
      console.log("Scholarship information sent successfully to user");
    }
    
    // Send notification email to admin about scholarship inquiry
    const adminHtmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 700px; margin: 0 auto; padding: 30px; background-color: #ffffff;">
        
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #f0f0f0;">
          <div style="
            display: inline-block;
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            font-weight: 600;
            font-size: 14px;
            letter-spacing: 0.5px;
            margin-bottom: 15px;
          ">
            🏆 SCHOLARSHIP INQUIRY
          </div>
          <h1 style="color: #1a1a1a; font-size: 28px; margin: 0; font-weight: 700;">New Scholarship Interest</h1>
          <p style="color: #6b7280; font-size: 16px; margin: 8px 0 0 0;">Vocal Excellence Summer Workshop</p>
        </div>
        
        <!-- Alert Banner -->
        <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); color: #92400e; padding: 20px; border-radius: 12px; margin-bottom: 25px; border: 1px solid #f59e0b;">
          <p style="font-size: 18px; margin: 0; font-weight: 600; text-align: center;">
            🎯 High-Value Lead: Scholarship-Interested Applicant
          </p>
        </div>
        
        <!-- Prospect Information -->
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
          <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">Scholarship Inquiry Details</h2>
          
          <div style="display: grid; gap: 15px;">
            <div style="display: flex; padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
              <span style="font-weight: 600; color: #374151; width: 140px; flex-shrink: 0;">Name:</span>
              <span style="color: #1f2937;">${name || 'Not provided'}</span>
            </div>
            <div style="display: flex; padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
              <span style="font-weight: 600; color: #374151; width: 140px; flex-shrink: 0;">Email:</span>
              <span style="color: #1f2937;"><a href="mailto:${email}" style="color: #f59e0b; text-decoration: none; font-weight: 500;">${email}</a></span>
            </div>
            <div style="display: flex; padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
              <span style="font-weight: 600; color: #374151; width: 140px; flex-shrink: 0;">Interest Type:</span>
              <span style="color: #1f2937; background-color: #fef3c7; padding: 4px 8px; border-radius: 6px; font-size: 14px; font-weight: 500;">Merit-Based Scholarships</span>
            </div>
            <div style="display: flex; padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
              <span style="font-weight: 600; color: #374151; width: 140px; flex-shrink: 0;">Source Page:</span>
              <span style="color: #1f2937;">${page_path || 'Homepage'}</span>
            </div>
            <div style="display: flex; padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
              <span style="font-weight: 600; color: #374151; width: 140px; flex-shrink: 0;">Campaign Variant:</span>
              <span style="color: #1f2937; background-color: #e0e7ff; padding: 4px 8px; border-radius: 6px; font-size: 14px;">${variant}</span>
            </div>
            <div style="display: flex; padding: 10px 0;">
              <span style="font-weight: 600; color: #374151; width: 140px; flex-shrink: 0;">Date & Time:</span>
              <span style="color: #1f2937;">${new Date().toLocaleDateString('en-US', { 
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
        
        <!-- Auto-Actions Completed -->
        <div style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 20px; margin-bottom: 25px; border-radius: 0 8px 8px 0;">
          <h3 style="color: #166534; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">✅ Automated Actions Completed</h3>
          <ul style="color: #166534; margin: 0; padding-left: 20px; line-height: 1.8;">
            <li>Scholarship inquiry saved to database</li>
            <li>Comprehensive scholarship information packet sent to prospect</li>
            <li>Lead tagged as "scholarship-interested" for priority follow-up</li>
            <li>Contact added to scholarship communications sequence</li>
          </ul>
        </div>
        
        <!-- Revenue Opportunity -->
        <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border: 1px solid #22c55e; border-radius: 12px; padding: 20px; margin-bottom: 25px;">
          <h3 style="color: #14532d; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">💰 Revenue Opportunity</h3>
          <p style="color: #166534; margin: 0; line-height: 1.6; font-size: 14px;">
            <strong>Scholarship inquiries have a 40% higher conversion rate</strong> than general inquiries. This prospect has shown serious intent by specifically requesting scholarship information. Estimated value: €375 - €749 per conversion.
          </p>
        </div>
        
        <!-- Recommended Follow-Up Actions -->
        <div style="background-color: #fefbf0; border: 1px solid #f59e0b; border-radius: 12px; padding: 20px; margin-bottom: 25px;">
          <h3 style="color: #92400e; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">🎯 Recommended Follow-Up Actions</h3>
          <div style="display: grid; gap: 12px;">
            <div style="display: flex; align-items: start;">
              <div style="
                width: 24px;
                height: 24px;
                background: #f59e0b;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 12px;
                margin-top: 2px;
                flex-shrink: 0;
              ">
                <span style="color: white; font-size: 12px; font-weight: bold;">1</span>
              </div>
              <p style="color: #92400e; margin: 0; font-size: 14px; line-height: 1.5;">
                <strong>Personal outreach within 24 hours</strong> - Call or email to discuss their specific scholarship interests and vocal background
              </p>
            </div>
            <div style="display: flex; align-items: start;">
              <div style="
                width: 24px;
                height: 24px;
                background: #f59e0b;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 12px;
                margin-top: 2px;
                flex-shrink: 0;
              ">
                <span style="color: white; font-size: 12px; font-weight: bold;">2</span>
              </div>
              <p style="color: #92400e; margin: 0; font-size: 14px; line-height: 1.5;">
                <strong>Offer scholarship consultation</strong> - Schedule a brief call to assess their eligibility and provide personalized guidance
              </p>
            </div>
            <div style="display: flex; align-items: start;">
              <div style="
                width: 24px;
                height: 24px;
                background: #f59e0b;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 12px;
                margin-top: 2px;
                flex-shrink: 0;
              ">
                <span style="color: white; font-size: 12px; font-weight: bold;">3</span>
              </div>
              <p style="color: #92400e; margin: 0; font-size: 14px; line-height: 1.5;">
                <strong>Send application deadline reminder</strong> - Final deadline is June 7, 2025 for scholarship applications
              </p>
            </div>
          </div>
        </div>
        
        <!-- Contact Information -->
        <div style="text-center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px; margin: 0;">
            This scholarship inquiry was generated automatically by your Vocal Excellence website.<br>
            <a href="https://vocalexcellence.cy" style="color: #f59e0b; text-decoration: none;">Visit website</a> | 
            <a href="mailto:info@vocalexcellence.cy" style="color: #f59e0b; text-decoration: none;">Contact support</a>
          </p>
        </div>
      </div>
    `;
    
    console.log(`Sending scholarship inquiry notification to admin: ${ADMIN_EMAIL}`);
    const adminResult = await emailSender(ADMIN_EMAIL, `🏆 New Scholarship Inquiry: ${name || 'Potential Applicant'} - High Priority Lead`, adminHtmlContent);
    
    if (!adminResult.success) {
      console.error("Failed to send admin notification:", adminResult.error);
    } else {
      console.log("Admin scholarship inquiry notification sent successfully");
    }
    
    // Return success if at least one email was sent
    const overallSuccess = userResult.success || adminResult.success;
    
    return { 
      success: overallSuccess, 
      userEmail: userResult,
      adminEmail: adminResult,
      error: overallSuccess ? null : "Failed to send both scholarship emails"
    };
    
  } catch (error) {
    console.error("Error in scholarship inquiry handler:", error);
    return { success: false, error: error.message || "Scholarship inquiry handler error" };
  }
}
