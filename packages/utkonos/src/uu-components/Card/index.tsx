/**
 *
 * Card
 *
 */

import React from 'react';
import type { ReactNode } from 'react';
import cn from 'classnames/bind';

import './index.scss';

export interface CardProps {
  /** Дополнительный класс */
  className?: string;
  /** Стили компонента */
  style?: React.CSSProperties;
  /** Дочерний компонент
   * @default null
   */
  children?: ReactNode | null;
}

export function Card(props: CardProps) {
  const { children = null, className, style } = props;
  return (
    <div className={cn(className, 'uu-card')} style={style}>
      {children}
    </div>
  );
}
