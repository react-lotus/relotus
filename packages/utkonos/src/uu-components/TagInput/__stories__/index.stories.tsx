import React, { useRef, useState } from 'react';
import type { Meta, Story } from '@storybook/react/types-6-0';
import { TagInput } from '..';
import type { TagInputProps } from '..';
import type { TagValue } from '../types';
import { tagInputArgTypes } from './argTypes';
import { TagInputSplittersRegExp } from '../utils';
import { Button } from '../../Button';

type Direction = 'row' | 'column';

export default {
  title: 'Controls/TagInput',
  component: TagInput,
  argTypes: tagInputArgTypes,
} as Meta;

export const Playground: Story<TagInputProps> = ({ ...args }) => {
  const [val, setVal] = useState<TagValue[]>([]);

  return <TagInput {...args} value={val} onChange={(values) => setVal(values)} ref={null} />;
};

export const Placeholder = () => {
  const [val, setVal] = useState<TagValue[]>([]);

  return <TagInput value={val} emptyPlaceholder="Все" onChange={(values) => setVal(values)} />;
};

export const Disabled = () => {
  const [val, setVal] = useState<TagValue[]>(['1', '2', '3', '4']);

  return <TagInput value={val} disabled onChange={(values) => setVal(values)} />;
};

export const WithLabel = () => {
  const [val, setVal] = useState<TagValue[]>([]);

  return (
    <div className="sb-col">
      {['column', 'row'].map((dir) => (
        <div className="sb-row">
          <TagInput
            direction={dir as Direction}
            value={val}
            label={dir}
            onChange={(values) => setVal(values)}
            key={dir}
          />
        </div>
      ))}
    </div>
  );
};

export const WithError = () => {
  const [val, setVal] = useState<TagValue[]>([]);
  const placements = [
    'auto',
    'auto-start',
    'auto-end',
    'top',
    'bottom',
    'right',
    'left',
    'top-start',
    'top-end',
    'bottom-start',
    'bottom-end',
    'right-start',
    'right-end',
    'left-start',
    'left-end',
  ] as const;
  return (
    <div className="sb-col">
      {placements.map((placement) => (
        <div className="sb-row">
          <TagInput
            value={val}
            label={placement}
            error="Custom Error"
            errorPlacement={placement}
            onChange={(values) => setVal(values)}
            key={placement}
          />
        </div>
      ))}
    </div>
  );
};

export const Splitters = () => {
  const [val, setVal] = useState<TagValue[]>([]);
  const splittersArr = ['ALL_SPLITTERS', 'WITHOUT_SPACE'] as const;
  return (
    <div className="sb-col">
      {splittersArr.map((split) => (
        <div className="sb-row">
          <TagInput
            value={val}
            label={split}
            tagSplitters={TagInputSplittersRegExp[split]}
            onChange={(values) => setVal(values)}
            key={split}
          />
        </div>
      ))}
    </div>
  );
};

export const EditableTags = () => {
  const [val, setVal] = useState<TagValue[]>(['uno', 'dos', 'tres', 'cuatro']);

  return <TagInput value={val} onChange={setVal} isTagEditable />;
};

export const WithoutResetButton = () => {
  const [val, setVal] = useState<TagValue[]>([]);

  return <TagInput value={val} hideReset onChange={(values) => setVal(values)} />;
};

export const WithCustomResetText = () => {
  const [val, setVal] = useState<TagValue[]>([]);

  return <TagInput value={val} resetText="Удалить теги" onChange={(values) => setVal(values)} />;
};

export const TagInputWithRew = () => {
  const [val, setVal] = useState<TagValue[]>([]);
  const ref = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    ref.current?.focus();
  };
  return (
    <div style={{ display: 'flex' }}>
      <TagInput value={val} onChange={(values) => setVal(values)} ref={ref} hideReset />
      <Button style={{ marginLeft: '20px' }} onClick={handleClick}>
        Нажми меня
      </Button>
    </div>
  );
};
