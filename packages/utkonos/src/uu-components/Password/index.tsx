import React, { forwardRef, useState } from 'react';
import cn from 'classnames';
import { nanoid } from 'nanoid';
import { Labeled } from '../Labeled';
import type { LabeledCoreProps } from '../Labeled';
import { InputError, InputErrorProps } from '../_InputError';

import { ReactComponent as EyeIcon } from './assets/eye.svg';
import { ReactComponent as EyeCrossedIcon } from './assets/eyeCrossed.svg';

import './index.scss';

export type PasswordProps = {
  /** Дополнительный класс */
  className?: string;
  /** Уникальный id
   * @default nanoid()
   */
  id?: string;
  /** Имя инпута */
  name?: string;
  /** Заголовок */
} & InputErrorProps &
  LabeledCoreProps;

type InputOmitted = Omit<JSX.IntrinsicElements['input'], 'type'>;

/**
 * Однострочное текстовое поле для безопасного ввода пароля
 */
export const Password = forwardRef<HTMLInputElement, PasswordProps & InputOmitted>(
  (props, ref): JSX.Element => {
    const [fallbackId] = useState(nanoid);
    const {
      className,
      direction,
      id = fallbackId,
      label,
      error = '',
      errorPlacement = 'right',
      required,
      hint,
      ...rest
    } = props;
    const [show, setShow] = useState(false);

    const type = show ? 'text' : 'password';
    const IconComponent = show ? EyeIcon : EyeCrossedIcon;

    return (
      <Labeled
        className={className}
        id={id}
        label={label}
        direction={direction}
        required={required}
        hint={hint}
      >
        <div className="uu-password">
          <input
            id={id}
            type={type}
            className={cn('uu-passwordInput', {
              'uu-passwordInput_disabled': Boolean(rest.disabled),
              'uu-passwordInput_hasError': Boolean(error),
            })}
            {...rest}
            ref={ref}
          />
          <InputError className="uu-passwordError" error={error} errorPlacement={errorPlacement} />
          <button
            type="button"
            onClick={(): void => setShow(!show)}
            className={cn('uu-passwordShowIcon', {
              'uu-passwordShowIcon_disabled': Boolean(rest.disabled),
            })}
            disabled={rest.disabled}
          >
            <IconComponent className="uu-passwordShowIconSvg" />
          </button>
        </div>
      </Labeled>
    );
  },
);
