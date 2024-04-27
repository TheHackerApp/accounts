import type { CodegenConfig } from '@graphql-codegen/cli';
import type { GraphQLConfig } from 'graphql-config';

import 'dotenv/config';

import { typenameTransformer } from './src/graphql/transform';

const SCHEMA_SOURCE = process.env.GRAPHQL_SCHEMA_SOURCE;
if (SCHEMA_SOURCE === undefined) throw new Error('Unknown schema source. Is GRAPHQL_SCHEMA_SOURCE set?');

const codegen: CodegenConfig = {
  config: {
    useTypeImports: true,
  },
  generates: {
    'src/graphql/types.ts': {
      plugins: ['typescript', { add: { content: '/* eslint-disable */' } }],
      config: {
        immutableTypes: true,
        nonOptionalTypename: true,
      },
    },
    'src/graphql/persisted-query-manifest.json': {
      plugins: ['./dev/persisted-query-manifest.cjs'],
    },
    'src/': {
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: '~@/graphql/types',
      },
      plugins: [
        'typescript-operations',
        './dev/react-apollo.cjs',
        './dev/persisted-queries.cjs',
        { add: { content: '/* eslint-disable */' } },
      ],
      config: {
        addOperationExport: true,
        documentNodeImport: '@/graphql/document-node#DocumentNode',
        documentMode: 'documentNode',
      },
      documentTransforms: [
        {
          transform({ documents }) {
            return documents.map((document) => ({
              ...document,
              document: document.document ? typenameTransformer(document.document) : undefined,
            }));
          },
        },
      ],
    },
  },
  ignoreNoDocuments: true,
};

const config: GraphQLConfig = {
  schema: SCHEMA_SOURCE,
  documents: ['src/app/**/*.graphql'],
  // @ts-expect-error 2353
  extensions: { codegen },
};

export default config;
