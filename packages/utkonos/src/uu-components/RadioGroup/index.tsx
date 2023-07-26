import React, { forwardRef } from 'react';
import cn from 'classnames';
import { nanoid } from 'nanoid';
import { Radio } from '../Radio';
import type { RadioProps } from '../Radio';

import './index.scss';

export type RadioGroupOption = Pick<RadioProps, 'value' | 'disabled'> & { label: React.ReactNode };
export type RadioGroupProps = {
  /**
   * Имя поля при встраивания компонента в форму
   * @default nanoid()
   */
  name?: string;
  /** Текущее выбранное значение */
  value?: JSX.IntrinsicElements['input']['value'] | null;
  /** Варианты выбора */
  options: RadioGroupOption[];
  /** Направление радио кнопок
   * @default "row"
   */
  direction?: 'row' | 'column';
  /** Дополнительный класс */
  className?: string;
  /** Флаг отключения контрола */
  disabled?: boolean;
  /**
   * Обработчик изменения значения радио-кнопки
   */
  onChange?: JSX.IntrinsicElements['input']['onChange'];
};
type RadioGroupInputProps = RadioGroupProps &
  Omit<JSX.IntrinsicElements['input'], keyof RadioGroupProps | 'id' | 'ref'>;

/**
 * Компонент группы радио кнопок
 */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupInputProps>(
  (props, ref): JSX.Element => {
    const [fallbackName] = React.useState(nanoid);
    const {
      name = fallbackName,
      options,
      value,
      className,
      direction = 'row',
      disabled,
      ...rest
    } = props;

    return (
      <div
        className={cn(className, 'uu-radioGroup', `uu-radioGroup_direction_${direction}`)}
        tabIndex={-1}
        ref={ref}
      >
        {options.map(({ label, disabled: optionDisabled, ...option }) => (
          <Radio
            key={`${option.value}`}
            name={name}
            checked={value === option.value}
            disabled={disabled || optionDisabled}
            {...rest}
            {...option}
          >
            {label}
          </Radio>
        ))}
      </div>
    );
  },
);
