import { PropsWithChildren, ReactNode, Suspense } from 'react';

import Spinner from '@/components/Spinner';

interface Props {
  title: string;
}

const ListSection = ({ title, children }: PropsWithChildren<Props>): ReactNode => (
  <section className="space-y-2 px-4 py-5 sm:p-6">
    <h2 className="text-xl font-semibold leading-6 tracking-wide">{title}</h2>
    <Suspense fallback={<Spinner />}>{children}</Suspense>
  </section>
);

export default ListSection;
