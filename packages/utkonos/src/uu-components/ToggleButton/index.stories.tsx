import React from 'react';
import { ToggleButton } from '.';

export default {
  title: 'Controls/ToggleButton',
  component: ToggleButton,
};

export const Preview = () => {
  const [value, setValue] = React.useState('value1');

  return (
    <ToggleButton
      value={value}
      options={[
        { label: 'label1', value: 'value1' },
        { label: 'label2', value: 'value2' },
        { label: 'label3', value: 'value3' },
      ]}
      onChange={(event) => setValue(event.target.value)}
    />
  );
};

export const Disabled = () => {
  const [value, setValue] = React.useState('value2');

  return (
    <ToggleButton
      value={value}
      disabled
      options={[
        { label: 'label1', value: 'value1' },
        { label: 'label2', value: 'value2' },
        { label: 'label3', value: 'value3' },
      ]}
      onChange={(event) => setValue(event.target.value)}
    />
  );
};
