import React from 'react';
import type { FC } from 'react';
import cn from 'classnames';

import './ModalBody.scss';

export type Props = JSX.IntrinsicElements['div'] & {
  noPadding?: boolean;
};

export const ModalBody: FC<Props> = ({ className, noPadding = false, ...rest }) => (
  <div
    className={cn({
      className: !!className,
      'uu-modalContentBody': true,
      'uu-modalContentBody_noPadding': noPadding,
    })}
    {...rest}
  />
);
