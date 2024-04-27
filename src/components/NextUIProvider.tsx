'use client';

import { NextUIProvider } from '@nextui-org/react';
import { PropsWithChildren, ReactNode } from 'react';

const Provider = ({ children }: PropsWithChildren): ReactNode => <NextUIProvider>{children}</NextUIProvider>;

export default Provider;
