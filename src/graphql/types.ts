/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * Implement the DateTime<Utc> scalar
   *
   * The input/output is a string in RFC3339 format.
   */
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
  join__FieldSet: { input: any; output: any; }
  link__Import: { input: any; output: any; }
};

/** Input for adding a user to an event */
export type AddUserToEventInput = {
  /** The slug of the event to add the user to */
  readonly event: Scalars['String']['input'];
  /** The ID of the user to add */
  readonly userId: Scalars['Int']['input'];
};

export type AddUserToEventResult = {
  readonly __typename: 'AddUserToEventResult';
  /** The event the user was added to */
  readonly event?: Maybe<Event>;
  /** The user that was added to the event */
  readonly user?: Maybe<User>;
  /** Errors that may have occurred while processing the action */
  readonly userErrors: ReadonlyArray<UserError>;
};

/** Input for adding a user to an organization */
export type AddUserToOrganizationInput = {
  /** The ID of the organization to add the user to */
  readonly organizationId: Scalars['Int']['input'];
  /** The role the user should have */
  readonly role?: Role;
  /** The ID of the user to add */
  readonly userId: Scalars['Int']['input'];
};

export type AddUserToOrganizationResult = {
  readonly __typename: 'AddUserToOrganizationResult';
  /** The organization the user was added to */
  readonly organization?: Maybe<Organization>;
  /** The user that was added to the organization */
  readonly user?: Maybe<User>;
  /** Errors that may have occurred while processing the action */
  readonly userErrors: ReadonlyArray<UserError>;
};

/** Input fields for creating an event */
export type CreateEventInput = {
  /** The display name */
  readonly name: Scalars['String']['input'];
  /** The organization putting on the event */
  readonly organizationId: Scalars['Int']['input'];
  /** A unique slug */
  readonly slug: Scalars['String']['input'];
};

export type CreateEventResult = {
  readonly __typename: 'CreateEventResult';
  /** The created event */
  readonly event?: Maybe<Event>;
  /** Errors that may have occurred while processing the action */
  readonly userErrors: ReadonlyArray<UserError>;
};

/** Input fields for creating an organization */
export type CreateOrganizationInput = {
  /** The display name */
  readonly name: Scalars['String']['input'];
  /** Who owns the organization */
  readonly ownerId: Scalars['Int']['input'];
};

export type CreateOrganizationResult = {
  readonly __typename: 'CreateOrganizationResult';
  /** The created organization */
  readonly organization?: Maybe<Organization>;
  /** Errors that may have occurred while processing the action */
  readonly userErrors: ReadonlyArray<UserError>;
};

/** Input fields for creating a provider */
export type CreateProviderInput = {
  /** The provider-specific configuration */
  readonly config: Scalars['JSON']['input'];
  /** The public-facing display name */
  readonly name: Scalars['String']['input'];
  /** A unique slug */
  readonly slug: Scalars['String']['input'];
};

export type CreateProviderResult = {
  readonly __typename: 'CreateProviderResult';
  /** The created authentication provider */
  readonly provider?: Maybe<Provider>;
  /** Errors that may have occurred while processing the action */
  readonly userErrors: ReadonlyArray<UserError>;
};

/** A custom domain the event is accessible at */
export type CustomDomain = {
  readonly __typename: 'CustomDomain';
  /** When the custom domain was first created */
  readonly createdAt: Scalars['DateTime']['output'];
  /** The event that the custom domain is attached to */
  readonly event: Event;
  /** The domain name for the event */
  readonly name: Scalars['String']['output'];
  /** When the custom domain was last updated */
  readonly updatedAt: Scalars['DateTime']['output'];
};

export type DeleteEventResult = {
  readonly __typename: 'DeleteEventResult';
  /** The slug of the deleted event */
  readonly deletedSlug?: Maybe<Scalars['String']['output']>;
  /** Errors that may have occurred while processing the action */
  readonly userErrors: ReadonlyArray<UserError>;
};

export type DeleteOrganizationResult = {
  readonly __typename: 'DeleteOrganizationResult';
  /** The ID of the deleted organization */
  readonly deletedId?: Maybe<Scalars['Int']['output']>;
  /** Errors that may have occurred while processing the action */
  readonly userErrors: ReadonlyArray<UserError>;
};

export type DeleteProviderResult = {
  readonly __typename: 'DeleteProviderResult';
  /** The slug of the deleted authentication provider */
  readonly deletedSlug?: Maybe<Scalars['String']['output']>;
  /** Errors that may have occurred while processing the action */
  readonly userErrors: ReadonlyArray<UserError>;
};

