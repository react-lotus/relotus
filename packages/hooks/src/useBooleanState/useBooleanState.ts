import { useCallback, useState } from 'react';

/**
 * Хук управления логическим состоянием.
 *
 * @export
 * @param {boolean} [defaultValue=false]
 * @returns {[boolean, () => void, () => void]}[currentState, setTrue, setFalse, toggle] - порядок легко запомнить (как для тернарного оператора)
 */
export function useBooleanState(
  defaultValue = false,
): [boolean, () => void, () => void, () => void] {
  const [value, setValue] = useState(defaultValue);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue(!value), [value]);

  return [value, setTrue, setFalse, toggle];
}
