import { IconDefinition, faDiscord, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faCircleQuestion } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  brand: string;
  className?: string;
}

const selectIconFor = (brand: string): IconDefinition => {
  switch (brand) {
    case 'discord':
      return faDiscord;
    case 'github':
      return faGithub;
    case 'google':
      return faGoogle;
    default:
      return faCircleQuestion;
  }
};

const ProviderIcon = ({ brand, className }: Props) => (
  <FontAwesomeIcon className={className} icon={selectIconFor(brand)} />
);

export default ProviderIcon;
