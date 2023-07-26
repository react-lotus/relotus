import React, { forwardRef } from 'react';
import cn from 'classnames';

import { Hint } from '../Hint';

import './index.scss';

export type LabelProps = {
  htmlFor: string;
  /** Дополнительный класс */
  className?: string;
  /** Имя поля */
  children: React.ReactNode;
  /** Признак обязательности */
  required?: boolean;
  /** Текст для иконки с подсказкой в Tooltip */
  hint?: React.ReactNode;
};

type LabelElementProps = Omit<JSX.IntrinsicElements['label'], keyof LabelProps>;

/**
 * Компонент для создания заголовков полей ввода.
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps & LabelElementProps>(
  (props, ref): JSX.Element => {
    const { className, children, htmlFor, required, hint, ...rest } = props;
    const text = typeof children === 'string' ? children : undefined;
    return (
      <label
        htmlFor={htmlFor}
        className={cn(className, 'uu-label', {
          'uu-label_text': text,
        })}
        aria-label={text}
        {...rest}
        ref={ref}
      >
        {children}
        {required && <span className="uu-label_required">*</span>}
        {!!hint && <Hint title={hint} />}
      </label>
    );
  },
);
