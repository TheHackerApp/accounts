import { Button, Link } from '@nextui-org/react';

import ProviderIcon from '@/components/ProviderIcon';

interface Props {
  name: string;
  logo: string;
}

const LaunchLink = ({ name, logo }: Props) => (
  <Button
    as={Link}
    href="#"
    fullWidth
    variant="flat"
    startContent={<ProviderIcon className="pointer-events-none text-2xl" brand={logo} />}
  >
    Continue with {name}
  </Button>
);

export default LaunchLink;
