import React from 'react';
import type { ReactNode } from 'react';
import cn from 'classnames';
import './ToggleIcon.scss';

import { ReactComponent as ArrowSvg } from './assets/arrow.svg';

export type SelectToggleIconFunction = (payload: {
  isOpen: boolean;
  disabled: boolean;
}) => ReactNode;

export type SelectToggleIcon = {
  /**
   * Иконка открытия/закрытия списка
   *
   * @default ArrowIcon
   */
  toggleIcon?: SelectToggleIconFunction | ReactNode;
};

export const ArrowIcon: SelectToggleIconFunction = ({ isOpen, disabled }) => (
  <ArrowSvg
    className={cn('uu-selectArrow', { 'uu-selectArrow_up': isOpen })}
    fill={disabled ? '#e2e2e2' : '#4b5750'}
  />
);
