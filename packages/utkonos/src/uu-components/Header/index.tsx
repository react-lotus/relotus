import React from 'react';
import type { ReactNode, ComponentType } from 'react';
import cn from 'classnames';
import { AppName as DefaultAppName } from '../AppName';
import type { AppNameComponent } from '../AppName';

import './index.scss';

interface HeaderComponentProps {
  /** Название приложения */
  title: string;
  /** Заголовок страницы */
  pageTitle?: string;
  /** Подзаголовок страницы */
  subtitle?: ReactNode;
  /** Обработчик нажатия на название приложения */
  onAppNameClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** Дополнительный класс */
  className?: string;
  /** Дополнительный контент справа от названия приложения */
  children?: ReactNode;
  /** Кастомный элемент с названием приложения */
  appNameComponent?: AppNameComponent;
}

export type HeaderComponent = ComponentType<HeaderComponentProps>;

interface HeaderProps
  extends HeaderComponentProps,
    Omit<JSX.IntrinsicElements['header'], keyof HeaderComponentProps> {}

/**
 * Компонент шапки сайта
 */
export function Header(props: HeaderProps): JSX.Element {
  const {
    className,
    children,
    title,
    pageTitle,
    subtitle,
    onAppNameClick,
    appNameComponent: AppName = DefaultAppName,
    ...rest
  } = props;
  return (
    <header className={cn(className, 'uu-header')} {...rest}>
      <AppName title={title} onClick={onAppNameClick} />
      <div className="uu-header__titleRoot">
        {Boolean(pageTitle) && <h1 className="uu-header__pageTitle">{pageTitle}</h1>}
        {subtitle}
      </div>
      <div className="uu-header__content">{children}</div>
    </header>
  );
}
