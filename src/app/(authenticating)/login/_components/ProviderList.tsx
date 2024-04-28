'use client';

import LaunchLink from './LaunchLink';
import { useProvidersSuspenseQuery } from './Providers.graphql';

const ProviderList = () => {
  const { data } = useProvidersSuspenseQuery();
  const providers = data?.providers || [];

  return (
    <div className="flex flex-col gap-4 py-4">
      {providers.map((provider) => (
        <LaunchLink key={provider.slug} name={provider.name} logo={provider.logo} />
      ))}
    </div>
  );
};

export default ProviderList;
