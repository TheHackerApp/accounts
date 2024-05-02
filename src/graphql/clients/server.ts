import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
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
  const requestTagger = createRequestTaggerLink();
  const http = new HttpLink({ uri: process.env.API_UPSTREAM + '/graphql' });
  const link = ApolloLink.from([authentication, requestTagger, defaultLinkMiddleware(), http]);

  return new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });
}

const createRequestTaggerLink = (): ApolloLink =>
  setContext((_request, { tag = undefined }) => {
    if (tag === undefined) return {};

    return { fetchOptions: { next: { tags: [tag] } } };
  });
