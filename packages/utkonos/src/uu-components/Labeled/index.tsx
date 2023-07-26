import React, { forwardRef } from 'react';
import cn from 'classnames';

import { Label } from '../Label';

import './index.scss';

export type LabeledCoreProps = {
  /** Заголовок */
  label?: React.ReactNode;
  /** Позиционирование заголовка
   * @default "column"
   */
  direction?: 'column' | 'row';
  /** Признак обязательности */
  required?: boolean;
  /** Текст для иконки с подсказкой в Tooltip */
  hint?: React.ReactNode;
};

export type LabeledProps = LabeledCoreProps & {
  /**
   * Уникальный id
   *
   * Необходим для связки заголовка и поля ввода. Этот же id должен быть у поля ввода данных
   */
  id: string;
  /** Дополнительный класс */
  className?: string;
  /** Поле ввода данных, которому задается заголовок */
  children: React.ReactElement;
};

type DivElementProps = Omit<JSX.IntrinsicElements['div'], keyof LabeledProps>;

/**
 * Компонент для добавления заголовка виджетам ввода данных.
 */
export const Labeled = forwardRef<HTMLDivElement, LabeledProps & DivElementProps>(
  (props, ref): JSX.Element => {
    const { id, className, direction = 'column', label, children, required, hint, ...rest } = props;

    if (!label && !className) {
      return children;
    }

    if (!label) {
      const { className: childrenClassName } = children.props;

      return React.cloneElement(children, {
        className: cn(className, childrenClassName as string),
      });
    }

    return (
      <div className={cn(className, `uu-labeled_direction_${direction}`)} {...rest} ref={ref}>
        <Label
          hint={hint}
          htmlFor={id}
          className={`uu-labeledLabel_direction_${direction || ''}`}
          required={required}
        >
          {label}
        </Label>
        {children}
      </div>
    );
  },
);
