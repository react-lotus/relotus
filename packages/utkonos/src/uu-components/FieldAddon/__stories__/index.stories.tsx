import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';

import { FieldAddon, FieldAddonProps } from '..';
import { fieldAddonArgTypes } from './argTypes';
import { ReactComponent as SettingsSvg } from './assets/settings.svg';

export default {
  title: 'Elements/FieldAddon',
  argTypes: fieldAddonArgTypes,
  component: FieldAddon,
} as Meta;

export const PlayGround: Story<FieldAddonProps> = (props) => {
  return <FieldAddon {...props} />;
};

PlayGround.args = {
  suffix: undefined,
  children: undefined,
  className: undefined,
  disabled: false,
};

export const DisabledProp = () => <FieldAddon disabled />;

export const SuffixTextProp = () => <FieldAddon suffix="руб" />;

export const SuffixIconProp = () => <FieldAddon suffix={<SettingsSvg />} />;
