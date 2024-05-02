'use client';

import { ReactNode } from 'react';

import EmptyState from './_components/EmptyState';
import Event from './_components/Event';
import { useEventsSuspenseQuery } from './Events.graphql';

const List = (): ReactNode => {
  const { data } = useEventsSuspenseQuery();

  const events = data.me.events.map((e) => e.event);
  if (events.length === 0) return <EmptyState />;

  return (
    <ul className="max-h-60 overflow-y-scroll divide-y divide-divider" role="list">
      {events.map((e) => (
        <Event key={e.slug} {...e} />
      ))}
    </ul>
  );
};

export default List;
