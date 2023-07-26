import React, { ComponentType } from 'react';
import cn from 'classnames';
import type { TextElements } from '../_typography';

import './index.scss';

export type LinkProps = {
  /**
   * HTML-тег или компонент для рендера ссылки.
   *
   * Если значение не задано, то если для компонента указан href он будет оформлен тегом `a`, в противном случае — `span`.
   * @type React.ElementType | React.ComponentType
   * @default "a"
   */
  as?: unknown;
  /** Дополнительный класс */
  className?: string;
  /** Текст ссылки */
  children: React.ReactNode;
  /**
   * Выключение интерактивности ссылки.
   * Состояние, при котором ссылка отображается, но недоступна для действий пользователя
   */
  disabled?: boolean;
  /**
   * HTML-атрибут `tabIndex`. Определяет последовательность перехода между ссылками при нажатии на кнопку Tab
   */
  tabIndex?: number;
};

type ElementProps<P> = LinkProps & { as: ComponentType<P> } & P;

/**
 * Компонент для создания ссылок.
 */
export function Link(props: LinkProps): JSX.Element;
export function Link<P>(props: ElementProps<P>): JSX.Element;
export function Link(
  props: Omit<LinkProps, 'as'> & { href: string } & TextElements['a'],
): JSX.Element;
export function Link(props: Omit<LinkProps, 'as'> & TextElements['span']): JSX.Element;
export function Link(
  props: Omit<LinkProps, 'as'> & Record<string, any>, // eslint-disable-line @typescript-eslint/no-explicit-any
): JSX.Element {
  const { className, disabled, children, as, href, tabIndex, ...rest } = props;

  const defaultHtmlElement = href ? 'a' : 'span';
  const RenderAs = as ?? defaultHtmlElement;
  const computedTabIndex = disabled ? -1 : tabIndex;

  return (
    <RenderAs
      className={cn(className, 'uu-link')}
      tabIndex={computedTabIndex}
      aria-disabled={disabled}
      href={href}
      {...rest}
    >
      {children}
    </RenderAs>
  );
}
