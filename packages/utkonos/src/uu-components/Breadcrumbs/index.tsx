/**
 *
 * Breadcrumbs
 *
 */

import React, { Children, cloneElement, memo, ReactElement } from 'react';
import cn from 'classnames';

import './index.scss';

export interface BreadcrumbsProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactElement<{ className?: string }>[] | ReactElement<{ className?: string }>;
  /**
   * Кастомный класс
   */
  className?: string;
  isNoStroke?: boolean;
}

/**
 * Компонент Breadcrumbs
 */
export const Breadcrumbs = memo(
  ({ children, className, isNoStroke, ...props }: BreadcrumbsProps) => {
    return (
      <div className={cn('uu-breadcrumbs', className)} {...props}>
        {Children.map(children, (child) =>
          cloneElement(child, {
            className: cn('uu-breadcrumbsItem', child.props.className, {
              'uu-breadcrumbsItem_stroke': !isNoStroke,
              'uu-breadcrumbsItem_withDelimiter': isNoStroke,
            }),
          }),
        )}
      </div>
    );
  },
);

Breadcrumbs.displayName = 'Breadcrumbs';
