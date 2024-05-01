import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { cookies, headers } from 'next/headers';

import { createAuthenticationLink, defaultLinkMiddleware } from '@/graphql/clients/shared';

export const { getClient } = registerApolloClient(makeClient);

function makeClient(): ApolloClient<NormalizedCacheObject> {
  const cookieJar = cookies();
  const session = cookieJar.get('session');

  const requestHeaders = headers();
  const domain = requestHeaders.get('host');
  if (domain === null) throw new Error('request must have a "host" header');

  const authentication = createAuthenticationLink(session?.value, domain!);
  const http = new HttpLink({ uri: process.env.API_UPSTREAM + '/graphql' });
  const link = authentication.concat(defaultLinkMiddleware()).concat(http);

  return new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });
}
