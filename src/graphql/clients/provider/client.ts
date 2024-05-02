import { ApolloLink, HttpLink, NormalizedCacheObject } from '@apollo/client';
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';

import { uncloakSsrOnly } from '@/lib/ssr-secret';

import { createAuthenticationLink, createCache, defaultLinkMiddleware } from '../shared';

interface ClientCreatorInput {
  token: Promise<string | undefined>;
  domain: string;
}
export type ClientCreator = (input: ClientCreatorInput) => NextSSRApolloClient<NormalizedCacheObject>;

/**
 * Create an Apollo client for client-side rendering
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function makeCsrClient(_input: ClientCreatorInput): NextSSRApolloClient<NormalizedCacheObject> {
  const http = new HttpLink({ uri: process.env.NEXT_PUBLIC_API_ROUTE });
  const link = defaultLinkMiddleware().concat(http);

  return new NextSSRApolloClient({
    cache: createCache(NextSSRInMemoryCache),
    link,
  });
}

/**
 * Create an Apollo client for server-side rendering
 *
 * Requires the authentication token and requesting domain.
 */
export function makeSsrClient({
  token: cloakedToken,
  domain,
}: ClientCreatorInput): NextSSRApolloClient<NormalizedCacheObject> {
  const authentication = createAuthenticationLink(Promise.resolve(cloakedToken).then(uncloakSsrOnly), domain);

  const ssr = new SSRMultipartLink({ stripDefer: true });
  const http = new HttpLink({ uri: process.env.API_UPSTREAM + '/graphql', fetchOptions: { cache: 'no-store' } });
  const link = ApolloLink.from([authentication, ssr, defaultLinkMiddleware(), http]);

  return new NextSSRApolloClient({
    cache: createCache(NextSSRInMemoryCache),
    link,
  });
}
