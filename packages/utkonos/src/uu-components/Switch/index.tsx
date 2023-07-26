import { forwardRef, useState } from 'react';
import type { InputHTMLAttributes } from 'react';

import cn from 'classnames';
import { nanoid } from 'nanoid';

import './index.scss';

export interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Признак включения опции */
  checked?: boolean;
  /** Дополнительный класс */
  className?: string;
  /** Признак отключения компонента */
  disabled?: boolean;
  /** Уникальный идентификатор
   * @default nanoid()
   */
  id?: string;
}

/**
 * Переключатель
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>((props, ref): JSX.Element => {
  const [fallbackId] = useState(nanoid);
  const { id = fallbackId, className, ...rest } = props;

  return (
    <label
      htmlFor={id}
      className={cn(className, 'uu-switch', {
        'uu-switch_disabled': Boolean(rest.disabled),
      })}
    >
      <input className="uu-switchInput" id={id} type="checkbox" ref={ref} {...rest} />
      <span
        className={cn('uu-switchTrack', {
          'uu-switchTrack_active': Boolean(rest.checked),
          'uu-switchTrack_disabled': Boolean(rest.disabled),
        })}
      />
      <span
        className={cn('uu-switchThumb', {
          'uu-switchThumb_active': Boolean(rest.checked),
          'uu-switchThumb_disabled': Boolean(rest.disabled),
        })}
      />
    </label>
  );
});
