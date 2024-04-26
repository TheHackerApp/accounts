import { relative } from 'node:path';

const buildEslintCommand = (filenames) => {
  const cwd = process.cwd();
  const args = filenames.map((f) => '--file ' + relative(cwd, f)).join(' ');
  return `next lint --fix ${args}`;
};

const handlers = {
  '*': 'prettier --write',
  '*.{js,cjs,mjs,ts,tsx}': [buildEslintCommand],
};

export default handlers;