export type DeleteUserResult = {
  readonly __typename: 'DeleteUserResult';
  /** The ID of the deleted user */
  readonly deletedId?: Maybe<Scalars['Int']['output']>;
  /** Errors that may have occurred while processing the action */
  readonly userErrors: ReadonlyArray<UserError>;
};

/** An event that is put on */
export type Event = {
  readonly __typename: 'Event';
  /** Whether the event is active */
  readonly active: Scalars['Boolean']['output'];
  /** When the event was first created */
  readonly createdAt: Scalars['DateTime']['output'];
  /** The custom domain for the event */
  readonly customDomain?: Maybe<CustomDomain>;
  /** When write-access expires */
  readonly expiresOn: Scalars['DateTime']['output'];
  /** Display name of the event */
  readonly name: Scalars['String']['output'];
  /** The organization that owns the event */
  readonly organization: Organization;
  /** The unique slug */
  readonly slug: Scalars['String']['output'];
  /** When the event was last updated */
  readonly updatedAt: Scalars['DateTime']['output'];
};

/** Maps a user to their authentication provider */
export type Identity = {
  readonly __typename: 'Identity';
  /** When the identity was first created */
  readonly createdAt: Scalars['DateTime']['output'];
  /** The email associated with the identity */
  readonly email: Scalars['String']['output'];
  /** The provider the identity corresponds to */
  readonly provider: Scalars['String']['output'];
  /** When the identity was last updated */
  readonly updatedAt: Scalars['DateTime']['output'];
};

/**
 * The various GraphQL mutations
 *
 * To improve readability, the mutation implementations are split into different files, but all
 * attached to this one struct.
 */
export type Mutation = {
  readonly __typename: 'Mutation';
  /** Add a user to an event, as a participant */
  readonly addUserToEvent: AddUserToEventResult;
  /** Add a user to an organization */
  readonly addUserToOrganization: AddUserToOrganizationResult;
  /** Create a new event */
  readonly createEvent: CreateEventResult;
  /** Add a new organization */
  readonly createOrganization: CreateOrganizationResult;
  /** Add a new authentication provider. The provider will be disabled by default. */
  readonly createProvider: CreateProviderResult;
  /** Delete an event */
  readonly deleteEvent: DeleteEventResult;
  /** Delete an organization */
  readonly deleteOrganization: DeleteOrganizationResult;
  /** Delete an authentication provider */
  readonly deleteProvider: DeleteProviderResult;
  /** Delete a user */
  readonly deleteUser: DeleteUserResult;
  /** Remove a participant from an event */
  readonly removeUserFromEvent: RemoveUserFromEventResult;
  /** Remove a user from an organization */
  readonly removeUserFromOrganization: RemoveUserFromOrganizationResult;
  /** Transfer the ownership of the organization to a different user */
  readonly transferOrganizationOwnership: TransferOrganizationOwnershipResult;
  /** Unlink an authentication provider identity from a user */
  readonly unlinkIdentity: UnlinkIdentityResult;
  /** Update the details of an event */
  readonly updateEvent: UpdateEventResult;
  /** Update the details of an organization */
  readonly updateOrganization: UpdateOrganizationResult;
  /** Update the details of an authentication provider */
  readonly updateProvider: UpdateProviderResult;
  /** Update the details of a user */
  readonly updateUser: UpdateUserResult;
};


/**
 * The various GraphQL mutations
 *
 * To improve readability, the mutation implementations are split into different files, but all
 * attached to this one struct.
 */
export type MutationAddUserToEventArgs = {
  input: AddUserToEventInput;
};


/**
 * The various GraphQL mutations
 *
 * To improve readability, the mutation implementations are split into different files, but all
 * attached to this one struct.
 */
export type MutationAddUserToOrganizationArgs = {
  input: AddUserToOrganizationInput;
};


/**
 * The various GraphQL mutations
 *
 * To improve readability, the mutation implementations are split into different files, but all
 * attached to this one struct.
 */
export type MutationCreateEventArgs = {
  input: CreateEventInput;
};


/**
 * The various GraphQL mutations
 *
 * To improve readability, the mutation implementations are split into different files, but all
 * attached to this one struct.
 */
export type MutationCreateOrganizationArgs = {
  input: CreateOrganizationInput;
};


/**
 * The various GraphQL mutations
 *
 * To improve readability, the mutation implementations are split into different files, but all
 * attached to this one struct.
 */
