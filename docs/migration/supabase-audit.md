# Supabase Audit Report

**Date**: January 3, 2026  
**Project**: Vocal Excellence Summer Workshop  
**Purpose**: Identify all Supabase touchpoints for migration to Replit DB

## Summary

The application uses Supabase for:
1. **Authentication** (email/password, Google OAuth)
2. **Database** (PostgreSQL - applications, contacts, email signups)
3. **Storage** (file uploads for application materials)
4. **Edge Functions** (email sending, application processing)

---

## Files to Edit (Grouped by Area)

### Core Supabase Client
| File | Usage | Priority |
|------|-------|----------|
| `src/integrations/supabase/client.ts` | Main Supabase client initialization with hardcoded URL/key | HIGH - DELETE |

### Authentication
| File | Usage | Priority |
|------|-------|----------|
| `src/contexts/AuthContext.tsx` | Full auth flow: signIn, signUp, signOut, resetPassword, updatePassword | HIGH |
| `src/components/SocialLoginButtons.tsx` | Google OAuth login | HIGH |
| `src/pages/Admin.tsx` | Uses supabase.auth.signOut(), auth state for admin access | HIGH |

### Data Access (Database Queries)
| File | Usage | Priority |
|------|-------|----------|
| `src/pages/Admin.tsx` | Queries `applications` and `contact_submissions` tables | HIGH |
| `src/pages/EmailExtract.tsx` | Queries `applications`, `contact_submissions`, `email_signups` tables | HIGH |
| `src/services/formSubmissionService.ts` | Inserts to `applications`, calls Edge Functions | HIGH |
| `src/components/VocalUpgradePopup.tsx` | Inserts to `email_signups` table, calls send-email function | MEDIUM |

### Storage (File Uploads)
| File | Usage | Priority |
|------|-------|----------|
| `src/utils/fileUpload.ts` | Uploads to `application_materials` bucket | MEDIUM (already has Express fallback) |

### Edge Function Calls
| File | Usage | Priority |
|------|-------|----------|
| `src/contexts/AuthContext.tsx` | Calls `send-email` function on signup | MEDIUM |
| `src/services/formSubmissionService.ts` | Calls `process-application` and `send-email` functions | MEDIUM |
| `src/utils/fileUpload.ts` | Calls `process-application` function | MEDIUM |
| `src/components/VocalUpgradePopup.tsx` | Calls `send-email` function | MEDIUM |

### Configuration Files
| File | Usage | Priority |
|------|-------|----------|
| `index.html` | Hardcoded Supabase URL/key for popup, CSP allows Supabase domains | HIGH |
| `public/popup.js` | Uses window.VX_SUPABASE_URL/KEY for email signups | MEDIUM |
| `src/components/PopupCredentialsLoader.tsx` | Loads VITE_SUPABASE_URL/KEY to window | LOW |
| `src/components/PopupTestControls.tsx` | Testing utility for popup | LOW |

### Supabase Edge Functions (To Delete)
| File | Purpose |
|------|---------|
| `supabase/functions/send-email/index.ts` | Email sending via Resend API |
| `supabase/functions/send-email/supabaseClient.ts` | Supabase client for function |
| `supabase/functions/send-email/popup-signup-handler.ts` | Popup signup email handler |
| `supabase/functions/process-application/index.ts` | Application processing |
| `supabase/functions/process-application/supabaseClient.ts` | Supabase client for function |
| `supabase/functions/process-application/emailHandler.ts` | Email handling |
| `supabase/functions/process-application/fileHandler.ts` | File upload handling |
| `supabase/functions/process-application/types.ts` | Type definitions |
| `supabase/functions/get-resend-key/index.ts` | API key retrieval |
| `supabase/config.toml` | Supabase project configuration |

---

## Data Model Inventory

### Tables in Supabase (to migrate/replicate)

#### 1. `applications` table
Already partially defined in `shared/schema.ts` (Drizzle). Fields:
- id, firstName, lastName, email, phone, whereFrom, age, socialMedia
- dateOfBirth, nationality, vocalRange, yearsOfSinging, musicalBackground
- teacherName, teacherEmail, reasonForApplying, heardAboutUs
- scholarshipInterest, dietaryRestrictions, areasOfInterest, specialNeeds
- termsAgreed, audioFile1Path, audioFile2Path, cvFilePath, recommendationFilePath
- createdAt

**Note**: Supabase version has additional fields: `timestamp`, `source`, lowercase column names

#### 2. `contact_submissions` table (NOT in Drizzle schema)
Fields inferred from code:
- id, name, email, vocal_type, message, timestamp, source

**Action Required**: Add to `shared/schema.ts`

#### 3. `email_signups` table (NOT in Drizzle schema)
Fields inferred from code:
- id, email, source, variant, page_path, created_at

**Action Required**: Add to `shared/schema.ts`

### Storage Buckets
- `application_materials` - Application file uploads (audio, CV, recommendations)

---

## Risk Flags

### High Complexity Items
1. **AuthContext.tsx** - Complex auth state management with session restoration
2. **formSubmissionService.ts** - Multi-step submission with fallbacks
3. **popup.js** - Standalone script with Supabase dependency

### Breaking Change Risks
1. **Admin dashboard** will break immediately if Supabase is removed without API replacement
2. **Email sending** has fallback to Express route but needs verification
3. **File uploads** already use Multer fallback - should work

### Missing in Replit DB
1. `contact_submissions` table schema
2. `email_signups` table schema
3. No existing data migration script

---

## Environment Variables

### Supabase (to be removed)
- `VITE_SUPABASE_URL` - Referenced in PopupCredentialsLoader
- `VITE_SUPABASE_ANON_KEY` - Referenced in PopupCredentialsLoader

### Hardcoded Values (SECURITY RISK)
- `src/integrations/supabase/client.ts`:
  - URL: `https://aualmslyjnapymacktzg.supabase.co`
  - Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- `index.html`:
  - Same URL and key exposed in HTML

### Already Configured for Replit DB
- `DATABASE_URL`, `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`
- `RESEND_API_KEY` (for email service)

---

## Partially Migrated Components

The following have already been migrated and use Express/Drizzle:

1. **Application Submission** - `server/routes.ts` handles `/api/applications`
2. **Email Sending** - `server/emailService.ts` uses Resend directly
3. **Contact Form** - `server/routes.ts` handles `/api/contact`
4. **File Storage** - `server/routes.ts` uses Multer for uploads

These work independently of Supabase and should continue functioning.

---

## Verification Checklist (Segment 1)

- [x] All Supabase import statements identified
- [x] All Supabase environment variable usages found
- [x] All Edge Function calls mapped
- [x] Storage bucket usage documented
- [x] Database tables inventoried
- [x] Risk flags identified
- [ ] Checkpoint created

---

## Next Steps

After approval, proceed to **Segment 2**:
1. Add `contact_submissions` and `email_signups` to Drizzle schema
2. Run database schema push
3. Create data export script for existing Supabase data
