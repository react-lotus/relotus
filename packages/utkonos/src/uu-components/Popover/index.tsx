import React, { useLayoutEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';

import { Placement } from '@popperjs/core/lib/enums';

import './index.scss';

export interface PopoverBaseProps {
  /** Элемент, относительно которого будет позиционироваться тултип */
  children: React.ReactElement<{ className: string }>;
  /** Дополнительный класс */
  className?: string;
  /** Содержимое тултипа */
  content: React.ReactNode;
  /**
   * Сдвиг тултипа по умолчанию
   * @default 16
   */
  defaultSkidding?: number;
  /** Отступ
   * @default 16
   */
  offset?: number;
  /**
   *  тултипа
   */
  open?: boolean;
  /** Положение тултипа
   * @default "auto"
   */
  placement?: Placement;
}

export interface PopoverWithArrowProps {
  withArrow: true;
  /**
   * Сдвиг стрелки тултипа
   * @default "defaultSkidding / 2"
   */
  arrowPadding?: number;
}

export interface PopoverWithoutArrowProps {
  withArrow?: false;
  arrowPadding?: never;
}

export type PopoverProps = PopoverBaseProps & (PopoverWithArrowProps | PopoverWithoutArrowProps);

const START_PLACEMENT_REGEXP = /-start$/;
const END_PLACEMENT_REGEXP = /-end$/;

const computePopperOffset = (
  placement: Placement,
  offset: Required<PopoverProps>['offset'],
  defaultSkidding: Required<PopoverProps>['defaultSkidding'],
  withArrow: (PopoverWithArrowProps | PopoverWithoutArrowProps)['withArrow'],
): [number, number] => {
  let skidding = 0;

  if (withArrow) {
    if (START_PLACEMENT_REGEXP.exec(placement)) {
      skidding = -defaultSkidding;
    } else if (END_PLACEMENT_REGEXP.exec(placement)) {
      skidding = defaultSkidding;
    }
  }

  return [skidding, offset];
};

/**
 * Поповер
 */
export function Popover(
  props: PopoverProps & Omit<JSX.IntrinsicElements['div'], 'style'>,
): JSX.Element;
export function Popover(props: PopoverProps): JSX.Element {
  const {
    arrowPadding,
    children,
    className,
    withArrow,
    offset = 16,
    defaultSkidding = 16,
    open,
    placement = 'auto',
    content,
    ...rest
  } = props;

  const [rootRef, setRootRef] = useState<HTMLSpanElement | null>(null);
  const [PopoverRef, setPopoverRef] = useState<HTMLSpanElement | null>(null);
  const [arrowRef, setArrowRef] = useState<HTMLSpanElement | null>(null);

  const [popperOffset, setPopperOffset] = useState<[number, number]>(() =>
    computePopperOffset(placement, offset, defaultSkidding, withArrow),
  );

  const modifiers = useMemo(() => {
    const result = [
      ...(withArrow
        ? [
            {
              name: 'arrow',
              options: { element: arrowRef, padding: arrowPadding ?? defaultSkidding / 2 },
            },
          ]
        : []),
      {
        name: 'offset',
        options: {
          offset: popperOffset,
        },
      },
    ];

    return result;
  }, [arrowPadding, withArrow, arrowRef, defaultSkidding, popperOffset]);

  const { state, styles, attributes } = usePopper(rootRef, PopoverRef, {
    modifiers,
    placement,
  });

  const actualPlacement = state?.placement;
  useLayoutEffect(() => {
    if (actualPlacement) {
      setPopperOffset(computePopperOffset(actualPlacement, offset, defaultSkidding, withArrow));
    }
  }, [actualPlacement, offset, defaultSkidding, withArrow]);

  const { className: childrenClassName } = children.props;
  const childrenProps = {
    ref: setRootRef,
    className: cn(childrenClassName, 'uu-popoverRoot'),
  };

  return (
    <>
      {React.cloneElement(children, childrenProps)}
      {open &&
        ReactDOM.createPortal(
          <div
            {...rest}
            ref={setPopoverRef}
            style={styles.popper}
            {...attributes.popper}
            className={cn(className, 'uu-popover')}
          >
            <div className="uu-popoverShadow" />
            {withArrow && (
              <div ref={setArrowRef} style={styles.arrow} className="uu-popoverArrow" />
            )}
            <div className="uu-popoverContent">{content}</div>
          </div>,
          document.body,
        )}
    </>
  );
}
