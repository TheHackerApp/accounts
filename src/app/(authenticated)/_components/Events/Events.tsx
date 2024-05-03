'use client';

import { faCalendarXmark } from '@fortawesome/pro-duotone-svg-icons';
import { ReactNode } from 'react';

import EmptyState from '@/components/EmptyState';

import Event from './_components/Event';
import { useEventsSuspenseQuery } from './Events.graphql';

const Events = (): ReactNode => {
  const { data } = useEventsSuspenseQuery();

  const events = data.me.events.map((e) => e.event);
  if (events.length === 0)
    return (
      <EmptyState
        icon={faCalendarXmark}
        title="You're not in any events!"
        description="It doesn't look like you're participating in any events. Time to go find one!"
      />
    );

  return (
    <ul className="max-h-60 overflow-y-scroll divide-y divide-divider" role="list">
      {events.map((e) => (
        <Event key={e.slug} {...e} />
      ))}
    </ul>
  );
};

export default Events;
