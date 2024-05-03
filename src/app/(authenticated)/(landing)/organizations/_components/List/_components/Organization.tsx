import { AccordionItem, Button, Link } from '@nextui-org/react';
import Image from 'next/image';
import { Suspense } from 'react';

import Spinner from '@/components/Spinner';
import { Organization as OrganizationType, Role } from '@/graphql';

import OrganizationEvents from './OrganizationEvents';

interface Props {
  role: Role;
  organization: Pick<OrganizationType, 'id' | 'name' | 'logo'>;
}

export const render = ({ organization, role }: Props) => {
  const title =
    role === Role.Director || role == Role.Manager ? (
      <div className="flex justify-between items-center">
        <span>{organization.name}</span>
        <Button
          as={Link}
          href={`${process.env.NEXT_PUBLIC_MANAGE_URL}/organizations/${organization.id}/settings`}
          variant="flat"
        >
          Manage
        </Button>
      </div>
    ) : (
      organization.name
    );

  // TODO: generate logo with organization initials
  const logo = organization.logo ? (
    <Image
      className="h-12 w-12 rounded-small bg-background"
      src={organization.logo}
      alt={`${organization.name}'s logo`}
      width={256}
      height={256}
    />
  ) : undefined;

  const fallback = (
    <div className="py-3">
      <Spinner />
    </div>
  );

  // TODO: ensure vertical sizing is consistent regardless of state (i.e. logo & manage button)
  return (
    <AccordionItem key={organization.id} title={title} textValue={organization.name} startContent={logo}>
      <Suspense fallback={fallback}>
        <OrganizationEvents id={organization.id} />
      </Suspense>
    </AccordionItem>
  );
};
