# Supabase to Replit Database Migration Plan

## Current State

### Supabase Services in Use
1. **Supabase Auth** - User authentication (email/password, Google OAuth)
2. **Supabase Database (Postgres)** - Data storage for:
   - `applications` table
   - `contact_submissions` table  
   - `email_signups` table
3. **Supabase Storage** - File storage for application materials (audio files, CVs, recommendation letters)
4. **Supabase Edge Functions** - Serverless functions:
   - `send-email` - Email notifications via Resend API
   - `process-application` - Application processing and file uploads
   - `get-resend-key` - API key retrieval

### Frameworks & Libraries
- **Frontend**: React 18 + Vite + TypeScript
- **Backend**: Express.js server (partially migrated)
- **Database ORM**: Drizzle ORM (already in use for Replit DB)
- **Supabase Client**: `@supabase/supabase-js` v2.49.4

### Environment Configuration
- Supabase credentials hardcoded in:
  - `src/integrations/supabase/client.ts`
  - `index.html` (for popup script)
- Replit DB environment variables already configured:
  - `DATABASE_URL`, `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`

## Target State

1. **No Supabase runtime dependencies** - All Supabase client/SDK removed
2. **No Supabase keys/secrets** - All hardcoded keys removed
3. **All reads/writes go to Replit DB** - Using Drizzle ORM
4. **File storage via local filesystem** - Using Multer (already implemented)
5. **Email via Express routes** - Using Resend API (already implemented)
6. **Authentication** - Either removed or replaced with simple session-based auth

## Risk Register

| # | Risk | Severity | Mitigation |
|---|------|----------|------------|
| 1 | Data loss during migration | Critical | Export all data from Supabase before any changes |
| 2 | Breaking admin dashboard | High | Admin page relies on Supabase queries - must redirect to new API |
| 3 | Authentication removal impacts user experience | Medium | Auth is used for admin access - evaluate if needed |
| 4 | Popup functionality breaks | Medium | Popup saves to `email_signups` via Supabase - must migrate |
| 5 | File uploads fail | High | Already migrated to Multer - verify working |
| 6 | Edge function calls fail silently | Medium | Ensure fallback paths work |
| 7 | CSP policy blocks local resources | Low | Update Content-Security-Policy in index.html |
| 8 | Missing tables in Replit DB | Medium | Add `email_signups` and `contact_submissions` tables to schema |
| 9 | Admin email list hardcoded | Low | Access control remains functional without Supabase |
| 10 | Email extract page breaks | Medium | Relies on Supabase queries - must redirect to new API |

## Segment-by-Segment Plan

### Segment 1: Audit & Documentation (CURRENT)
- [x] Create migration documentation
- [x] Perform repo-wide Supabase audit
- [x] Identify all touchpoints
- [ ] Create checkpoint

### Segment 2: Schema Expansion
- Add missing tables to Drizzle schema:
  - `contact_submissions` (different from `contact_messages`)
  - `email_signups`
- Run `npm run db:push` to sync schema
- Verify tables created

### Segment 3: API Routes for Missing Functionality
- Create `/api/admin/applications` - List all applications
- Create `/api/admin/contacts` - List all contact submissions
- Create `/api/admin/signups` - List all email signups
- Create `/api/email-signup` - Save popup email signups

### Segment 4: Update Frontend to Use New APIs
- Update `Admin.tsx` to use REST APIs instead of Supabase client
- Update `EmailExtract.tsx` to use REST APIs
- Update `VocalUpgradePopup.tsx` to use `/api/email-signup`
- Update `popup.js` to use REST API or remove Supabase dependency

### Segment 5: Remove Authentication (if approved)
- Evaluate if auth is strictly needed for admin access
- Option A: Replace with simple password-protected route
- Option B: Keep auth for admin area only, using session-based auth
- Remove `AuthContext.tsx` Supabase dependencies
- Remove `SocialLoginButtons.tsx` if removing OAuth

### Segment 6: Supabase Eradication
- Remove `@supabase/supabase-js` from package.json
- Delete `src/integrations/supabase/` directory
- Delete `supabase/` directory (Edge Functions)
- Remove Supabase references from index.html CSP
- Remove hardcoded Supabase URLs and keys
- Clean up unused components

### Segment 7: Final Verification
- Test all functionality end-to-end
- Verify no Supabase calls in network tab
- Confirm all data persists to Replit DB
- Document any remaining issues
