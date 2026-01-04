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

### January 4, 2026 - Updated Landing Page with Professional Marketing Copy
- **Hero Section**: Changed to "Train Like a Professional. 7 Days of Elite Vocal Coaching in Cyprus."
- **Subheadline**: "Direct mentorship from West End performers, Netflix actors, and Juilliard alumni"
- **Tagline**: Added "Master your technique. Conquer stage fright. Build your portfolio."
- **CTA Button**: Changed "Register Now" to "Secure Your Spot"
- **About Section**: Renamed to "Elevate Your Artistry" with benefit-focused features (Precision Coaching, Industry-Standard Assets, Unshakeable Confidence, Vocal Longevity, High-Level Networking)
- **Curriculum Section**: Renamed to "An Intensive Artist Curriculum" with reorganized modules (World-Class Faculty, Performance Mastery, Career Toolkit, Holistic Health)
- **CTA Section**: Added "Application takes 5 minutes" messaging
- **Footer**: Updated tagline to "Cyprus's premier destination for elite musical education"

### January 4, 2026 - Updated Tuition Page with Professional Marketing Copy
- **Hero**: Changed tagline to "7 Intensive Days to Unlock Your Full Vocal Potential"
- **Pricing**: Updated to "All-Inclusive Tuition: €749" with clearer description
- **Features**: Reorganized into logical categories (Core Training, Personalized Coaching, Career Preparation, Amenities)
- **Section Title**: Changed "What You'll Get" to "An Immersive Artist Experience"
- **Payment Section**: Renamed to "Investment in Your Art" with clearer payment plan breakdown
- **FAQ**: Rewrote answers to be more professional and benefit-focused
- **CTAs**: Updated to "Final call: Registration closes May 24, 2026"

### January 4, 2026 - Added Aggressive Cache Prevention Headers
- **Problem**: Browser cached old broken HTML, requiring hard refresh to see fixes
- **Solution**: Server now sends three cache-prevention headers for all HTML pages:
  - `Cache-Control: no-cache, no-store, must-revalidate`
  - `Pragma: no-cache` (HTTP/1.0 compatibility)
  - `Expires: 0` (legacy browser compatibility)
- **Assets**: JS/CSS still cached for 1 day (performance) but use content hashes so new versions auto-refresh

### January 4, 2026 - Fixed Blank Page CSP Issue
- **Root Cause**: Preload hints for `/src/main.tsx` and `/src/App.tsx` were being inlined as base64 data URLs during Vite build, blocked by CSP
- **Solution**: Removed manual preload hints from index.html - Vite handles module preloading automatically
- **Also Fixed**: Removed fail-fast `process.exit(1)` causing restart loops; changed catch-all to middleware instead of Express 5 wildcard route

### January 4, 2026 - Updated Workshop to 2026
- **New Dates**: June 29 – July 5, 2026 (7 days, up from 5 days)
- **Central Constants**: Updated `src/constants/applicationDates.ts` as single source of truth
- **Files Updated**: All date/year references across 14+ files including HeroSection, SummerProgramme, ApplicationForm, email templates, tuition pages
- **Pricing**: €749 total (€107/day), application deadline May 24, 2026, early bird ends March 1, 2026

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