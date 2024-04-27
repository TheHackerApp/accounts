'use client';

import { ApolloLink, HttpLink, NormalizedCacheObject } from '@apollo/client';
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
  const link = ApolloLink.from([persistedQueries, retry, http]);

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: isSsr ? new SSRMultipartLink({ stripDefer: true }).concat(link) : link,
  });
}

export const ApolloClientProvider = ({ children }: PropsWithChildren): ReactNode => (
  <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>
);
