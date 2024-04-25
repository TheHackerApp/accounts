import { relative } from 'node:path';

const buildEslintCommand = (filenames) => {
  const cwd = process.cwd();
  const args = filenames.map((f) => relative(cwd, f)).join(' --file ');
  return `next lint --fix --file ${args}`;
}

const handlers = {
  '*.{js,ts,tsx}': [buildEslintCommand],
};

export default handlers;
