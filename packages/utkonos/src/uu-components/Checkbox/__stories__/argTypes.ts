import type { Meta } from '@storybook/react/types-6-0';

export const checkBoxArgTypes: Meta['argTypes'] = {
  children: {
    description: 'Имя поля',
    control: {
      type: 'text',
    },
    table: {
      category: 'Props',
    },
  },
  checked: {
    description: 'Признак включения опции',
    control: {
      type: 'boolean',
    },
    table: {
      category: 'Props',
    },
  },
  disabled: {
    description: 'Признак отключения компонента',
    control: {
      type: 'boolean',
    },
    table: {
      category: 'Props',
    },
  },
  className: {
    description: 'Дополнительный класс',
    control: {
      type: 'text',
    },
    table: {
      category: 'Props',
    },
  },
  id: {
    description: 'Уникальный идентификатор @default nanoid()',
    control: {
      type: 'text',
    },
    table: {
      category: 'Props',
    },
  },
  onClick: {
    description: 'Событие, которое вызывается при нажатии на компонент',
    action: 'clicked',
    control: {
      type: null,
    },
    table: {
      category: 'Props',
    },
  },
  onChange: {
    description: 'Обработчик изменения значения',
    action: 'changed',
    control: {
      type: null,
    },
    table: {
      category: 'Props',
    },
  },
};
