import { ReactNode, Suspense } from 'react';

import Spinner from '@/components/Spinner';

import List from './_components/List';

export default function Events(): ReactNode {
  return (
    <section className="space-y-4 px-4 py-5 sm:p-6">
      <h2 className="text-xl font-semibold leading-6 tracking-wide">Your organizations</h2>
      <Suspense fallback={<Spinner />}>
        <List />
      </Suspense>
    </section>
  );
}
