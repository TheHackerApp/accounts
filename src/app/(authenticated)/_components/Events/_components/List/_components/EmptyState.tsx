import { faCalendarXmark } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode } from 'react';

const EmptyState = (): ReactNode => (
  <div className="text-center">
    <FontAwesomeIcon icon={faCalendarXmark} className="h-8 w-8 text-foreground-400" />
    <h3 className="mt-2 text-sm font-semibold text-foreground">You&apos;re not in any events!</h3>
    <p className="mt-1 text-sm text-foreground-500">
      It doesn&apos;t look like your&apos;re participating in any events. Time to go find one!
    </p>
  </div>
);

export default EmptyState;
