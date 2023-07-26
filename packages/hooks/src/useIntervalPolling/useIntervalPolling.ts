/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useUpdateEffect } from 'react-use';
import { useVisible } from '../useVisible/useVisible';

/**
 * load some data.
 * @typedef {function(): void} Load
 */
export interface UseIntervalPollingParams {
  /**
   * Функция загрузки данных. Вызывается при монтировании компонента. Также вызывается каждые ms миллисекунд, если не передана функция `loadOnUpdate`
   */
  load: () => void;
  /**
   * Состояние загрузки
   */
  loading: boolean;
  /**
   * Функция загрузки данных. Не вызывается при монтировании компонента. Вызывается каждые ms миллисекунд. Имеет приоритет перед функцией `load`
   */
  loadOnUpdate?: () => void;
  /**
   * Интервал поллинга в миллисекундах
   */
  ms?: number;
}

/**
 * Хук для поллинга(опроса).
 *
 * @export
 * @param param
 * @param {Load} param.load - Функция загрузки данных. Вызывается при монтировании компонента. Также вызывается каждые ms миллисекунд, если не передана функция loadOnUpdate
 * @param {boolean} param.loading - Состояние загрузки
 * @param {Load} [param.loadOnUpdate] - Функция загрузки данных. Не вызывается при монтировании компонента. Вызывается каждые ms миллисекунд. Имеет приоритет перед функцией load
 * @param {number} [param.ms=30000] - Интервал поллинга в миллисекундах
 * @param {Array} [deps] - Остальные параметры в виде массива
 */
export function useIntervalPolling(
  { load, loading, ms = 30000, loadOnUpdate }: UseIntervalPollingParams,
  deps: ReadonlyArray<unknown>,
): void {
  const visible = useVisible();

  useUpdateEffect(() => {
    if (loading || !visible) return undefined;
    const loadCb = loadOnUpdate || load;
    const timerId = setTimeout(loadCb, ms);
    return () => {
      clearTimeout(timerId);
    };
  }, [...deps, loading, visible, ms]);

  useEffect(() => {
    if (!visible) return;
    load();
  }, [...deps, visible]);
}
