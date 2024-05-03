'use client';

import { faSitemap } from '@fortawesome/pro-duotone-svg-icons';
import { Accordion } from '@nextui-org/react';
import { ReactNode } from 'react';

import EmptyState from '@/components/EmptyState';

import { render } from './_components/Organization';
import { useOrganizationsSuspenseQuery } from './Organizations.graphql';

const List = (): ReactNode => {
  const { data } = useOrganizationsSuspenseQuery();
  if (data.me.organizations.length === 0)
    return (
      <EmptyState
        icon={faSitemap}
        title="You're not part of any organizations"
        description="Want to organize an event? Get started by creating an organization!"
      />
    );
  // TODO: add CTA for creating an organization

  return <Accordion variant="splitted">{data.me.organizations.map((item) => render(item))}</Accordion>;
};

export default List;