export type MutationCreateProviderArgs = {
  input: CreateProviderInput;
};


/**
 * The various GraphQL mutations
 *
 * To improve readability, the mutation implementations are split into different files, but all
 * attached to this one struct.
 */
export type MutationDeleteEventArgs = {
  slug: Scalars['String']['input'];
};


/**
 * The various GraphQL mutations
 *
 * To improve readability, the mutation implementations are split into different files, but all
 * attached to this one struct.
 */
export type MutationDeleteOrganizationArgs = {
  id: Scalars['Int']['input'];
};


/**
 * The various GraphQL mutations
 *
 * To improve readability, the mutation implementations are split into different files, but all
 * attached to this one struct.
 */
export type MutationDeleteProviderArgs = {
  slug: Scalars['String']['input'];
};


/**
 * The various GraphQL mutations
 *
 * To improve readability, the mutation implementations are split into different files, but all
 * attached to this one struct.
 */
export type MutationDeleteUserArgs = {
  id: Scalars['Int']['input'];
};


/**
 * The various GraphQL mutations
 *
 * To improve readability, the mutation implementations are split into different files, but all
 * attached to this one struct.
 */
export type MutationRemoveUserFromEventArgs = {
  input: RemoveUserFromEventInput;
};


/**
 * The various GraphQL mutations
 *
 * To improve readability, the mutation implementations are split into different files, but all
 * attached to this one struct.
 */
export type MutationRemoveUserFromOrganizationArgs = {
  input: RemoveUserFromOrganizationInput;
};


/**
 * The various GraphQL mutations
 *
 * To improve readability, the mutation implementations are split into different files, but all
 * attached to this one struct.
 */
export type MutationTransferOrganizationOwnershipArgs = {
  input: TransferOrganizationOwnershipInput;
};


/**
 * The various GraphQL mutations
 *
 * To improve readability, the mutation implementations are split into different files, but all
 * attached to this one struct.
 */
export type MutationUnlinkIdentityArgs = {
  input: UnlinkIdentityInput;
};


/**
 * The various GraphQL mutations
 *
 * To improve readability, the mutation implementations are split into different files, but all
 * attached to this one struct.
 */
export type MutationUpdateEventArgs = {
  input: UpdateEventInput;
};


/**
 * The various GraphQL mutations
 *
 * To improve readability, the mutation implementations are split into different files, but all
 * attached to this one struct.
 */
export type MutationUpdateOrganizationArgs = {
  input: UpdateOrganizationInput;
};


/**
 * The various GraphQL mutations
 *
 * To improve readability, the mutation implementations are split into different files, but all
 * attached to this one struct.
 */
export type MutationUpdateProviderArgs = {
  input: UpdateProviderInput;
};


/**
 * The various GraphQL mutations
 *
 * To improve readability, the mutation implementations are split into different files, but all
 * attached to this one struct.
 */
export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

/** An organization that puts on events */
export type Organization = {
  readonly __typename: 'Organization';
  /** When the organization was first created */
  readonly createdAt: Scalars['DateTime']['output'];
  /** All the events owned by the organization */
  readonly events: ReadonlyArray<Event>;
  /** A unique ID */
  readonly id: Scalars['Int']['output'];
  /** URL for the organization's logo */
  readonly logo?: Maybe<Scalars['String']['output']>;
  /** The name of the organization */
  readonly name: Scalars['String']['output'];
  /** The owner of the organization */
  readonly owner: User;
  /** When the organization was last updated */
  readonly updatedAt: Scalars['DateTime']['output'];
  /** URL for the organization's website */
  readonly website?: Maybe<Scalars['String']['output']>;
};

/** Maps a user to an organization as an organizer */
export type Organizer = {
  readonly __typename: 'Organizer';
  /** When the mapping was created */
  readonly createdAt: Scalars['DateTime']['output'];
  /** The organization the user is part of */
  readonly organization: Organization;
  /** The permissions the user has */
  readonly role: Role;
  /** When the mapping was last updated */
  readonly updatedAt: Scalars['DateTime']['output'];
  /** The user that is part of the organization */
  readonly user: User;
};

/** Maps a user to an event as a participant */
export type Participant = {
  readonly __typename: 'Participant';
  /** When the mapping was first created */
  readonly createdAt: Scalars['DateTime']['output'];
  /** The event the user is participating in */
  readonly event: Event;
  /** When the mapping was last updated */
  readonly updatedAt: Scalars['DateTime']['output'];
  /** The user associated with the event */
  readonly user: User;
};

