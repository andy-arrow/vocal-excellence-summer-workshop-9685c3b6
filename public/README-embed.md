
# Vocal Excellence Email Popup - Embedding Instructions

## Quick Setup (1 minute)

### Step 1: Configure Environment Variables

Before embedding, set up your API credentials. Add these variables to your site:

**For Mailchimp:**
- `VX_MAILCHIMP_API_KEY`: Your Mailchimp API key
- `VX_MAILCHIMP_LIST_ID`: Your Mailchimp list/audience ID

**For Supabase (fallback):**
- `VX_SUPABASE_URL`: Your Supabase project URL
- `VX_SUPABASE_ANON_KEY`: Your Supabase anonymous key

### Step 2: Create Supabase Table (if using fallback)

Run this SQL in your Supabase dashboard:

```sql
CREATE TABLE email_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  source TEXT DEFAULT 'popup',
  variant TEXT,
  page_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Step 3: Embed the Script

Choose your platform:

## WordPress

Add to your theme's `functions.php` or use a plugin like "Insert Headers and Footers":

```php
// Add to wp_head or wp_footer hook
function add_vocal_excellence_popup() {
    ?>
    <script>
    // Configure credentials
    window.VX_MAILCHIMP_API_KEY = 'your-mailchimp-api-key';
    window.VX_MAILCHIMP_LIST_ID = 'your-list-id';
    window.VX_SUPABASE_URL = 'https://your-project.supabase.co';
    window.VX_SUPABASE_ANON_KEY = 'your-anon-key';
    </script>
    <script src="/popup.js"></script>
    <?php
}
add_action('wp_footer', 'add_vocal_excellence_popup');
```

## Wix

1. Go to Settings → SEO & Meta → Custom Code
2. Add to "Body - End" section:

```html
<script>
// Configure credentials
window.VX_MAILCHIMP_API_KEY = 'your-mailchimp-api-key';
window.VX_MAILCHIMP_LIST_ID = 'your-list-id';
window.VX_SUPABASE_URL = 'https://your-project.supabase.co';
window.VX_SUPABASE_ANON_KEY = 'your-anon-key';
</script>
<script src="https://your-site.com/popup.js"></script>
```

## Static HTML Sites

Add before closing `</body>` tag:

```html
<script>
// Configure credentials
window.VX_MAILCHIMP_API_KEY = 'your-mailchimp-api-key';
window.VX_MAILCHIMP_LIST_ID = 'your-list-id';
window.VX_SUPABASE_URL = 'https://your-project.supabase.co';
window.VX_SUPABASE_ANON_KEY = 'your-anon-key';
</script>
<script src="/popup.js"></script>
```

## Shopify

1. Go to Online Store → Themes → Actions → Edit code
2. Open `theme.liquid`
3. Add before `</body>`:

```html
<script>
window.VX_MAILCHIMP_API_KEY = '{{ settings.mailchimp_api_key }}';
window.VX_MAILCHIMP_LIST_ID = '{{ settings.mailchimp_list_id }}';
window.VX_SUPABASE_URL = '{{ settings.supabase_url }}';
window.VX_SUPABASE_ANON_KEY = '{{ settings.supabase_anon_key }}';
</script>
<script src="{{ 'popup.js' | asset_url }}"></script>
```

## Getting Your API Keys

### Mailchimp
1. Go to [Mailchimp Account & Billing](https://admin.mailchimp.com/account/api/)
2. Generate API key under "Your API keys"
3. Get List ID from Audience → Settings → Audience name and defaults

### Supabase
1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to Settings → API
4. Copy "Project URL" and "anon public" key

## Features Included

✅ **Smart Triggers**: 15s delay, 50% scroll, or exit intent  
✅ **Frequency Capping**: Shows once per week per visitor  
✅ **A/B Testing**: Automatic 50/50 split testing  
✅ **Personalization**: Different copy for /curriculum and /instructors pages  
✅ **Mobile Responsive**: Optimized for all screen sizes  
✅ **Accessibility**: ARIA labels, focus trapping, keyboard navigation  
✅ **Fallback System**: Mailchimp primary, Supabase backup  
✅ **Analytics Events**: Track show/submit/close events  

## Analytics Tracking

Listen for these custom events in your analytics:

```javascript
window.addEventListener('vx-popup-shown', (e) => {
  // Track popup display
  gtag('event', 'popup_shown', { variant: e.detail.variant });
});

window.addEventListener('vx-popup-submitted', (e) => {
  // Track successful signup
  gtag('event', 'email_signup', { 
    variant: e.detail.variant,
    email: e.detail.email 
  });
});

window.addEventListener('vx-popup-closed', () => {
  // Track popup close
  gtag('event', 'popup_closed');
});
```

## Troubleshooting

**Popup not showing?**
- Check browser console for errors
- Verify API credentials are set correctly
- Clear localStorage: `localStorage.removeItem('vx_popup_seen')`

**Emails not being collected?**
- Verify Mailchimp API key and List ID
- Check Supabase table exists and credentials are correct
- Check browser network tab for API errors

**Styling issues?**
- The script auto-loads Tailwind CSS if not detected
- Ensure no CSS conflicts with popup classes

## Bundle Size
- **popup.js**: ~8KB minified + gzipped
- **Dependencies**: None (uses native browser APIs)
- **External**: Tailwind CSS CDN (only if not already loaded)

Total impact: <12KB as required.
