import fs from 'fs/promises';
import path from 'path';

export const getGetResourcesSource = async () => {
  return await fs.readFile(path.join('app', 'routes', 'get-resources.tsx'), 'utf-8');
};

export const getPolicySource = async () => {
  const policiesDir = path.join('cerbos', 'policies');
  const policyFiles = await fs.readdir(policiesDir);
  const policySourceFiles = await Promise.all(
    policyFiles.map((filename) => fs.readFile(path.join(policiesDir, filename), 'utf-8'))
  );
  const policySources = Object.fromEntries(
    policyFiles.map((filename, i) => [filename, policySourceFiles[i]])
  );
  return policySources;
};
