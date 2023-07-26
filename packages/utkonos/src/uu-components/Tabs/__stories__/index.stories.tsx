import React, { useCallback, useState } from 'react';
import type { Story, Meta } from '@storybook/react/types-6-0';
import type { Option, OptionFormatLabel } from '../../_option';
import { Tabs } from '..';
import type { TabsProps } from '..';
import { ReactComponent as PersonIcon } from './assets/person.svg';
import { ReactComponent as GroupIcon } from './assets/group.svg';
import { ReactComponent as SheetIcon } from './assets/sheet.svg';
import { tabsArgTypes } from './argTypes';

export default {
  title: 'Controls/Tabs',
  component: Tabs,
  argTypes: tabsArgTypes,
} as Meta;

export const Playground: Story<TabsProps> = ({ ...args }) => {
  const [value, setValue] = useState('2');
  const [options] = useState([
    { value: '1', label: 'Источник цен' },
    { value: '2', label: 'Цена по партиям' },
    { value: '3', label: 'Цена для магазинов возврата' },
    { value: '4', label: 'Персональные цены' },
  ]);

  return (
    <Tabs
      {...args}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      options={options}
    />
  );
};

Playground.args = {
  direction: 'row',
  onChange: undefined,
  formatOptionLabel: undefined,
  id: undefined,
  name: undefined,
};

export const Preview = () => {
  const [value, setValue] = useState('1');
  return (
    <div>
      <Tabs
        value={value}
        options={[
          { value: '1', label: 'Выезды' },
          { value: '2', label: 'Маршруты' },
          { value: '3', label: 'Путевые листы' },
        ]}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
      />
      {value === '1' && <div>Content of Tab Pane 1</div>}
      {value === '2' && <div>Content of Tab Pane 2</div>}
      {value === '3' && <div>Content of Tab Pane 3</div>}
    </div>
  );
};

export const DirectionColumn = () => {
  const [value, setValue] = useState('1');
  const [options] = useState([
    { value: '1', label: 'Мои товары' },
    { value: '2', label: 'Товары менеджеров' },
    { value: '3', label: 'Ценовой лист' },
  ]);
  return (
    <div style={{ display: 'flex', border: '1px solid #e2e2e2' }}>
      <Tabs
        value={value}
        options={options}
        onChange={(event) => setValue(event.target.value)}
        direction="column"
      />
      <div style={{ flexGrow: 1, padding: 10, height: 400 }}>
        {value === '1' && <div>Content of Tab Pane 1</div>}
        {value === '2' && <div>Content of Tab Pane 2</div>}
        {value === '3' && <div>Content of Tab Pane 3</div>}
      </div>
    </div>
  );
};

export const WithoutLabel = () => {
  const [value, setValue] = useState('Мои товары');
  const [options] = useState([
    { value: 'Мои товары' },
    { value: 'Товары менеджеров' },
    { value: 'Ценовой лист' },
  ]);
  return (
    <>
      <Tabs value={value} options={options} onChange={(event) => setValue(event.target.value)} />
      {value === 'Мои товары' && <div>Мои товары</div>}
      {value === 'Товары менеджеров' && <div>Товары менеджеров</div>}
      {value === 'Ценовой лист' && <div>Ценовой лист</div>}
    </>
  );
};

export const WithIcon = () => {
  const [value, setValue] = useState('1');
  const [options] = useState<Option<string, { icon: typeof PersonIcon }>[]>([
    {
      value: '1',
      label: 'Мои товары',
      icon: PersonIcon,
    },
    {
      value: '2',
      label: 'Товары менеджеров',
      icon: GroupIcon,
    },
    {
      value: '3',
      label: 'Ценовой лист',
      icon: SheetIcon,
    },
  ]);

  const formatOptionLabel = useCallback<OptionFormatLabel<string, { icon: typeof PersonIcon }>>(
    ({ option: { label, icon: Icon } }) => (
      <>
        <Icon style={{ marginRight: 10 }} /> {label?.toUpperCase()}
      </>
    ),
    [],
  );
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #e2e2e2' }}>
        <Tabs
          value={value}
          options={options}
          onChange={(event) => setValue(event.target.value)}
          formatOptionLabel={formatOptionLabel}
        />
        <div style={{ padding: 10 }}>
          {value === '1' && <div>Content of Tab Pane 1</div>}
          {value === '2' && <div>Content of Tab Pane 2</div>}
          {value === '3' && <div>Content of Tab Pane 3</div>}
        </div>
      </div>
      <br />
      <div style={{ display: 'flex', border: '1px solid #e2e2e2' }}>
        <Tabs
          value={value}
          options={options}
          onChange={(event) => setValue(event.target.value)}
          direction="column"
          formatOptionLabel={formatOptionLabel}
        />
        <div style={{ flexGrow: 1, padding: 10 }}>
          {value === '1' && <div>Content of Tab Pane 1</div>}
          {value === '2' && <div>Content of Tab Pane 2</div>}
          {value === '3' && <div>Content of Tab Pane 3</div>}
        </div>
      </div>
    </>
  );
};
