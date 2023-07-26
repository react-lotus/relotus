import { useState, forwardRef } from 'react';
import cn from 'classnames';
import { nanoid } from 'nanoid';
import { Labeled } from '../Labeled';
import type { LabeledCoreProps } from '../Labeled';
import { InputError } from '../_InputError';
import type { InputErrorProps } from '../_InputError';
import './index.scss';
import { FieldAddon } from '../FieldAddon';

type TextareaElementProps = JSX.IntrinsicElements['textarea'];
type TextareaElementPropsWithoutRef = Omit<TextareaElementProps, 'ref'>;

export interface TextareaProps
  extends InputErrorProps,
    LabeledCoreProps,
    TextareaElementPropsWithoutRef {
  /** Уникальный id
   * @default nanoid()
   */
  id?: string;
  /** Имя поля */
  name?: string;
  /** Дополнительный класс */
  className?: string;
  /**
   * Неактивное состояние
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * Запрет изменения размера
   *
   * @default false
   */
  noResize?: boolean;
  /**
   * Высота поля ввода, в линиях
   *
   * @default 2
   */
  rows?: number;
  /**
   * Ширина поля ввода, в символах
   *
   * @default 20
   */
  cols?: number;
  /** placeholder */
  placeholder?: string;
}

/**
 * Компонент Textarea
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref): JSX.Element => {
    const [fallbackId] = useState(nanoid);
    const {
      className,
      direction,
      error = '',
      errorPlacement = 'right',
      noResize,
      label,
      disabled,
      id = fallbackId,
      placeholder,
      required,
      hint,
      ...rest
    } = props;

    return (
      <Labeled
        className={cn({ 'uu-textarea_row': direction === 'row' }, className)}
        id={id}
        label={label}
        direction={direction}
        required={required}
        hint={hint}
      >
        <div className="uu-textareaBox">
          <textarea
            id={id}
            className={cn('uu-textarea', {
              'uu-textarea_hasError': Boolean(error),
              'uu-textarea_noResize': noResize,
            })}
            disabled={disabled}
            placeholder={disabled ? undefined : placeholder}
            ref={ref}
            {...rest}
          />
          <FieldAddon className="uu-textareaAddon" disabled={disabled} />
          <InputError error={error} errorPlacement={errorPlacement} />
        </div>
      </Labeled>
    );
  },
);
