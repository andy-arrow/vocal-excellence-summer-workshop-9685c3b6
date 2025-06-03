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

  // Configuration - Updated to 40% scroll threshold
  const CONFIG = {
    STORAGE_KEY: 'vx_popup_seen',
    VARIANT_KEY: 'vx_popup_variant',
    TTL_DAYS: 7,
    VARIANT_TTL_DAYS: 30,
    TIME_DELAY: 45000, // 45 seconds as backup
    SCROLL_THRESHOLD: 0.4, // 40% scroll - PRIMARY TRIGGER
    EXIT_INTENT_THRESHOLD: 15,
    FORCE_SHOW_ON_SCROLL: false, // Normal behavior - only show at 40% scroll
    ALLOWED_PATHS: ['/tuition'], // Only show on tuition page
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

  // Check if current page is allowed
  function isAllowedPage() {
    const currentPath = window.location.pathname;
    const isAllowed = CONFIG.ALLOWED_PATHS.includes(currentPath);
    debug(`Page check: ${currentPath} - ${isAllowed ? 'ALLOWED' : 'NOT ALLOWED'}`);
    return isAllowed;
  }

  // Enable debug mode for better testing
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('debug') === 'popup' || urlParams.get('force_popup') === 'true') {
      isDebugMode = true;
      debug('Debug mode enabled');
    }
  }

  // Check if popup should be shown
  function shouldShowPopup() {
    // First check if we're on an allowed page
    if (!isAllowedPage() && !isDebugMode) {
      debug('Not on allowed page, popup should not show');
      return false;
    }

    if (isDebugMode || CONFIG.FORCE_SHOW_ON_SCROLL) {
      debug('Force mode: popup should show');
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

  // Get scholarship-focused content
  function getContent() {
    const path = location.pathname;
    const isVariantB = variant === 'B';
    
    let headline = "Merit Scholarships";
    let body = "Exceptional vocal talent deserves recognition. Discover financial support for your musical journey.";
    let cta = "Learn More";
    
    if (isVariantB) {
      headline = "Vocal Excellence Awards";
      body = "Your dedication to vocal excellence opens doors. Explore merit-based scholarship opportunities.";
      cta = "Discover Awards";
    }
    
    debug('Generated content', { path, variant, headline });
    return { headline, body, cta };
  }

  // Create zen-focused popup HTML with ultra-minimal Jony Ive design
  function createPopupHTML() {
    const content = getContent();
    
    return `
      <div id="vx-popup-overlay" class="fixed inset-0 z-50 flex items-center justify-center p-6" 
           style="z-index: 999999; background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(120px);"
           role="dialog" aria-labelledby="vx-popup-title" aria-modal="true">
        
        <div class="relative w-full max-w-xs transform transition-all duration-1000 ease-out" 
             style="animation: zenFadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;">
          
          <!-- Main Card - Pure Zen Aesthetic -->
          <div style="
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(60px) saturate(180%);
            border-radius: 24px;
            box-shadow: 
              0 32px 64px -12px rgba(0, 0, 0, 0.04),
              0 1px 0 0 rgba(255, 255, 255, 0.5),
              inset 0 1px 0 0 rgba(255, 255, 255, 0.7);
            border: 0.5px solid rgba(0, 0, 0, 0.03);
            padding: 0;
            position: relative;
            overflow: hidden;
          ">
            
            <!-- Zen Close Button -->
            <button id="vx-popup-close" 
                    style="
                      position: absolute;
                      top: 20px;
                      right: 20px;
                      width: 24px;
                      height: 24px;
                      border: none;
                      background: transparent;
                      border-radius: 50%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      cursor: pointer;
                      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                      font-size: 18px;
                      color: rgba(0, 0, 0, 0.3);
                      z-index: 10;
                      font-weight: 200;
                    "
                    onmouseover="this.style.color='rgba(0, 0, 0, 0.6)'; this.style.transform='scale(1.1)'"
                    onmouseout="this.style.color='rgba(0, 0, 0, 0.3)'; this.style.transform='scale(1)'"
                    aria-label="Close">
              ×
            </button>

            <!-- Header Section - Extreme Minimalism -->
            <div style="
              padding: 56px 40px 32px 40px;
              text-align: center;
            ">
              <!-- Zen Icon -->
              <div style="
                width: 40px;
                height: 40px;
                margin: 0 auto 32px auto;
                background: linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(160, 82, 45, 0.05) 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                position: relative;
                border: 1px solid rgba(139, 69, 19, 0.08);
              ">
                <div style="
                  width: 6px;
                  height: 6px;
                  background: linear-gradient(135deg, #8b4513 0%, #a0522d 100%);
                  border-radius: 50%;
                  opacity: 0.7;
                "></div>
              </div>
              
              <h2 id="vx-popup-title" style="
                font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
                font-size: 22px;
                font-weight: 300;
                line-height: 1.3;
                color: rgba(0, 0, 0, 0.85);
                margin: 0 0 16px 0;
                letter-spacing: -0.2px;
              ">${content.headline}</h2>
              
              <p style="
                font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif;
                font-size: 15px;
                line-height: 1.5;
                color: rgba(0, 0, 0, 0.5);
                margin: 0;
                font-weight: 300;
                letter-spacing: 0.1px;
              ">${content.body}</p>
            </div>

            <!-- Zen Divider -->
            <div style="
              height: 1px;
              background: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.05) 50%, transparent 100%);
              margin: 0 40px;
            "></div>
            
            <!-- Form Section - Pure Simplicity -->
            <div style="padding: 40px;">
              <form id="vx-popup-form" style="display: flex; flex-direction: column; gap: 24px;">
                <!-- Name Input -->
                <div style="position: relative;">
                  <input 
                    type="text" 
                    id="vx-popup-name" 
                    required 
                    placeholder="Name"
                    style="
                      width: 100%;
                      padding: 18px 0;
                      border: none;
                      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                      border-radius: 0;
                      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif;
                      font-size: 16px;
                      font-weight: 300;
                      background: transparent;
                      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                      outline: none;
                      box-sizing: border-box;
                      color: rgba(0, 0, 0, 0.85);
                      letter-spacing: 0.2px;
                    "
                    onfocus="
                      this.style.borderBottomColor='rgba(139, 69, 19, 0.3)';
                      this.style.color='rgba(0, 0, 0, 0.95)';
                    "
                    onblur="
                      this.style.borderBottomColor='rgba(0, 0, 0, 0.1)';
                      this.style.color='rgba(0, 0, 0, 0.85)';
                    "
                    aria-label="Your name">
                </div>
                
                <!-- Email Input -->
                <div style="position: relative;">
                  <input 
                    type="email" 
                    id="vx-popup-email" 
                    required 
                    placeholder="Email"
                    style="
                      width: 100%;
                      padding: 18px 0;
                      border: none;
                      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                      border-radius: 0;
                      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif;
                      font-size: 16px;
                      font-weight: 300;
                      background: transparent;
                      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                      outline: none;
                      box-sizing: border-box;
                      color: rgba(0, 0, 0, 0.85);
                      letter-spacing: 0.2px;
                    "
                    onfocus="
                      this.style.borderBottomColor='rgba(139, 69, 19, 0.3)';
                      this.style.color='rgba(0, 0, 0, 0.95)';
                    "
                    onblur="
                      this.style.borderBottomColor='rgba(0, 0, 0, 0.1)';
                      this.style.color='rgba(0, 0, 0, 0.85)';
                    "
                    aria-label="Email address">
                </div>
                
                <!-- Zen Submit Button -->
                <button 
                  type="submit" 
                  id="vx-popup-submit"
                  style="
                    width: 100%;
                    padding: 20px 0;
                    background: rgba(139, 69, 19, 0.05);
                    color: rgba(139, 69, 19, 0.8);
                    border: 1px solid rgba(139, 69, 19, 0.15);
                    border-radius: 12px;
                    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif;
                    font-size: 15px;
                    font-weight: 400;
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    margin-top: 16px;
                    position: relative;
                    overflow: hidden;
                    letter-spacing: 0.3px;
                  "
                  onmouseover="
                    this.style.background='rgba(139, 69, 19, 0.08)';
                    this.style.borderColor='rgba(139, 69, 19, 0.2)';
                    this.style.color='rgba(139, 69, 19, 0.9)';
                    this.style.transform='translateY(-1px)';
                  "
                  onmouseout="
                    this.style.background='rgba(139, 69, 19, 0.05)';
                    this.style.borderColor='rgba(139, 69, 19, 0.15)';
                    this.style.color='rgba(139, 69, 19, 0.8)';
                    this.style.transform='translateY(0)';
                  "
                  onmousedown="this.style.transform='translateY(0)'"
                  onmouseup="this.style.transform='translateY(-1px)'">
                  ${content.cta}
                </button>
              </form>
              
              <!-- Minimal Privacy Note -->
              <p style="
                text-align: center;
                font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif;
                font-size: 11px;
                color: rgba(0, 0, 0, 0.25);
                margin: 24px 0 0 0;
                line-height: 1.4;
                font-weight: 300;
                letter-spacing: 0.3px;
              ">No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </div>

      <style>
        @keyframes zenFadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
            filter: blur(5px);
          }
          70% {
            opacity: 0.7;
            transform: translateY(-1px) scale(0.995);
            filter: blur(1px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }
        
        #vx-popup-overlay * {
          box-sizing: border-box;
        }

        /* Zen focus states */
        #vx-popup-overlay input::placeholder {
          color: rgba(0, 0, 0, 0.3);
          font-weight: 300;
          transition: all 0.3s ease;
        }

        #vx-popup-overlay input:focus::placeholder {
          color: rgba(0, 0, 0, 0.2);
          transform: translateY(-2px);
        }

        @media (max-width: 480px) {
          #vx-popup-overlay > div {
            max-width: calc(100vw - 48px);
            margin: 0 24px;
          }
          
          #vx-popup-overlay .main-card {
            padding: 32px 24px;
          }
        }
      </style>
    `;
  }

  // Submit scholarship inquiry to Supabase and send email
  async function submitEmail(email, name) {
    const supabaseUrl = window.VX_SUPABASE_URL;
    const supabaseKey = window.VX_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase credentials not configured');
    }
    
    debug('Submitting scholarship inquiry', { email, name, variant });
    
    // Step 1: Save to Supabase email_signups table
    const payload = {
      email: email.trim().toLowerCase(),
      source: 'merit_scholarship_popup',
      variant: `merit_scholarship_${variant}`,
      page_path: location.pathname,
    };
    
    debug('Saving to database', payload);
    
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
    
    if (!supabaseResponse.ok) {
      const errorText = await supabaseResponse.text();
      debug('Database save error', { status: supabaseResponse.status, text: errorText });
      throw new Error(`Database error: ${errorText}`);
    }
    
    debug('Database save successful');
    
    // Step 2: Send scholarship information email
    try {
      const emailPayload = {
        type: 'popup_signup',
        email: email.trim().toLowerCase(),
        name: name.trim() || email.split('@')[0],
        variant: `merit_scholarship_${variant}`,
        source: 'merit_scholarship_popup',
        page_path: location.pathname
      };
      
      debug('Sending scholarship email', emailPayload);
      
      const emailResponse = await fetch(`${supabaseUrl}/functions/v1/send-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailPayload),
      });
      
      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        debug('Email sending failed', { status: emailResponse.status, text: errorText });
        throw new Error(`Email error: ${errorText}`);
      }
      
      debug('Scholarship email sent successfully');
      
    } catch (emailError) {
      debug('Email error (non-critical)', emailError.message);
      // Don't throw - database save was successful
    }
    
    return true;
  }

  // Handle form submission
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
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      debug('Invalid email format');
      alert('Please enter a valid email address');
      emailInput.focus();
      return;
    }
    
    debug('Submitting scholarship inquiry', { email, name });
    
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    submitBtn.style.opacity = '0.6';
    
    try {
      await submitEmail(email, name);
      
      debug('Scholarship inquiry submitted successfully');
      window.dispatchEvent(new CustomEvent('vx-popup-submitted', { 
        detail: { email, name, variant, timestamp: new Date().toISOString() } 
      }));
      
      // Show zen success message
      const form = document.getElementById('vx-popup-form');
      if (form) {
        form.innerHTML = `
          <div style="text-align: center; padding: 40px 0;">
            <div style="
              width: 48px;
              height: 48px;
              margin: 0 auto 24px auto;
              background: rgba(139, 69, 19, 0.1);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 1px solid rgba(139, 69, 19, 0.15);
            ">
              <div style="
                width: 8px;
                height: 8px;
                background: linear-gradient(135deg, #8b4513 0%, #a0522d 100%);
                border-radius: 50%;
                opacity: 0.8;
              "></div>
            </div>
            
            <h3 style="
              font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
              font-size: 18px;
              font-weight: 300;
              color: rgba(0, 0, 0, 0.8);
              margin: 0 0 12px 0;
              letter-spacing: -0.1px;
            ">Sent</h3>
            
            <p style="
              font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif;
              font-size: 14px;
              line-height: 1.5;
              color: rgba(0, 0, 0, 0.5);
              margin: 0;
              font-weight: 300;
              letter-spacing: 0.1px;
            ">Check your inbox for scholarship details.</p>
          </div>
        `;
      }
      
      setTimeout(() => {
        closePopup();
      }, 2500);
      
    } catch (error) {
      debug('Scholarship inquiry submission failed', error.message);
      
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      submitBtn.style.opacity = '1';
      
      alert('Something went wrong. Please try again or contact us directly.');
    }
  }

  // Close popup
  function closePopup() {
    const overlay = document.getElementById('vx-popup-overlay');
    if (overlay) {
      overlay.style.opacity = '0';
      overlay.style.transform = 'scale(0.98)';
      setTimeout(() => {
        overlay.remove();
        document.body.style.overflow = '';
        window.dispatchEvent(new CustomEvent('vx-popup-closed'));
        debug('Popup closed');
      }, 400);
    }
  }

  // Mark popup as seen
  function markPopupSeen() {
    if (isDebugMode || CONFIG.FORCE_SHOW_ON_SCROLL) {
      debug('Debug mode: not marking popup as seen');
      return;
    }
    
    const expires = Date.now() + (CONFIG.TTL_DAYS * 24 * 60 * 60 * 1000);
    try {
      localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify({ expires }));
      debug('Popup marked as seen');
    } catch (e) {
      debug('Error marking popup as seen', e.message);
    }
  }

  // Show popup
  function showPopup() {
    if (popupShown) {
      debug('Popup already shown');
      return;
    }

    // Double-check page before showing
    if (!isAllowedPage() && !isDebugMode) {
      debug('Page check failed before showing popup');
      return;
    }
    
    debug('Showing scholarship popup');
    popupShown = true;
    markPopupSeen();
    
    const popupHTML = createPopupHTML();
    document.body.insertAdjacentHTML('beforeend', popupHTML);
    document.body.style.overflow = 'hidden';
    
    try {
      const closeBtn = document.getElementById('vx-popup-close');
      const overlay = document.getElementById('vx-popup-overlay');
      const form = document.getElementById('vx-popup-form');
      const nameInput = document.getElementById('vx-popup-name');
      
      if (closeBtn) closeBtn.addEventListener('click', closePopup);
      
      if (overlay) {
        overlay.addEventListener('click', (e) => {
          if (e.target.id === 'vx-popup-overlay') closePopup();
        });
      }
      
      if (form) form.addEventListener('submit', handleSubmit);
      
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 200);
      }
      
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          closePopup();
          document.removeEventListener('keydown', handleEscape);
        }
      };
      document.addEventListener('keydown', handleEscape);
      
    } catch (error) {
      debug('Error setting up event listeners', error.message);
    }
    
    window.dispatchEvent(new CustomEvent('vx-popup-shown', { 
      detail: { 
        variant, 
        timestamp: new Date().toISOString(),
        triggers: { timeTriggered, scrollTriggered, exitTriggered }
      } 
    }));
  }

  // Setup scroll trigger - PRIMARY trigger
  function setupScrollTrigger() {
    if (!shouldShowPopup()) {
      debug('Should not show popup, skipping scroll trigger setup');
      return;
    }

    debug('Setting up scroll trigger at 40% scroll');
    
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
            debug('Scroll trigger fired at 40% - showing scholarship popup');
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

  // Setup time trigger - backup
  function setupTimeTrigger() {
    if (!shouldShowPopup()) {
      debug('Should not show popup, skipping time trigger setup');
      return;
    }

    setTimeout(() => {
      if (!timeTriggered && !popupShown) {
        timeTriggered = true;
        debug('Time trigger fired');
        showPopup();
      }
    }, CONFIG.TIME_DELAY);
  }

  // Setup exit intent - tertiary
  function setupExitIntentTrigger() {
    if (window.innerWidth <= 768) return;
    if (!shouldShowPopup()) {
      debug('Should not show popup, skipping exit intent trigger setup');
      return;
    }
    
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
    debug('Force showing popup');
    localStorage.removeItem(CONFIG.STORAGE_KEY);
    popupShown = false;
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

  // Initialize
  function init() {
    debug('Initializing scholarship popup system');
    
    const hasSupabase = !!(window.VX_SUPABASE_URL && window.VX_SUPABASE_ANON_KEY);
    
    if (!hasSupabase) {
      debug('ERROR: No Supabase credentials found');
      return;
    }

    // Check if we're on an allowed page
    if (!isAllowedPage() && !isDebugMode) {
      debug('Not on allowed page, skipping popup initialization');
      return;
    }
    
    variant = getVariant();
    
    debug('Initialization complete', {
      shouldShow: shouldShowPopup(),
      variant: variant,
      forceMode: CONFIG.FORCE_SHOW_ON_SCROLL,
      currentPath: window.location.pathname,
      isAllowed: isAllowedPage()
    });
    
    // Setup triggers - scroll is primary
    setupScrollTrigger();
    setupTimeTrigger();
    setupExitIntentTrigger();
    
    debug('All triggers set up - scroll trigger is ACTIVE');
  }

  // Start when ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 100);
  }

})();
