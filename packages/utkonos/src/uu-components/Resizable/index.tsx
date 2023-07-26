import React from 'react';
import { Resizable as ResizableComponent } from 're-resizable';
import type { ResizableProps as ResizableComponentProps } from 're-resizable';
import cn from 'classnames';
import { defaultContainerSize, getDefaultEnable, getDefaultHandleClasses } from './utils';
import './index.scss';

export interface ResizableProps extends ResizableComponentProps {
  /** Направление ресайзера */
  direction?: 'column' | 'row';
}

/**
 * Компонент деления элементов страницы на 2 регулируемые по размеру части
 *
 * Поддерживает все пропсы оригинального компонента Resizable библиотеки re-resizable.
 * Смотри https://github.com/bokuweb/re-resizable
 */
export function Resizable({
  direction,
  className,
  defaultSize = defaultContainerSize,
  enable = getDefaultEnable(direction),
  handleClasses = getDefaultHandleClasses(direction),
  maxWidth = '100%',
  minWidth = '1',
  ...rest
}: ResizableProps): JSX.Element {
  return (
    <ResizableComponent
      className={cn(className, {
        'uu-resizableRow': direction === 'row',
        'uu-resizableColumn': direction === 'column',
      })}
      handleClasses={handleClasses}
      defaultSize={defaultSize}
      maxWidth={maxWidth}
      minWidth={minWidth}
      enable={enable}
      {...rest}
    />
  );
}
