
/**
 * Vocal Excellence Email Popup
 * 
 * Configuration options (set before loading script):
 * - window.VX_MAILCHIMP_API_KEY: Mailchimp API key
 * - window.VX_MAILCHIMP_LIST_ID: Mailchimp list ID
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

  console.log('VX Popup script loaded');

  // Configuration
  const CONFIG = {
    STORAGE_KEY: 'vx_popup_seen',
    VARIANT_KEY: 'vx_popup_variant',
    TTL_DAYS: 7,
    VARIANT_TTL_DAYS: 30,
    TIME_DELAY: 5000, // Reduced to 5 seconds for testing
    SCROLL_THRESHOLD: 0.3, // Reduced to 30% for easier testing
    EXIT_INTENT_THRESHOLD: 10, // pixels from top
  };

  // State
  let popupShown = false;
  let timeTriggered = false;
  let scrollTriggered = false;
  let variant = 'A';

  // Debug function
  function debug(message, data = null) {
    console.log(`[VX Popup] ${message}`, data || '');
  }

  // Check if popup should be shown
  function shouldShowPopup() {
    const stored = localStorage.getItem(CONFIG.STORAGE_KEY);
    if (!stored) {
      debug('No popup seen data, should show');
      return true;
    }
    
    try {
      const data = JSON.parse(stored);
      const now = Date.now();
      const shouldShow = now > data.expires;
      debug('Popup seen data found', { stored: data, shouldShow });
      return shouldShow;
    } catch {
      debug('Invalid popup seen data, should show');
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
      } catch {}
    }
    
    // Create new variant
    const newVariant = Math.random() < 0.5 ? 'A' : 'B';
    const expires = Date.now() + (CONFIG.VARIANT_TTL_DAYS * 24 * 60 * 60 * 1000);
    localStorage.setItem(CONFIG.VARIANT_KEY, JSON.stringify({ variant: newVariant, expires }));
    debug('Created new variant', newVariant);
    return newVariant;
  }

  // Get personalized content based on path
  function getContent() {
    const path = location.pathname;
    const isVariantB = variant === 'B';
    
    let headline = isVariantB ? "Unlock Vocal Mastery—Stay Updated!" : "🎤 Elevate Your Voice!";
    let body = "Exclusive insights from top vocal coaches delivered straight to your inbox.";
    let cta = isVariantB ? "Start Now" : "Join Now";
    
    if (path.startsWith('/curriculum')) {
      body = "Want to see our curriculum in action? Subscribe for a free master-class video.";
    } else if (path.startsWith('/instructors')) {
      body = "Learn directly from world-class vocal coaches—get their exclusive insights by email.";
    }
    
    debug('Generated content', { path, variant, headline });
    return { headline, body, cta };
  }

  // Create popup HTML
  function createPopupHTML() {
    const content = getContent();
    
    return `
      <div id="vx-popup-overlay" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" role="dialog" aria-labelledby="vx-popup-title" aria-modal="true">
        <div class="bg-white rounded-2xl p-8 w-full max-w-sm mx-auto relative">
          <button id="vx-popup-close" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 w-6 h-6 flex items-center justify-center text-xl" aria-label="Close popup">
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
                type="email" 
                id="vx-popup-email" 
                required 
                placeholder="Enter your email"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                aria-label="Email address"
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

  // Submit to Mailchimp
  async function submitToMailchimp(email) {
    const apiKey = window.VX_MAILCHIMP_API_KEY;
    const listId = window.VX_MAILCHIMP_LIST_ID;
    
    if (!apiKey || !listId) {
      throw new Error('Mailchimp credentials not configured');
    }
    
    const datacenter = apiKey.split('-')[1];
    const url = `https://${datacenter}.api.mailchimp.com/3.0/lists/${listId}/members`;
    
    debug('Submitting to Mailchimp', { email, listId });
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`anystring:${apiKey}`)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
        tags: ['vocal-excellence-popup', `variant-${variant}`],
      }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Mailchimp API error');
    }
    
    return response.json();
  }

  // Submit to Supabase with returning: 'minimal' to avoid 401 on anonymous inserts
  async function submitToSupabase(email) {
    const supabaseUrl = window.VX_SUPABASE_URL;
    const supabaseKey = window.VX_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase credentials not configured');
    }
    
    debug('Submitting to Supabase', { email, variant });
    
    const response = await fetch(`${supabaseUrl}/rest/v1/email_signups`, {
      method: 'POST',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal', // Avoid 401 error on anonymous inserts
      },
      body: JSON.stringify({
        email: email,
        source: 'popup',
        variant: variant,
        page_path: location.pathname,
      }),
    });
    
    if (!response.ok) {
      const error = await response.text();
      debug('Supabase error', error);
      throw new Error(`Supabase error: ${error}`);
    }
    
    debug('Supabase submission successful');
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    
    const email = document.getElementById('vx-popup-email').value.trim();
    const submitBtn = document.getElementById('vx-popup-submit');
    
    if (!email) return;
    
    debug('Form submitted', { email });
    
    // Update button state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Joining...';
    
    try {
      // Try Mailchimp first
      try {
        await submitToMailchimp(email);
        debug('Mailchimp submission successful');
      } catch (mailchimpError) {
        debug('Mailchimp submission failed', mailchimpError.message);
        // Fallback to Supabase
        await submitToSupabase(email);
      }
      
      // Success
      window.dispatchEvent(new CustomEvent('vx-popup-submitted', { detail: { email, variant } }));
      
      // Show success message
      document.getElementById('vx-popup-form').innerHTML = `
        <div class="text-center py-4">
          <div class="text-green-600 text-lg mb-2">🎉</div>
          <p class="text-gray-800 font-medium">Welcome aboard!</p>
          <p class="text-gray-600 text-sm mt-1">Check your inbox for exclusive content.</p>
        </div>
      `;
      
      // Auto-close after 2 seconds
      setTimeout(() => {
        closePopup();
      }, 2000);
      
    } catch (error) {
      debug('All submission methods failed', error);
      
      // Show error message but still thank the user
      document.getElementById('vx-popup-form').innerHTML = `
        <div class="text-center py-4">
          <p class="text-gray-800 font-medium">Thanks for your interest!</p>
          <p class="text-gray-600 text-sm mt-1">Please try again later or contact us directly.</p>
        </div>
      `;
      
      setTimeout(() => {
        closePopup();
      }, 3000);
    }
  }

  // Close popup
  function closePopup() {
    const overlay = document.getElementById('vx-popup-overlay');
    if (overlay) {
      overlay.remove();
      document.body.style.overflow = '';
      window.dispatchEvent(new CustomEvent('vx-popup-closed'));
      debug('Popup closed');
    }
  }

  // Mark popup as seen
  function markPopupSeen() {
    const expires = Date.now() + (CONFIG.TTL_DAYS * 24 * 60 * 60 * 1000);
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify({ expires }));
    debug('Popup marked as seen', { expires: new Date(expires) });
  }

  // Show popup
  function showPopup() {
    if (popupShown || !shouldShowPopup()) {
      debug('Popup not shown', { popupShown, shouldShow: shouldShowPopup() });
      return;
    }
    
    debug('Showing popup');
    popupShown = true;
    markPopupSeen();
    
    // Inject Tailwind CSS if not present
    if (!document.querySelector('link[href*="tailwindcss"]') && !document.querySelector('script[src*="tailwindcss"]')) {
      debug('Loading Tailwind CSS');
      const link = document.createElement('link');
      link.href = 'https://cdn.tailwindcss.com';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    
    // Create and inject popup
    const popupHTML = createPopupHTML();
    document.body.insertAdjacentHTML('beforeend', popupHTML);
    document.body.style.overflow = 'hidden';
    
    // Add event listeners
    document.getElementById('vx-popup-close').addEventListener('click', closePopup);
    document.getElementById('vx-popup-overlay').addEventListener('click', (e) => {
      if (e.target.id === 'vx-popup-overlay') closePopup();
    });
    document.getElementById('vx-popup-form').addEventListener('submit', handleSubmit);
    
    // ESC key to close
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closePopup();
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);
    
    // Focus trap
    const focusableElements = document.querySelectorAll('#vx-popup-overlay input, #vx-popup-overlay button');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (firstElement) firstElement.focus();
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });
    
    window.dispatchEvent(new CustomEvent('vx-popup-shown', { detail: { variant } }));
    debug('Popup shown successfully');
  }

  // Time-based trigger
  function setupTimeTriger() {
    debug('Setting up time trigger', `${CONFIG.TIME_DELAY}ms`);
    setTimeout(() => {
      if (!timeTriggered) {
        timeTriggered = true;
        debug('Time trigger fired');
        showPopup();
      }
    }, CONFIG.TIME_DELAY);
  }

  // Scroll-based trigger
  function setupScrollTrigger() {
    debug('Setting up scroll trigger', `${CONFIG.SCROLL_THRESHOLD * 100}%`);
    function handleScroll() {
      if (scrollTriggered) return;
      
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = scrolled / total;
      
      if (percentage >= CONFIG.SCROLL_THRESHOLD) {
        scrollTriggered = true;
        debug('Scroll trigger fired', `${Math.round(percentage * 100)}%`);
        showPopup();
        window.removeEventListener('scroll', handleScroll);
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  // Exit intent trigger (desktop only)
  function setupExitIntentTrigger() {
    if (window.innerWidth <= 768) {
      debug('Skipping exit intent (mobile)');
      return; // Mobile check
    }
    
    debug('Setting up exit intent trigger');
    function handleMouseLeave(e) {
      if (e.clientY <= CONFIG.EXIT_INTENT_THRESHOLD && e.relatedTarget === null) {
        debug('Exit intent trigger fired');
        showPopup();
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    }
    
    document.addEventListener('mouseleave', handleMouseLeave);
  }

  // Force show popup for testing (remove in production)
  function forceShowPopup() {
    localStorage.removeItem(CONFIG.STORAGE_KEY);
    debug('Force showing popup (test mode)');
    showPopup();
  }

  // Expose for testing
  window.VX_DEBUG = {
    forceShow: forceShowPopup,
    clearStorage: () => {
      localStorage.removeItem(CONFIG.STORAGE_KEY);
      localStorage.removeItem(CONFIG.VARIANT_KEY);
      debug('Storage cleared');
    },
    config: CONFIG
  };

  // Initialize
  function init() {
    debug('Initializing popup system', {
      shouldShow: shouldShowPopup(),
      variant: getVariant(),
      config: CONFIG
    });
    
    if (!shouldShowPopup()) {
      debug('Popup should not show, exiting');
      return;
    }
    
    variant = getVariant();
    
    // Only setup triggers if we should show popup
    setupTimeTriger();
    setupScrollTrigger();
    setupExitIntentTrigger();
    
    debug('All triggers set up');
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  debug('Popup script initialization complete');

})();
