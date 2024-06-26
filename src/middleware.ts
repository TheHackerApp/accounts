import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server';

import { isContextSuccess, loadContext } from '@/lib/context';
import { internalServerError } from '@/lib/errors';

const MAINTENANCE = (process.env.MAINTENANCE ?? '').toLowerCase().charAt(0) == 't';

export const config: MiddlewareConfig = {
  matcher: '/((?!api|dev|_next/static|_next/image|favicon.ico).*)',
};

export async function middleware(request: NextRequest): Promise<NextResponse | undefined> {
  if (MAINTENANCE) return;

  const session = request.cookies.get('session');

  const context = await loadContext(session?.value, request.headers.get('host') as string);
  if (!isContextSuccess(context)) {
    console.error(`[middleware] failed to get user info:`, context.errors.map((err) => err.message).join(', '));
    return internalServerError(NextResponse);
  }

  const userState = context.user.type;
  switch (request.nextUrl.pathname) {
    case '/login':
      if (userState === 'authenticated') return temporaryRedirect('/', request.url);
      if (userState === 'registration-needed') return temporaryRedirect('/complete-profile', request.url);
      break;

    case '/complete-profile':
      if (userState === 'unauthenticated' || userState === 'oauth') return temporaryRedirect('/login', request.url);
      if (userState === 'authenticated') return temporaryRedirect('/', request.url);
      break;

    default:
      if (userState === 'unauthenticated' || userState === 'oauth') return temporaryRedirect('/login', request.url);
      if (userState === 'registration-needed') return temporaryRedirect('/complete-profile', request.url);
      break;
  }

  return;
}

function temporaryRedirect(path: string, base: string): NextResponse {
  return NextResponse.redirect(new URL(path, base), 302);
}
