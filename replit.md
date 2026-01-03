# Vocal Excellence Summer Programme

## Overview

This is a web application for the Vocal Excellence Summer Workshop, a vocal training program in Limassol, Cyprus. The application allows prospective students to learn about the program, view instructor information, and submit applications with supporting materials (audio files, CVs, recommendation letters). It features a marketing website with program information, an application form with file uploads, and an admin dashboard for managing submissions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with SWC for fast compilation
- **Routing**: React Router DOM for client-side navigation
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library (Radix UI primitives)
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express server
- **API Pattern**: REST API endpoints under `/api/*`
- **File Uploads**: Multer for handling multipart form data (audio files, documents)
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Server Entry**: `server/index.ts` runs both API and serves Vite in development

### Data Storage
- **Database**: Replit PostgreSQL via Drizzle ORM
- **Schema Location**: `shared/schema.ts` defines tables for applications, contact messages, and email signups
- **File Storage**: Local filesystem uploads stored in `uploads/` directory
- **Authentication**: Password-based admin authentication via ADMIN_PASSWORD environment variable

### Key Design Patterns
- **Lazy Loading**: React.lazy() for route-level code splitting
- **Error Boundaries**: Centralized error handling for graceful failures
- **Analytics Integration**: Google Tag Manager with custom event tracking
- **Mobile-First**: Responsive design with `useIsMobile` hook for conditional rendering

### Project Structure
```
src/
├── components/     # React components (UI, forms, sections)
├── pages/          # Route page components
├── hooks/          # Custom React hooks
├── utils/          # Utility functions (analytics, security, file upload)
├── constants/      # Application constants (dates, config)
└── stores/         # State stores (file uploads)

server/
├── index.ts        # Express server entry point
├── routes.ts       # API route definitions
├── storage.ts      # Database operations (Replit PostgreSQL via Drizzle ORM)
├── db.ts           # Database connection
└── emailService.ts # Email notification service (Resend API)

shared/
└── schema.ts       # Drizzle database schema (shared between client/server)
```

## External Dependencies

### Database & Backend Services
- **PostgreSQL**: Primary database (configured via DATABASE_URL environment variable) using Replit PostgreSQL with Drizzle ORM

### Email Services
- **Custom Email Service**: Server-side email notifications for application confirmations
- **Mailchimp**: Optional integration for email popup signups

### Analytics & Tracking
- **Google Tag Manager**: Container ID `GTM-WRPV2R2P` for analytics and event tracking
- **Custom Analytics**: Event tracking utilities in `src/utils/analytics.ts`

### Third-Party Libraries
- **FingerprintJS**: Browser fingerprinting for visitor identification (via CDN)
- **Canvas Confetti**: Celebration animations for form submissions

### CDN Resources
- **Google Fonts**: Playfair Display, Inter, Outfit font families
- **GPT Engineer**: Component tagging for Lovable integration

## Documentation

### Operations & Maintenance
- `docs/production-checklist.md` - Pre-deployment checklist and health monitoring
- `docs/migration-guide.md` - Database migration discipline and procedures
- `docs/rollback-plan.md` - Code and database rollback procedures

### Migration Documentation (Historical)
- `docs/migration/` - Supabase to Replit PostgreSQL migration notes