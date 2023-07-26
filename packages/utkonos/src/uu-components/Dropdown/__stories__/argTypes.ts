import type { Meta } from '@storybook/react/types-6-0';
import { buttonArgTypes } from '../../Button/__stories__/argTypes';

const child = {
  control: {
    type: 'select',
    options: [
      'none',
      'Link1',
      'Link2',
      'Link3',
      'Button1',
      'Button2',
      'DropdownItem1',
      'DropdownItem2',
      'DropdownItem3',
    ],
  },
  table: {
    category: 'Children',
  },
};

const tableProps = {
  table: {
    category: 'Props',
  },
};

export const dropdownArgTypes: Meta['argTypes'] = {
  text: {
    description: 'Текст',
    control: {
      type: 'text',
    },
    table: {
      category: 'Button Content',
    },
  },
  icon: {
    description:
      "Иконка \n\n import { ReactComponent as ContentCopySvg } from './assets/settings.svg';",
    control: {
      type: 'select',
      options: [
        'none',
        'SettingsSvg',
        'SearchSvg',
        'Search2Svg',
        'LockSvg',
        'ExcelSvg',
        'ColumnsSvg',
      ],
    },
    table: {
      category: 'Button Content',
    },
  },
  iconPosition: {
    description: 'Положение иконки \n\n Текст рядом с иконкой нужно обернуть в HTML элемент',
    control: {
      type: 'inline-radio',
      options: ['start', 'end'],
    },
    table: {
      category: 'Button Content',
    },
  },
  child1: {
    ...child,
    description: 'Первый элемент',
  },
  child2: {
    ...child,
    description: 'Второй элемент',
  },
  child3: {
    ...child,
    description: 'Третий элемент',
  },
  DropdownItem: {
    ...child,
    description:
      "Базовый компонент представления данных в выпадающем списке с отступами\n\nimport { DropdownItem } from '@relotus/utkonos';",
    control: null,
  },
  children: {
    ...tableProps,
    control: null,
  },
  buttonContent: {
    ...tableProps,
    description: 'Содержимое кнопки (см. API Button)',
    control: null,
  },
  view: buttonArgTypes.view,
  disabled: buttonArgTypes.disabled,
  square: buttonArgTypes.square,
  loading: buttonArgTypes.loading,
  small: buttonArgTypes.small,
  withoutArrow: tableProps,
  appendToBody: tableProps,
  menuMaxHeight: {
    ...tableProps,
    description: 'Максимальная высота раскрываемого списка',
    control: {
      type: 'text',
    },
  },
  menuWidth: {
    ...tableProps,
    description: 'Ширина раскрываемого списка',
    control: {
      type: 'text',
    },
  },
  menuPosition: {
    ...tableProps,
    description: 'Расположение раскрываемого списка относительно кнопки',
    control: {
      type: 'select',
      options: [
        'left',
        'right',
        'top',
        'bottom',
        'top-start',
        'top-end',
        'bottom-start',
        'bottom-end',
        'right-start',
        'right-end',
        'left-start',
        'left-end',
        'auto',
        'auto-start',
        'auto-end',
      ],
    },
  },
  label: {
    ...tableProps,
    control: {
      type: 'text',
    },
  },
  direction: {
    ...tableProps,
    description: 'Расположение лейбла и кнопки',
    control: {
      type: 'select',
      options: ['column', 'row'],
    },
  },
  required: {
    ...tableProps,
    description: 'Признак обязательности на Label',
  },
  className: {
    ...tableProps,
    control: null,
  },
  style: {
    ...tableProps,
    control: null,
  },
  id: {
    ...tableProps,
    control: null,
  },
};
