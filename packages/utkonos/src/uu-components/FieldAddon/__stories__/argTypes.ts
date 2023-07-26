import { Meta } from '@storybook/react/types-6-0';

export const fieldAddonArgTypes: Meta['argTypes'] = {
  disabled: {
    description: 'Доступность поля для редактирования',
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
      type: null,
    },
    table: {
      category: 'Props',
    },
  },
  suffix: {
    description: 'Суффикс для поля ввода',
    control: {
      type: 'text',
    },
    table: {
      category: 'Props',
    },
  },
  children: {
    description: 'Дочерний компонент',
    control: {
      type: null,
    },
    table: {
      category: 'Props',
    },
    defaultValue: null,
  },
};
