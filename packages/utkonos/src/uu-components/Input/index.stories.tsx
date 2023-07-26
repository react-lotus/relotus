import React, { useRef } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Input, InputProps } from '.';
import { Button } from '../Button';

export default {
  title: 'Controls/Input',
  component: Input,
  argTypes: {
    value: {
      description: 'Текст',
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
      },
    },
    id: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Props',
      },
    },
    label: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
      },
    },
    direction: {
      control: {
        type: 'select',
        options: ['column', 'row'],
      },
      table: {
        category: 'Props',
      },
    },
    error: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Children',
      },
    },
    errorPlacement: {
      control: {
        type: 'select',
        options: ['right', 'left', 'top', 'bottom'],
      },
      table: {
        category: 'Props',
      },
    },
    placeholder: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
      },
    },
    suffix: {
      control: {
        type: null,
      },
      table: {
        category: 'Props',
      },
    },
    className: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Props',
      },
    },
  },
} as Meta;

export const Playground: Story<InputProps> = ({ value, ...args }) => (
  <Input value={value} {...args} ref={null} />
);

Playground.args = {
  value: 'Немного текста',
};

export const Preview = () => (
  <div className="sb-inputWrapper">
    <h2>Инпут</h2>
    <Input />
    <br />
    <h2>С лейблом</h2>
    <Input label="Лейбл" />
    <br />
    <h2>С ошибкой</h2>
    <Input label="Лейбл" error="Ошибка" />
    <br />
    <h2>С суффиксом</h2>
    <Input label="Лейбл" suffix="руб" />
    <h2>Неактивный</h2>
    <Input disabled value="Недоступно для редактирования" />
  </div>
);

export const Simple = () => (
  <div className="sb-inputWrapper">
    <Input />
  </div>
);

export const LabeledColumn = () => (
  <div className="sb-inputWrapper">
    <Input label="Лейбл" />
  </div>
);

export const LabeledRow = () => (
  <div className="sb-inputWrapper">
    <Input label="Лейбл" direction="row" />
  </div>
);

export const WithSuffix = () => (
  <div className="sb-inputWrapper">
    <Input
      suffix={
        <span>
          Σ<sub>θ</sub>≠<strong>∇</strong>
          &nbsp;
          <sup>Φ</sup>
        </span>
      }
    />
  </div>
);

export const Error = () => (
  <div className="sb-inputWrapper">
    <Input error="Ошибка" />
  </div>
);

export const WithErrorAndSuffix = () => (
  <div className="sb-inputWrapper">
    <Input suffix="руб" error="Ошибка" />
  </div>
);

export const ErrorPlacement = () => (
  <div className="sb-inputWrapper">
    <Input errorPlacement="bottom" error="Ошибка снизу" />
  </div>
);

export const Disabled = () => (
  <div className="sb-inputWrapper">
    <Input value="Недоступно для редактирования" disabled />
  </div>
);

export const DisabledWithSuffix = () => (
  <div className="sb-inputWrapper">
    <Input value="Недоступно для редактирования" suffix="руб" disabled />
  </div>
);

export const DisabledWithSuffixAndError = () => (
  <div className="sb-inputWrapper">
    <Input
      value="Недопустимый кейс, в случае заблокированного инпута ошибки быть не должно"
      suffix="руб"
      disabled
      error="В случае заблокированного инпута ошибки быть не должно"
    />
  </div>
);

export const InputWithRef = () => {
  const ref = useRef<HTMLInputElement>(null);
  const handleClick = () => ref.current?.focus();

  return (
    <div className="sb-inputWrapper">
      <Input ref={ref} label="Лейбл" direction="row" />
      <Button style={{ marginTop: '20px' }} onClick={handleClick}>
        Нажми меня чтобы сфокусироваться
      </Button>
    </div>
  );
};
