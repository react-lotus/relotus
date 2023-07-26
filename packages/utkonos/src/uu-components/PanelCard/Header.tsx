import React from 'react';
import type { HTMLAttributes } from 'react';
import cn from 'clsx';
import './Header.scss';

export type HeaderProps = HTMLAttributes<HTMLDivElement>;

/**
 * PanelCard.Header - шапка панели-карточки
 */
export function Header({ className, ...props }: HeaderProps) {
  return <div className={cn(className, 'uu-panelCardHeader')} {...props} />;
}