/** Configuration for an authentication provider */
export type Provider = {
  readonly __typename: 'Provider';
  /** Provider-specific configuration, i.e. implementation kind, OIDC URLs, scopes, etc */
  readonly config: Scalars['JSON']['output'];
  /** When the provider was created */
  readonly createdAt: Scalars['DateTime']['output'];
  /** Whether the provider can be used for authentication */
  readonly enabled: Scalars['Boolean']['output'];
  /** Get the logo to use */
  readonly logo: Scalars['String']['output'];
  /** The display name */
  readonly name: Scalars['String']['output'];
  /** A unique identifier for the provider */
  readonly slug: Scalars['String']['output'];
  /** WHen the provider was last updated */
  readonly updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  readonly __typename: 'Query';
  /** Get an event by its slug */
  readonly event?: Maybe<Event>;
  /** Get all the events being put on */
  readonly events: ReadonlyArray<Event>;
  /** Get information about the current user */
  readonly me: User;
  /** Get an organization by its ID */
  readonly organization?: Maybe<Organization>;
  /** Get all the registered organizations */
  readonly organizations: ReadonlyArray<Organization>;
  /** Get an authentication provider by its slug */
  readonly provider?: Maybe<Provider>;
  /** Get all the authentication providers */
  readonly providers: ReadonlyArray<Provider>;
  /** Get a user by their ID */
  readonly user?: Maybe<User>;
};


