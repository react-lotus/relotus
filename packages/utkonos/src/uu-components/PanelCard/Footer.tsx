import React from 'react';
import type { HTMLAttributes } from 'react';
import cn from 'classnames';
import './Footer.scss';

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  isWithoutGap?: boolean;
}

/**
 * PanelCard.Footer - подвал панели-карточки
 */
export function Footer({ className, isWithoutGap, ...props }: FooterProps) {
  return (
    <div
      className={cn(
        className,
        'uu-panelCardFooter',
        isWithoutGap && 'uu-panelCardFooter_withoutGap',
      )}
      {...props}
    />
  );
}
