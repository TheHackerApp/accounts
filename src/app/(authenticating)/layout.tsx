import { PropsWithChildren, ReactNode } from 'react';

const Layout = ({ children }: PropsWithChildren): ReactNode => (
  <main className="flex h-screen items-center justify-center">
    <div className="flex w-full max-w-md flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
      {children}
    </div>
  </main>
);

export default Layout;
