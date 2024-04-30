'use client';

import LaunchLink from './_components/LaunchLink';
import { useProvidersSuspenseQuery } from './Providers.graphql';

const ProviderList = () => {
  const { data } = useProvidersSuspenseQuery();
  const providers = data?.providers || [];

  return (
    <div className="flex flex-col gap-4 py-4">
      {providers.map((provider) => (
        <LaunchLink key={provider.slug} {...provider} />
      ))}
    </div>
  );
};

export default ProviderList;
