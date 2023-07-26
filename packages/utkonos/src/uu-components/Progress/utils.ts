import { ReactText, ReactElement } from 'react';

import { ProgressChildrenElement, ProgressItem } from './ProgressItem';

interface ItemsData {
  currentActiveIdx?: number;
  hasLarge: boolean;
  values: ReactText[];
}

function assertNotIncludes<T>(arr: T[], value: T, errorMessage: string) {
  if (arr.includes(value)) {
    throw new Error(errorMessage);
  }
}

function assertEq(target: unknown, expected: unknown, message: string) {
  if (target === expected) return;
  throw new Error(message);
}

/**
 * Проверяем что child это Progress.Item.
 * В него не передан isActive и нет повторяющихся value,
 *
 * @param {ProgressItemProps<ReactText>} { value, ...restProps }
 * @param {ReactText[]} existsValues
 */
function checkItem(
  { props, type }: ProgressChildrenElement<ReactText> | ReactElement,
  existsValues: ReactText[],
) {
  assertEq(type, ProgressItem, 'Progress accept only Progress.Item as child');
  const { value, ...restProps } = props;
  assertNotIncludes(
    Object.keys(restProps),
    'isActive',
    "Progress.Item isActive props is private. Do not pass it directly, use Progress's value instead",
  );
  assertNotIncludes(
    existsValues,
    value,
    `Progress.Item value should be unique. Progress has multiple steps with value ${value}`,
  );
}

/**
 * Возвращает индекс активного шага и есть ли в детях хоть один с размером large
 *
 * @export
 * @param {ProgressChildrenElement<ReactText>[]} items
 * @param {ReactText} currentProgressValue
 * @returns {(Pick<ItemsData, 'currentActiveIdx' | 'hasLarge'>)}
 */
export function collectItemsData(
  items: ProgressChildrenElement<ReactText>[],
  currentProgressValue?: ReactText,
): Pick<ItemsData, 'currentActiveIdx' | 'hasLarge'> {
  const { currentActiveIdx, hasLarge } = items.reduce(
    (acc, element, idx) => {
      checkItem(element, acc.values);
      const {
        props: { value, size, icon },
      } = element;
      return {
        values: [...acc.values, value],
        currentActiveIdx:
          !acc.currentActiveIdx && value === currentProgressValue ? idx : acc.currentActiveIdx,
        hasLarge: size === 'large' || icon?.large_icon || acc.hasLarge,
      };
    },
    { currentActiveIdx: undefined, hasLarge: false, values: [] } as ItemsData,
  );
  return { currentActiveIdx, hasLarge };
}
