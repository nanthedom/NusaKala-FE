import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Skip middleware for static files and API routes
  if (pathname.startsWith('/_next/') || pathname.startsWith('/api/') || pathname.includes('.')) {
    return NextResponse.next()
  }
  
  // Get authentication status from cookies
  const authStorage = request.cookies.get('auth-storage')
  let isAuthenticated = false
  
  if (authStorage) {
    try {
      const authData = JSON.parse(authStorage.value)
      
      // Check multiple possible structures for the cookie
      const hasUser = authData.state?.user || authData.user
      const isAuth = authData.state?.isAuthenticated || authData.isAuthenticated
      
      if (hasUser && hasUser !== null && isAuth === true) {
        isAuthenticated = true
      }
    } catch (error) {
      console.error('Error parsing auth storage:', error)
      isAuthenticated = false
    }
  }

  // Define protected routes that require authentication
  const protectedRoutes = ['/nusa-discovery']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  
  // Define public routes that should redirect authenticated users
  const publicRoutes = ['/']
  const isPublicRoute = publicRoutes.some(route => pathname === route)
  
  // Define auth routes that are accessible to all users
  const authRoutes = ['/auth']
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

  // Route protection logic
  if (isProtectedRoute && !isAuthenticated) {
    // Redirect unauthenticated users to login
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
  
  if (isPublicRoute && isAuthenticated) {
    // Redirect authenticated users away from landing page
    return NextResponse.redirect(new URL('/nusa-discovery', request.url))
  }
  
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