import React from 'react';
import cn from 'classnames';

import { ReactComponent as CloseIcon } from './assets/close.svg';

interface CloseToastButtonProps {
  className?: string;
  closeToast?(): void;
}

export const CloseToastButton = ({ className, closeToast }: CloseToastButtonProps) => {
  return <CloseIcon className={cn('uu-toast__close', className)} onClick={closeToast} />;
};
