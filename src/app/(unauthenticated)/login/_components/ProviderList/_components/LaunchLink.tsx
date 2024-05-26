'use client';

import { Button, Link } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';

import ProviderIcon from '@/components/ProviderIcon';
import { Provider } from '@/graphql';
import { providerLaunchUrl } from '@/lib/oauth';

const LaunchLink = ({ slug, name, logo }: Pick<Provider, 'name' | 'logo' | 'slug'>) => {
  const query = useSearchParams();
  const returnTo = query.get('return-to');

  let launchUrl = providerLaunchUrl(slug);
  if (returnTo !== null) launchUrl += `?return-to=${returnTo}`;

  return (
    <Button
      as={Link}
      href={launchUrl}
      fullWidth
      variant="flat"
      startContent={<ProviderIcon className="pointer-events-none text-2xl" brand={logo} />}
    >
      Continue with {name}
    </Button>
  );
};

export default LaunchLink;
