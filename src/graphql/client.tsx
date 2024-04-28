'use client';

import { ApolloLink, HttpLink, NormalizedCacheObject } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { RetryLink } from '@apollo/client/link/retry';
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { generatePersistedQueryIdsFromManifest } from '@apollo/persisted-query-lists';
import { PropsWithChildren, ReactNode } from 'react';

function makeClient(): NextSSRApolloClient<NormalizedCacheObject> {
  const isSsr = typeof window === 'undefined';

  const http = new HttpLink({
    uri: isSsr ? process.env.API_UPSTREAM : process.env.NEXT_PUBLIC_API_ROUTE,
  });
  const retry = new RetryLink({
    delay: {
      initial: 250,
      jitter: true,
    },
    attempts: { max: 3 },
  });
  const persistedQueries = createPersistedQueryLink(
    generatePersistedQueryIdsFromManifest({
      loadManifest: () => import('./persisted-query-manifest.json'),
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
  const link = ApolloLink.from([errorHandler, persistedQueries, retry, http]);

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: isSsr ? new SSRMultipartLink({ stripDefer: true }).concat(link) : link,
  });
}

export const ApolloClientProvider = ({ children }: PropsWithChildren): ReactNode => (
  <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>
);
