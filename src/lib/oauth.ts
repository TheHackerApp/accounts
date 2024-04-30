interface RequestOptions {
  session?: string;
}

/**
 * Create the URL to initiate the OAuth flow
 */
export const providerLaunchUrl = (slug: string): string => `${process.env.NEXT_PUBLIC_API_URL}/oauth/launch/${slug}`;

interface CompleteRegistrationOptions extends RequestOptions {
  givenName: string;
  familyName: string;
}

interface CompleteRegistrationResponse {
  redirectUri: string;
}

/**
 * Complete a user's registration process
 */
export async function completeRegistration({
  session,
  ...body
}: CompleteRegistrationOptions): Promise<CompleteRegistrationResponse> {
  const headers = new Headers({ 'Content-Type': 'application/json' });
  if (session) headers.set('Cookie', `session=${session}`);

  const response = await fetch(apiUrl('/oauth/complete-registration'), {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (response.status !== 200 || 'message' in data) throw new Error(data.message);

  return data;
}

/**
 * Select the correct API URL to use based on execution environment (SSR vs CSR)
 */
const apiUrl = (path: string): string =>
  (typeof window === 'undefined' ? process.env.API_UPSTREAM : process.env.NEXT_PUBLIC_API_URL) + path;
