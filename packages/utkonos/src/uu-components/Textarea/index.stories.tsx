import { Meta, Story } from '@storybook/react/types-6-0';
import { Textarea, TextareaProps } from '.';
import { Tooltip } from '../Tooltip';
import style from './story.module.scss';

export default {
  title: 'Controls/Textarea',
  component: Textarea,
  argTypes: {
    text: {
      description: 'Текст',
      control: {
        type: 'text',
      },
      table: {
        category: 'Children',
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
    noResize: {
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Props',
      },
    },
    rows: {
      control: {
        type: 'number',
      },
      table: {
        category: 'Props',
      },
    },
    cols: {
      control: {
        type: 'number',
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

export const Playground: Story<TextareaProps & { text: string }> = ({ text, ...args }) => (
  <div className={style.playground}>
    <Textarea defaultValue={text} {...args} />
  </div>
);

Playground.args = {
  text: 'Много текста',
};

export const Preview = () => (
  <div className={style.wrapper}>
    <br />
    <h2>Многострочное текстовое поле</h2>
    <Textarea />
    <br />
    <h2>В 10 строк</h2>
    <Textarea rows={10} />
    <br />
    <h2>С лейблом</h2>
    <Textarea label="Лейбл" />
    <br />
    <h2>С ошибкой</h2>
    <Textarea label="Лейбл" error="Ошибка" />
    <br />
    <h2>Неактивное</h2>
    <Textarea disabled value="Недоступно для редактирования" />
    <br />
    <h2>Без изменения размера</h2>
    <Textarea noResize />
    <h2>С тултипом</h2>
    <Tooltip placement="right" title="Очень много текста">
      <Textarea cols={30} defaultValue="Много текста" rows={8} />
    </Tooltip>
  </div>
);

export const Simple = () => (
  <div className={style.wrapper}>
    <Textarea />
  </div>
);

export const TextareaWithTenRows = () => (
  <div className={style.wrapper}>
    <Textarea rows={10} />
  </div>
);

export const LabeledColumn = () => (
  <div className={style.wrapper}>
    <Textarea label="Лейбл" />
  </div>
);

export const LabeledRow = () => (
  <div className={style.wrapper}>
    <Textarea label="Лейбл" direction="row" />
  </div>
);

export const Error = () => (
  <div className={style.wrapper}>
    <Textarea error="Ошибка" />
  </div>
);

export const ErrorPlacement = () => (
  <div className={style.wrapper}>
    <Textarea errorPlacement="bottom" error="Ошибка снизу" />
  </div>
);

export const Disabled = () => (
  <div className={style.wrapper}>
    <Textarea value="Недоступно для редактирования" disabled />
  </div>
);

export const DisabledError = () => (
  <div className={style.wrapper}>
    <Textarea
      value="Недопустимый кейс, в случае заблокированного поля ошибки быть не должно"
      disabled
      error="В случае заблокированного поля ошибки быть не должно"
    />
  </div>
);

export const TextareaNoResize = () => (
  <div className={style.wrapper}>
    <Textarea noResize />
  </div>
);
