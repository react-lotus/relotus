export const buttonArgTypes = {
  text: {
    description: 'Текст',
    control: {
      type: 'text',
    },
    table: {
      category: 'Children',
    },
  },
  value: {
    description: 'Значение, которое нужно скопировать в буфер обмена',
    control: {
      default: 'Текст для копирования',
      type: 'text',
    },
    table: {
      category: 'Props',
    },
  },
  onClick: {
    description: 'Коллбэк для события копирования (показать всплывающее окно и т.д.)',
    control: {
      type: 'function',
    },
    table: {
      category: 'Props',
    },
  },
  children: {
    control: {
      type: null,
    },
    table: {
      category: 'Props',
    },
  },
  view: {
    control: {
      type: 'radio',
    },
    table: {
      category: 'Props',
    },
  },
  small: {
    control: {
      type: 'boolean',
    },
    table: {
      category: 'Props',
    },
  },
  square: {
    control: {
      type: 'boolean',
    },
    table: {
      category: 'Props',
    },
  },
  loading: {
    table: {
      category: 'Props',
    },
  },
  disabled: {
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
  title: {
    control: {
      type: 'text',
    },
    table: {
      category: 'Props',
    },
  },
  as: {
    control: {
      type: 'select',
      options: ['button', 'a', 'span'],
    },
    table: {
      category: 'Props',
    },
  },
  type: {
    control: {
      type: 'select',
      options: ['button', 'submit', 'reset'],
    },
    table: {
      category: 'Props',
    },
  },
};
