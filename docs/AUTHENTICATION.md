# Authentication Setup

This document describes the authentication system implemented in the Collax application.

## Overview

Collax uses NextAuth.js (v4) for comprehensive authentication with support for:
- **Google OAuth** - Social login with Google accounts
- **Email/Password** - Traditional credentials-based authentication
- **JWT Sessions** - Secure, stateless session management
- **Protected Routes** - Middleware-based route protection

## Features

### 🔐 **Multiple Authentication Methods**
- Google OAuth integration (production-ready with proper credentials)
- Email/password authentication (demo implementation)
- Extensible provider system for adding more auth methods

### 🛡️ **Security Features**
- JWT-based sessions for scalability
- CSRF protection built-in with NextAuth.js
- Secure cookie handling
- Environment-based configuration

### 🎨 **User Experience**
- Clean, responsive authentication UI
- Automatic redirects after authentication
- Persistent sessions across browser refreshes
- Clear authentication status in navigation

### 🛣️ **Route Protection**
- Middleware-based protection for sensitive routes
- Automatic redirect to sign-in for unauthenticated users
- Callback URL preservation for seamless UX

## Files Structure

### Core Authentication
- `apps/web/lib/auth.ts` - NextAuth.js configuration
- `apps/web/app/api/auth/[...nextauth]/route.ts` - NextAuth.js API routes
- `apps/web/middleware.ts` - Route protection middleware

### UI Components
- `apps/web/components/session-provider.tsx` - Session context provider
- `apps/web/components/auth-nav.tsx` - Authentication navigation component
- `apps/web/app/auth/signin/page.tsx` - Sign-in page
- `apps/web/app/auth/signup/page.tsx` - Sign-up page

### Database Schema
- `packages/prisma/prisma/schema.prisma` - User, Account, Session models

### Configuration
- `apps/web/.env.example` - Environment variables template
- `apps/web/types/next-auth.d.ts` - TypeScript type definitions

## Environment Setup

Copy the environment template and configure:

```bash
cp apps/web/.env.example apps/web/.env.local
```

Required environment variables:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Optional: Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database (when Prisma adapter is enabled)
DATABASE_URL="postgresql://username:password@localhost:5432/collax"
```

## Protected Routes

The following routes are automatically protected by middleware:
- `/dashboard/*` - User dashboard and related pages
- `/notes/*` - Note management pages
- `/profile/*` - User profile pages

Add more protected routes by updating the `matcher` config in `apps/web/middleware.ts`.

## Usage Examples

### Check Authentication Status
```tsx
import { useSession } from "next-auth/react"

function MyComponent() {
  const { data: session, status } = useSession()
  
  if (status === "loading") return <p>Loading...</p>
  if (status === "unauthenticated") return <p>Please sign in</p>
  
  return <p>Welcome, {session.user.name}!</p>
}
```

### Server-Side Authentication
```tsx
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function Page() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return <div>Please sign in</div>
  }
  
  return <div>Hello, {session.user.name}!</div>
}
```

### Programmatic Sign In/Out
```tsx
import { signIn, signOut } from "next-auth/react"

// Sign in with credentials
await signIn("credentials", {
  email: "user@example.com",
  password: "password",
  callbackUrl: "/dashboard"
})

// Sign in with Google
await signIn("google", { callbackUrl: "/dashboard" })

// Sign out
await signOut({ callbackUrl: "/" })
```

## Production Deployment

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `https://yourdomain.com/api/auth/callback/google`
6. Set environment variables with real credentials

### Database Setup
1. Set up PostgreSQL database
2. Update `DATABASE_URL` in environment
3. Run Prisma migrations:
   ```bash
   pnpm migrate:dev
   pnpm generate
   ```

### Security Considerations
- Use a strong, random `NEXTAUTH_SECRET` in production
- Enable HTTPS for all authentication flows
- Configure proper CORS settings
- Implement rate limiting for auth endpoints
- Regular security audits and dependency updates

## Current Implementation Notes

- **Demo Mode**: Currently using mock Prisma client due to development environment limitations
- **Password Hashing**: In production, implement proper password hashing with bcrypt
- **Database Integration**: Full Prisma integration ready when database is available
- **Email Verification**: Can be added with email provider configuration

## Next Steps

1. **Database Integration**: Connect to real PostgreSQL database
2. **Email Provider**: Add email verification and password reset
3. **Role-Based Access**: Implement user roles and permissions
4. **Security Enhancements**: Add rate limiting, password policies
5. **Social Providers**: Add more OAuth providers (GitHub, Discord, etc.)