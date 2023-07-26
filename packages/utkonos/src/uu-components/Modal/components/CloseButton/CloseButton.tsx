import React from 'react';
import type { KeyboardEvent, MouseEvent } from 'react';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import { Button } from '../../../Button';

import './CloseButton.scss';

export interface CloseButtonProps {
  onClick: (event: MouseEvent | KeyboardEvent) => void;
}

export function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <Button
      aria-label="close-icon-button"
      view="link"
      title="Закрыть модальное окно"
      onClick={onClick}
      className="uu-modalCloseButton"
    >
      <CloseIcon />
    </Button>
  );
}
