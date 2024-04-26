import type { TypedDocumentNode } from '@graphql-typed-document-node/core';

export type DocumentNode<TResult = { [key: string]: any }, TVariables = { [key: string]: any }> = TypedDocumentNode<
  TResult,
  TVariables
> & {
  hash: string;
};
