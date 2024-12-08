import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the token and user data from cookies
  const token = request.cookies.get('token')?.value;
  const user = request.cookies.get('user')?.value;

  // Check if the requested path is the admin dashboard
  const isAdminDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard');

  // If no token or user data, redirect to login
  if (!token || !user) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Parse user data
  try {
    const userData = JSON.parse(user);

    // Check if user is trying to access admin dashboard
    if (isAdminDashboardRoute) {
      // Only allow access if user is an ADMIN
      if (userData.role !== 'ADMIN') {
        // Set a cookie to trigger the no-access modal on the client-side
        const response = NextResponse.redirect(new URL('/dashboard', request.url));
        response.cookies.set('unauthorized_access', 'true', {
          path: '/',
          maxAge: 60, // Cookie expires in 1 minute
          httpOnly: false, // Make it accessible to client-side JavaScript
        });
        return response;
      }
    }
  } catch (error) {
    // If parsing fails, redirect to login
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Specify which routes this middleware should run on
export const config = {
  matcher: [
    // Apply to admin dashboard route
    '/dashboard/:path*',
    // You can add more protected routes here if needed
  ]
}