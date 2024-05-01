import { Button } from '@nextui-org/react';
import { ReactNode } from 'react';

import Section from '@/app/(authenticated)/settings/_components/Section';
import { getCurrentUser } from '@/lib/user';

import PersonalInformation from './_components/PersonalInformation';

export default async function General(): Promise<ReactNode> {
  const currentUser = await getCurrentUser();

  return (
    <>
      <Section title="Personal Information" description="Change your name, profile picture, and primary email.">
        <PersonalInformation profile={currentUser} />
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
