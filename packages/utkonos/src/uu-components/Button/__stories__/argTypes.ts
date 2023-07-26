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
  icon: {
    description:
      "Иконка \n\n import { ReactComponent as ContentCopySvg } from './assets/content-copy.svg';",
    control: {
      type: 'select',
      options: ['none', 'SettingsSvg', 'ContentCopySvg', 'PencilSvg', 'ExcelSvg'],
    },
    table: {
      category: 'Children',
    },
  },
  iconPosition: {
    description: 'Положение иконки \n\n Текст рядом с иконкой нужно обернуть в HTML элемент',
    control: {
      type: 'inline-radio',
      options: ['start', 'end', 'only'],
    },
    table: {
      category: 'Children',
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
  onClick: {
    action: 'clicked',
    control: {
      type: null,
    },
    table: {
      category: 'Props',
    },
  },
};
