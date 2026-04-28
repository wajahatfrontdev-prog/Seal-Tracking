// Middleware for Route Protection
import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isLoginPage = req.nextUrl.pathname === '/login';

  // If user is logged in and trying to access login page, redirect to home
  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // If user is not logged in and trying to access protected routes, redirect to login
  if (!isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
});

// Configure which routes to protect
export const config = {
  matcher: [
    '/',
    '/scan',
    '/shipments',
    '/seals',
    '/users',
    '/settings',
  ],
};
