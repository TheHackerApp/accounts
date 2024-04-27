import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

const UPSTREAM_URL = new URL(process.env.API_UPSTREAM as string);

async function proxyRequest(request: Request): Promise<Response> {
  if (process.env.NODE_ENV !== 'development') notFound();

  const cookieJar = cookies();
  const token = cookieJar.get('session');

  const headers = new Headers({
    'Event-Domain': request.headers.get('host') as string,
    'Accept-Encoding': request.headers.get('accept-encoding') ?? 'identity',
    'Content-Type': request.headers.get('content-type') ?? 'application/json',
  });
  if (token) headers.set('Authorization', `Bearer ${token.value}`);

  const url = new URL(request.url);
  url.host = UPSTREAM_URL.host;
  url.pathname = UPSTREAM_URL.pathname;

  const response = await fetch(url, {
    method: request.method,
    body: request.body,
    headers,
  });

  const responseHeaders = new Headers(response.headers);
  responseHeaders.delete('content-encoding');

  return new Response(response.body, { headers: responseHeaders });
}

export async function GET(request: Request): Promise<Response> {
  return proxyRequest(request);
}

export async function POST(request: Request): Promise<Response> {
  return proxyRequest(request);
}
