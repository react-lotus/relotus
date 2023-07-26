import React, { ComponentType, forwardRef, ReactNode, useState } from 'react';
import cn from 'classnames';
import { nanoid } from 'nanoid';
import { Labeled } from '../Labeled';
import type { LabeledCoreProps } from '../Labeled';
import { InputError } from '../_InputError';
import type { InputErrorProps } from '../_InputError';
import { FieldAddon } from '../FieldAddon';

import './index.scss';
import '../Textarea/index.scss';

interface InputBaseProps extends InputErrorProps, LabeledCoreProps {
  /** Дополнительный класс */
  className?: string;
  /** Уникальный id
   * @default nanoid()
   */
  id?: string;
  /** Имя инпута */
  name?: string;
}

type InputElementProps = JSX.IntrinsicElements['input'];
export interface InputProps extends InputBaseProps, InputElementProps {
  /** Input
   * @default "input"
   * */
  as?: 'input' | ComponentType<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * Суффикс для инпута
   */
  suffix?: ReactNode;
}

/**
 * Компонент Input
 */
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref): JSX.Element => {
  const [fallbackId] = useState(nanoid);
  const {
    as = 'input',
    className,
    direction,
    error = '',
    errorPlacement = 'right',
    label,
    disabled,
    id = fallbackId,
    suffix,
    placeholder,
    required,
    hint,
    ...rest
  } = props;

  const RenderAs = as;

  return (
    <Labeled
      className={className}
      id={id}
      label={label}
      direction={direction}
      required={required}
      hint={hint}
    >
      <div className="uu-inputBox">
        <RenderAs
          id={id}
          ref={ref}
          className={cn('uu-input', {
            'uu-input_hasError': Boolean(error),
          })}
          disabled={disabled}
          placeholder={disabled ? undefined : placeholder}
          {...rest}
        />
        <FieldAddon className="uu-inputAddon" disabled={disabled} suffix={suffix} />
        <InputError error={error} errorPlacement={errorPlacement} />
      </div>
    </Labeled>
  );
});
