import { addons } from '@storybook/addons';
import { utkonosTheme } from '@relotus/storybook';

export const setupTheme = () => {
  addons.setConfig({
    theme: utkonosTheme,
  });
};
