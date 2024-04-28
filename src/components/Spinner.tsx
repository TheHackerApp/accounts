import { Spinner as NextUISpinner } from '@nextui-org/react';
import { ReactNode } from 'react';

const Spinner = (): ReactNode => (
  <div className="flex justify-center">
    <NextUISpinner />
  </div>
);

export default Spinner;
