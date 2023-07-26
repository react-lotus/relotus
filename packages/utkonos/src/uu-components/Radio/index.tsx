import { forwardRef, useState, ReactNode } from 'react';
import type { AllHTMLAttributes } from 'react';

import cn from 'classnames';
import { nanoid } from 'nanoid';

import './index.scss';

export interface RadioProps extends AllHTMLAttributes<HTMLInputElement> {
  /** Признак включения опции */
  checked?: boolean;
  /** Имя поля */
  children?: ReactNode;
  /** Дополнительный класс */
  className?: string;
  /** Признак отключения компонента */
  disabled?: boolean;
  /** Уникальный id
   * @default nanoid()
   */
  id?: string;
  /** Значение радио-кнопки
   * @default false
   */
  value: NonNullable<JSX.IntrinsicElements['input']['value']>;
  /**
   * Обработчик изменения значения радио-кнопки
   */
  onChange?: JSX.IntrinsicElements['input']['onChange'];
  /**
   * aria-label, метка для элемента
   */
  ariaLabel?: string;
}

type RadioInputDisableProps = Omit<RadioProps, 'value' | 'disabled'> & { disabled: true };

/**
 * Компонент радио кнопки
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps | RadioInputDisableProps>(
  (props, ref): JSX.Element => {
    const [fallbackId] = useState(nanoid);
    const {
      id = fallbackId,
      className,
      children,
      name,
      ariaLabel = (typeof children === 'string' ? children : undefined) ?? name,
      ...rest
    } = props;
    const [hovered, setHovered] = useState(false);

    return (
      <label
        htmlFor={id}
        className={cn(className, 'uu-radio', {
          'uu-radio_disabled': Boolean(rest.disabled),
        })}
        onMouseEnter={(): void => setHovered(true)}
        onMouseLeave={(): void => setHovered(false)}
        aria-label={ariaLabel}
      >
        <input className="uu-radioInput" id={id} type="radio" name={name} ref={ref} {...rest} />
        <span
          className={cn('uu-radioMark', {
            'uu-radioMark_hovered': hovered,
          })}
        >
          <span
            className={cn('uu-radioMarkPoint', {
              'uu-radioMarkPoint_disabled': Boolean(rest.disabled),
              'uu-radioMarkPoint_checked': Boolean(rest.checked),
            })}
          />
        </span>
        {Boolean(children) && (
          <span
            className={cn('uu-radioLabel', {
              'uu-radioLabel_disabled': Boolean(rest.disabled),
            })}
          >
            {children}
          </span>
        )}
      </label>
    );
  },
);
