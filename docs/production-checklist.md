# Production Readiness Checklist

## Pre-Deployment Checklist

### Database Health
- [ ] Run health check: `GET /api/health` returns `status: "healthy"`
- [ ] Verify database latency < 100ms in health check response
- [ ] Confirm all indexes are created (see Database Indexes section)
- [ ] Test all CRUD operations work correctly

### API Endpoints
- [ ] `POST /api/applications` - Application submission works with file uploads
- [ ] `GET /api/applications` - Admin can retrieve all applications
- [ ] `POST /api/contact` - Contact form submissions work
- [ ] `POST /api/email-signups` - Email signups are saved
- [ ] `POST /api/admin/verify` - Admin login works with correct password

### Environment Variables
- [ ] `DATABASE_URL` - PostgreSQL connection string (auto-configured by Replit)
- [ ] `ADMIN_PASSWORD` - Set for admin dashboard access
- [ ] `RESEND_API_KEY` - Set for email notifications (optional but recommended)

### Security
- [ ] Admin password is secure (not default or simple)
- [ ] No secrets exposed in code or logs
- [ ] Input validation enabled on all POST endpoints
- [ ] File upload limits enforced (50MB max)

### Performance
- [ ] Application starts in < 10 seconds
- [ ] Health check latency < 50ms typical
- [ ] No memory leaks observed in long-running tests

## Database Indexes

The following indexes are configured for optimal query performance:

| Table | Index Name | Column(s) | Purpose |
|-------|-----------|-----------|---------|
| applications | applications_email_idx | email | Email lookups |
| applications | applications_created_at_idx | created_at | Date ordering |
| contact_messages | contact_messages_email_idx | email | Email lookups |
| contact_messages | contact_messages_created_at_idx | created_at | Date ordering |
| contact_submissions | contact_submissions_email_idx | email | Email lookups |
| contact_submissions | contact_submissions_created_at_idx | created_at | Date ordering |
| email_signups | email_signups_email_idx | email | Email lookups/dedup |
| email_signups | email_signups_created_at_idx | created_at | Date ordering |

### Verify Indexes
```sql
SELECT indexname, tablename 
FROM pg_indexes 
WHERE schemaname = 'public' 
ORDER BY tablename, indexname;
```

## Health Check Endpoint

### Endpoint
```
GET /api/health
```

### Expected Response (Healthy)
```json
{
  "status": "healthy",
  "database": "connected",
  "backend": "replit",
  "backendDescription": "Replit PostgreSQL (Drizzle ORM)",
  "latencyMs": 5,
  "timestamp": "2025-01-03T12:00:00.000Z"
}
```

### Expected Response (Unhealthy)
```json
{
  "status": "unhealthy",
  "database": "disconnected",
  "backend": "replit",
  "error": "Connection refused",
  "timestamp": "2025-01-03T12:00:00.000Z"
}
```

## Monitoring Recommendations

### Key Metrics to Track
1. **API Response Times** - Should be < 200ms for most endpoints
2. **Database Latency** - Should be < 50ms (check via health endpoint)
3. **Error Rates** - Monitor 4xx and 5xx responses
4. **Application Submissions** - Track daily submission counts

### Log Monitoring
Check workflow logs for:
- `[DataBackend]` - Confirms which database backend is active
- `Error` - Any server-side errors
- `Application saved:` - Confirms successful submissions

## Validation Rules

The following API endpoints use Zod validation schemas:

| Schema | Required Fields | Validation |
|--------|----------------|------------|
| applicationSchema | firstName, lastName, email, phone, termsAgreed | Email format, phone 5-30 chars |
| contactMessageSchema | name, email, message | Email format, message max 5000 chars |
| contactSubmissionSchema | name, email | Email format, optional fields |
| emailSignupSchema | email | Email format, source defaults to "website" |
| adminVerifySchema | password | Non-empty string |

## Emergency Contacts

For production issues:
1. Check Replit status page for platform issues
2. Review workflow logs for error messages
3. Check `/api/health` endpoint status
4. Refer to `docs/rollback-plan.md` for recovery procedures

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2026-01-03 | 1.0 | Initial production readiness checklist |
| 2026-01-03 | 1.1 | Added database indexes, Zod validation |
