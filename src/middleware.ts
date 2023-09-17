import { type UserRole } from '@/types';
import { authMiddleware, clerkClient, redirectToSignIn } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

const allowedOrigins =
  process.env.NODE_ENV === 'production' ? ['https://www.yoursite.com', 'www.yoursite.com'] : ['http://localhost:3000'];

// Resource: https://clerk.com/docs/nextjs/middleware#auth-middleware
// Copy the middleware code as it is from the above resource

export default authMiddleware({
  // An array of public routes that don't require authentication.
  publicRoutes: ['/', '/signin(.*)', '/signup(.*)', '/sso-callback(.*)', '/api(.)*'],

  async afterAuth(auth, req) {
    if (auth.isPublicRoute) {
      //  For public routes, we don't need to do anything
      return NextResponse.next();
    }

    const url = new URL(req.nextUrl.origin);

    if (!auth.userId) {
      //  If user tries to access a private route without being authenticated,
      //  redirect them to the sign in page
      url.pathname = '/signin';
      return NextResponse.redirect(url);
    }

    // Set the user's role to user if it doesn't exist
    const user = await clerkClient.users.getUser(auth.userId);

    if (!user) {
      throw new Error('User not found.');
    }

    // If the user doesn't have a role, set it to user
    if (!user.privateMetadata.role) {
      await clerkClient.users.updateUserMetadata(auth.userId, {
        privateMetadata: {
          role: 'user' satisfies UserRole
        }
      });
    }
  }
  // An array of routes to be ignored by the authentication middleware.jj
  // ignoredRoutes: ['/api/webhook/clerk']
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
};
