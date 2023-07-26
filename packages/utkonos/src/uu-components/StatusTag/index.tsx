import React, { HTMLAttributes } from 'react';
import cn from 'clsx';

import './index.scss';

export type StatusColors =
  | 'green' /** #DCFBE1 */
  | 'navy' /** #E5F6D4 */
  | 'yellow' /** #FFF2C6 */
  | 'blue' /** #C6EAFF */
  | 'purple' /** #F6DEFF */
  | 'red' /** #FFB6B6 */
  | 'deepPurple' /** #F1C4FA */
  | 'orange' /** #FFD7B3 */
  | 'lightGreen' /** #E5F6D4 */;

export interface StatusTagProps {
  /** Дополнительный класс */
  className?: string;
  /** Текст статуса */
  children?: React.ReactNode;
  /** Цвет статуса
   *
   * @default "green"
   */
  color?: StatusColors;
}

export type StatusTagElementProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

/**
 *
 * Компонент для создания статуса
 */
export const StatusTag = (props: StatusTagProps & StatusTagElementProps): JSX.Element => {
  const { className, children, color = 'green', ...rest } = props;
  return (
    <div
      className={cn(className, 'uu-statusTag', {
        [`uu-statusTag_color_${color}`]: color,
      })}
      {...rest}
    >
      {children}
    </div>
  );
};
