import React, { ReactNode } from 'react';
import cn from 'classnames';
import { Tooltip } from '../Tooltip';

import { ReactComponent as ErrorIcon } from './assets/error.svg';

import './index.scss';

export type InputErrorProps = {
  /** Дополнительный класс */
  className?: string;
  /** Текст ошибки */
  error?: ReactNode;
  /** Расположение ошибки
   * @default "right"
   */
  errorPlacement?: Parameters<typeof Tooltip>[0]['placement'];
};

/**
 * Компонент вывода ошибок полей ввода
 */
export function InputError(props: InputErrorProps): JSX.Element | null;
export function InputError(
  props: InputErrorProps & JSX.IntrinsicElements['div'],
): JSX.Element | null;
export function InputError(props: InputErrorProps): JSX.Element | null {
  const { className, error, errorPlacement } = props;

  if (!error) {
    return null;
  }

  return (
    <div className={cn(className, 'uu-inputError')}>
      {typeof error === 'boolean' ? (
        <ErrorIcon className="uu-inputErrorIcon" />
      ) : (
        <Tooltip title={error} placement={errorPlacement}>
          <ErrorIcon className="uu-inputErrorIcon" />
        </Tooltip>
      )}
    </div>
  );
}
