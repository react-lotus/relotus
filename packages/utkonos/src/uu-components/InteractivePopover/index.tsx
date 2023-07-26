import React, { useCallback, useEffect } from 'react';
import { useBooleanState } from '@relotus/hooks';
import { Popover } from '../Popover';
import type { PopoverBaseProps, PopoverWithArrowProps, PopoverWithoutArrowProps } from '../Popover';

export interface InteractivePopoverProps extends PopoverBaseProps {
  /** Класс для таргет-элемента */
  targetClassName?: string;
  /**
   * Время в мс до закрытия
   * @default 700
   */
  timeoutOnClose?: number;
}

/**
 * Поповер с возможностью интерактива и динамическим отображением на странице
 */
export function InteractivePopover({
  timeoutOnClose = 700,
  targetClassName,
  children,
  ...rest
}: InteractivePopoverProps &
  Omit<JSX.IntrinsicElements['div'], 'style' | 'onMouseLeave' | 'onMouseEnter'> &
  (PopoverWithArrowProps | PopoverWithoutArrowProps)) {
  const [isOpen, setIsOpenTrue, setIsOpenFalse] = useBooleanState();
  const [isOnTargetElement, setIsOnTargetElementTrue, setIsOnTargetElementFalse] =
    useBooleanState();
  const [isOnPopoverContent, setIsOnPopoverContentTrue, setIsOnPopoverContentFalse] =
    useBooleanState();

  const onMouseEnterTargetElement = useCallback(() => {
    setIsOpenTrue();
    setIsOnTargetElementTrue();
  }, [setIsOnTargetElementTrue, setIsOpenTrue]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (isOpen && !isOnTargetElement && !isOnPopoverContent) {
      timeout = setTimeout(() => setIsOpenFalse(), timeoutOnClose);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isOnTargetElement, isOnPopoverContent, isOpen, timeoutOnClose, setIsOpenFalse]);

  return (
    <Popover
      open={isOpen}
      onMouseEnter={setIsOnPopoverContentTrue}
      onMouseLeave={setIsOnPopoverContentFalse}
      {...rest}
    >
      <div
        onMouseEnter={onMouseEnterTargetElement}
        onMouseLeave={setIsOnTargetElementFalse}
        className={targetClassName}
      >
        {children}
      </div>
    </Popover>
  );
}
