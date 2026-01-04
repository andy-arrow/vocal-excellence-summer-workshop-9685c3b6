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

## Server Stability Safeguards (IRONCLAD)

The following safeguards prevent HTTP 426 errors and server instability:

### Critical Architecture Decision: No Vite Middleware Mode

**Root Cause of HTTP 426**: Even with `hmr: false` and `ws: false`, Vite middleware mode:
1. Still injects `/@vite/client` script into HTML
2. Still serves the HMR client at `/@vite/client` endpoint
3. The HMR client tries to connect to WebSocket on port 24678
4. Replit's proxy infrastructure returns HTTP 426 when it encounters WebSocket upgrade requests

**Solution**: Server always serves pre-built static files from `dist/`:
- Workflow runs `npm run build && npm run dev`
- Server checks for `dist/index.html` and serves static files
- Falls back to Vite middleware only if `dist/` doesn't exist

### .replit Configuration
```toml
[[ports]]
localPort = 5000
externalPort = 5000
# NEVER add port 24678 mapping - causes HTTP 426 errors
```

### Code-Level Safeguards (server/index.ts)

1. **Immediate Port Binding** - Server binds to port FIRST, before async operations
2. **Health Check Endpoint** - `/health` returns "OK" (sync, no DB dependency)
3. **Graceful Shutdown Handlers** - SIGTERM and SIGINT handlers for clean shutdown
4. **Error Boundaries** - uncaughtException and unhandledRejection handlers
5. **Static File Serving** - Prefers `dist/` over Vite middleware to avoid WebSocket issues
6. **Environment Detection** - `isDev = process.env.NODE_ENV !== 'production'`

### Pre-Deploy Checklist
- [ ] Port 24678 NOT in .replit
- [ ] Workflow runs `npm run build && npm run dev`
- [ ] dist/ folder contains built frontend
- [ ] Health endpoint exists at /health
- [ ] NODE_ENV=production set for production
- [ ] Graceful shutdown handlers present

## Recent Changes

### January 4, 2026 - Eliminated Vite Middleware Mode (Final Fix for HTTP 426)
- **Root Cause Identified**: Vite middleware mode injects HMR client that tries to connect to port 24678
- **Solution**: Server now serves pre-built static files from `dist/` instead of using Vite middleware
- **Workflow Updated**: Now runs `npm run build && npm run dev` to ensure frontend is built
- **Trade-off**: Frontend changes require rebuild (no hot reload); this is acceptable for stability

### January 4, 2026 - Implemented Server Stability Safeguards
- Added immediate port binding before async operations
- Added `/health` endpoint for deployment health checks
- Added graceful shutdown handlers (SIGTERM, SIGINT)
- Added error boundaries (uncaughtException, unhandledRejection)