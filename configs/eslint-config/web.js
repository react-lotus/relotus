const { baseRules, tsRules } = require('./rules');

module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:import/recommended',
    'prettier',
    'plugin:storybook/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    ...baseRules,
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-no-useless-fragment': 'off',
  },
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
        'airbnb-typescript',
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
