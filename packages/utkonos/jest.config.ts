import path from 'path';

export default {
  displayName: 'utkonos',
  preset: '../../jest.preset.js',
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*/*.d.ts', '!src/**/*/types.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],
  transform: {
    '^.+\\.[tj]s(x|)$': 'ts-jest',
    '^.+\\.(js|jsx|mjs)$': ['babel-jest', { presets: [require.resolve('babel-preset-react-app')] }],
  },
  transformIgnorePatterns: ['node_modules/(?!lodash-es)'],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    nanoid: path.resolve(__dirname, '../../node_modules/nanoid'),
    '^@relotus/(.*)$': path.resolve(__dirname, '../$1/src'),
  },
  moduleDirectories: ['node_modules', 'src'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],

  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  moduleFileExtensions: ['ts', 'js', 'jsx', 'html', 'tsx'],
  coverageDirectory: '../../coverage/packages/utils',
};
