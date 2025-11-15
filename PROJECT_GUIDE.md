# EliteWeb Portfolio - Professional Web Design Platform

## Overview
A comprehensive portfolio website for showcasing high-end web development services with integrated client management, payment processing, and project tracking.

## Features

### Client-Facing Features
- **Landing Page**: Beautiful hero section with animated elements showcasing premium services
- **Pricing Page**: Three service tiers (Single Page $2,000, Multi Page $8,000, Custom TBD)
- **User Authentication**: Signup/Signin with JWT tokens
- **Client Dashboard**: Real-time project tracking and status updates
- **Stripe Integration**: Secure payment processing with automatic account creation

### Admin Features
- **Admin Dashboard**: Complete control panel with multiple tabs
- **Revenue Analytics**: Interactive graphs showing financial data over time
- **Project Management**: Create, edit, update, and delete projects
- **Client Management**: View all clients and their project history
- **Project Calendar**: Visual timeline of ongoing and scheduled projects
- **Status Tracking**: Monitor projects (Pending, In Progress, Completed, Cancelled)

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT (jsonwebtoken)
- **Payment**: Stripe
- **Animations**: Framer Motion
- **Charts**: Recharts
- **UI Feedback**: React Hot Toast

## Getting Started

### Prerequisites
```bash
Node.js 18+ installed
```

### Installation
The project is already set up and running!

### Environment Variables
Update `.env.local` with your actual Stripe keys:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

### Demo Accounts

**Admin Account**
- Email: admin@eliteweb.com
- Password: admin123
- Access: Full admin dashboard with all features

**Client Account**
- Email: client@example.com
- Password: client123
- Access: Client dashboard with demo project

## Key Features

### Design
- Clean white background with gold (#EAB308) and black accents
- Responsive design optimized for all devices
- Beautiful animations and transitions
- Professional shadowing and borders

### Payment Flow
1. User selects a package from pricing page
2. If not logged in, prompted to create account during checkout
3. Redirects to Stripe checkout
4. On successful payment, account is auto-created (if new user)
5. Project is automatically created and linked to user
6. User receives access to dashboard

### Admin Capabilities
- **Overview Tab**: Revenue stats, project counts, interactive revenue chart
- **Projects Tab**: Full CRUD operations on projects
- **Clients Tab**: View all registered clients
- **Calendar Tab**: Visual timeline of project schedules

### Security Features
- Password hashing with bcryptjs
- JWT token authentication
- Protected API routes
- Role-based access control (admin/client)
- Stripe webhook verification

## Project Structure
```
bender-portfolio/
├── app/
│   ├── page.tsx                  # Landing page
│   ├── pricing/page.tsx          # Pricing packages
│   ├── signin/page.tsx           # Sign in
│   ├── signup/page.tsx           # Sign up
│   ├── dashboard/page.tsx        # Client dashboard
│   ├── admin/page.tsx            # Admin dashboard
│   ├── checkout/success/page.tsx # Payment success
│   └── api/
│       ├── auth/                 # Authentication endpoints
│       ├── checkout/             # Stripe checkout
│       ├── projects/             # Project CRUD
│       ├── admin/                # Admin-only endpoints
│       └── webhook/              # Stripe webhooks
├── lib/
│   ├── prisma.ts                 # Database client
│   ├── auth.ts                   # JWT utilities
│   └── stripe.ts                 # Stripe client
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── seed.ts                   # Seed script
└── components/                   # Reusable components
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/signin` - Login

### Projects
- `GET /api/projects` - Get user's projects (or all if admin)
- `POST /api/projects` - Create project (admin only)
- `PATCH /api/projects/[id]` - Update project (admin only)
- `DELETE /api/projects/[id]` - Delete project (admin only)

### Admin
- `GET /api/admin/stats` - Revenue and analytics data
- `GET /api/admin/users` - All users/clients

### Payment
- `POST /api/checkout` - Create Stripe checkout session
- `POST /api/webhook/stripe` - Handle Stripe webhooks

## Color Scheme
- **Primary**: Gold (#EAB308 / yellow-600)
- **Secondary**: Black (#000000)
- **Background**: White (#FFFFFF)
- **Accent**: Gray tones for contrast

## Next Steps

1. **Add Stripe Keys**: Update `.env.local` with your actual Stripe API keys
2. **Customize Branding**: Update "EliteWeb" to your brand name
3. **Add Content**: Customize copy and descriptions
4. **Deploy**: Deploy to Vercel or your preferred platform
5. **Email Integration**: Add email notifications for new projects
6. **Custom Domain**: Configure your domain in production

## Development

The application is currently running at http://localhost:3001

To stop the server:
```bash
# Press Ctrl+C in the terminal
```

To restart:
```bash
npm run dev
```

## Database Management

Reset database:
```bash
npx prisma db push --force-reset
npx tsx prisma/seed.ts
```

View database in Prisma Studio:
```bash
npx prisma studio
```

## Production Deployment

1. Set up production database (PostgreSQL recommended)
2. Update `DATABASE_URL` in environment variables
3. Add production Stripe keys
4. Deploy to Vercel:
```bash
vercel deploy --prod
```

## Support

For any issues or questions, refer to:
- Next.js Documentation: https://nextjs.org/docs
- Prisma Documentation: https://www.prisma.io/docs
- Stripe Documentation: https://stripe.com/docs

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
