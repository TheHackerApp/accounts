import { PropsWithChildren, ReactNode } from 'react';

const Navigation = ({ children }: PropsWithChildren): ReactNode => (
  <aside className="flex overflow-x-auto border-b border-content1 lg:px-4 lg:block lg:w-64 lg:flex-none lg:border-0">
    <nav className="flex-none">
      <ul role="list" className="flex gap-x-2 gap-y-1 whitespace-nowrap lg:flex-col">
        {children}
      </ul>
    </nav>
  </aside>
);

export default Navigation;
