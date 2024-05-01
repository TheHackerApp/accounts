import { faArrowRightFromBracket, faSliders } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Link } from '@nextui-org/react';
import { ReactNode } from 'react';

import { LOGOUT_URL } from '@/lib/oauth';

const Heading = (): ReactNode => (
  <div className="flex justify-between items-center space-x-3 px-4 py-5 sm:p-6">
    <h1 className="text-2xl font-semibold leading-6 tracking-wide">The Hacker App</h1>
    <div className="space-x-2.5">
      <Button as={Link} href="/settings" isIconOnly>
        <FontAwesomeIcon icon={faSliders} className="h-5 w-5" />
        <span className="sr-only">Settings</span>
      </Button>
      <Button as={Link} href={LOGOUT_URL} isIconOnly>
        <FontAwesomeIcon icon={faArrowRightFromBracket} className="h-5 w-5" />
        <span className="sr-only">Log out</span>
      </Button>
    </div>
  </div>
);

export default Heading;
