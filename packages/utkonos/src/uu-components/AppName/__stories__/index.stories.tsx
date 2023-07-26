import React from 'react';
import type { Story, Meta } from '@storybook/react/types-6-0';
import { MemoryRouter, Link } from 'react-router-dom';
import { AppName } from '..';
import type { AppNameProps } from '..';
import styles from './index.module.scss';

export default {
  title: 'Page/AppName',
  component: AppName,
  argTypes: {
    className: {
      control: {
        type: 'select',
        options: [styles.dark],
      },
    },
    title: {
      control: {
        type: 'text',
      },
    },
    as: {
      description: 'HTML-тег или компонент для рендера',
      type: { required: false },
      control: {
        type: 'select',
        options: ['div', 'a'],
      },
      table: {
        type: {
          summary: '"div" | "a" | Link',
        },
        defaultValue: { summary: '"div"' },
      },
    },
  },
} as Meta<unknown>;

export const Playground: Story<AppNameProps> = (args) => <AppName {...args} />;

Playground.args = {
  title: 'Библиотека компонентов',
};

export const AsA = () => <AppName as="a" href="/" title="as <a>" />;

export const AsRouterDomLink = () => (
  <MemoryRouter>
    <AppName as={Link} to="/" title="react-router-dom <Link>" />
  </MemoryRouter>
);
