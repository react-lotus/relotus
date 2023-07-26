import React, { ForwardedRef, Fragment, useState } from 'react';
import type { CSSProperties } from 'react';
import { nanoid } from 'nanoid';
import cn from 'clsx';
import { fallbackFormatOptionLabel } from '../_option';
import type { OptionProps, Option, OptionValue, OptionAnyRecord } from '../_option';
import './index.scss';

type InputElement = Omit<JSX.IntrinsicElements['input'], 'value'>;

export interface TabsProps<T extends OptionValue = OptionValue, R = OptionAnyRecord>
  extends OptionProps<T, R>,
    InputElement {
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
  value?: Option<T>['value'] | null;

  /** Дополнительный класс */
  className?: string;

  /** Дополнительные стили */
  style?: CSSProperties;

  /** Направление расположения табов
   * @default "row"
   */
  direction?: 'column' | 'row';

  /**
   * Обработчик смены таба
   */
  onChange?: JSX.IntrinsicElements['input']['onChange'];
}

function getItemId<T extends OptionValue>(option: Option<T>, id: string) {
  return `${id}_${option?.value as string}`;
}

/**
 * Компонент вкладок вертикальных и горизонтальных
 */
export function Tabs<T extends OptionValue = OptionValue, R = OptionAnyRecord>(
  props: TabsProps<T, R>,
  ref: ForwardedRef<HTMLDivElement> | null,
): JSX.Element {
  const [fallbackId] = useState(nanoid);
  const {
    className,
    style,
    options,
    value,
    id = fallbackId,
    name = fallbackId,
    direction = 'row',
    formatOptionLabel = fallbackFormatOptionLabel,
    ...rest
  } = props;

  return (
    <div
      role="tablist"
      className={cn(className, 'uu-tabs', `uu-tabs_direction_${direction}`)}
      style={style}
      ref={ref}
    >
      {options.map((option) => {
        const itemId = getItemId(option, id);
        const checked = value === option.value;
        return (
          <Fragment key={itemId}>
            <input
              className="uu-tabsInput"
              name={name}
              type="radio"
              id={itemId}
              value={option.value}
              checked={checked}
              {...rest}
            />
            <label
              role="tab"
              htmlFor={itemId}
              className={cn('uu-tabsLabel', `uu-tabsLabel_direction_${direction}`, {
                'uu-tabsLabel_checked': checked,
              })}
              aria-label={option.label || String(option.value)}
            >
              <span
                className={cn('uu-tabsLabelText', `uu-tabsLabelText_direction_${direction}`, {
                  'uu-tabsLabelText_checked': checked,
                })}
              >
                {formatOptionLabel({ option, selectedOption: null })}
              </span>
            </label>
          </Fragment>
        );
      })}
    </div>
  );
}
