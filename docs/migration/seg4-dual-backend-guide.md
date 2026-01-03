# Segment 4: Dual-Backend Cutover Guide

**Date**: January 3, 2026  
**Status**: Dual-run ready

---

## Overview

The application now supports switching between Supabase and Replit DB backends using a single environment variable. This enables gradual, low-risk migration.

## Configuration

### Environment Variable

```bash
DATA_BACKEND=replit   # Use Replit PostgreSQL (default)
DATA_BACKEND=supabase # Use Supabase PostgreSQL
```

Default: `replit` (if not set)

### How to Flip to Replit DB (Development)

1. Ensure DATA_BACKEND is not set, or set to `replit`:
   ```bash
   # In Replit Secrets (or .env)
   DATA_BACKEND=replit
   ```

2. Restart the application:
   ```bash
   npm run dev
   ```

3. Verify via health endpoint:
   ```bash
   curl http://localhost:5000/api/health
   ```
   
   Expected response:
   ```json
   {
     "status": "healthy",
     "database": "connected",
     "backend": "replit",
     "backendDescription": "Replit PostgreSQL (Drizzle ORM)",
     "latencyMs": 23
   }
   ```

### How to Flip to Supabase (Fallback)

1. Set environment variable:
   ```bash
   DATA_BACKEND=supabase
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-anon-key
   ```

2. Restart the application

3. Verify via health endpoint - should show `backend: "supabase"`

---

## Architecture

### Storage Factory Pattern

```
server/storage-factory.ts
├── getStorage()          # Returns IStorage instance based on DATA_BACKEND
├── getBackendInfo()      # Returns current backend info
└── logBackendSelection() # Logs which backend is active

server/storage.ts         # Replit DB implementation (DatabaseStorage)
server/storage-supabase.ts # Supabase implementation (SupabaseStorage)
```

Both implementations share the same `IStorage` interface, ensuring consistent API behavior.

### Data Shape Compatibility

The Supabase adapter maps snake_case fields to camelCase:
- `first_name` → `firstName`
- `timestamp` → `createdAt`
- `vocal_type` → `vocalType`

### Hybrid Routing

The `contact_messages` table only exists in Replit DB (not in Supabase). The HybridStorage class ensures this table always uses Replit DB regardless of DATA_BACKEND setting:

```
HybridStorage
├── applications        → primary backend (configurable)
├── contact_submissions → primary backend (configurable)
├── email_signups       → primary backend (configurable)
└── contact_messages    → always Replit DB
```

---

## Verification

### Smoke Tests

Run the full smoke test suite:

```bash
npx tsx scripts/smoke-test.ts
```

Expected output:
```
Total: 7/7 passed
Average response time: 17ms
All smoke tests passed!
```

### Manual Test Steps

1. **Health Check**
   ```bash
   curl http://localhost:5000/api/health
   ```
   Verify `backend` field shows expected value.

2. **Read Applications**
   ```bash
   curl http://localhost:5000/api/applications
   ```
   Should return array of applications.

3. **Read Contact Submissions**
   ```bash
   curl http://localhost:5000/api/contact-submissions
   ```

4. **Read Email Signups**
   ```bash
   curl http://localhost:5000/api/email-signups
   ```

5. **Create Test Record**
   ```bash
   curl -X POST http://localhost:5000/api/email-signups \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","source":"manual-test"}'
   ```

---

## Before/After Behavior Notes

### What Changed

| Component | Before | After |
|-----------|--------|-------|
| Storage layer | Direct Supabase client | Factory-selected storage |
| Health endpoint | No backend info | Shows `backend` and `backendDescription` |
| Logging | No backend logging | Logs backend selection at startup |

### What Stays the Same

- API endpoint signatures
- Response data shapes (camelCase)
- Authentication (still via Supabase Auth)
- Frontend code (unchanged - frontend still uses Supabase client for now)

---

## Rollback Procedure

If issues are discovered:

1. Set `DATA_BACKEND=supabase`
2. Restart application
3. Verify health endpoint shows `backend: "supabase"`

No data loss occurs because:
- Supabase data remains intact
- Replit DB data remains intact
- Only the active backend changes

---

## Next Steps (Segment 5)

After Replit DB is validated in production:

1. Update frontend (Admin.tsx, EmailExtract.tsx) to use REST API instead of Supabase client
2. Remove Supabase client dependency from data-fetching code
3. Keep Supabase Auth working (separate concern)

---

## Files Created/Modified

| File | Purpose |
|------|---------|
| `server/storage-factory.ts` | Backend factory with DATA_BACKEND logic |
| `server/storage-supabase.ts` | Supabase adapter implementing IStorage |
| `server/routes.ts` | Updated to use storage factory |
| `scripts/smoke-test.ts` | Automated smoke tests for all endpoints |
| `docs/migration/seg4-dual-backend-guide.md` | This document |

---

## Checkpoint

**Name**: seg4_dual_run_cutover_ready
