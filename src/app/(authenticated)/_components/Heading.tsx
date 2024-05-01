import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { faArrowRightFromBracket, faSliders } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Link, Tooltip } from '@nextui-org/react';
import { ReactNode } from 'react';

import { LOGOUT_URL } from '@/lib/oauth';

const Heading = (): ReactNode => (
  <div className="flex justify-between items-center space-x-3 px-4 py-5 sm:p-6">
    <h1 className="text-2xl font-semibold leading-6 tracking-wide">The Hacker App</h1>
    <div className="space-x-2.5">
      <HeadingLink title="Settings" href="/settings" icon={faSliders} />
      <HeadingLink title="Log out" href={LOGOUT_URL} icon={faArrowRightFromBracket} />
    </div>
  </div>
);

interface LinkProps {
  title: string;
  href: string;
  icon: IconDefinition;
}

const HeadingLink = ({ title, href, icon }: LinkProps): ReactNode => (
  <Tooltip content={title} color="secondary" showArrow>
    <Button as={Link} href={href} isIconOnly>
      <FontAwesomeIcon icon={icon} className="h-5 w-5" />
      <span className="sr-only">{title}</span>
    </Button>
  </Tooltip>
);

export default Heading;
