# Data Migration: Supabase to Replit DB

This directory contains tooling for migrating data from the legacy Supabase-backed PostgreSQL database to the Replit PostgreSQL database.

## Overview

The migration follows a **snapshot-export-import-verify** approach:
1. Export data from Supabase as JSON files
2. Import into Replit DB using migration scripts
3. Verify row counts and data integrity
4. Update sequences to prevent ID conflicts

## Prerequisites

- Access to Supabase dashboard or direct database connection
- Replit DB environment variables configured (`DATABASE_URL`)
- Node.js with tsx available

## Tables to Migrate

| Table | Priority | Dependencies | Notes |
|-------|----------|--------------|-------|
| `applications` | HIGH | None | Main application data |
| `contact_submissions` | MEDIUM | None | Popup/tuition contacts |
| `email_signups` | MEDIUM | None | Newsletter signups |

**Note**: `contact_messages` table is Replit-native and doesn't need migration.

---

## Step 1: Export Data from Supabase

### Option A: Supabase Dashboard (Recommended)
1. Go to Supabase Dashboard > Table Editor
2. For each table (`applications`, `contact_submissions`, `email_signups`):
   - Click on the table
   - Click "Export" > "Export as JSON"
   - Save to `scripts/migrate_data/exports/` as:
     - `applications.json`
     - `contact_submissions.json`
     - `email_signups.json`

### Option B: SQL Export
Run these queries in Supabase SQL Editor and copy results:

```sql
-- Applications
SELECT * FROM applications ORDER BY id;

-- Contact Submissions
SELECT * FROM contact_submissions ORDER BY id;

-- Email Signups
SELECT * FROM email_signups ORDER BY id;
```

### Option C: Direct psql (if you have connection string)
```bash
# Export to JSON
psql "YOUR_SUPABASE_CONNECTION_STRING" -c "COPY (SELECT row_to_json(t) FROM applications t) TO STDOUT" > exports/applications.json
```

---

## Step 2: Prepare Export Directory

```bash
mkdir -p scripts/migrate_data/exports
```

Place your JSON files in this directory. Expected format:

```json
[
  {"id": 1, "first_name": "John", "last_name": "Doe", ...},
  {"id": 2, "first_name": "Jane", "last_name": "Smith", ...}
]
```

---

## Step 3: Run Migration (Dry Run First)

### Dry Run (validates without writing)
```bash
npx tsx scripts/migrate_data/import.ts --dry-run
```

This will:
- Parse all JSON files
- Validate data structure
- Report expected row counts
- NOT write to database

### Actual Import
```bash
npx tsx scripts/migrate_data/import.ts
```

This will:
- Clear existing data (if any) from target tables
- Insert all records preserving IDs
- Update sequences to max(id) + 1

---

## Step 4: Verify Migration

```bash
npx tsx scripts/migrate_data/verify.ts
```

Verification checks:
- Row counts match source files
- Sample records exist and match
- Sequences are correctly set
- No orphaned records

---

## Step 5: Post-Migration Checklist

### Go/No-Go Criteria

| Check | Expected | Actual | Status |
|-------|----------|--------|--------|
| Applications count | [SOURCE] | [DEST] | [ ] |
| Contact submissions count | [SOURCE] | [DEST] | [ ] |
| Email signups count | [SOURCE] | [DEST] | [ ] |
| Sequences updated | Yes | | [ ] |
| Sample record spot-check | Pass | | [ ] |
| Health endpoint | 200 OK | | [ ] |

### If All Checks Pass
1. Update frontend to use REST API instead of Supabase client
2. Monitor application for 24-48 hours
3. Proceed to Segment 4 (frontend cutover)

### If Any Check Fails
1. Review error logs
2. Run `npx tsx scripts/migrate_data/rollback.ts` if needed
3. Fix issues and retry import

---

## Troubleshooting

### "Duplicate key" errors
The import script clears tables first. If you see this, the clear step may have failed.
```bash
npx tsx scripts/migrate_data/clear-tables.ts
npx tsx scripts/migrate_data/import.ts
```

### Sequence not updating
Manually reset:
```sql
SELECT setval('applications_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM applications), false);
```

### JSON parse errors
Ensure your export is a valid JSON array, not newline-delimited JSON.

---

## File Structure

```
scripts/migrate_data/
├── README.md           # This file
├── import.ts           # Main import script
├── verify.ts           # Verification script
├── rollback.ts         # Emergency rollback
├── clear-tables.ts     # Clear target tables
└── exports/            # Place JSON exports here
    ├── applications.json
    ├── contact_submissions.json
    └── email_signups.json
```
