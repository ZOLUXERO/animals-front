import type { NextFetchEvent, NextRequest } from 'next/server';
import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (process.env.AMBIENTE === "dev") {
    const excludedPaths = ['/auth/signin', '/api/'];
    const isExcluded = excludedPaths.some((path) => req.nextUrl.pathname.startsWith(path));

    if (isExcluded) {
      return NextResponse.next();
    }

    const requestForNextAuth = {
      headers: {
        cookie: req.headers.get('cookie'),
      },
    };

    const session = await getSession({ req: requestForNextAuth });

    if (session) {
      console.log(session);
      return NextResponse.next();
    } else {
      // the user is not logged in, redirect to the sign-in page
      const signInPage = '/api/auth/signin';
      const signInUrl = new URL(signInPage, req.nextUrl.origin);
      signInUrl.searchParams.append('callbackUrl', req.url);
      return NextResponse.redirect(signInUrl);
    }
  }
}

