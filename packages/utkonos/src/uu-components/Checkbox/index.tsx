import { forwardRef, useState } from 'react';
import type { InputHTMLAttributes } from 'react';
import cn from 'classnames';
import { nanoid } from 'nanoid';
import './index.scss';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Признак включения опции */
  checked?: boolean;
  /** Имя поля */
  children?: React.ReactNode;
  /** Дополнительный класс */
  className?: string;
  /** Признак отключения компонента */
  disabled?: boolean;
  /** Уникальный идентификатор
   * @default nanoid()
   */
  id?: string;
  /** Событие, которое вызывается при нажатии на компонент */
  onClick?: JSX.IntrinsicElements['input']['onClick'];
  /** Обработчик изменения значения */
  onChange?: JSX.IntrinsicElements['input']['onChange'];

  /**
   * aria-label, метка для элемента
   */
  ariaLabel?: string;
}

/**
 * Компонент включения/выключения опций
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref): JSX.Element => {
  const [fallbackId] = useState(nanoid);
  const {
    id = fallbackId,
    className,
    children,
    ariaLabel = typeof children === 'string' ? children : undefined,
    ...rest
  } = props;
  const [hovered, setHovered] = useState(false);

  return (
    <label
      htmlFor={id}
      className={cn(className, 'uu-checkbox', {
        'uu-checkbox_disabled': Boolean(rest.disabled),
      })}
      onMouseEnter={(): void => setHovered(true)}
      onMouseLeave={(): void => setHovered(false)}
    >
      <input className="uu-checkboxInput" id={id} type="checkbox" ref={ref} {...rest} />
      <span
        // нужна ли роль чекбокса у этого спана?
        role="checkbox"
        aria-checked={Boolean(rest.checked)}
        aria-label={ariaLabel}
        className={cn('uu-checkboxMark', {
          'uu-checkboxMark_disabled': Boolean(rest.disabled),
          'uu-checkboxMark_checked': Boolean(rest.checked),
          'uu-checkboxMark_hovered': hovered,
        })}
      />
      {Boolean(children) && (
        <span
          className={cn('uu-checkboxLabel', {
            'uu-checkboxLabel_disabled': Boolean(rest.disabled),
          })}
        >
          {children}
        </span>
      )}
    </label>
  );
});
