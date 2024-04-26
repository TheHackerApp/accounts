import type { TypedDocumentNode } from '@graphql-typed-document-node/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DocumentNode<TResult = { [key: string]: any }, TVariables = { [key: string]: any }> = TypedDocumentNode<
  TResult,
  TVariables
> & {
  hash: string;
};
