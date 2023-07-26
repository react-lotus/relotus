import React, { useState, ReactNode, useMemo } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { Button } from '../..';

import { Progress, ProgressProps } from '..';

import { ReactComponent as ClockIcon } from './assets/clock.svg';
import { ReactComponent as ErrorIcon } from './assets/error.svg';
import styles from './story.module.scss';
import { ProgressItemProps } from '../ProgressItem';

const Icons = { ClockIcon, ErrorIcon, 'Без иконки': undefined, Число: Progress.stepNumberIcon(3) };

const progressPropsTable = {
  table: {
    category: 'Progress props',
  },
};

const progressItemPropsTable = {
  table: {
    category: 'Progress.Item props',
  },
};

export default {
  title: 'Elements/Progress',
  component: Progress,
  argTypes: {
    value: {
      defaultValue: 'contacts',
      control: {
        type: 'radio',
        options: ['bankDetails', 'addresses', 'contacts', 'settings'],
      },
      ...progressPropsTable,
    },
    withNode: {
      ...progressPropsTable,
    },
    children: {
      control: false,
      ...progressPropsTable,
    },
    className: progressPropsTable,
    onChange: progressPropsTable,
    value_progressItem: {
      name: 'value',
      description: 'Значение шага',
      type: { required: true },
      control: null,
      table: {
        ...progressItemPropsTable.table,
        type: { summary: 'ReactText' },
      },
    },
    size: {
      description: 'Размер маркера шага',
      defaultValue: 'small',
      control: {
        type: 'radio',
        options: ['small', 'large'],
      },
      table: {
        ...progressItemPropsTable.table,
        defaultValue: { summary: 'small' },
        type: { summary: "'small' | 'large'" },
      },
    },
    icon: {
      description:
        'Иконка для шага. Если не передана, то для завершенных шагов будет галка, иначе переданная инока',
      defaultValue: 'Без иконки',
      control: {
        options: Object.keys(Icons),
        type: 'select',
      },
      table: {
        ...progressItemPropsTable.table,
        type: { summary: 'ComponentType' },
      },
    },
    isComplete: {
      defaultValue: true,
      type: 'boolean',
      description:
        'Завершен ли этот шаг. Если значение не передано, то считается завершенным если находится перед текущий шагом',
      table: {
        ...progressItemPropsTable.table,
        type: { summary: 'boolean' },
      },
    },
    view: {
      description: 'Цвет шага',
      defaultValue: 'primary',
      control: {
        type: 'select',
        options: ['primary', 'wait', 'reject'],
      },
      table: {
        ...progressItemPropsTable.table,
        type: { summary: "'wait' | 'reject' | primary" },
        defaultValue: { summary: 'primary' },
      },
    },
    disabled: {
      description: 'Можно ли выбрать этот шаг',
      type: 'boolean',
      table: {
        ...progressItemPropsTable.table,
        type: { summary: 'boolean' },
      },
    },
    itemChildren: {
      name: 'children',
      description: 'Лейбл для шага',
      defaultValue: 'Реквизиты',
      type: 'ReactNode',
      control: { type: 'text' },
      table: {
        ...progressItemPropsTable.table,
        type: { summary: 'ReactNode' },
      },
    },
  },
};

export const Playground: Story<
  ProgressProps<string> &
    Omit<ProgressItemProps<string>, 'icon'> & {
      icon: keyof typeof Icons;
      itemChildren: ReactNode;
    }
> = ({ value, withNode, size, icon, isComplete, view, disabled, itemChildren }) => {
  return (
    <Progress value={value} onChange={action('onChange')} withNode={withNode}>
      <Progress.Item
        value="bankDetails"
        size={size}
        icon={Icons[icon]}
        isComplete={isComplete}
        view={view}
        disabled={disabled}
      >
        {itemChildren}
      </Progress.Item>
      <Progress.Item value="addresses">Адреса</Progress.Item>
      <Progress.Item value="contacts">Контакты</Progress.Item>
      <Progress.Item value="settings">Настройки</Progress.Item>
    </Progress>
  );
};

export const WithNumbers = () => {
  const [value, setValue] = useState('');
  return (
    <Progress value={value} onChange={setValue}>
      {/* Progress.stepNumberIcon мемоизирована, так что можно вызывать несколько раз в пропсах */}
      <Progress.Item value="addresses" icon={Progress.stepNumberIcon(1)}>
        Адреса
      </Progress.Item>
      <Progress.Item value="contacts" icon={Progress.stepNumberIcon(2)}>
        Контакты
      </Progress.Item>
      <Progress.Item value="settings">Настройки</Progress.Item>
      <Progress.Item value="finish" icon={Progress.stepNumberIcon(88)}>
        Финиш
      </Progress.Item>
    </Progress>
  );
};

export const AllCompleted = () => {
  const [value, setValue] = useState('settings');

  return (
    <Progress value={value} onChange={setValue}>
      <Progress.Item value="addresses">Адреса</Progress.Item>
      <Progress.Item value="contacts">Контакты</Progress.Item>
      <Progress.Item value="settings" isComplete={value === 'settings'}>
        Настройки
      </Progress.Item>
    </Progress>
  );
};

export const ComplexContentExample = () => {
  const content = useMemo(
    () => (
      <div className={styles.grid}>
        <span>Площадка</span>
        <span>Питер</span>
        <span>Дата проверки</span>
        <span>12.12.2020 | 12:00</span>
        <span>Партия</span>
        <span>274298974</span>
        <span>Автор проверки</span>
        <span>Иванов Иван Иванович</span>
        <span>Поставщик</span>
        <span>ООО “Поставщик”</span>
        <Button view="light">Подробнее</Button>
      </div>
    ),
    [],
  );
  return (
    <Progress withNode>
      {Array(3)
        .fill(undefined)
        .map((_, idx, arr) => {
          const stepNumber = arr.length - idx;
          return (
            <Progress.Item
              value={stepNumber}
              // Progress.stepNumberIcon мемоизирована, так что можно вызывать несколько раз в пропсах
              icon={Progress.stepNumberIcon(stepNumber)}
              key={stepNumber}
              view={stepNumber === 2 ? 'wait' : undefined}
              isComplete={stepNumber <= 2}
            >
              {content}
            </Progress.Item>
          );
        })}
    </Progress>
  );
};

export const LimitedTransitions = () => {
  enum Steps {
    First,
    Second,
    Third,
    Fourth,
  }
  const [step, setStep] = useState(Steps.First);

  return (
    <Progress value={step} onChange={setStep}>
      <Progress.Item value={Steps.First} disabled={step === Steps.Third}>
        Первый (нельзя вернуться с третьего)
      </Progress.Item>
      <Progress.Item value={Steps.Second}>Второй</Progress.Item>
      <Progress.Item value={Steps.Third} disabled={step < Steps.Second}>
        Третий (доступен на втором шаге)
      </Progress.Item>
      <Progress.Item value={Steps.Fourth} disabled={step < Steps.Third}>
        Четвертый (доступен на третьем шаге)
      </Progress.Item>
    </Progress>
  );
};
