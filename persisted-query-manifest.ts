import { DocumentTransform } from '@apollo/client';
import { PersistedQueryManifestConfig } from '@apollo/generate-persisted-query-manifest';

import { typenameTransformer } from './src/graphql/transform';

const config: PersistedQueryManifestConfig = {
  documentTransform: new DocumentTransform(typenameTransformer),
};

export default config;
