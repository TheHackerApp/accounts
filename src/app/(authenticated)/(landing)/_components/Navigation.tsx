'use client';

import { Button, ButtonGroup, Link } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const Navigation = (): ReactNode => {
  const pathname = usePathname();

  return (
    <ButtonGroup>
      <Button as={Link} href="/events" isDisabled={pathname === '/events'}>
        Events
      </Button>
      <Button as={Link} href="/organizations" isDisabled={pathname === '/organizations'}>
        Organizations
      </Button>
    </ButtonGroup>
  );
};

export default Navigation;
