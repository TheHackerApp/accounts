import { faEnvelope, faFingerprint, faUser } from '@fortawesome/pro-duotone-svg-icons';
import { PropsWithChildren, ReactNode } from 'react';

import Heading from './_components/Heading';
import Navigation from './_components/Navigation';
import NavigationItem from './_components/NavigationItem';

export default function Layout({ children }: PropsWithChildren): ReactNode {
  return (
    <>
      <Heading />

      <div className="px-4 py-5 sm:p-6 lg:flex">
        <Navigation>
          <NavigationItem to="/settings/general" title="General" icon={faUser} />
          <NavigationItem to="/settings/authetnication" title="Sign-in methods" icon={faFingerprint} disabled />
          <NavigationItem to="/settings/notifications" title="Notifications" icon={faEnvelope} disabled />
        </Navigation>

        <div className="divide-y divide-divider">{children}</div>
      </div>
    </>
  );
}
