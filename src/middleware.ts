import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

const allowedOrigins =
  process.env.NODE_ENV === 'production' ? ['https://www.yoursite.com', 'www.yoursite.com'] : ['http://localhost:3000'];

// Resource: https://clerk.com/docs/nextjs/middleware#auth-middleware
// Copy the middleware code as it is from the above resource

export default authMiddleware({
  // An array of public routes that don't require authentication.
  publicRoutes: ['/', '/sign-up(.*)', '/sign-in(.*)'],

  // An array of routes to be ignored by the authentication middleware.
  ignoredRoutes: ['/api/webhook/clerk']
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
};
