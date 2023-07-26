import { Meta } from '@storybook/react/types-6-0';

export const notFoundCardArgTypes: Meta['argTypes'] = {
  title: {
    description: 'Текст заголовка проблемы',
    control: {
      type: 'text',
    },
    table: {
      category: 'Props',
    },
    defaultValue: 'Страницы не существует',
  },
  children: {
    description: 'Дополнительный контент',
    control: {
      type: 'string',
    },
    table: {
      category: 'Props',
    },
  },
  as: {
    description: 'HTML-тег или компонент для рендера карточки',
    control: {
      type: null,
    },
    table: {
      category: 'Props',
    },
  },
};
