'use client';

import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support/ssr';
import { PropsWithChildren, ReactNode } from 'react';

import { makeCsrClient, makeSsrClient } from './client';
import type { ClientCreator } from './client';

interface Props {
  token: Promise<string | undefined>;
  domain: string;
}

export const ClientSideProvider = ({ children, token, domain }: PropsWithChildren<Props>): ReactNode => {
  const makeClient: ClientCreator = typeof window === 'undefined' ? makeSsrClient : makeCsrClient;
  return <ApolloNextAppProvider makeClient={() => makeClient({ token, domain })}>{children}</ApolloNextAppProvider>;
};
