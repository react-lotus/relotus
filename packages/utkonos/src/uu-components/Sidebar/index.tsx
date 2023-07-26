import React, { useMemo } from 'react';
import type { ComponentType, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';

import { useBooleanState } from '@relotus/hooks';
import { SidebarItem } from '../SidebarItem';
import { SidebarMenu } from '../SidebarMenu';
import { AppName as DefaultAppName } from '../AppName';
import type { AppNameComponent } from '../AppName';

import { SidebarContext } from './SidebarContext';
import { ReactComponent as OpenedMenuIcon } from './assets/opened-menu.svg';
import { ReactComponent as ClosedMenuIcon } from './assets/closed-menu.svg';
import logoSrc from './assets/logo.svg';

import './index.scss';

interface SidebarItemLogoComponentProps {
  /** Название приложения */
  title: string;
  /** Обработчик нажатия на логотип приложения */
  onClick?: () => void;
  /** Дополнительное содержимое боковой панели */
  children: ReactNode;
  /** Класс для стилизации элемента в сайдбаре */
  className: string;
}

export type SidebarItemLogoComponent = ComponentType<SidebarItemLogoComponentProps>;

interface SidebarComponentProps {
  /** Название приложения */
  title: string;
  /** Обработчик нажатия на название приложения */
  onAppNameClick?: () => void;
  /** Дополнительный класс */
  className?: string;
  /** Кастомный элемент с названием приложения */
  appNameComponent?: AppNameComponent;
  /** Версия приложения */
  version?: ReactNode;
  /** Дополнительное содержимое боковой панели */
  children?: ReactNode;
  /** Меню */
  menu?: ReactNode;
  /** Кастомный элемент с логотипом приложения */
  sidebarItemLogoComponent?: SidebarItemLogoComponent;
}

export type SidebarComponent = ComponentType<SidebarComponentProps>;

export interface SidebarProps
  extends SidebarComponentProps,
    Omit<JSX.IntrinsicElements['div'], keyof SidebarComponentProps> {}

/**
 * Компонент боковой панели
 */
export function Sidebar(props: SidebarProps): JSX.Element {
  const {
    menu,
    className,
    onAppNameClick,
    version,
    children,
    title,
    appNameComponent: AppName = DefaultAppName,
    sidebarItemLogoComponent: SidebarItemLogo = SidebarItem,
    ...rest
  } = props;
  const [isMenuOpen, handleOpenMenu, handleCloseMenu] = useBooleanState(false);

  const value = useMemo(() => ({ closeSidebar: handleCloseMenu }), [handleCloseMenu]);

  return (
    <SidebarContext.Provider value={value}>
      <div
        className={cn(className, 'uu-sidebar', {
          'uu-sidebar_versionShow': version,
        })}
        {...rest}
      >
        <SidebarItemLogo className="uu-sidebar__logo" onClick={onAppNameClick} title={title}>
          <img src={logoSrc} alt={title} />
        </SidebarItemLogo>
        {Boolean(menu) && title !== undefined && (
          <SidebarItem as="button" onClick={isMenuOpen ? handleCloseMenu : handleOpenMenu}>
            {isMenuOpen ? <OpenedMenuIcon /> : <ClosedMenuIcon />}
          </SidebarItem>
        )}
        {children}
        {Boolean(version) && <div className="uu-sidebar__version">{version}</div>}
      </div>
      {isMenuOpen &&
        createPortal(
          <SidebarMenu
            title={title}
            appNameComponent={AppName}
            onAppNameClick={onAppNameClick}
            menu={menu}
          />,
          document.body,
        )}
    </SidebarContext.Provider>
  );
}
