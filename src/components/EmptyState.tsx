import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode } from 'react';

interface Props {
  icon: IconDefinition;
  title: string;
  description: string;
}

const EmptyState = ({ icon, title, description }: Props): ReactNode => (
  <div className="text-center">
    <FontAwesomeIcon icon={icon} className="h-8 w-8 text-foreground-400" />
    <h3 className="mt-2 text-sm font-semibold text-foreground">{title}</h3>
    <p className="mt-1 text-sm text-foreground-500">{description}</p>
  </div>
);

export default EmptyState;
