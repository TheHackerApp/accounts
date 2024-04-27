'use client';

import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, ReactNode } from 'react';

const Provider = ({ children }: PropsWithChildren): ReactNode => {
  const router = useRouter();
  return <NextUIProvider navigate={router.push}>{children}</NextUIProvider>;
};

export default Provider;
