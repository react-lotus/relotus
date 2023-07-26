import React from 'react';
import type { HTMLAttributes } from 'react';
import cn from 'clsx';
import './Title.scss';

export type TitleProps = HTMLAttributes<HTMLHeadingElement>;

/**
 * PanelCard.Title - заголовок панели-карточки, который находится в шапке
 */
export function Title({ children, className, ...props }: TitleProps) {
  return (
    <h2 className={cn(className, 'uu-panelCardTitle')} {...props}>
      {children}
    </h2>
  );
}
