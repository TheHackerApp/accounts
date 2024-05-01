import { PropsWithChildren, ReactNode } from 'react';

interface Props {
  title: string;
  description: string;
}

const Section = ({ title, description, children }: PropsWithChildren<Props>): ReactNode => (
  <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
    <div>
      <h2 className="text-base text-foreground font-semibold leading-7">{title}</h2>
      <p className="mt-1 text-sm text-foreground-500 leading-6">{description}</p>
    </div>

    {children}
  </div>
);

export default Section;
