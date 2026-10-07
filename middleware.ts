import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/about',
  '/features',
  '/pricing',
  '/blog',
  '/contact',
  '/privacy',
  '/terms',
  '/responsible-use',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/humanize',
  '/api/checkout',
  '/api/webhooks(.*)',
]);

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
