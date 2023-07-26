import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Button, NotFoundCard } from '../..';
import type { NotFoundCardProps } from '../..';
import { notFoundCardArgTypes } from './argTypes';

export default {
  title: 'Elements/NotFoundCard',
  component: NotFoundCard,
  argTypes: notFoundCardArgTypes,
} as Meta;

export const Playground: Story<NotFoundCardProps> = (props) => {
  return <NotFoundCard {...props} />;
};

export const PreviewWithChildren = () => {
  return (
    <NotFoundCard>
      <Button>Вернуться назад</Button>
    </NotFoundCard>
  );
};
