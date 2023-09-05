import { formatFiles, Tree, addDependenciesToPackageJson, updateJson, logger } from '@nrwl/devkit';
import { prettierVersion, prettierConfiguration } from '../../constants';
import { InitGeneratorSchema } from './schema';

function setPrettierConfiguration(tree: Tree, options: InitGeneratorSchema) {
  const { configurationFile } = options;

  switch (configurationFile) {
    case 'package.json':
      updateJson(tree, 'package.json', (packageJson) => {
        packageJson.prettier = prettierConfiguration;
        return packageJson;
      });
      return;
    case '.prettierrc':
      tree.write('.prettierrc', `"${prettierConfiguration}"`);
      return;
    default:
      logger.warn('Отсутствует значение для `configurationFile`');
      return;
  }
}

export async function initGenerator(tree: Tree, options: InitGeneratorSchema) {
  const installTask = addDependenciesToPackageJson(tree, {}, { prettier: prettierVersion });
  setPrettierConfiguration(tree, options);
  await formatFiles(tree);

  return installTask;
}

export default initGenerator;
