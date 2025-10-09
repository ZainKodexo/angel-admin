import { NextCookieService } from '@/shared/lib';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

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
  const url = request.nextUrl;
  const queryParam = url.search;

  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  if (isPublicPath && accessToken) {
    return NextResponse.redirect(new URL('/' + queryParam, url));
  }

  if (!isPublicPath && !accessToken) {
    if (refreshToken) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {
            method: 'POST',
            headers: {
              Cookie: `refresh_token=${refreshToken}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error('Token refresh failed');
        }
        const setCookieHeader = response.headers.get('set-cookie');
        if (setCookieHeader) {
          const redirectUrl = new URL(request.nextUrl.pathname, url);
          redirectUrl.searchParams.set('_refresh', Date.now().toString());

          request.nextUrl.searchParams.forEach((value, key) => {
            if (key !== '_refresh') {
              redirectUrl.searchParams.set(key, value);
            }
          });

          const redirectResponse = NextResponse.redirect(redirectUrl);

          setCookieHeader.split(',').forEach((cookie) => {
            redirectResponse.headers.append('Set-Cookie', cookie.trim());
          });
          return redirectResponse;
        }
        return NextResponse.next();
      } catch (error) {
        const response = NextResponse.redirect(new URL('/auth/login', url));
        response.cookies.delete('access_token');
        response.cookies.delete('refresh_token');
        return response;
      }
    }
    const response = NextResponse.redirect(new URL('/auth/login', url));
    response.cookies.delete('access_token');
    response.cookies.delete('refresh_token');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
