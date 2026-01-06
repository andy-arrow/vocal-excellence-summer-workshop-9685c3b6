# Vocal Excellence Summer Programme

A comprehensive web application for the Vocal Excellence Summer Workshop 2026 in Limassol, Cyprus.

## Overview

This application serves as the online presence for an elite vocal training program, featuring:

- **Marketing Website**: Showcases program details, curriculum, and world-class instructors
- **Application System**: Multi-step form with file uploads (audio recordings, CV, recommendation letters)
- **Payment Integration**: Stripe Checkout for registration fee processing
- **Admin Dashboard**: Secure file management and application review

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite with SWC
- Tailwind CSS with shadcn/ui components
- React Router DOM for routing
- TanStack React Query for data fetching
- Framer Motion for animations

### Backend
- Node.js with Express
- Drizzle ORM with PostgreSQL
- Multer for file uploads
- Stripe API for payments

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

Required secrets:
- `STRIPE_SECRET_KEY` - Stripe API key for payment processing
- `RESEND_API_KEY` - Email service API key
- `ADMIN_NOTIFICATION_EMAIL` - Admin email for notifications
- `ADMIN_PASSWORD` - Password for admin file access

## Project Structure

```
├── client/           # Frontend React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── lib/
├── server/           # Backend Express API
│   ├── routes.ts
│   ├── storage.ts
│   └── email.ts
├── shared/           # Shared types and schemas
│   └── schema.ts
└── public/           # Static assets
    └── images/
```

## License

All rights reserved.
