import { faEnvelope, faFingerprint, faUser } from '@fortawesome/pro-duotone-svg-icons';
import { PropsWithChildren, ReactNode } from 'react';

import Heading from './_components/Heading';
import Navigation from './_components/Navigation';
import NavigationItem from './_components/NavigationItem';

export default function Layout({ children }: PropsWithChildren): ReactNode {
  return (
    <div className="flex h-screen justify-center items-center">
      {/* TODO: make card a fixed height */}
      <div className="m-auto w-full max-w-7xl sm:p-6 lg:p-8">
        <div className="divide-y divide-divider overflow-hidden bg-content1 shadow sm:rounded-large">
          <Heading />

          <div className="px-4 py-5 sm:p-6 lg:flex">
            <Navigation>
              <NavigationItem to="/settings/general" title="General" icon={faUser} />
              <NavigationItem to="/settings/authetnication" title="Sign-in methods" icon={faFingerprint} />
              <NavigationItem to="/settings/notifications" title="Notifications" icon={faEnvelope} />
            </Navigation>

            <div className="divide-y divide-divider">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
