# Vocal Excellence Summer Programme

## Overview

This project is a web application for the Vocal Excellence Summer Workshop, a vocal training program in Limassol, Cyprus. Its primary purpose is to attract prospective students, provide comprehensive program and instructor information, and facilitate the application process, including secure submission of audio files, CVs, and recommendation letters. The application features a public-facing marketing website, an intuitive application form with file upload capabilities, and an administrative dashboard for managing student submissions. The business vision is to establish a premier online presence for the workshop, streamlining operations and expanding reach to a global audience interested in elite vocal training.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
-   **Framework**: React 18 with TypeScript
-   **Build Tool**: Vite with SWC
-   **Routing**: React Router DOM
-   **State Management**: TanStack React Query
-   **Styling**: Tailwind CSS with shadcn/ui (Radix UI primitives)
-   **Animations**: Framer Motion
-   **Form Handling**: React Hook Form with Zod validation
-   **Design Patterns**: Lazy Loading (React.lazy()), Error Boundaries, Mobile-First responsiveness, Google Tag Manager for analytics.

### Backend
-   **Runtime**: Node.js with Express
-   **API Pattern**: REST API (`/api/*` endpoints)
-   **File Uploads**: Multer for multipart form data
-   **Database ORM**: Drizzle ORM with PostgreSQL dialect
-   **Server Entry**: `server/index.ts` (serves API and static frontend files)

### Data Storage
-   **Database**: Replit PostgreSQL via Drizzle ORM (schema in `shared/schema.ts`)
-   **File Storage**: Local filesystem (`uploads/` directory)
-   **Authentication**: Password-based admin authentication (`ADMIN_PASSWORD` env variable)

### Key Architectural Decisions
-   **No Vite Middleware in Production**: To prevent HTTP 426 errors and ensure stability, the server always serves pre-built static files from the `dist/` directory. The workflow runs `npm run build && npm run dev`.
-   **Server Stability Safeguards**: Includes immediate port binding, a `/health` endpoint, graceful shutdown handlers, error boundaries for uncaught exceptions, and explicit static file serving preference.
-   **Cache Prevention**: Aggressive cache-prevention headers are used for HTML pages to ensure users always receive the latest content.

## External Dependencies

### Database & Backend Services
-   **PostgreSQL**: Primary database (Replit PostgreSQL via Drizzle ORM).

### Email Services
-   **Custom Email Service**: Server-side notifications for application confirmations.
-   **Mailchimp**: Optional integration for email signups.

### Analytics & Tracking
-   **Google Tag Manager**: For analytics and event tracking (Container ID `GTM-WRPV2R2P`).
-   **FingerprintJS**: For browser fingerprinting (via CDN).

### CDN Resources
-   **Google Fonts**: Playfair Display, Inter, Outfit.

### Third-Party Libraries
-   **Canvas Confetti**: For celebration animations.