import { useRef, useState, useCallback } from 'react';

/**
 * onchange callback.
 * @typedef {function(unknown): void} OnChange
 */

export interface UseControlledProps<T> {
  /**
   * Значение при контролируемом режиме
   */
  controlled?: T;
  /**
   * Значение при неконтролируемом режиме
   */
  default?: T;
  /**
   * Обработчик события изменения значения
   */
  onChange?: (nextValue: T) => void;
}

/**
 * Хук для реализации контролируемого или неконтролируемого режимов
 *
 * модификация хука из material-ui: https://github.com/mui-org/material-ui/blob/e724d98eba018e55e1a684236a2037e24bcf050c/packages/material-ui-utils/src/useControlled.js
 *
 * @param param
 * @param {unknown} [param.controlled] - Значение при контролируемом режиме
 * @param {unknown} [param.default] - Значение при неконтролируемом режиме (по умолчанию)
 * @param {OnChange} [param.onChange] Обработчик события изменения значения
 * @returns {[unknown, OnChange]}[value, setValue]
 */
export const useControlled = <T = unknown>({
  controlled,
  default: defaultProp,
  onChange,
}: UseControlledProps<T>) => {
  const isControlled = useRef(controlled !== undefined);
  const [valueState, setValue] = useState(defaultProp);
  const value = isControlled.current ? controlled : valueState;

  const setValueIfUncontrolled = useCallback(
    (newValue: T) => {
      if (!isControlled.current) {
        setValue(newValue);
      }
      onChange?.(newValue);
    },
    [onChange],
  );

  return [value, setValueIfUncontrolled] as const;
};
