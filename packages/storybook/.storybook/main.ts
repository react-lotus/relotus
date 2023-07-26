import type { StorybookConfig } from '@storybook/core-common';
import { rootMain } from '../../../.storybook/main';
import { devRefs, prodRefs } from './utils';

const config: StorybookConfig = {
  ...rootMain,

  stories: [
    ...rootMain.stories,
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [...(rootMain.addons || []), '@nrwl/react/plugins/storybook'],
  webpackFinal: (webpackConfig) => {
    // add your own webpack tweaks if needed
    return webpackConfig;
  },
  refs: (_config, { configType }) => {
    return configType === 'DEVELOPMENT' ? devRefs : prodRefs;
  },
};

module.exports = config;
