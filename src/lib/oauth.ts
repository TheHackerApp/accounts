interface RequestOptions {
  fetch: typeof fetch;
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
  fetch,
  ...body
}: CompleteRegistrationOptions): Promise<CompleteRegistrationResponse> {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/oauth/complete-registration', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (response.status !== 200 || 'message' in data) throw new Error(data.message);

  return data;
}
