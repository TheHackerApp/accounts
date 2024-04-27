/* eslint-disable @typescript-eslint/no-var-requires */
const { exec } = require('node:child_process');
const fs = require('node:fs/promises');

const tempy = import('tempy');

/** @type {import('@graphql-codegen/plugin-helpers').PluginFunction} */
const plugin = async () => {
  const { temporaryFileTask } = await tempy;
  return temporaryFileTask(async (path) => {
    // eslint-disable-next-line no-undef
    await new Promise((resolve, reject) =>
      exec(
        'pnpm persisted-queries',
        {
          env: {
            PATH: process.env.PATH,
            OUTPUT_PATH: path,
          },
        },
        (error) => {
          if (error) reject(error);
          else resolve();
        },
      ),
    );

    return fs.readFile(path, 'utf8');
  });
};

module.exports = { plugin };
