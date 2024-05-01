import { PropsWithChildren, ReactNode } from 'react';

export default function Layout({ children }: PropsWithChildren): ReactNode {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="m-auto w-full max-w-7xl sm:p-6 lg:p-8">
        <div className="divide-y divide-divider overflow-hidden bg-content1 shadow sm:rounded-large">{children}</div>
      </div>
    </div>
  );
}
