import React, { ComponentProps, ElementType } from 'react';
import cn from 'classnames';

import './ModalTitle.scss';

export type CommonTitleOwnProps<E extends ElementType = ElementType> = {
  as?: E;
};

export type CommonTitleProps<E extends ElementType> = CommonTitleOwnProps<E> &
  Omit<ComponentProps<E>, keyof CommonTitleOwnProps>;

const defaultElement = 'div';

export function ModalTitle<E extends ElementType = typeof defaultElement>(
  props: CommonTitleProps<E>,
): JSX.Element {
  const { children, className, type, as = defaultElement, ...rest } = props;

  const RenderAs = as;
  const computedType = type || (as === defaultElement ? defaultElement : type);

  return (
    <RenderAs type={computedType} className={cn(className, 'uu-modalTitle')} {...rest}>
      {children}
    </RenderAs>
  );
}
