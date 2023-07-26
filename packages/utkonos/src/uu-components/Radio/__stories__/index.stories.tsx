import { useState } from 'react';
import type { Meta, Story } from '@storybook/react/types-6-0';
import { Radio } from '..';
import type { RadioProps } from '..';
import { radioArgTypes } from './argTypes';
import { Tooltip } from '../../Tooltip';

export default {
  title: 'Controls/Radio',
  component: Radio,
  argTypes: radioArgTypes,
} as Meta;

export const Playground: Story<RadioProps> = ({ ...args }) => <Radio {...args} />;

Playground.args = {
  children: 'Radio',
  id: 'nanoid()',
};

export const Preview = () => {
  const [value, setValue] = useState('check1');
  return (
    <div className="sb-row">
      <div className="sb-row">
        <div>
          <Radio
            name="radio"
            checked={value === 'check1'}
            value="check1"
            onChange={(event) => setValue(event.target.value)}
          >
            Radio button 1
          </Radio>
        </div>
        <div>
          <Radio
            name="radio"
            checked={value === 'check2'}
            value="check2"
            onChange={(event) => setValue(event.target.value)}
          >
            Radio button 1
          </Radio>
        </div>
        <div>
          <Radio disabled>Radio disabled</Radio>
        </div>
        <div>
          <Radio disabled checked>
            Radio disabled checked
          </Radio>
        </div>
      </div>
    </div>
  );
};

export const Disabled = () => {
  return <Radio disabled>Radio disabled</Radio>;
};

export const DisabledChecked = () => {
  return (
    <Radio disabled checked>
      Radio disabled checked
    </Radio>
  );
};

export const WithTooltip = () => {
  const [value, setValue] = useState('check1');
  return (
    <Tooltip placement="bottom" title="Радиобаттон">
      <Radio
        name="radio"
        checked={value === 'check1'}
        value="check1"
        onChange={(event) => setValue(event.target.value)}
      >
        Radio checked with toolpip
      </Radio>
    </Tooltip>
  );
};
