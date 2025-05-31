/**
 * Vocal Excellence Merit Scholarship Popup
 * 
 * Configuration options (set before loading script):
 * - window.VX_SUPABASE_URL: Supabase project URL
 * - window.VX_SUPABASE_ANON_KEY: Supabase anon key
 * 
 * Events dispatched:
 * - vx-popup-shown: When popup is displayed
 * - vx-popup-submitted: When email is successfully submitted
 * - vx-popup-closed: When popup is closed
 */

(function() {
  'use strict';

  console.log('[VX Popup] Script loading...');

  // Configuration - Multiple triggers
  const CONFIG = {
    STORAGE_KEY: 'vx_popup_seen',
    VARIANT_KEY: 'vx_popup_variant',
    TTL_DAYS: 7, // Show again after 7 days
    VARIANT_TTL_DAYS: 30,
    TIME_DELAY: 10000, // 10 seconds for faster testing
    SCROLL_THRESHOLD: 0.3, // 30% scroll before triggering
    EXIT_INTENT_THRESHOLD: 15, // pixels from top
  };

  // State
  let popupShown = false;
  let timeTriggered = false;
  let scrollTriggered = false;
  let exitTriggered = false;
  let variant = 'A';
  let isDebugMode = false;

  // Enhanced debug function
  function debug(message, data = null) {
    const timestamp = new Date().toISOString();
    const logMessage = `[VX Popup] ${timestamp} - ${message}`;
    
    if (data) {
      console.log(logMessage, data);
    } else {
      console.log(logMessage);
    }
  }

  // Force debug mode if URL contains debug parameter
  if (typeof window !== 'undefined' && window.location.search.includes('debug=popup')) {
    isDebugMode = true;
    debug('Debug mode enabled');
  }

  // Check if popup should be shown
  function shouldShowPopup() {
    // Debug mode always shows popup
    if (isDebugMode) {
      debug('Debug mode: forcing popup to show');
      return true;
    }

    const stored = localStorage.getItem(CONFIG.STORAGE_KEY);
    if (!stored) {
      debug('No popup seen data found, should show');
      return true;
    }
    
    try {
      const data = JSON.parse(stored);
      const now = Date.now();
      const shouldShow = now > data.expires;
      debug('Popup seen data found', { 
        stored: data, 
        now: new Date(now).toISOString(),
        expires: new Date(data.expires).toISOString(),
        shouldShow 
      });
      return shouldShow;
    } catch (e) {
      debug('Invalid popup seen data, should show', e.message);
      return true;
    }
  }

  // Get or set A/B test variant
  function getVariant() {
    const stored = localStorage.getItem(CONFIG.VARIANT_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (Date.now() < data.expires) {
          debug('Using existing variant', data.variant);
          return data.variant;
        }
      } catch (e) {
        debug('Error parsing variant data', e.message);
      }
    }
    
    // Create new variant
    const newVariant = Math.random() < 0.5 ? 'A' : 'B';
    const expires = Date.now() + (CONFIG.VARIANT_TTL_DAYS * 24 * 60 * 60 * 1000);
    try {
      localStorage.setItem(CONFIG.VARIANT_KEY, JSON.stringify({ variant: newVariant, expires }));
      debug('Created new variant', newVariant);
    } catch (e) {
      debug('Error saving variant', e.message);
    }
    return newVariant;
  }

  // Get personalized content based on path
  function getContent() {
    const path = location.pathname;
    const isVariantB = variant === 'B';
    
    let headline = "Merit-Based Scholarships Available";
    let body = "Exceptional vocal talent deserves recognition. Apply for our merit-based scholarships and receive financial support for your vocal education.";
    let cta = "Get Scholarship Information";
    
    debug('Generated content', { path, variant, headline });
    return { headline, body, cta };
  }

  // Create popup HTML with scholarship-focused design
  function createPopupHTML() {
    const content = getContent();
    
    return `
      <div id="vx-popup-overlay" class="fixed inset-0 z-50 flex items-center justify-center p-6" 
           style="z-index: 999999; background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(20px);"
           role="dialog" aria-labelledby="vx-popup-title" aria-modal="true">
        
        <div class="relative w-full max-w-md transform transition-all duration-500 ease-out" 
             style="animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;">
          
          <!-- Main Card -->
          <div style="
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(40px);
            border-radius: 24px;
            box-shadow: 
              0 32px 64px rgba(0, 0, 0, 0.12),
              0 16px 32px rgba(0, 0, 0, 0.08),
              0 4px 8px rgba(0, 0, 0, 0.04),
              inset 0 1px 0 rgba(255, 255, 255, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 40px 32px 32px 32px;
            position: relative;
            overflow: hidden;
          ">
            
            <!-- Close Button -->
            <button id="vx-popup-close" 
                    style="
                      position: absolute;
                      top: 16px;
                      right: 16px;
                      width: 32px;
                      height: 32px;
                      border: none;
                      background: rgba(0, 0, 0, 0.05);
                      border-radius: 50%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      cursor: pointer;
                      transition: all 0.2s ease;
                      font-size: 18px;
                      color: rgba(0, 0, 0, 0.6);
                    "
                    onmouseover="this.style.background='rgba(0, 0, 0, 0.1)'; this.style.transform='scale(1.1)'"
                    onmouseout="this.style.background='rgba(0, 0, 0, 0.05)'; this.style.transform='scale(1)'"
                    aria-label="Close popup">
              ×
            </button>

            <!-- Header -->
            <div style="text-align: center; margin-bottom: 32px;">
              <div style="
                width: 56px;
                height: 56px;
                margin: 0 auto 20px auto;
                background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
                border-radius: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                box-shadow: 0 8px 24px rgba(245, 158, 11, 0.3);
              ">
                🏆
              </div>
              
              <h2 id="vx-popup-title" style="
                font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
                font-size: 28px;
                font-weight: 600;
                line-height: 1.2;
                color: #1d1d1f;
                margin: 0 0 12px 0;
                letter-spacing: -0.5px;
              ">${content.headline}</h2>
              
              <p style="
                font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif;
                font-size: 17px;
                line-height: 1.47;
                color: rgba(29, 29, 31, 0.7);
                margin: 0;
                font-weight: 400;
              ">${content.body}</p>
            </div>

            <!-- Merit-Based Scholarships Section -->
            <div style="margin-bottom: 32px;">
              <h3 style="
                font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
                font-size: 20px;
                font-weight: 600;
                color: #1d1d1f;
                margin: 0 0 16px 0;
                letter-spacing: -0.3px;
              ">Merit-Based Awards</h3>
              
              <div style="
                display: flex;
                align-items: center;
                margin-bottom: 12px;
                font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif;
                font-size: 15px;
                color: rgba(29, 29, 31, 0.8);
              ">
                <div style="
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background: #f59e0b;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin-right: 12px;
                  font-size: 12px;
                  color: white;
                  font-weight: 600;
                ">✓</div>
                <span>Awarded based on vocal talent and merit</span>
              </div>
              
              <div style="
                display: flex;
                align-items: center;
                margin-bottom: 12px;
                font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif;
                font-size: 15px;
                color: rgba(29, 29, 31, 0.8);
              ">
                <div style="
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background: #f59e0b;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin-right: 12px;
                  font-size: 12px;
                  color: white;
                  font-weight: 600;
                ">✓</div>
                <span>Partial and full program scholarships</span>
              </div>
              
              <div style="
                display: flex;
                align-items: start;
                font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif;
                font-size: 15px;
                color: rgba(29, 29, 31, 0.8);
                line-height: 1.4;
              ">
                <div style="
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background: #f59e0b;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin-right: 12px;
                  font-size: 12px;
                  color: white;
                  font-weight: 600;
                  margin-top: 2px;
                  flex-shrink: 0;
                ">✓</div>
                <span>No financial need requirements</span>
              </div>
            </div>
            
            <!-- Form -->
            <form id="vx-popup-form" style="display: flex; flex-direction: column; gap: 16px;">
              <input 
                type="text" 
                id="vx-popup-name" 
                required 
                placeholder="Your name"
                style="
                  width: 100%;
                  padding: 16px 20px;
                  border: 2px solid rgba(0, 0, 0, 0.1);
                  border-radius: 12px;
                  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif;
                  font-size: 17px;
                  background: rgba(255, 255, 255, 0.8);
                  transition: all 0.2s ease;
                  outline: none;
                  box-sizing: border-box;
                "
                onfocus="this.style.borderColor='#f59e0b'; this.style.background='rgba(255, 255, 255, 1)'; this.style.boxShadow='0 0 0 3px rgba(245, 158, 11, 0.1)'"
                onblur="this.style.borderColor='rgba(0, 0, 0, 0.1)'; this.style.background='rgba(255, 255, 255, 0.8)'; this.style.boxShadow='none'"
                aria-label="Your name">
              
              <input 
                type="email" 
                id="vx-popup-email" 
                required 
                placeholder="Your email address"
                style="
                  width: 100%;
                  padding: 16px 20px;
                  border: 2px solid rgba(0, 0, 0, 0.1);
                  border-radius: 12px;
                  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif;
                  font-size: 17px;
                  background: rgba(255, 255, 255, 0.8);
                  transition: all 0.2s ease;
                  outline: none;
                  box-sizing: border-box;
                "
                onfocus="this.style.borderColor='#f59e0b'; this.style.background='rgba(255, 255, 255, 1)'; this.style.boxShadow='0 0 0 3px rgba(245, 158, 11, 0.1)'"
                onblur="this.style.borderColor='rgba(0, 0, 0, 0.1)'; this.style.background='rgba(255, 255, 255, 0.8)'; this.style.boxShadow='none'"
                aria-label="Email address">
              
              <button 
                type="submit" 
                id="vx-popup-submit"
                style="
                  width: 100%;
                  padding: 16px 24px;
                  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
                  color: white;
                  border: none;
                  border-radius: 12px;
                  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif;
                  font-size: 17px;
                  font-weight: 600;
                  cursor: pointer;
                  transition: all 0.2s ease;
                  box-shadow: 0 4px 16px rgba(245, 158, 11, 0.3);
                  margin-top: 8px;
                "
                onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 6px 20px rgba(245, 158, 11, 0.4)'"
                onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 16px rgba(245, 158, 11, 0.3)'"
                onmousedown="this.style.transform='translateY(0)'"
                onmouseup="this.style.transform='translateY(-1px)'">
                ${content.cta}
              </button>
            </form>
            
            <!-- Privacy Note -->
            <p style="
              text-align: center;
              font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif;
              font-size: 13px;
              color: rgba(29, 29, 31, 0.5);
              margin: 20px 0 0 0;
              line-height: 1.4;
            ">Free scholarship information • No spam • Unsubscribe anytime</p>
          </div>
        </div>
      </div>

      <style>
        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(60px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        #vx-popup-overlay * {
          box-sizing: border-box;
        }
      </style>
    `;
  }

  // Submit to Supabase and send email
  async function submitEmail(email, name) {
    const supabaseUrl = window.VX_SUPABASE_URL;
    const supabaseKey = window.VX_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase credentials not configured');
    }
    
    debug('Submitting scholarship inquiry', { email, name, variant, supabaseUrl: supabaseUrl.substring(0, 20) + '...' });
    
    // Step 1: Save to Supabase email_signups table
    const payload = {
      email: email.trim().toLowerCase(),
      source: 'merit_scholarship_popup',
      variant: `merit_scholarship_${variant}`,
      page_path: location.pathname,
    };
    
    debug('Supabase payload', payload);
    
    const supabaseResponse = await fetch(`${supabaseUrl}/rest/v1/email_signups`, {
      method: 'POST',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(payload),
    });
    
    debug('Supabase response status', supabaseResponse.status);
    
    if (!supabaseResponse.ok) {
      const errorText = await supabaseResponse.text();
      debug('Supabase error response', { status: supabaseResponse.status, text: errorText });
      throw new Error(`Supabase error (${supabaseResponse.status}): ${errorText}`);
    }
    
    debug('Supabase submission successful');
    
    // Step 2: Send scholarship information email via edge function
    try {
      debug('Sending scholarship information via edge function');
      
      const emailPayload = {
        type: 'popup_signup',
        email: email.trim().toLowerCase(),
        name: name.trim() || email.split('@')[0],
        variant: `merit_scholarship_${variant}`,
        source: 'merit_scholarship_popup',
        page_path: location.pathname
      };
      
      debug('Email payload being sent', emailPayload);
      
      const emailResponse = await fetch(`${supabaseUrl}/functions/v1/send-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailPayload),
      });
      
      debug('Email response status', emailResponse.status);
      
      const emailResult = await emailResponse.text();
      debug('Email response body', emailResult);
      
      if (!emailResponse.ok) {
        debug('Email sending failed', { status: emailResponse.status, text: emailResult });
        throw new Error(`Email sending failed: ${emailResult}`);
      }
      
      debug('Scholarship information email sent successfully');
      
    } catch (emailError) {
      debug('Email sending error', emailError.message);
      throw emailError;
    }
    
    return true;
  }

  // Handle form submission with proper error handling
  async function handleSubmit(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('vx-popup-name');
    const emailInput = document.getElementById('vx-popup-email');
    const submitBtn = document.getElementById('vx-popup-submit');
    
    if (!nameInput || !emailInput || !submitBtn) {
      debug('Form elements not found');
      return;
    }
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    
    if (!email || !name) {
      debug('Missing required fields');
      alert('Please fill in both name and email');
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      debug('Invalid email format');
      alert('Please enter a valid email address');
      emailInput.focus();
      return;
    }
    
    debug('Form submitted', { email, name });
    
    // Update button state
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    submitBtn.style.opacity = '0.7';
    
    try {
      await submitEmail(email, name);
      
      // Success
      debug('Scholarship inquiry submitted successfully');
      window.dispatchEvent(new CustomEvent('vx-popup-submitted', { 
        detail: { email, name, variant, timestamp: new Date().toISOString() } 
      }));
      
      // Show success message
      const form = document.getElementById('vx-popup-form');
      if (form) {
        form.innerHTML = `
          <div style="text-align: center; padding: 32px 0;">
            <div style="
              width: 64px;
              height: 64px;
              margin: 0 auto 20px auto;
              background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 28px;
              color: white;
              box-shadow: 0 8px 24px rgba(245, 158, 11, 0.3);
            ">✓</div>
            
            <h3 style="
              font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
              font-size: 22px;
              font-weight: 600;
              color: #1d1d1f;
              margin: 0 0 8px 0;
              letter-spacing: -0.3px;
            ">Scholarship Information Sent!</h3>
            
            <p style="
              font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif;
              font-size: 16px;
              line-height: 1.4;
              color: rgba(29, 29, 31, 0.7);
              margin: 0;
            ">Check your inbox for merit-based scholarship details and application guidance.</p>
          </div>
        `;
      }
      
      // Auto-close after 3 seconds
      setTimeout(() => {
        closePopup();
      }, 3000);
      
    } catch (error) {
      debug('Scholarship inquiry submission failed', error.message);
      
      // Reset button state
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      submitBtn.style.opacity = '1';
      
      // Show error message
      alert('Something went wrong. Please try again or contact us directly.');
      
    }
  }

  // Close popup with cleanup
  function closePopup() {
    const overlay = document.getElementById('vx-popup-overlay');
    if (overlay) {
      overlay.style.opacity = '0';
      overlay.style.transform = 'scale(0.95)';
      setTimeout(() => {
        overlay.remove();
        document.body.style.overflow = '';
        window.dispatchEvent(new CustomEvent('vx-popup-closed'));
        debug('Popup closed and cleaned up');
      }, 300);
    }
  }

  // Mark popup as seen
  function markPopupSeen() {
    if (isDebugMode) {
      debug('Debug mode: not marking popup as seen');
      return;
    }
    
    const expires = Date.now() + (CONFIG.TTL_DAYS * 24 * 60 * 60 * 1000);
    try {
      localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify({ expires }));
      debug('Popup marked as seen', { expires: new Date(expires).toISOString() });
    } catch (e) {
      debug('Error marking popup as seen', e.message);
    }
  }

  // Show popup with comprehensive setup
  function showPopup() {
    if (popupShown) {
      debug('Popup already shown, skipping');
      return;
    }
    
    if (!shouldShowPopup()) {
      debug('Popup should not show based on conditions');
      return;
    }
    
    debug('Showing popup');
    popupShown = true;
    markPopupSeen();
    
    // Create and inject popup
    const popupHTML = createPopupHTML();
    document.body.insertAdjacentHTML('beforeend', popupHTML);
    document.body.style.overflow = 'hidden';
    
    // Setup event listeners with error handling
    try {
      const closeBtn = document.getElementById('vx-popup-close');
      const overlay = document.getElementById('vx-popup-overlay');
      const form = document.getElementById('vx-popup-form');
      const nameInput = document.getElementById('vx-popup-name');
      
      if (closeBtn) {
        closeBtn.addEventListener('click', closePopup);
      }
      
      if (overlay) {
        overlay.addEventListener('click', (e) => {
          if (e.target.id === 'vx-popup-overlay') {
            closePopup();
          }
        });
      }
      
      if (form) {
        form.addEventListener('submit', handleSubmit);
      }
      
      // Focus name input after a short delay
      if (nameInput) {
        setTimeout(() => {
          nameInput.focus();
        }, 100);
      }
      
      // ESC key to close
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          closePopup();
          document.removeEventListener('keydown', handleEscape);
        }
      };
      document.addEventListener('keydown', handleEscape);
      
      debug('Event listeners attached successfully');
      
    } catch (error) {
      debug('Error setting up event listeners', error.message);
    }
    
    // Dispatch event
    window.dispatchEvent(new CustomEvent('vx-popup-shown', { 
      detail: { 
        variant, 
        timestamp: new Date().toISOString(),
        triggers: { timeTriggered, scrollTriggered, exitTriggered }
      } 
    }));
    
    debug('Popup shown successfully');
  }

  // Time-based trigger - primary trigger
  function setupTimeTrigger() {
    debug('Setting up time trigger', `${CONFIG.TIME_DELAY}ms`);
    
    setTimeout(() => {
      if (timeTriggered || popupShown) {
        debug('Time trigger already fired or popup shown');
        return;
      }
      
      timeTriggered = true;
      debug('Time trigger fired');
      showPopup();
    }, CONFIG.TIME_DELAY);
  }

  // Scroll-based trigger - secondary trigger
  function setupScrollTrigger() {
    debug('Setting up scroll trigger', `${CONFIG.SCROLL_THRESHOLD * 100}%`);
    
    let ticking = false;
    
    function handleScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (scrollTriggered || popupShown) {
            ticking = false;
            return;
          }
          
          const scrolled = window.scrollY;
          const total = document.documentElement.scrollHeight - window.innerHeight;
          const percentage = total > 0 ? scrolled / total : 0;
          
          if (percentage >= CONFIG.SCROLL_THRESHOLD) {
            scrollTriggered = true;
            debug('Scroll trigger fired', `${Math.round(percentage * 100)}%`);
            showPopup();
            window.removeEventListener('scroll', handleScroll);
          }
          
          ticking = false;
        });
        
        ticking = true;
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  // Exit intent trigger (desktop only) - tertiary trigger
  function setupExitIntentTrigger() {
    if (window.innerWidth <= 768) {
      debug('Skipping exit intent (mobile device)');
      return;
    }
    
    debug('Setting up exit intent trigger');
    
    function handleMouseLeave(e) {
      if (exitTriggered || popupShown) return;
      
      if (e.clientY <= CONFIG.EXIT_INTENT_THRESHOLD && !e.relatedTarget) {
        exitTriggered = true;
        debug('Exit intent trigger fired');
        showPopup();
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    }
    
    document.addEventListener('mouseleave', handleMouseLeave);
  }

  // Testing functions
  function forceShowPopup() {
    debug('Force showing popup (test mode)');
    localStorage.removeItem(CONFIG.STORAGE_KEY);
    popupShown = false;
    timeTriggered = false;
    scrollTriggered = false;
    exitTriggered = false;
    showPopup();
  }
  
  function clearStorage() {
    localStorage.removeItem(CONFIG.STORAGE_KEY);
    localStorage.removeItem(CONFIG.VARIANT_KEY);
    debug('Storage cleared');
  }
  
  function getStatus() {
    return {
      config: CONFIG,
      state: {
        popupShown,
        timeTriggered,
        scrollTriggered,
        exitTriggered,
        variant,
        shouldShow: shouldShowPopup()
      },
      credentials: {
        supabaseUrl: !!window.VX_SUPABASE_URL,
        supabaseKey: !!window.VX_SUPABASE_ANON_KEY,
      }
    };
  }

  // Expose debugging interface
  window.VX_DEBUG = {
    forceShow: forceShowPopup,
    clearStorage: clearStorage,
    getStatus: getStatus,
    showPopup: showPopup,
    closePopup: closePopup
  };

  // Initialize popup system
  function init() {
    debug('Initializing popup system');
    
    // Check credentials
    const hasSupabase = !!(window.VX_SUPABASE_URL && window.VX_SUPABASE_ANON_KEY);
    
    debug('Credentials check', {
      supabase: hasSupabase,
      supabaseUrl: window.VX_SUPABASE_URL ? `${window.VX_SUPABASE_URL.substring(0, 20)}...` : 'missing',
      supabaseKey: window.VX_SUPABASE_ANON_KEY ? 'present' : 'missing'
    });
    
    if (!hasSupabase) {
      debug('ERROR: No valid Supabase credentials found. Please configure VX_SUPABASE_URL and VX_SUPABASE_ANON_KEY.');
      return;
    }
    
    // Get variant
    variant = getVariant();
    
    debug('Initialization complete', {
      shouldShow: shouldShowPopup(),
      variant: variant,
      config: CONFIG,
      isDebugMode: isDebugMode
    });
    
    if (!shouldShowPopup()) {
      debug('Popup should not show, skipping trigger setup');
      return;
    }
    
    // Setup triggers - time first, then scroll and exit intent as backups
    setupTimeTrigger();
    setupScrollTrigger();
    setupExitIntentTrigger();
    
    debug('All triggers set up successfully');
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
    debug('Waiting for DOM ready');
  } else {
    // Small delay to ensure page is fully ready
    setTimeout(init, 100);
    debug('DOM already ready, initializing with delay');
  }

  debug('Popup script initialization complete');

})();
