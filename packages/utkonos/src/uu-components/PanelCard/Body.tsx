import React from 'react';
import type { HTMLAttributes } from 'react';
import cn from 'clsx';
import './Body.scss';

export type BodyProps = HTMLAttributes<HTMLDivElement>;

/**
 * PanelCard.Body - тело панели-карточки
 */
export function Body({ className, ...props }: BodyProps) {
  return <div className={cn(className, 'uu-panelCardBody')} {...props} />;
}
