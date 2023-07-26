import type { Meta } from '@storybook/react/types-6-0';

export const tagInputArgTypes: Meta['argTypes'] = {
  children: {
    control: {
      type: null,
    },
    table: {
      category: 'Props',
    },
  },
  value: {
    control: {
      type: null,
    },
    table: {
      category: 'Props',
    },
  },
  label: {
    description: 'Заголовок',
    control: {
      type: 'text',
    },
    table: {
      category: 'Props',
    },
  },
  direction: {
    description: 'Позиционирование заголовка',
    control: {
      type: 'select',
      options: ['column', 'row'],
    },
    table: {
      category: 'Props',
    },
  },
  required: {
    description: 'Признак включения опции',
    control: {
      type: 'boolean',
    },
    table: {
      category: 'Props',
    },
  },
  removeDuplicates: {
    description: 'Признак удаления дубликата',
    defaultValue: 'true',
    control: {
      type: 'boolean',
    },
    table: {
      category: 'Props',
    },
  },
  tagSplitters: {
    description: 'Разделитель тэгов',
    control: {
      type: 'text',
    },
    table: {
      category: 'Props',
    },
  },
  emptyPlaceholder: {
    description: 'Плейсхолдер',
    control: {
      type: 'text',
    },
    table: {
      category: 'Props',
    },
  },
  error: {
    description: 'Ошибка',
    control: {
      type: 'text',
    },
    table: {
      category: 'Props',
    },
  },
  errorPlacement: {
    description: 'Позиционирование ошибки',
    control: {
      type: 'select',
    },
    table: {
      category: 'Props',
    },
  },
  id: {
    description: 'Уникальный идентификатор',
    control: {
      type: 'text',
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
  isTagEditable: {
    control: {
      type: 'boolean',
    },
    table: {
      category: 'Props',
    },
  },
  hideReset: {
    description: 'Спрятать кнопку сброса значений',
    control: {
      type: 'boolean',
    },
    table: {
      category: 'Props',
    },
  },
  resetText: {
    description: 'Кастомный текст кнопки сброса значений',
    control: {
      type: 'text',
    },
    table: {
      category: 'Props',
    },
  },
};
