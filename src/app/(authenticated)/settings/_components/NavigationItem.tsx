'use client';

import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

import { cn } from '@/lib/styles';

const LINK_STYLES = 'group flex gap-x-3 rounded-small py-2 px-3 text-sm leading-6 font-semibold';
const ICON_STYLES = 'h-6 w-6 shrink-0';

interface Props {
  to: string;
  title: string;
  icon: IconDefinition;
}

const NavigationItem = ({ to, title, icon }: Props): ReactNode => {
  const path = usePathname();
  const active = to === path;

  if (active) {
    return (
      <span className={cn('bg-content2 text-secondary-600', LINK_STYLES)}>
        <FontAwesomeIcon icon={icon} className={cn('text-secondary-600', ICON_STYLES)} />
        {title}
      </span>
    );
  }

  return (
    <a href={to} className={cn('text-foreground hover:text-secondary-600', LINK_STYLES)}>
      <FontAwesomeIcon icon={icon} className={cn('text-content4 group-hover:text-secondary-600', ICON_STYLES)} />
      {title}
    </a>
  );
};

export default NavigationItem;
