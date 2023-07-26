import { useState, useCallback } from 'react';
import { useEvent } from 'react-use';

/**
 * Хук показывает, активна ли страница в браузере.
 *
 * @export
 * @param {boolean} [defaultVisible=true]
 * @returns {boolean} visible - состояние видимости
 */
export function useVisible(defaultVisible = true): boolean {
  const [visible, setVisible] = useState(defaultVisible);

  const onVisibilityChange = useCallback(
    () => setVisible(document.visibilityState === 'visible'),
    [],
  );
  useEvent('visibilitychange', onVisibilityChange);
  return visible;
}
