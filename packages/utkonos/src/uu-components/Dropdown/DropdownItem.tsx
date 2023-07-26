import React, { ForwardedRef, forwardRef } from 'react';
import type { ElementType, ComponentProps } from 'react';
import cn from 'classnames';

import './DropdownItem.scss';

export type DropdownItemOwnProps<E extends ElementType = ElementType> = {
  as?: E;
  ariaLabelledby?: string;
  ariaLabel?: string;
};

export type DropdownItemProps<E extends ElementType = ElementType> = DropdownItemOwnProps<E> &
  Omit<ComponentProps<E>, keyof DropdownItemOwnProps>;

const defaultElement = 'button';

/**
 * Базовый компонент представления данных в выпадающем списке.
 */
export const DropdownItemWithoutRef = <E extends ElementType = typeof defaultElement>(
  props: DropdownItemProps<E>,
  ref: ForwardedRef<HTMLButtonElement> | null,
): JSX.Element => {
  const {
    children,
    className,
    type,
    as = defaultElement,
    ariaLabelledby,
    ariaLabel,
    ...rest
  } = props;

  const RenderAs = as;
  const computedType = type || (as === defaultElement ? defaultElement : type);

  return (
    <RenderAs
      type={computedType}
      aria-label={ariaLabel || children}
      aria-labelledby={cn(ariaLabelledby, ariaLabel)}
      className={cn(className, 'uu-dropdownItem')}
      ref={ref}
      {...rest}
    >
      {children}
    </RenderAs>
  );
};

export const DropdownItem = forwardRef<HTMLButtonElement, DropdownItemProps>(
  DropdownItemWithoutRef,
) as <E extends ElementType = typeof defaultElement>(
  props: DropdownItemProps<E> & { ref?: ForwardedRef<HTMLButtonElement> | null },
) => JSX.Element;
