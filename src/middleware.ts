import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server';

import { isContextSuccess, loadContext } from '@/lib/context';

const INTERNAL_SERVER_ERROR = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8"></meta>
    <title>Internal Server Error</title>
  </head>
  <body>
    <h1>Internal Server Error</h1>
    <p>We couldn't process your request, please try again later</p>
  </body>
</html>
`;

export const config: MiddlewareConfig = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};

export async function middleware(request: NextRequest): Promise<NextResponse | undefined> {
  const session = request.cookies.get('session');

  const context = await loadContext(session?.value, request.headers.get('host') as string);
  if (!isContextSuccess(context)) {
    console.error(`[middleware] failed to get user info:`, context.errors.map((err) => err.message).join(', '));
    return internalServerError();
  }

  switch (request.nextUrl.pathname) {
    case '/login':
      if (context.user.type === 'authenticated') return temporaryRedirect('/', request.url);
      break;

    // TODO: handle registration-needed users

    default:
      if (context.user.type === 'unauthenticated' || context.user.type === 'oauth')
        return temporaryRedirect('/login', request.url);
      break;
  }

  return;
}

function temporaryRedirect(path: string, base: string): NextResponse {
  return NextResponse.redirect(new URL(path, base), 302);
}

function internalServerError(): NextResponse {
  return new NextResponse(INTERNAL_SERVER_ERROR, {
    status: 500,
    headers: { 'Content-Type': 'text/html;charset=utf-8' },
  });
}
