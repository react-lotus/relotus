import React, { forwardRef } from 'react';
import type { ReactNode } from 'react';
import { nanoid } from 'nanoid';
import cn from 'classnames';
import './index.scss';

export interface ToggleButtonOption {
  /** Значение состояния для привязки к блоку контента */
  value: JSX.IntrinsicElements['input']['value'];
  /** Контент - содержимое таба */
  label: ReactNode;
}

export interface ToggleButtonProps {
  /** Варианты выбора */
  options: ToggleButtonOption[];
  /**
   * Уникальный id
   * @default nanoid()
   */
  id?: string;
  /**
   * Имя поля при встраивания компонента в форму
   * @default nanoid()
   */
  name?: string;
  /** Текущее выбранное значение */
  value?: ToggleButtonOption['value'] | null;
  /**
   * Неактивное состояние
   */
  disabled?: boolean;
  /** дополнительный класс */
  className?: string;
  /**
   * Обработчик изменения состояния
   */
  onChange?: JSX.IntrinsicElements['input']['onChange'];
}

/**
 * Компонент переключения между значениями в виде сегментов расположенных горизонтально
 */
export const ToggleButton = forwardRef<
  HTMLDivElement,
  ToggleButtonProps & JSX.IntrinsicElements['input']
>((props, ref): JSX.Element => {
  const [fallbackId] = React.useState(nanoid);
  const {
    className,
    options,
    value,
    id = fallbackId,
    name = fallbackId,
    disabled = false,
    ...rest
  } = props;

  const getId = React.useCallback(
    (option: ToggleButtonProps['options'][0]) => `${id}_${option.value as string}`,
    [id],
  );

  return (
    <div className={cn(className, 'uu-toggleButton')} ref={ref}>
      {options.map((option) => {
        const itemId = getId(option);
        return (
          <label
            key={itemId}
            htmlFor={itemId}
            aria-disabled={disabled}
            className={cn('uu-toggleButtonLabel', {
              'uu-toggleButtonLabel_checked': value === option.value,
              'uu-toggleButtonLabel_disabled': disabled,
            })}
          >
            <input
              className="uu-toggleButtonInput"
              name={name}
              type="radio"
              id={itemId}
              value={option.value}
              checked={value === option.value}
              disabled={disabled}
              {...rest}
            />
            {option.label}
          </label>
        );
      })}
    </div>
  );
});
