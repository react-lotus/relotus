import React from 'react';
import cn from 'classnames';

import './ModalFooter.scss';

export type Props = JSX.IntrinsicElements['div'];

export const ModalFooter = ({ className, ...rest }: Props) => (
  <div className={cn(className, 'uu-modalFooter')} {...rest} />
);
