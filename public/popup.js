
/**
 * Vocal Excellence Email Popup
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
    
    let headline = isVariantB ? "Unlock Vocal Mastery—Stay Updated!" : "🎤 Elevate Your Voice!";
    let body = "Exclusive insights from top vocal coaches delivered straight to your inbox.";
    let cta = isVariantB ? "Start Now" : "Join Now";
    
    if (path.includes('/curriculum')) {
      body = "Want to see our curriculum in action? Subscribe for a free master-class video.";
    } else if (path.includes('/instructors')) {
      body = "Learn directly from world-class vocal coaches—get their exclusive insights by email.";
    }
    
    debug('Generated content', { path, variant, headline });
    return { headline, body, cta };
  }

  // Create popup HTML with enhanced styling
  function createPopupHTML() {
    const content = getContent();
    
    return `
      <div id="vx-popup-overlay" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" role="dialog" aria-labelledby="vx-popup-title" aria-modal="true" style="z-index: 999999;">
        <div class="bg-white rounded-2xl p-8 w-full max-w-sm mx-auto relative shadow-2xl animate-in fade-in duration-300">
          <button id="vx-popup-close" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 w-6 h-6 flex items-center justify-center text-xl leading-none" aria-label="Close popup" style="line-height: 1;">
            ×
          </button>
          
          <div class="text-center">
            <h2 id="vx-popup-title" class="text-xl font-bold text-gray-800 mb-3">${content.headline}</h2>
            <p class="text-gray-600 mb-4 text-sm leading-relaxed">${content.body}</p>
            
            <div class="text-left mb-6 space-y-1">
              <div class="flex items-center text-sm text-gray-600">
                <span class="mr-2">✔️</span>
                <span>Professional vocal tips</span>
              </div>
              <div class="flex items-center text-sm text-gray-600">
                <span class="mr-2">✔️</span>
                <span>Workshop early access</span>
              </div>
              <div class="flex items-center text-sm text-gray-600">
                <span class="mr-2">✔️</span>
                <span>Free master-class sneak peeks</span>
              </div>
            </div>
            
            <form id="vx-popup-form" class="space-y-4">
              <input 
                type="text" 
                id="vx-popup-name" 
                required 
                placeholder="Enter your name"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-base"
                aria-label="Your name"
                style="font-size: 16px;"
              >
              <input 
                type="email" 
                id="vx-popup-email" 
                required 
                placeholder="Enter your email"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-base"
                aria-label="Email address"
                style="font-size: 16px;"
              >
              <button 
                type="submit" 
                id="vx-popup-submit"
                class="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                ${content.cta}
              </button>
            </form>
            
            <p class="text-xs text-gray-500 mt-4">We respect your privacy—no spam, unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    `;
  }

  // Submit to Supabase and send email
  async function submitEmail(email, name) {
    const supabaseUrl = window.VX_SUPABASE_URL;
    const supabaseKey = window.VX_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase credentials not configured');
    }
    
    debug('Submitting email signup', { email, name, variant, supabaseUrl: supabaseUrl.substring(0, 20) + '...' });
    
    // Step 1: Save to Supabase email_signups table
    const payload = {
      email: email.trim().toLowerCase(),
      source: 'popup',
      variant: variant,
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
    
    // Step 2: Send welcome email via edge function (matching React component structure)
    try {
      debug('Sending welcome email via edge function');
      
      const emailPayload = {
        type: 'popup_signup',
        email: email.trim().toLowerCase(),
        name: name.trim() || email.split('@')[0],
        variant: variant,
        source: 'popup',
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
      
      debug('Welcome email sent successfully');
      
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
    submitBtn.textContent = 'Joining...';
    submitBtn.style.opacity = '0.7';
    
    try {
      await submitEmail(email, name);
      
      // Success
      debug('Email submission successful');
      window.dispatchEvent(new CustomEvent('vx-popup-submitted', { 
        detail: { email, name, variant, timestamp: new Date().toISOString() } 
      }));
      
      // Show success message
      const form = document.getElementById('vx-popup-form');
      if (form) {
        form.innerHTML = `
          <div class="text-center py-4">
            <div class="text-green-600 text-lg mb-2">🎉</div>
            <p class="text-gray-800 font-medium">Welcome aboard!</p>
            <p class="text-gray-600 text-sm mt-1">Check your inbox for exclusive content.</p>
          </div>
        `;
      }
      
      // Auto-close after 2 seconds
      setTimeout(() => {
        closePopup();
      }, 2000);
      
    } catch (error) {
      debug('Email submission failed', error.message);
      
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
    
    // Ensure Tailwind CSS is available
    if (!document.querySelector('link[href*="tailwindcss"]') && 
        !document.querySelector('script[src*="tailwindcss"]') &&
        !document.querySelector('style[data-tailwind]')) {
      debug('Loading Tailwind CSS');
      const link = document.createElement('link');
      link.href = 'https://cdn.tailwindcss.com';
      link.rel = 'stylesheet';
      link.onload = () => debug('Tailwind CSS loaded');
      link.onerror = () => debug('Failed to load Tailwind CSS');
      document.head.appendChild(link);
    }
    
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
