import type { StorybookConfig } from '@storybook/core-common';
import { resolve } from 'path';

export const rootMain: StorybookConfig = {
  core: { builder: 'webpack5', disableTelemetry: true },
  stories: [],
  addons: ['@storybook/addon-essentials'],
  staticDirs: [resolve(__dirname, './public')],
  features: {
    buildStoriesJson: true,
    postcss: false,
  },
};
