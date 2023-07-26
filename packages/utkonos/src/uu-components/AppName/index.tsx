import React from 'react';
import type { ComponentType, MouseEvent } from 'react';
import cn from 'classnames';
import type { Link as RouterLink, LinkProps } from 'react-router-dom';

import logoSrc from './assets/logo.svg';

import './index.scss';

interface AppNameComponentProps {
  /** Название приложения */
  title: string;
  /** Обработчик нажатия на название приложения */
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

export type AppNameComponent = ComponentType<AppNameProps>;

export interface AppNameProps extends AppNameComponentProps {
  /** Дополнительный класс */
  className?: string;
}

interface CommonAppNameProps extends AppNameProps {
  as?: 'div' | 'a' | React.ComponentType<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface LinkAppNameProps extends AppNameProps, Omit<LinkProps, keyof AppNameProps> {
  as: typeof RouterLink;
}

interface AAppNameProps extends AppNameProps, Omit<JSX.IntrinsicElements['a'], keyof AppNameProps> {
  as: 'a';
}
interface DefaultAppNameProps
  extends AppNameProps,
    Omit<JSX.IntrinsicElements['div'], keyof AppNameProps> {
  as?: 'div';
}

/**
 * Компонент шапки сайта
 */
export function AppName(props: LinkAppNameProps): JSX.Element;
export function AppName(props: AAppNameProps): JSX.Element;
export function AppName(props: DefaultAppNameProps): JSX.Element;
export function AppName(props: CommonAppNameProps): JSX.Element {
  const { className, title, as = 'div', ...rest } = props;
  const RenderAs = as;

  return (
    <RenderAs className={cn(className, 'uu-appName')} {...rest}>
      <img className="uu-appNameLogo" src={logoSrc} alt="Утконос" />
      <span className="uu-appNameTitle">{title}</span>
    </RenderAs>
  );
}
