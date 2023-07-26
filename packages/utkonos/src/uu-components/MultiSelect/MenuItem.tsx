import React, { forwardRef, ReactNode } from 'react';
import cn from 'classnames';

import { Checkbox } from '../Checkbox';
import type { CheckboxProps } from '../Checkbox';
import './MenuItem.scss';

interface Props {
  isSelected: boolean;
  children: ReactNode;
  isActive?: boolean;
  isDisabled?: boolean;
}

const noop = (): void => {};

const handleClick: CheckboxProps['onClick'] = (event) => {
  event.preventDefault();
  event.stopPropagation();
};

export const MenuItem = forwardRef<HTMLLIElement, Props & JSX.IntrinsicElements['li']>(
  (props, ref): JSX.Element => {
    const { isActive, isSelected, isDisabled, children, ...rest } = props;

    return (
      <li
        className={cn('uu-multiSelectMenuItem', {
          'uu-multiSelectMenuItem_highlighted': isActive,
          'uu-multiSelectMenuItem_disabled': isDisabled,
        })}
        ref={ref}
        {...rest}
      >
        <Checkbox
          className="uu-multiSelectMenuCheckbox"
          checked={isSelected}
          disabled={isDisabled}
          onChange={noop}
          onClick={handleClick}
        >
          {children}
        </Checkbox>
      </li>
    );
  },
);
