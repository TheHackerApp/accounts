import { faCalendarXmark } from '@fortawesome/pro-duotone-svg-icons';
import { ReactNode } from 'react';

import EmptyState from '@/components/EmptyState';

import Event from './_components/Event';
import { useOrganizationEventsSuspenseQuery } from './OrganizationEvents.graphql';

interface Props {
  id: number;
}

const OrganizationEvents = ({ id }: Props): ReactNode => {
  const { data } = useOrganizationEventsSuspenseQuery({ variables: { organizationId: id } });

  const events = data.organization?.events;
  if (events === undefined || events.length === 0)
    return (
      <EmptyState icon={faCalendarXmark} title={'No events yet!'} description="Get started by creating a new event!" />
    );
  // TODO: add call-to-action button linking to new event page

  return (
    <ul className="divide-y divide-divider">
      {events.map((event) => (
        <Event key={event.slug} {...event} />
      ))}
    </ul>
  );
};

export default OrganizationEvents;
