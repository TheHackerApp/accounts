import { ReactNode, Suspense } from 'react';

import Spinner from '@/components/Spinner';

import ProviderList from './_components/ProviderList';

export default function Login(): ReactNode {
  return (
    <>
      <h1 className="pb-4 text-left text-3xl font-semibold">
        <span aria-label="emoji" className="mr-2" role="img">
          👋
        </span>
        Sign in
      </h1>

      <Suspense fallback={<Spinner />}>
        <ProviderList />
      </Suspense>
    </>
  );
}
