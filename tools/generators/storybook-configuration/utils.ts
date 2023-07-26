import {
  generateFiles,
  logger,
  offsetFromRoot,
  readProjectConfiguration,
  updateProjectConfiguration,
  Tree,
  TargetConfiguration,
} from '@nrwl/devkit';
import jscodeshift from 'jscodeshift';
import { join } from 'path';

const j = jscodeshift.withParser('ts');

/**
 * Создание папки `.storybook` в директории пакета
 */
export function createProjectStorybookDir(tree: Tree, projectName: string) {
  const { root } = readProjectConfiguration(tree, projectName);

  const storybookRoot = join(root, '.storybook');

  if (tree.exists(storybookRoot)) {
    logger.warn(
      `Папка .storybook уже существует в пакете ${projectName}! Skipping generating files in it.`,
    );
    return;
  }

  const templatePath = join(__dirname, './files');

  generateFiles(tree, templatePath, root, {
    tmpl: '',
    offsetFromRoot: offsetFromRoot(root),
  });
}

/**
 * Получение данных файла с константами в пакете `storybook`
 */
function getStorybookConstans(tree: Tree) {
  const { root: storybookProjectRoot } = readProjectConfiguration(tree, 'storybook');

  const storybookConstantsFilePath = join(storybookProjectRoot, '.storybook/constants.ts');

  const constantsEntry = tree.read(storybookConstantsFilePath);

  if (!constantsEntry) {
    throw new Error(
      `Не удалось найти файл с константами пакета storybook: ${storybookConstantsFilePath}`,
    );
  }
  const constantsContents = constantsEntry.toString();

  return {
    ast: j(constantsContents),
    entry: constantsEntry,
    path: storybookConstantsFilePath,
  };
}

/**
 * Получение следующего значения порта для dev-сервера пакета
 */
export function getNextHostPort(tree: Tree) {
  const { ast: root } = getStorybookConstans(tree);

  const ports = root
    .findVariableDeclarators('hosts')
    .find(j.ObjectProperty, { key: { name: 'port' } })
    .nodes()
    .map((node) => {
      const value = node.value as jscodeshift.NumericLiteral;
      return value.value;
    });

  return Math.max(...ports) + 1;
}

/**
 * Добавление данных о новом пакете в файл констант пакета storybook
 */
export function updateStorybookHosts(tree: Tree, projectName: string, port: number) {
  const { ast: root, path } = getStorybookConstans(tree);

  const host = j.objectExpression([
    j.property('init', j.identifier('name'), j.literal(projectName)),
    j.property('init', j.identifier('port'), j.literal(port)),
  ]);

  const source = root
    .findVariableDeclarators('hosts')
    .find(j.ArrayExpression)
    .forEach(({ node }) => node.elements.push(host))
    .toSource();

  tree.write(path, source);
}

/**
 * Исправление targets в project.json пакета, после исправления стандартного генератора
 */
export function fixProjectStorybookTasks(tree: Tree, projectName: string, port: number) {
  const projectConfig = readProjectConfiguration(tree, projectName);
  const storybookTarget = projectConfig.targets?.storybook as TargetConfiguration<{ port: number }>;

  if (!storybookTarget.options) {
    throw new Error(`Не найден target \`storybook\` в конфигурации пакета ${projectName}`);
  }

  storybookTarget.options.port = port;
  storybookTarget.configurations = {
    composition: {
      quiet: true,
      open: false,
    },
  };
  updateProjectConfiguration(tree, projectName, projectConfig);
}
