import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL_DVAGO_API } from './services/config';

const isAuthenticated = (request: NextRequest) => {
  const token = request.cookies.get('user')?.value;
  if (token?.length) {
    const validation = JSON.parse(token)?.isLoggedIn;
    return validation;
  }
  return false;
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const isLoggedIn = isAuthenticated(request);
  if (!isLoggedIn && (pathname === '/account' || pathname === '/orders')) {
    request.nextUrl.pathname = `/`;
    return NextResponse.redirect(new URL(request.nextUrl.pathname, request.url));
  }

  const oldUrl = request.nextUrl.pathname.substring(request.nextUrl.pathname.lastIndexOf('/') + 1);
  if (pathname === `/p/${oldUrl}`) {
    const data = await (
      await fetch(`${BASE_URL_DVAGO_API}/AppAPIV3/GetNewSlug&OldSlug=${oldUrl}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json();
    if (data?.Data !== undefined) {
      if (data?.Data.length > 0) {
        if (data?.Data[0]?.OldSlug !== data?.Data[0]?.NewSlug) {
          if (data?.Data[0]?.Type === 'Category') {
            request.nextUrl.pathname = `/cat/${data?.Data[0]?.NewSlug}`;
            return NextResponse.redirect(new URL(request.nextUrl.pathname, request.url));
          } else {
            request.nextUrl.pathname = `/p/${data?.Data[0]?.NewSlug}`;
            return NextResponse.redirect(new URL(request.nextUrl.pathname, request.url));
          }
        }
      }
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/', '/account', '/orders', '/p/:productSlug*'],
};
