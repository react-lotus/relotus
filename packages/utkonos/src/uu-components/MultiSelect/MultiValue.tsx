import React, { HTMLAttributes, ReactNode, forwardRef } from 'react';
import cn from 'classnames';
import { ReactComponent as IconClose } from './assets/icon-close.svg';
import './MultiValue.scss';

type SpanProps = Omit<HTMLAttributes<HTMLSpanElement>, 'ref' | 'children'>;

export interface MultiValueProps extends SpanProps {
  onClose: JSX.IntrinsicElements['button']['onClick'];
  children: ReactNode;
  disabled?: boolean;
  textClassName?: string;
}

export const MultiValue = forwardRef<HTMLSpanElement, MultiValueProps>(
  (props, ref): JSX.Element => {
    const { children, onClose, disabled, className, textClassName, ...rest } = props;
    return (
      <span
        className={cn('uu-multiSelectValue', className, {
          'uu-multiSelectValue_disabled': disabled,
        })}
        ref={ref}
        {...rest}
      >
        <div className={cn('uu-multiSelectValueText', textClassName)}>{children}</div>
        <button
          type="button"
          className={cn('uu-multiSelectValueClose', {
            'uu-multiSelectValueClose_disabled': disabled,
          })}
          disabled={disabled}
          onClick={onClose}
        >
          <IconClose />
        </button>
      </span>
    );
  },
);
