import { Tree, formatFiles, installPackagesTask, names, getWorkspaceLayout } from '@nrwl/devkit';
import {
  configureTsSolutionConfig,
  updateLintConfig,
  addStorybookTask,
} from '@nrwl/storybook/src/generators/configuration/util-functions';
import { StorybookConfigureSchema } from '@nrwl/storybook/src/generators/configuration/schema';
import { StorybookConfigurationSchema } from './schema';
import {
  createProjectStorybookDir,
  getNextHostPort,
  fixProjectStorybookTasks,
  updateStorybookHosts,
} from './utils';

interface NormalizedSchema extends StorybookConfigurationSchema {
  projectName: string;
  projectRoot: string;
}

function normalizeOptions(tree: Tree, options: StorybookConfigurationSchema): NormalizedSchema {
  const projectDirectory = names(options.name).fileName;
  const projectName = projectDirectory.replace(/\//g, '-');
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}`;

  return {
    ...options,
    projectName,
    projectRoot,
  };
}

export default async function storybookConfiguration(
  tree: Tree,
  rawSchema: StorybookConfigurationSchema,
) {
  const schema = normalizeOptions(tree, rawSchema);
  const { projectName } = schema;

  createProjectStorybookDir(tree, schema.projectName);
  // хакаем типизацию, так как у внешних функций избыточные параметры не используются
  configureTsSolutionConfig(tree, schema as unknown as StorybookConfigureSchema);
  updateLintConfig(tree, schema as unknown as StorybookConfigureSchema);

  addStorybookTask(tree, projectName, '@storybook/react');
  const port = getNextHostPort(tree);
  updateStorybookHosts(tree, projectName, port);
  fixProjectStorybookTasks(tree, projectName, port);

  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
