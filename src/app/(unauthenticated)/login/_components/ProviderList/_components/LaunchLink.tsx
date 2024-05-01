import { Button, Link } from '@nextui-org/react';

import ProviderIcon from '@/components/ProviderIcon';
import { Provider } from '@/graphql';
import { providerLaunchUrl } from '@/lib/oauth';

const LaunchLink = ({ slug, name, logo }: Pick<Provider, 'name' | 'logo' | 'slug'>) => (
  <Button
    as={Link}
    href={providerLaunchUrl(slug)}
    fullWidth
    variant="flat"
    startContent={<ProviderIcon className="pointer-events-none text-2xl" brand={logo} />}
  >
    Continue with {name}
  </Button>
);

export default LaunchLink;
