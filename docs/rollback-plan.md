# Rollback Plan

## Overview

This document outlines procedures for reverting code and database changes in case of issues.

## Code Rollback

### Using Replit Checkpoints

Replit automatically creates checkpoints during development. To rollback:

1. Click **View Checkpoints** in the Replit interface
2. Select the checkpoint before the problematic change
3. Click **Restore** to revert code, files, and optionally database

### Using Git

For manual git rollback (if needed):

```bash
# View recent commits
git log --oneline -10

# Revert to specific commit (creates new commit)
git revert <commit-hash>

# Or reset to previous state (destructive)
git reset --hard <commit-hash>
```

## Database Rollback

### Option 1: Replit Database Rollback (Recommended)

1. Go to Replit's Database panel
2. Click on **Rollback** option
3. Select a snapshot from before the issue
4. Confirm the rollback

### Option 2: Manual Data Restoration

If automatic rollback isn't available, follow these steps:

#### Step 1: Assess the Damage
```sql
-- Check row counts
SELECT 'applications' as table_name, COUNT(*) FROM applications
UNION ALL
SELECT 'contact_messages', COUNT(*) FROM contact_messages
UNION ALL
SELECT 'email_signups', COUNT(*) FROM email_signups;
```

#### Step 2: Export Current Data (Before Changes)
```bash
# Export to CSV for backup
psql $DATABASE_URL -c "COPY applications TO STDOUT CSV HEADER" > applications_backup.csv
```

#### Step 3: Restore from Backup
If you have a backup file:
```bash
psql $DATABASE_URL -c "COPY applications FROM STDIN CSV HEADER" < applications_backup.csv
```

### Option 3: Schema Rollback

If schema changes caused issues:

1. **Revert schema.ts** to previous version using checkpoints
2. **Run db:push** to sync:
   ```bash
   npm run db:push
   ```
3. If column was added, manually drop if needed:
   ```sql
   ALTER TABLE applications DROP COLUMN IF EXISTS problematic_column;
   ```

## Emergency Procedures

### Application Won't Start

1. Check logs: Review workflow logs for errors
2. Check database: `GET /api/health` or verify DATABASE_URL
3. Rollback code: Use Replit checkpoint
4. Contact support: If database is corrupted

### Data Corruption

1. **Stop writes immediately** - Disable the application
2. **Assess scope** - Which tables/rows are affected
3. **Use checkpoint rollback** - Restore to last known good state
4. **Verify data** - Check row counts and sample data

### Performance Degradation

1. Check database latency: `/api/health` shows `latencyMs`
2. Verify indexes exist:
   ```sql
   SELECT indexname FROM pg_indexes WHERE tablename = 'applications';
   ```
3. Check for long-running queries in logs

## Prevention Checklist

Before deploying changes:

- [ ] Test in development environment
- [ ] Verify database health check passes
- [ ] Create checkpoint before major changes
- [ ] Document what changes were made
- [ ] Have rollback plan ready

## Checkpoint Naming Convention

Use descriptive checkpoint names:
- `seg6_hardening_complete` - After completing segment 6
- `pre_schema_change_YYYY-MM-DD` - Before schema modifications
- `stable_release_vX.X` - After verified stable releases

## Contact for Emergencies

For database emergencies:
1. Check Replit status page for platform issues
2. Use Replit support for database recovery assistance
3. Review this document for self-service options
