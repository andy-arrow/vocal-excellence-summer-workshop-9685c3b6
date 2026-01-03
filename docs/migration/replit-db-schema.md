# Replit Database Schema Documentation

## Overview

This document describes the database schema for the Vocal Excellence Summer Workshop application, now running on Replit's built-in PostgreSQL database with Drizzle ORM.

## Database Connection

The database connection is managed via environment variables:
- `DATABASE_URL` - Full PostgreSQL connection string
- `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE` - Individual connection parameters

Connection is established in `server/db.ts` using `node-postgres` (pg) pool with Drizzle ORM.

## Tables

### 1. applications

Stores workshop application submissions.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | SERIAL | NO | auto | Primary key |
| first_name | TEXT | NO | - | Applicant's first name |
| last_name | TEXT | NO | - | Applicant's last name |
| email | TEXT | NO | - | Contact email |
| phone | TEXT | NO | - | Contact phone |
| where_from | TEXT | YES | - | Location/origin |
| age | TEXT | YES | - | Age |
| social_media | TEXT | YES | - | Social media handles |
| date_of_birth | TEXT | YES | - | Date of birth |
| nationality | TEXT | YES | - | Nationality |
| vocal_range | TEXT | YES | - | Vocal range (Soprano, Alto, etc.) |
| years_of_singing | TEXT | YES | - | Experience level |
| musical_background | TEXT | YES | - | Musical training background |
| teacher_name | TEXT | YES | - | Current teacher name |
| teacher_email | TEXT | YES | - | Teacher contact email |
| reason_for_applying | TEXT | YES | - | Application essay |
| heard_about_us | TEXT | YES | - | Marketing source |
| scholarship_interest | BOOLEAN | YES | false | Interested in scholarship |
| dietary_restrictions | JSONB | YES | - | Dietary requirements |
| areas_of_interest | TEXT | YES | - | Areas of interest |
| special_needs | TEXT | YES | - | Accessibility requirements |
| terms_agreed | BOOLEAN | YES | false | Terms acceptance |
| audio_file_1_path | TEXT | YES | - | Path to first audio file |
| audio_file_2_path | TEXT | YES | - | Path to second audio file |
| cv_file_path | TEXT | YES | - | Path to CV document |
| recommendation_file_path | TEXT | YES | - | Path to recommendation letter |
| created_at | TIMESTAMP | YES | now() | Submission timestamp |
| source | TEXT | YES | - | Submission source URL |

### 2. contact_messages

Stores general contact form submissions (from /contact page).

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | SERIAL | NO | auto | Primary key |
| name | TEXT | NO | - | Sender name |
| email | TEXT | NO | - | Sender email |
| message | TEXT | NO | - | Message content |
| created_at | TIMESTAMP | YES | now() | Submission timestamp |

### 3. contact_submissions

Stores contact form submissions with vocal type (from popup/tuition page).

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | SERIAL | NO | auto | Primary key |
| name | TEXT | NO | - | Sender name |
| email | TEXT | NO | - | Sender email |
| vocal_type | TEXT | YES | - | Selected vocal type |
| message | TEXT | YES | - | Optional message |
| source | TEXT | YES | - | Submission source |
| created_at | TIMESTAMP | YES | now() | Submission timestamp |

### 4. email_signups

Stores email signup submissions from popups and forms.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | SERIAL | NO | auto | Primary key |
| email | TEXT | NO | - | Email address |
| source | TEXT | YES | - | Signup source |
| variant | TEXT | YES | - | A/B test variant |
| page_path | TEXT | YES | - | Page where signup occurred |
| created_at | TIMESTAMP | YES | now() | Signup timestamp |

## Migration Strategy

### Drizzle ORM Migrations

The project uses Drizzle ORM with the following commands:

```bash
# Push schema changes to database (safe, non-destructive)
npm run db:push

# Generate SQL migration files (for version control)
npm run db:generate

# View database in Drizzle Studio
npm run db:studio
```

### Schema Definition

All table definitions are in `shared/schema.ts` using Drizzle's `pgTable` function. This file is shared between client and server for type safety.

### Data Access Layer (DAL)

The DAL is implemented in `server/storage.ts` with the `DatabaseStorage` class implementing `IStorage` interface:

```typescript
interface IStorage {
  createApplication(data: InsertApplication): Promise<Application>;
  getApplication(id: number): Promise<Application | undefined>;
  getAllApplications(): Promise<Application[]>;
  createContactMessage(data: InsertContactMessage): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;
  createContactSubmission(data: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  createEmailSignup(data: InsertEmailSignup): Promise<EmailSignup>;
  getAllEmailSignups(): Promise<EmailSignup[]>;
  healthCheck(): Promise<{ healthy: boolean; latencyMs: number; error?: string }>;
}
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/health | Database health check |
| POST | /api/applications | Submit application |
| GET | /api/applications | List all applications |
| GET | /api/applications/:id | Get single application |
| POST | /api/contact | Submit contact message |
| GET | /api/contact-messages | List contact messages |
| POST | /api/contact-submissions | Submit contact submission |
| GET | /api/contact-submissions | List contact submissions |
| POST | /api/email-signups | Submit email signup |
| GET | /api/email-signups | List email signups |

## Verification Commands

```bash
# Run database health check
curl http://localhost:5000/api/health

# Run automated tests
npx tsx scripts/test-db.ts
```

## Notes

1. **No Supabase dependencies** - The DAL operates independently of Supabase
2. **Type safety** - TypeScript types are inferred from Drizzle schema
3. **Idempotent migrations** - `db:push` is safe to run multiple times
4. **File storage** - Files are stored locally in `uploads/` directory (not in database)
