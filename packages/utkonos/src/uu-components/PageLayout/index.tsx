/**
 *
 * PageLayout
 *
 */

import React from 'react';
import type { ReactNode } from 'react';
import cn from 'classnames/bind';
import { Sidebar as DefaultSidebar } from '../Sidebar';
import type { SidebarComponent, SidebarItemLogoComponent } from '../Sidebar';
import { Header as DefaultHeader } from '../Header';
import type { HeaderComponent } from '../Header';
import type { AppNameComponent } from '../AppName';

import './index.scss';

export interface PageLayoutProps {
  /** Контент страницы */
  children: ReactNode;
  /** Название приложения */
  title: string;
  /** Заголовок страницы */
  pageTitle?: string;
  /** Обработчик нажатия на название приложения */
  onAppNameClick?: () => void;
  /** Дополнительный класс */
  className?: string;
  /** Дополнительный контент справа от названия приложения в шапке сайта */
  headerContent?: ReactNode;
  /** Версия приложения */
  version?: ReactNode;
  /** Меню боковой панели */
  menu?: ReactNode;
  /** Дополнительное содержимое боковой панели */
  sidebarContent?: ReactNode;
  /** Кастомный компонент с названием приложения */
  appNameComponent?: AppNameComponent;
  /** Кастомный компонент шапки сайта */
  headerComponent?: HeaderComponent;
  /** Кастомный компонент боковой панели */
  sidebarComponent?: SidebarComponent;
  /** Кастомный элемент с логотипом приложения */
  sidebarItemLogoComponent?: SidebarItemLogoComponent;
  /** Подзаголовок страницы */
  subtitle?: ReactNode;
}

export function PageLayout(props: PageLayoutProps) {
  const {
    className,
    title,
    pageTitle,
    children,
    headerContent,
    menu,
    sidebarContent,
    onAppNameClick,
    version,
    headerComponent: Header = DefaultHeader,
    sidebarComponent: Sidebar = DefaultSidebar,
    appNameComponent,
    sidebarItemLogoComponent,
    subtitle,
  } = props;

  return (
    <div className={cn(className, 'uu-scrollbar uu-pageLayout')}>
      <Sidebar
        className="uu-pageLayout__sidebar"
        title={title}
        menu={menu}
        appNameComponent={appNameComponent}
        onAppNameClick={onAppNameClick}
        version={version}
        sidebarItemLogoComponent={sidebarItemLogoComponent}
      >
        {sidebarContent}
      </Sidebar>
      <div className="uu-pageLayout__container">
        <Header
          className="uu-pageLayout__header"
          title={title}
          pageTitle={pageTitle}
          appNameComponent={appNameComponent}
          onAppNameClick={onAppNameClick}
          subtitle={subtitle}
        >
          {headerContent}
        </Header>
        {children}
      </div>
    </div>
  );
}
