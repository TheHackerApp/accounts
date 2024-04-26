const { createHash } = require('node:crypto');

const { sortTopLevelDefinitions } = require('@apollo/persisted-query-lists');
const { isComplexPluginOutput } = require('@graphql-codegen/plugin-helpers');
const { plugin: typedDocumentNodePlugin } = require('@graphql-codegen/typed-document-node');
const { print } = require('graphql');

/**
 * @param schema {import('graphql').GraphQLSchema}
 * @param rawDocuments {import('@graphql-codegen/plugin-helpers').Types.DocumentFile}
 * @param config
 * @return {Promise<import('@graphql-codegen/plugin-helpers').Types.PluginOutput>}
 */
async function generateTypedDocument(schema, rawDocuments, config) {
  const result = typedDocumentNodePlugin(schema, rawDocuments, config);
  if (result instanceof Promise) return await result;
  else return result;
}

/** @type {import('@graphql-codegen/plugin-helpers').PluginFunction} */
const plugin = async (schema, rawDocuments, config) => {
  const result = await generateTypedDocument(schema, rawDocuments, config);
  if (!isComplexPluginOutput(result)) return result;

  // Extract the generated document
  const start = result.content.indexOf('{');
  const end = result.content.lastIndexOf('}');
  /** @type {import('graphql').DocumentNode} */
  const document = JSON.parse(result.content.substring(start, end + 1));

  // These are considered invalid by ESLint, so we ignore them
  if (document.definitions.length > 1) return result;
  if (document.definitions[0].name === undefined) return result;

  const printed = print(sortTopLevelDefinitions(document));
  const hash = createHash('sha-256').update(printed).digest('hex');
  result.append = [`${document.definitions[0].name.value}Document.hash = '${hash}';\n`];

  return result;
};

module.exports = { plugin };
