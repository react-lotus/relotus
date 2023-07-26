const { rules: airbnbImportRules } = require('eslint-config-airbnb-base/rules/imports');
const path = require('path');

const baseRules = {
  'arrow-body-style': 'off',
  'import/prefer-default-export': 'off',
  'import/no-cycle': [2, { maxDepth: 1 }],
  'import/no-import-module-exports': 'off',
  'no-param-reassign': [
    'error',
    { props: true, ignorePropertyModificationsFor: ['state', 'acc', 'cell', 'row', 'column'] },
  ],
};

const { devDependencies: airbnbImportRulesDependencies, ...rest } =
  airbnbImportRules['import/no-extraneous-dependencies'][1];
const airbnbImportRulesModified = airbnbImportRulesDependencies.reduce((acc, item) => {
  const tsItem = item.replace(/(js)/g, 'ts');
  acc.push(tsItem);
  if (!item.startsWith('**')) {
    const joinedItem = path.join('**/', item);
    const joinedTsItem = path.join('**/', tsItem);
    acc.push(joinedItem, joinedTsItem);
  }
  return acc;
}, airbnbImportRulesDependencies);

const tsRules = {
  '@typescript-eslint/no-unsafe-assignment': 'off',
  '@typescript-eslint/no-unused-vars': [
    'warn',
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      ignoreRestSiblings: true,
    },
  ],
  '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
  '@typescript-eslint/no-floating-promises': 'off',
  'import/no-extraneous-dependencies': [
    'error',
    {
      ...rest,
      devDependencies: [
        ...airbnbImportRulesModified,
        '**/*.stories.*',
        '**/__stories__/**',
        '**/stories/**',
      ],
    },
  ],
};

module.exports = { baseRules, tsRules };
