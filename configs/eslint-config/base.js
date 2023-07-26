const { baseRules, tsRules } = require('./rules');

module.exports = {
  extends: ['airbnb-base', 'plugin:import/recommended', 'prettier'],
  plugins: ['prettier'],
  rules: baseRules,
  overrides: [
    {
      parser: '@typescript-eslint/parser',
      settings: {
        'import/resolver': {
          typescript: {},
        },
      },
      files: ['*.ts', '*.tsx'],
      extends: [
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:import/typescript',
        'prettier',
      ],
      plugins: ['prettier'],
      rules: tsRules,
    },
  ],
};
