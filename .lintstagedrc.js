module.exports = {
  '*': ['nx format:write --uncommitted'],
  'packages/**/*': [
    'nx affected:lint --fix --parallel --uncommitted',
    'nx affected:test --parallel --uncommitted',
    () => 'nx affected --target typecheck --uncommitted',
  ],
  '*.{sc,c}ss': 'nx affected --target stylelint --fix --uncommitted',
  'README.md': ['doctoc --maxlevel 3 --notitle', 'nx format:write --uncommitted'],
  'package.json': 'sort-package-json',
};
