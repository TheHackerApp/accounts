import { User } from '@/graphql';
import { getClient } from '@/graphql/clients/server';

import { ProfileDocument } from './Profile.graphql';

export type Profile = Omit<User, '__typename' | 'events' | 'identities' | 'organizations'>;

/**
 * Get the current user's profile details
 */
export async function getCurrentUser(): Promise<Profile> {
  const { data } = await getClient().query({ query: ProfileDocument, context: { tag: 'currentUser' } });
  return data.me;
}
