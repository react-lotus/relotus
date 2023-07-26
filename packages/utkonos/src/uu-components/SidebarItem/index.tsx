import React from 'react';
import type { ReactNode } from 'react';
import cn from 'classnames';
import type { Link as RouterLink, LinkProps } from 'react-router-dom';

import './index.scss';

export interface SidebarItemProps {
  /** Контент */
  children: ReactNode;
  /** Дополнительный класс */
  className?: string;
  /**
   * Тип кнопки.
   *
   * Значение по умолчанию применяется только для рендера через тег button.
   * @default button
   */
  type?: string;
}

interface CommonSidebarItemProps extends SidebarItemProps {
  as?: 'button' | 'a' | 'span' | React.ComponentType<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface LinkSidebarItemProps extends SidebarItemProps, Omit<LinkProps, keyof SidebarItemProps> {
  as: typeof RouterLink;
}

interface ASidebarItemProps
  extends SidebarItemProps,
    Omit<JSX.IntrinsicElements['a'], keyof SidebarItemProps> {
  as: 'a';
}

interface SpanSidebarItemProps
  extends SidebarItemProps,
    Omit<JSX.IntrinsicElements['span'], keyof SidebarItemProps> {
  as: 'span';
}

interface DefaultSidebarItemProps
  extends SidebarItemProps,
    Omit<JSX.IntrinsicElements['button'], keyof SidebarItemProps> {
  as?: 'button';
}

/**
 * Компонент одного элемента боковой панели
 */
export function SidebarItem(props: LinkSidebarItemProps): JSX.Element;
export function SidebarItem(props: ASidebarItemProps): JSX.Element;
export function SidebarItem(props: SpanSidebarItemProps): JSX.Element;
export function SidebarItem(props: DefaultSidebarItemProps): JSX.Element;
export function SidebarItem(props: CommonSidebarItemProps): JSX.Element {
  const { children, className, type, as = 'button', ...rest } = props;

  const RenderAs = as;
  const computedType = type || (as === 'button' ? 'button' : type);

  return (
    <RenderAs type={computedType} className={cn(className, 'uu-sidebarItem')} {...rest}>
      {children}
    </RenderAs>
  );
}
