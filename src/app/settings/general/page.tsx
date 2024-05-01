import { Button } from '@nextui-org/react';
import { ReactNode, Suspense } from 'react';

import Section from '@/app/settings/_components/Section';
import Spinner from '@/components/Spinner';

import PersonalInformation from './_components/PersonalInformation';

export default function General(): ReactNode {
  return (
    <>
      <Section title="Personal Information" description="Change your name, profile picture, and primary email.">
        <Suspense fallback={<Spinner />}>
          <PersonalInformation />
        </Suspense>
      </Section>
      <Section
        title="Delete account"
        description="This action is not reversible. All information related to your account will be deleted permanently."
      >
        <div className="flex items-start md:col-span-2">
          <Button color="danger">Yes, delete my account</Button>
        </div>
      </Section>
    </>
  );
}
