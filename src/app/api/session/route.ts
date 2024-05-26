import { cookies as requestCookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { isContextSuccess, loadContext } from '@/lib/context';
import { encrypt, loadKey, verify } from '@/lib/crypto';
import { internalServerError } from '@/lib/errors';

const MAX_SKEW = 60 * 1000; // 60 seconds
const SCHEME = process.env.NODE_ENV === 'development' ? 'http' : 'https';

export const runtime = 'edge';

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const query = Object.fromEntries(url.searchParams);
  if (!(await isRequestValid(query))) return Response.json({ error: 'bad request' }, { status: 400 });

  const cookies = requestCookies();
  const session = cookies.get('session');

  const context = await loadContext(session?.value, query.domain);
  if (!isContextSuccess(context)) {
    // TODO: gracefully handle event not existing
    console.error(`[session] failed to get event info:`, context.errors.map((err) => err.message).join(', '));
    return internalServerError(NextResponse);
  }

  if (context.user.type !== 'authenticated') {
    // TODO: redirect to login
    return Response.json({ error: 'unauthorized' }, { status: 401 });
  }
  if (context.scope.kind !== 'event') return Response.json({ error: 'invalid event' }, { status: 400 });

  // TODO: handle users being organizers for an event
  // TODO: handle users not being part of an event

  const payload = await generatePayload(session!.value, context.scope.event);
  return new Response(null, {
    status: 302,
    headers: { Location: `${SCHEME}://${query.domain}/api/authenticate/${payload}` },
  });
}

async function isRequestValid(query: Record<string, string>): Promise<boolean> {
  if (query.domain === undefined || query.timestamp === undefined || query.signature === undefined) return false;

  const key = await loadKey(process.env.EVENT_SIGNING_KEY, 'signature');
  const signatureValid = await verify(
    key,
    `domain=${query.domain}&timestamp=${query.timestamp}`,
    query.signature,
    'base64url',
  );
  if (!signatureValid) return false;

  const now = new Date().getTime();
  const timestamp = parseInt(query.timestamp, 10);
  if (now - timestamp > MAX_SKEW) return false;

  return true;
}

async function generatePayload(token: string, event: string): Promise<string> {
  const payload = {
    token,
    event,
    timestamp: new Date().toISOString(),
  };

  const key = await loadKey(process.env.EVENT_SESSION_KEY);
  return encrypt(key, JSON.stringify(payload), 'base64url');
}
