import { ReactNode, Suspense } from 'react';

import Spinner from '@/components/Spinner';

import ProviderList from './_components/ProviderList';

export default function Login(): ReactNode {
  return (
    <>
      <h1 className="pb-4 text-left text-3xl font-semibold">
        Log In
        <span aria-label="emoji" className="ml-2" role="img">
          👋
        </span>
      </h1>
      <Suspense fallback={<Spinner />}>
        <ProviderList />
      </Suspense>
      <p className="text-center text-xs">Don&apos;t have an account?</p>
    </>
  );
}
