const nxPreset = require('@nrwl/jest/preset').default;
const path = require('path');
module.exports = {
  ...nxPreset,
  globalSetup: path.resolve(__dirname, './test/setupTestsGlobal.ts'),
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': path.resolve(__dirname, './test/fileTransform.js'),
  },
};
