'use client';

import { ApolloClient, useApolloClient } from '@apollo/client';
import { Link } from '@nextui-org/react';
import { ReactNode, useMemo } from 'react';
import { useFormState } from 'react-dom';

import { SelectField, Submit, TextField, useForm } from '@/components/form';
import type { Action } from '@/components/form';

import { useProfileSuspenseQuery } from './Profile.graphql';
import { schema } from './schema';
import { UpdateProfileDocument } from './UpdateProfile.graphql';

const action =
  (userId: number, client: ApolloClient<object>): Action<typeof schema> =>
  async (_previous, formData) => {
    const result = schema.safeParse(Object.fromEntries(formData));
    if (!result.success) return result.error;

    const { data, errors } = await client.mutate({
      mutation: UpdateProfileDocument,
      variables: { input: { id: userId, ...result.data } },
    });
    if (data === null || data === undefined || errors != undefined) {
      // TODO: handle graphql errors
      console.log(errors);
      return;
    }
    const { userErrors } = data.updateUser;
    if (userErrors.length !== 0) return userErrors;

    // TODO: notify success
  };

const PersonalInformation = (): ReactNode => {
  const { data } = useProfileSuspenseQuery();

  const client = useApolloClient();
  const actionInstance = useMemo(() => action(data.me.id, client), [data, client]);
  const [errors, formAction] = useFormState(actionInstance, undefined);

  const { control } = useForm({ schema, defaults: data.me, errors });

  const identities = new Set(data.me.identities.map((identity) => identity.email));
  const primaryEmailDescription = (
    <>
      We&apos;ll send any account and event notifications to this address. You can manage your emails on the{' '}
      <Link href="/settings/authentication" className="text-tiny">
        Sign-in methods
      </Link>{' '}
      page.
    </>
  );

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
          <SelectField
            control={control}
            name="primaryEmail"
            label="Primary email address"
            description={primaryEmailDescription}
            options={identities}
          />
        </div>
      </div>

      <div className="mt-6 flex">
        <Submit control={control} label="Save" color="secondary" />
      </div>
    </form>
  );
};

export default PersonalInformation;
