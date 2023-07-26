import { useState, ChangeEvent } from 'react';
import type { Meta, Story } from '@storybook/react/types-6-0';

import { Tooltip } from '../../Tooltip';
import { Checkbox } from '..';
import type { CheckboxProps } from '..';
import { checkBoxArgTypes } from './argTypes';

export default {
  title: 'Controls/Checkbox',
  component: Checkbox,
  argTypes: checkBoxArgTypes,
} as Meta;

export const Playground: Story<CheckboxProps> = ({ ...args }) => <Checkbox {...args} />;

Playground.args = {
  children: 'Checkbox',
  id: 'nanoid()',
};

export const Preview = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(true);

  return (
    <div className="sb-col">
      <div className="sb-row">
        <div>
          <Checkbox
            checked={isChecked}
            onChange={(event: ChangeEvent<HTMLInputElement>): void =>
              setIsChecked(event.target.checked)
            }
          >
            Checkbox
          </Checkbox>
        </div>
        <div>
          <Checkbox
            checked={isChecked2}
            onChange={(event: ChangeEvent<HTMLInputElement>): void =>
              setIsChecked2(event.target.checked)
            }
          >
            Checkbox checked
          </Checkbox>
        </div>
        <div>
          <Checkbox disabled>Checkbox disabled</Checkbox>
        </div>
        <div>
          <Checkbox disabled checked>
            Checkbox disabled checked
          </Checkbox>
        </div>
      </div>
    </div>
  );
};

export const Disabled = () => {
  return <Checkbox disabled>Checkbox disabled</Checkbox>;
};

export const DisabledChecked = () => {
  return (
    <Checkbox disabled checked>
      Checkbox disabled checked
    </Checkbox>
  );
};

export const WithTooltip = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Tooltip placement="bottom" title="Чекбокс">
      <Checkbox
        checked={isChecked}
        onChange={(event: ChangeEvent<HTMLInputElement>): void =>
          setIsChecked(event.target.checked)
        }
      >
        Checkbox checked with toolpip
      </Checkbox>
    </Tooltip>
  );
};
