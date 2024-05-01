import { faChevronLeft } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Link } from '@nextui-org/react';
import { ReactNode } from 'react';

const Heading = (): ReactNode => (
  <div className="flex items-center space-x-3 px-4 py-5 sm:p-6">
    <Button as={Link} href="/" isIconOnly>
      <FontAwesomeIcon icon={faChevronLeft} />
      <span className="sr-only">Back</span>
    </Button>
    <h3 className="text-2xl font-semibold leading-6 tracking-wide">Settings</h3>
  </div>
);

export default Heading;
