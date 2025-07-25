import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Skip middleware for static files and API routes
  if (pathname.startsWith('/_next/') || pathname.startsWith('/api/') || pathname.includes('.')) {
    return NextResponse.next()
  }
  
  // For localStorage-based auth, we can't access localStorage in middleware
  // So we'll rely on the client-side auth check and let the pages handle their own protection
  // This prevents the infinite redirect loop issue
  
  // Define protected routes that require authentication
  // const protectedRoutes = ['/nusa-discovery']
  // const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  
  // Define public routes that should redirect authenticated users
  // const publicRoutes = ['/']
  // const isPublicRoute = publicRoutes.some(route => pathname === route)
  
  // Define auth routes that are accessible to all users
  const authRoutes = ['/auth']
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

  // For now, allow all routes and let client-side handle authentication
  // This prevents the infinite redirect loop caused by middleware not finding cookies
  
  // Allow access to auth routes for all users
  if (isAuthRoute) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
} 