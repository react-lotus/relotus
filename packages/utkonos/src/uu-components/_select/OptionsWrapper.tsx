import React from 'react';
import type { FC, ReactNode } from 'react';
import cn from 'classnames';
import './OptionsWrapper.scss';

export interface SelectOptionsWrapperProps {
  children: ReactNode;
  className?: string;
}

export const SelectOptionsWrapper: FC<SelectOptionsWrapperProps & JSX.IntrinsicElements['ul']> = ({
  children,
  className,
  ...rest
}) => (
  <ul className={cn('uu-selectOptionsWrapper', className)} {...rest}>
    {children}
  </ul>
);
