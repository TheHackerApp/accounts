'use client';

import { ReactNode } from 'react';

import { Submit, TextField, useForm } from '@/components/form';
import type { Profile } from '@/lib/user';

import PrimaryEmailSelect from './_components/PrimaryEmailSelect';
import { useSubmitAction } from './action';
import { schema } from './schema';

interface Props {
  profile: Profile;
}

const PersonalInformation = ({ profile }: Props): ReactNode => {
  const [errors, formAction] = useSubmitAction(profile);
  const { control } = useForm({ schema, defaults: profile, errors });

  return (
    <form className="md:col-span-2" action={formAction}>
      <div className="grid grid-cols-1 gap-6 sm:max-w-xl sm:grid-cols-6">
        <div className="sm:col-span-3">
          <TextField control={control} name="givenName" label="Given Name" />
        </div>

        <div className="sm:col-span-3">
          <TextField control={control} name="familyName" label="Family Name" />
        </div>

        <div className="col-span-full">
          <PrimaryEmailSelect control={control} name="primaryEmail" />
        </div>
      </div>

      <div className="mt-6 flex">
        <Submit control={control} label="Save" color="secondary" />
      </div>
    </form>
  );
};

export default PersonalInformation;
