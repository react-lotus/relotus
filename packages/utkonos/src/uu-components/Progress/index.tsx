import React, { Children, useMemo, ReactText } from 'react';
import cn from 'classnames';
import { memoize } from 'lodash-es';

import './index.scss';
import { ProgressItemInternal, ProgressChildrenElement, ProgressItem } from './ProgressItem';
import { collectItemsData } from './utils';
import { stepNumber } from './ProgressStepNumber';

interface ProgressBaseProps<T extends ReactText> {
  /**
   * Элементы шагов
   */
  children: ProgressChildrenElement<T>[];
  /** Дополнительный класс */
  className?: string;
  /**
   * Добавлять последним элементом точку
   */
  withNode?: boolean;
}

interface ProgressControlledProps<T extends ReactText> {
  /**
   * Текущий шаг
   */
  value: T;
  /**
   * Обработчик смены шага
   */
  onChange?: (newValue: T) => void;
}

interface ProgressUncontrolledProps {
  value?: never;
  onChange?: never;
}

export type ProgressProps<T extends ReactText> = ProgressBaseProps<T> &
  Omit<JSX.IntrinsicElements['div'], keyof ProgressBaseProps<T> | keyof ProgressUncontrolledProps> &
  (ProgressControlledProps<T> | ProgressUncontrolledProps);

/**
 * Компонент для отображения процесса
 */
export function Progress<T extends ReactText>(props: ProgressProps<T>): JSX.Element | null {
  const { value, className, children, onChange, withNode, ...rest } = props;

  const { currentActiveIdx = -1, hasLarge } = useMemo(
    () => collectItemsData(Children.toArray(children) as ProgressChildrenElement<T>[], value),
    [children, value],
  );

  if (!children?.length) {
    return null;
  }

  return (
    <div
      className={cn(className, 'uu-progress', {
        'uu-progress_large': hasLarge,
        'uu-progress_withNode': withNode,
      })}
      {...rest}
    >
      {Children.map(children, (child: ProgressChildrenElement<T>, idx) => {
        const { props: itemProps } = child;
        const { value: itemValue, isComplete } = itemProps;
        const isActive = value === itemValue;
        return (
          <ProgressItemInternal
            {...itemProps}
            isActive={isActive}
            onSelect={onChange}
            isComplete={isComplete ?? currentActiveIdx > idx}
          />
        );
      })}
      {withNode && <div className="uu-progress__node" />}
    </div>
  );
}

Progress.Item = ProgressItem;
Progress.stepNumberIcon = memoize(stepNumber);
