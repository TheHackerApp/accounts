/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('node:fs/promises');
const { promisify } = require('util');
const exec = promisify(require('node:child_process').exec);

const tempy = import('tempy');

/** @type {import('@graphql-codegen/plugin-helpers').PluginFunction} */
const plugin = async () => {
  const { temporaryFileTask } = await tempy;
  return temporaryFileTask(async (path) => {
    await exec('pnpm persisted-queries', {
      env: {
        PATH: process.env.PATH,
        OUTPUT_PATH: path,
      },
    });

    return fs.readFile(path, 'utf8');
  });
};

module.exports = { plugin };
