import { ApolloLink, HttpLink, NormalizedCacheObject } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { RetryLink } from '@apollo/client/link/retry';
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { generatePersistedQueryIdsFromManifest } from '@apollo/persisted-query-lists';

import { uncloakSsrOnly } from '@/lib/ssr-secret';

/**
 * Create the default set of links used, regardless of client type
 */
function defaultLinkMiddleware(): ApolloLink {
  const retry = new RetryLink({
    delay: {
      initial: 250,
      jitter: true,
    },
    attempts: { max: 3 },
  });
  const persistedQueries = createPersistedQueryLink(
    generatePersistedQueryIdsFromManifest({
      loadManifest: () => import('@/graphql/persisted-query-manifest.json'),
    }),
  );
  const errorHandler = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      for (const { message, locations, path } of graphQLErrors) {
        console.log(`[GraphQL error]: ${message} at ${path} in ${locations} query`);
      }
    }
    if (networkError) console.error(`[Network error]: ${networkError}`);
  });

  return ApolloLink.from([errorHandler, persistedQueries, retry]);
}

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
    cache: new NextSSRInMemoryCache(),
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
  const authentication = setContext(async (_request, { headers = {} }) => {
    const token = await uncloakSsrOnly(await cloakedToken);
    if (token) headers['Authorization'] = `Bearer ${token}`;
    headers['Event-Domain'] = domain;
    return { headers };
  });

  const ssr = new SSRMultipartLink({ stripDefer: true });
  const http = new HttpLink({ uri: process.env.API_UPSTREAM, fetchOptions: { cache: 'no-store' } });
  const link = ApolloLink.from([authentication, ssr, defaultLinkMiddleware(), http]);

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link,
  });
}
