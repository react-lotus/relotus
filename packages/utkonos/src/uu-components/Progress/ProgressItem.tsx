import React, {
  ComponentType,
  ReactNode,
  useMemo,
  ReactText,
  ReactElement,
  useCallback,
} from 'react';
import cn from 'classnames';
import { constant } from 'lodash-es';

import { ReactComponent as CompleteIcon } from './assets/check.svg';

const EmptyIcon = constant(null);

type ProgressItemView = 'primary' | 'wait' | 'reject';

export type ProgressChildrenElement<T extends ReactText> = ReactElement<ProgressItemProps<T>>;
export interface ProgressItemProps<T extends ReactText> {
  /**
   * Значение шага
   */
  value: T;
  /**
   * Лейбл для шага
   */
  children: ReactNode;
  /**
   * Размер маркера шага
   * @default small
   */
  size?: 'small' | 'large';
  /**
   * Иконка для шага
   * Если не передана то для завершенных шагов будет галка, иначе переданная иконка
   */
  icon?: ComponentType & { large_icon?: boolean };
  /**
   * Завершен ли этот шаг
   */
  isComplete?: boolean;
  /**
   * Является ли текущий шаг активным
   * @private
   */
  isActive?: boolean;
  /**
   * Цвет шага
   * @default primary
   */
  view?: ProgressItemView;
  /**
   * Можно ли выбрать этот шаг
   */
  disabled?: boolean;
  /**
   * Обработчик выбора шага
   * @private
   */
  onSelect?(value: T): void;
}

export function ProgressItemInternal<T extends ReactText>(props: ProgressItemProps<T>) {
  const {
    icon,
    isComplete,
    view = 'primary',
    disabled,
    children,
    isActive,
    size = 'small',
    onSelect,
    value,
  } = props;

  const Icon = useMemo(() => {
    if (icon) return icon;
    return isComplete ? CompleteIcon : EmptyIcon;
  }, [icon, isComplete]);

  const handleSelect = useCallback(() => {
    if (disabled || !onSelect) return;
    onSelect(value);
  }, [onSelect, value, disabled]);

  const Container = useMemo(() => (onSelect ? 'button' : 'div'), [onSelect]);

  return (
    <>
      <Container
        className={cn('uu-progress__dot', `uu-progress__dot_${view}`, {
          'uu-progress__dot_complete': isComplete,
          'uu-progress__dot_large': size === 'large' || icon?.large_icon,
          'uu-progress__dot_interactive': !!onSelect,
          'uu-progress__dot_disabled': disabled,
        })}
        onClick={handleSelect}
      >
        <Icon />
      </Container>
      <Container
        className={cn('uu-progress__progressItem', {
          'uu-progress__progressItem_active': isActive,
          'uu-progress__progressItem_interactive': !!onSelect,
          'uu-progress__progressItem_disabled': disabled,
        })}
        onClick={handleSelect}
      >
        {children}
      </Container>
    </>
  );
}
ProgressItemInternal.displayName = 'ProgressItem';

export function ProgressItem<T extends ReactText>(
  props: Omit<ProgressItemProps<T>, 'isActive' | 'onSelect'>,
) {
  return null;
}
