import React, { MouseEventHandler, useCallback, useMemo } from 'react';
import type { ReactNode, MouseEvent, KeyboardEvent, ComponentType } from 'react';
import { usePrevious } from 'react-use';
import cn from 'classnames';
import ModalOriginal from 'react-modal';
import type { Classes as ModalOriginalClasses, Props as ModalOriginalProps } from 'react-modal';
import { ModalBody } from './components/ModalBody';
import { ModalFooter } from './components/ModalFooter';
import { ModalTitle } from './components/ModalTitle';
import { CloseButton as DefaultCloseButton } from './components/CloseButton/CloseButton';
import type { CloseButtonProps } from './components/CloseButton/CloseButton';

import './index.scss';

const overlayClassName: ModalOriginalClasses = {
  base: 'uu-modalOverlay',
  afterOpen: 'uu-modalOverlay_afterOpen',
  beforeClose: 'uu-modalOverlay_beforeClose',
};

const contentClassName: ModalOriginalClasses = {
  base: 'uu-modalContent',
  afterOpen: 'uu-modalContent_afterOpen',
  beforeClose: 'uu-modalContent_beforeClose',
};

export interface ModalBaseProps
  extends Omit<
    ModalOriginalProps,
    'className' | 'overlayClassName' | 'portalClassName' | 'onRequestClose'
  > {
  /** Контент модального окна */
  children?: ReactNode;
  /**
   * Компонент кнопки закрытия модального окна
   *
   * @default Modal.CloseButton
   * */
  closeButtonComponent?: ComponentType<CloseButtonProps> | null;
  /**
   * Дополнительный класс на верхний уровень модального окна - портал
   * */
  className?: string;
  /**
   * Ширина модального окна
   *
   * @default 570
   * */
  width?: string | number;
  /**
   * Таймаут перед закрытием модального окна, используется для анимации
   *
   * @default 100
   * */
  closeTimeoutMS?: number;
  /**
   * Расположение модального окна
   * */
  side?: 'left' | 'right';
  /**
   * Убирает внутренние отступы в Modal.Body
   * */
  noPadding?: boolean;
  /**
   * Убирает e.stopPropagation(); при клике на область модального окна
   * */
  enablePropagation?: boolean;
}

export interface ModalWithOnRequestClose extends ModalBaseProps {
  /** Функция, которая будет запускаться при запросе закрытия модального окна до фактического закрытия. */
  onRequestClose?: (event: MouseEvent | KeyboardEvent) => void;
  onClose?: never;
}

export interface ModalWithOnClose extends ModalBaseProps {
  /** Функция, которая будет запускаться при запросе закрытия модального окна до фактического закрытия
   *  без передачи события в качестве аргумента. При наличии onClose не будет срабатывать onRequestClose. */
  onRequestClose?: never;
  onClose?: () => void;
}

/**
 * Компонент модального окна.
 *
 * Поддерживает все пропсы оригинального компонента библиотеки react-modal.
 * Смотри http://reactcommunity.org/react-modal/#usage
 */
export const Modal = Object.assign(
  ({
    children,
    closeButtonComponent: CloseButton = DefaultCloseButton,
    className,
    width = 570,
    closeTimeoutMS = 100,
    side,
    isOpen,
    style,
    noPadding,
    enablePropagation,
    ...rest
  }: ModalWithOnRequestClose | ModalWithOnClose): JSX.Element => {
    const prevChildren = usePrevious(children);

    const computedStyle = useMemo(() => {
      return {
        ...style,
        content: {
          width,
          ...style?.content,
        },
      };
    }, [width, style]);

    const portalClassName = useMemo(
      () => cn(className, 'uu-modal', side && `uu-modal_${side}`),
      [className, side],
    );

    const handleClose = useCallback(
      (event: MouseEvent | KeyboardEvent) => {
        if ('onClose' in rest) {
          const { onClose } = rest;
          onClose?.();
        } else if ('onRequestClose' in rest) {
          const { onRequestClose } = rest || {};
          onRequestClose?.(event);
        }
      },
      [rest],
    );

    const renderOverlayComponent: ModalOriginal.Props['overlayElement'] = useCallback(
      (
        {
          onClick,
          onKeyPress,
          ...props
        }: Pick<
          React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
          'key' | keyof React.HTMLAttributes<HTMLDivElement>
        >,
        overlayChildren,
      ) => {
        const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
          if (!enablePropagation) {
            e.stopPropagation();
          }
          onClick?.(e);
        };
        return (
          <div {...props} onClick={handleClick} role="none" onKeyPress={onKeyPress}>
            {overlayChildren}
          </div>
        );
      },
      [enablePropagation],
    );

    return (
      <ModalOriginal
        isOpen={isOpen}
        className={contentClassName}
        portalClassName={portalClassName}
        overlayClassName={overlayClassName}
        onRequestClose={handleClose}
        closeTimeoutMS={closeTimeoutMS}
        style={computedStyle}
        ariaHideApp={false}
        testId="modal-2-component"
        overlayElement={renderOverlayComponent}
        {...rest}
      >
        {CloseButton && <CloseButton onClick={handleClose} />}
        {isOpen ? children : prevChildren}
      </ModalOriginal>
    );
  },
  {
    Title: ModalTitle,
    Body: ModalBody,
    Footer: ModalFooter,
    CloseButton: DefaultCloseButton,
  },
);