export type QueryEventArgs = {
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryOrganizationArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryProviderArgs = {
  slug: Scalars['String']['input'];
};


export type QueryUserArgs = {
  by: UserBy;
};

/** Input for removing a user from an event */
export type RemoveUserFromEventInput = {
  /** The slug of the event to remove the user from */
  readonly event: Scalars['String']['input'];
  /** The ID of the user to remove */
  readonly userId: Scalars['Int']['input'];
};

export type RemoveUserFromEventResult = {
  readonly __typename: 'RemoveUserFromEventResult';
  /** The event the user was removed from */
  readonly event?: Maybe<Scalars['String']['output']>;
  /** The ID of the user that was removed from the event */
  readonly removedUserId?: Maybe<Scalars['Int']['output']>;
  /** Errors that may have occurred while processing the action */
  readonly userErrors: ReadonlyArray<UserError>;
};

/** Input for removing a user from an organization */
export type RemoveUserFromOrganizationInput = {
  /** The ID of the organization to remove the user from */
  readonly organizationId: Scalars['Int']['input'];
  /** The ID of the user to remove */
  readonly userId: Scalars['Int']['input'];
};

export type RemoveUserFromOrganizationResult = {
  readonly __typename: 'RemoveUserFromOrganizationResult';
  /** The organization the user was removed from */
  readonly organization?: Maybe<Scalars['Int']['output']>;
  /** The ID of the user that was removed from the organization */
  readonly removedUserId?: Maybe<Scalars['Int']['output']>;
  /** Errors that may have occurred while processing the action */
  readonly userErrors: ReadonlyArray<UserError>;
};

/** A role that can be applied to an organizer */
export enum Role {
  /** Has full permissions within the organization and event */
  Director = 'DIRECTOR',
  /** An elevated user within the organization that change event and organization settings */
  Manager = 'MANAGER',
  /** A normal user within the organization */
  Organizer = 'ORGANIZER'
}

/** Input fields for transferring the ownership of an organization */
export type TransferOrganizationOwnershipInput = {
  /** The ID of the organization to transfer ownership of */
  readonly id: Scalars['Int']['input'];
  /** The ID of the new organization owner */
  readonly newOwnerId: Scalars['Int']['input'];
};

export type TransferOrganizationOwnershipResult = {
  readonly __typename: 'TransferOrganizationOwnershipResult';
  /** The organization */
  readonly organization?: Maybe<Organization>;
  /** Errors that may have occurred while processing the action */
  readonly userErrors: ReadonlyArray<UserError>;
};

/** Input for unlinking a user's authentication provider identity */
export type UnlinkIdentityInput = {
  /** THe provider to unlink */
  readonly provider: Scalars['String']['input'];
  /** The ID of the user to perform the unlinking on */
  readonly userId: Scalars['Int']['input'];
};

export type UnlinkIdentityResult = {
  readonly __typename: 'UnlinkIdentityResult';
  /** The provider that was unlinked */
  readonly unlinkedProvider?: Maybe<Scalars['String']['output']>;
  /** Errors that may have occurred while processing the action */
  readonly userErrors: ReadonlyArray<UserError>;
};

/** Input fields for updating an event */
export type UpdateEventInput = {
  /** The display name */
  readonly name?: InputMaybe<Scalars['String']['input']>;
  /** The slug of the event to update */
  readonly slug: Scalars['String']['input'];
};

export type UpdateEventResult = {
  readonly __typename: 'UpdateEventResult';
  /** The event */
  readonly event?: Maybe<Event>;
  /** Errors that may have occurred while processing the action */
  readonly userErrors: ReadonlyArray<UserError>;
};

/** Input fields for updating an organization */
export type UpdateOrganizationInput = {
  /** The ID of the organization to update */
  readonly id: Scalars['Int']['input'];
  /** The URL of the organization's logo */
  readonly logo?: InputMaybe<Scalars['String']['input']>;
  /** The display name */
  readonly name?: InputMaybe<Scalars['String']['input']>;
  /** The URL of the organization's website */
  readonly website?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOrganizationResult = {
  readonly __typename: 'UpdateOrganizationResult';
  /** The organization */
  readonly organization?: Maybe<Organization>;
  /** Errors that may have occurred while processing the action */
  readonly userErrors: ReadonlyArray<UserError>;
};

/** Input fields for updating a provider */
export type UpdateProviderInput = {
  /** The provider-specific configuration */
  readonly config?: InputMaybe<Scalars['JSON']['input']>;
  /** Whether the provider can be used */
  readonly enabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** The public-facing display name */
  readonly name?: InputMaybe<Scalars['String']['input']>;
  /** The slug of the provider to update */
  readonly slug: Scalars['String']['input'];
};

export type UpdateProviderResult = {
  readonly __typename: 'UpdateProviderResult';
  /** The authentication provider */
  readonly provider?: Maybe<Provider>;
  /** Errors that may have occurred while processing the action */
  readonly userErrors: ReadonlyArray<UserError>;
};

/** Input fields for updating a user */
export type UpdateUserInput = {
  /** The family/last name */
  readonly familyName?: InputMaybe<Scalars['String']['input']>;
  /** The given/first name */
  readonly givenName?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the user to update */
  readonly id: Scalars['Int']['input'];
  /** Whether the user is an administrator */
  readonly isAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  /** The primary email as selected by the user */
  readonly primaryEmail?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserResult = {
  readonly __typename: 'UpdateUserResult';
  /** The user */
  readonly user?: Maybe<User>;
  /** Errors that may have occurred while processing the action */
  readonly userErrors: ReadonlyArray<UserError>;
};

/** A user of the service */
export type User = {
  readonly __typename: 'User';
  /** When the user was first created */
  readonly createdAt: Scalars['DateTime']['output'];
  /** The events the user has joined */
  readonly events: ReadonlyArray<Participant>;
  /** The family/last name */
  readonly familyName: Scalars['String']['output'];
  /** The given/first name */
  readonly givenName: Scalars['String']['output'];
  /** A unique ID */
  readonly id: Scalars['Int']['output'];
  /** The identities the user can login with */
  readonly identities: ReadonlyArray<Identity>;
  /** Whether the user is an administrator */
  readonly isAdmin: Scalars['Boolean']['output'];
  /** The organizations the user is part of */
  readonly organizations: ReadonlyArray<Organizer>;
  /** The primary email as selected by the user */
  readonly primaryEmail: Scalars['String']['output'];
  /** When the user was last updated */
  readonly updatedAt: Scalars['DateTime']['output'];
};

/** How to look up a user */
export type UserBy = {
  /** How to look up a user */
  readonly id?: InputMaybe<Scalars['Int']['input']>;
  /** How to look up a user */
  readonly primaryEmail?: InputMaybe<Scalars['String']['input']>;
};

/** Represents and error in the input of a mutation */
export type UserError = {
  readonly __typename: 'UserError';
  /** The path to the input field that caused the error */
  readonly field: ReadonlyArray<Scalars['String']['output']>;
  /** The error message */
  readonly message: Scalars['String']['output'];
};

export enum Join__Graph {
  Identity = 'IDENTITY'
}

export enum Link__Purpose {
  /** `EXECUTION` features provide metadata necessary for operation execution. */
  Execution = 'EXECUTION',
  /** `SECURITY` features provide metadata necessary to securely resolve fields. */
  Security = 'SECURITY'
}
