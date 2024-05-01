import { ApolloClient, useApolloClient } from '@apollo/client';
import { useMemo } from 'react';
import { useFormState } from 'react-dom';
import toast from 'react-hot-toast';

import type { Action, ActionState } from '@/components/form';
import { Profile } from '@/lib/user';

import { schema } from './schema';
import { UpdateProfileDocument } from './UpdateProfile.graphql';

// TODO: evaluate moving to server for cache invalidation
const action =
  (userId: number, client: ApolloClient<object>): Action<typeof schema> =>
  async (_previous, formData) => {
    const result = schema.safeParse(Object.fromEntries(formData));
    if (!result.success) return result.error;

    const { data, errors } = await client.mutate({
      mutation: UpdateProfileDocument,
      variables: { input: { id: userId, ...result.data } },
    });
    if (data === null || data === undefined || errors != undefined) return;

    const { userErrors } = data.updateUser;
    if (userErrors.length !== 0) return userErrors;

    toast.success('Profile updated!', { duration: 30 * 1000 });
  };

export const useSubmitAction = (
  profile: Profile,
): [state: ActionState<typeof schema>, dispatch: (payload: FormData) => void, isPending: boolean] => {
  const client = useApolloClient();
  const instance = useMemo(() => action(profile.id, client), [profile, client]);
  return useFormState(instance, undefined);
};
