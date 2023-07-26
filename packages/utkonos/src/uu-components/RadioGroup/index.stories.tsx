import { useState } from 'react';
import { RadioGroup } from '.';
import { Tooltip } from '../Tooltip';

export default {
  title: 'Controls/RadioGroup',
  component: RadioGroup,
};

export const Preview = () => {
  const [value, setValue] = useState('value1');
  return (
    <RadioGroup
      value={value}
      options={[
        { value: 'value1', label: 'Радио кнопка 1' },
        { value: 'value2', label: 'Радио кнопка 2' },
      ]}
      onChange={(event) => setValue(event.target.value)}
    />
  );
};

export const ColumnDirection = () => {
  const [value, setValue] = useState('value2');
  return (
    <RadioGroup
      value={value}
      direction="column"
      options={[
        { value: 'value1', label: 'Радио кнопка 1' },
        { value: 'value2', label: 'Радио кнопка 2' },
      ]}
      onChange={(event) => setValue(event.target.value)}
    />
  );
};

export const Disabled = () => {
  return (
    <RadioGroup
      value="value2"
      direction="column"
      disabled
      options={[
        { value: 'value1', label: 'Радио кнопка 1' },
        { value: 'value2', label: 'Радио кнопка 2' },
      ]}
    />
  );
};

export const OnlySomeRadioDisabled = () => {
  const [value, setValue] = useState('value2');
  return (
    <RadioGroup
      value={value}
      direction="column"
      options={[
        { value: 'value1', label: 'Радио кнопка 1' },
        { value: 'value2', label: 'Радио кнопка 2' },
        { value: 'value3', label: 'Радио кнопка 3', disabled: true },
      ]}
      onChange={(event) => setValue(event.target.value)}
    />
  );
};

export const WithTooltip = () => {
  const [value, setValue] = useState('value1');
  return (
    <Tooltip placement="bottom" title="Группа радиобаттонов">
      <RadioGroup
        value={value}
        direction="column"
        options={[
          { value: 'value1', label: 'Радио кнопка 1' },
          { value: 'value2', label: 'Радио кнопка 2' },
        ]}
        onChange={(event) => setValue(event.target.value)}
      />
    </Tooltip>
  );
};
