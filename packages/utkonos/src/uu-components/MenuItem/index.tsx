import React, { useContext, useCallback, MouseEvent } from 'react';

import cn from 'classnames';
import type { LinkProps } from 'react-router-dom';

import { SidebarContext } from '../Sidebar/SidebarContext';

import './index.scss';

export type MenuItemProps = {
  /** Контент */
  children: React.ReactNode;
  /** Дополнительный класс */
  className?: string;
  /** HTML-тег или компонент для рендера элемента боковой панели
   * @default a
   */
  as?: 'button' | 'a' | 'span' | React.ComponentType<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  onClick?: (e: MouseEvent<unknown>) => void;
};

/**
 * Компонент одного элемента меню боковой панели
 */
export function MenuItem(props: MenuItemProps): JSX.Element;
export function MenuItem(props: JSX.IntrinsicElements['a'] & MenuItemProps): JSX.Element;
export function MenuItem(props: JSX.IntrinsicElements['button'] & MenuItemProps): JSX.Element;
export function MenuItem(props: JSX.IntrinsicElements['span'] & MenuItemProps): JSX.Element;
export function MenuItem(props: MenuItemProps & LinkProps): JSX.Element;
export function MenuItem(props: MenuItemProps): JSX.Element {
  const { className, as = 'a', onClick, ...rest } = props;

  const { closeSidebar } = useContext(SidebarContext);

  const handleClick = useCallback(
    (e: MouseEvent<unknown>) => {
      onClick?.(e);
      closeSidebar();
    },
    [onClick, closeSidebar],
  );
  const RenderAs = as;

  return <RenderAs className={cn(className, 'uu-menuItem')} onClick={handleClick} {...rest} />;
}
