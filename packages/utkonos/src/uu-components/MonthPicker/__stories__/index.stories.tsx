import { useState } from 'react';
import moment from 'moment';
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
import type { Story, Meta } from '@storybook/react/types-6-0';

import { MonthPicker, MonthPickerProps } from '..';

export default {
  title: 'Controls/MonthPicker',
  component: MonthPicker,
} as Meta;

const PlaygroundTemplate: Story = (props: Omit<MonthPickerProps, 'value' | 'onChange'>) => {
  const [value, setValue] = useState(() => ({ year: moment().year(), month: moment().month() }));
  const handleChange: MonthPickerProps['onChange'] = (changedValue) => {
    setValue(changedValue);
    action('value changed: ')(changedValue);
  };
  return <MonthPicker value={value} onChange={handleChange} {...props} />;
};

export const Playground = PlaygroundTemplate.bind({});

Playground.args = {
  id: 'nanoid()',
  displayFormat: 'MMMM YYYY',
  label: 'month picker',
};

export const Preview: Story = () => {
  const [value, setValue] = useState(() => ({ year: moment().year(), month: moment().month() }));
  return (
    <>
      <p>default width</p>
      <MonthPicker value={value} onChange={setValue} label="default" />
      <MonthPicker
        value={value}
        onChange={setValue}
        label="showMonthArrows"
        displayFormat="MMMM YYYY"
        showMonthArrows
      />
      <div style={{ width: '200px', marginTop: '20px' }}>
        <p>container width 200px</p>
        <MonthPicker value={value} onChange={setValue} label="default" />
        <MonthPicker
          value={value}
          onChange={setValue}
          label="showMonthArrows"
          displayFormat="MMMM YYYY"
          showMonthArrows
        />
      </div>
    </>
  );
};

export const ShowMonthArrows: Story = () => {
  const [value, setValue] = useState(() => ({ year: moment().year(), month: moment().month() }));
  return (
    <MonthPicker value={value} onChange={setValue} displayFormat="MMMM YYYY" showMonthArrows />
  );
};
