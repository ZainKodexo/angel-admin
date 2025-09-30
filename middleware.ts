import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AuthService, NextCookieService } from '@/shared/lib';

const PUBLIC_PATHS = [
  '/auth/login',
  '/auth/signup',
  '/terms',
  '/privacy-policy',
  '/auth/forget-password',
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = PUBLIC_PATHS.includes(path);

  const cookieService = NextCookieService;
  cookieService.setRequestCookies(request.cookies);

  const authService = AuthService;

  const accessToken = await cookieService.getCookie('access_token');
  const refreshToken = await cookieService.getCookie('refresh_token');

  if (isPublicPath && accessToken) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (!isPublicPath && !accessToken) {
    if (refreshToken) {
      try {
        await authService.refreshTokens();
        return NextResponse.next();
      } catch (error) {
        const response = NextResponse.redirect(
          new URL('/auth/login', request.nextUrl),
        );
        cookieService.deleteCookie('access_token');
        cookieService.deleteCookie('refresh_token');
        return response;
      }
    }

    const response = NextResponse.redirect(
      new URL('/auth/login', request.nextUrl),
    );
    cookieService.deleteCookie('access_token');
    cookieService.deleteCookie('refresh_token');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
