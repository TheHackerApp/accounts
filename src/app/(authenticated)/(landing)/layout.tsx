import { PropsWithChildren, ReactNode } from 'react';

import Heading from './_components/Heading';

export default function Layout({ children }: PropsWithChildren): ReactNode {
  return (
    <>
      <Heading />
      {children}
    </>
  );
}
