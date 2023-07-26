import React, { useCallback, useMemo, useState } from 'react';
import cn from 'classnames';
import { debounce } from 'lodash-es';

import './index.scss';
import { Popover, PopoverProps } from '../Popover';

interface TooltipBaseProps {
  /** Задержка на скрытие тултипа
   * @default 400
   */
  hideDelay?: number;
  /** Содержимое тултипа */
  title?: PopoverProps['content'];
}

export type TooltipProps = TooltipBaseProps & Omit<PopoverProps, 'content' | 'withArrow'>;

/**
 * Компонент всплывающих подсказок при наведени курсора на элемент
 */
export function Tooltip(props: TooltipProps): JSX.Element {
  const { title, children, hideDelay = 400, ...rest } = props;

  const [open, setOpen] = useState(false);

  const handleMouseLeave = useMemo(
    () =>
      debounce((): void => {
        setOpen(false);
      }, hideDelay),
    [hideDelay],
  );
  const handleMouseEnter = useCallback(() => {
    handleMouseLeave.cancel();
    setOpen(true);
  }, [handleMouseLeave]);

  const { className: childrenClassName } = children.props;
  const childrenProps = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    className: cn(childrenClassName, 'uu-tooltipRoot'),
  };

  const isTitleExist = Boolean(title);
  if (!isTitleExist) return children;

  return (
    <Popover {...rest} content={title} open={open} withArrow>
      {React.cloneElement(children, childrenProps)}
    </Popover>
  );
}
