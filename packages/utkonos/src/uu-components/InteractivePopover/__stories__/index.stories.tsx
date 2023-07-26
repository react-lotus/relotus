import React from 'react';
import type { Meta, Story } from '@storybook/react/types-6-0';
import { Button } from '../../Button';
import { InteractivePopover } from '..';
import type { InteractivePopoverProps } from '..';
import { interactivePopoverArgTypes } from './argTypes';
import styles from './story.module.scss';

export default {
  title: 'Elements/InteractivePopover',
  component: InteractivePopover,
  argTypes: interactivePopoverArgTypes,
} as Meta;

export const Playground: Story<InteractivePopoverProps & { text: string }> = ({
  text,
  ...args
}) => {
  return (
    <div className={styles.playground}>
      <InteractivePopover {...args} content={<Button view="primary">Heal the planet</Button>}>
        <div className={styles.positionElement}>{text}</div>
      </InteractivePopover>
    </div>
  );
};

Playground.args = {
  text: 'Hover',
};

export const Preview = () => (
  <InteractivePopover content={<Button view="primary">Heal the planet</Button>}>
    <div className={styles.positionElement}>Hover</div>
  </InteractivePopover>
);

Preview.decorators = [
  (StoryComponent: Story) => (
    <div className={styles.container}>
      <StoryComponent />
    </div>
  ),
];
