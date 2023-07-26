import React, { forwardRef, useMemo, useEffect } from 'react';
import type { FC, Ref, CSSProperties } from 'react';
import { usePopper } from 'react-popper';
import type { Modifier } from 'react-popper';
import type { Placement } from '@popperjs/core';
import cn from 'classnames';
import { createPortal } from 'react-dom';
import './Menu.scss';

export interface SelectMenuProps {
  /**
   * Меню будет помещено перед закрывающим тегом body
   *
   * @default false
   */
  appendToBody?: boolean;

  /**
   * Максимальная высота меню
   *
   * @default 300
   */
  menuMaxHeight?: CSSProperties['maxHeight'];

  /**
   * Ширина меню
   *
   * @default '100%'
   */
  menuWidth?: CSSProperties['width'];

  /**
   * Сторона, относительного которой будет позиционировано меню
   *
   * @default 'bottom-start'
   */
  menuPosition?: Placement;
}

export interface SelectMenuFullProps
  extends SelectMenuProps,
    Omit<JSX.IntrinsicElements['div'], 'target' | 'ref'> {
  target: Element | null;
  menuRef?: HTMLElement | null;
  isOpen: boolean;
  ref?: Ref<HTMLDivElement>;
  className?: string;
}

const getWidth = (refWidth: number, menuWidth?: string | number) => {
  let width: string;
  if (typeof menuWidth === 'string' && /^\d+%$/.test(menuWidth)) {
    const widthInt = parseInt(menuWidth, 10);
    width = `${(refWidth * widthInt) / 100}px`;
  } else if (typeof menuWidth === 'string') {
    width = menuWidth;
  } else if (typeof menuWidth === 'number') {
    width = `${menuWidth}px`;
  } else {
    width = `${refWidth}px`;
  }
  return width;
};

export const SelectMenu: FC<SelectMenuFullProps> = forwardRef((props, ref) => {
  const {
    target,
    isOpen,
    className,
    appendToBody = false,
    menuMaxHeight = 300,
    menuWidth = '100%',
    menuPosition = 'bottom-start',
    menuRef,
    ...rest
  } = props;

  const sameWidth = useMemo(() => {
    const modifier: Modifier<'sameWidth'> = {
      name: 'sameWidth',
      enabled: true,
      phase: 'beforeWrite',
      requires: ['computeStyles'],
      fn: ({ state }) => {
        const refWidth = state.rects.reference.width;
        state.styles.popper.width = getWidth(refWidth, menuWidth);
      },
      effect: ({ state }) => {
        const refWidth = state.elements.reference.getBoundingClientRect().width;
        state.elements.popper.style.width = getWidth(refWidth, menuWidth);
      },
    };
    return modifier;
  }, [menuWidth]);

  const { styles, attributes, forceUpdate } = usePopper(target, menuRef, {
    placement: menuPosition,
    modifiers: [sameWidth],
  });

  useEffect(() => {
    if (isOpen && forceUpdate) {
      forceUpdate();
    }
  }, [isOpen, forceUpdate]);

  const children = (
    <div
      className={cn(className, 'uu-selectMenu', {
        'uu-selectMenu_hidden': !isOpen,
      })}
      style={{ ...styles.popper, maxHeight: menuMaxHeight, width: menuWidth }}
      ref={ref}
      {...attributes.popper}
      {...rest}
    />
  );

  if (appendToBody && isOpen) {
    return createPortal(children, document.body);
  }

  return children;
});
