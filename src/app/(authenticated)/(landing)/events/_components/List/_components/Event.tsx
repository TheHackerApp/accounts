import { faChevronsRight } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { ReactNode } from 'react';

import { Event as EventType } from '@/graphql';

const SCHEME = process.env.NODE_ENV === 'production' ? 'https' : 'http';

type Props = Pick<EventType, 'slug' | 'active' | 'domain' | 'name'>;

const Event = (event: Props): ReactNode => (
  <li className="relative flex justify-between rounded-small gap-x-6 px-4 py-5 sm:px-6 lg:px-8 hover:bg-content2">
    <div className="flex min-w-0 gap-x-4">
      {/* TODO: add logo from API */}
      <Image
        className="h-12 w-12 flex-none rounded-small bg-background"
        src="https://placehold.co/256.png"
        alt={event.name + "'s logo"}
        width={256}
        height={256}
      />
      <div className="min-w-0 flex flex-auto items-center">
        <p className="text-sm font-semibold leading-6">
          {/* TODO: disable when no longer active */}
          <a href={SCHEME + '://' + event.domain}>
            <span className="absolute inset-x-0 -top-px bottom-0"></span>
            {event.name}
          </a>
        </p>
      </div>
    </div>
    <div className="flex shrink-0 items-center">
      <FontAwesomeIcon className="flex-none h-5 w-5 text-foreground-500" icon={faChevronsRight} />
    </div>
  </li>
);

export default Event;
