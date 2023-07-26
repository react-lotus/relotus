/* eslint-disable */
export default {
  displayName: 'keycloak',
  preset: '../../jest.preset.js',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]s(x|)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'jsx', 'tsx', 'html'],
  setupFilesAfterEnv: ['<rootDir>/setupTest.ts'],
  coverageDirectory: '../../coverage/packages/utils',
};
