import { NextRequest, NextResponse } from 'next/server';

// Lucia's default session cookie name. Presence check only: the layout's
// checkAuth() still validates the session against the DB.
const SESSION_COOKIE = 'auth_session';

export function middleware(request: NextRequest) {
  if (request.cookies.has(SESSION_COOKIE)) return NextResponse.next();
  return NextResponse.redirect(new URL('/sign-in', request.url), 307);
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/account/:path*',
    '/settings/:path*',
  ],
};
