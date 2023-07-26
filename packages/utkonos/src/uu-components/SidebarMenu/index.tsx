import React, { useMemo, useContext } from 'react';
import type { ReactNode, MouseEvent } from 'react';
import { over } from 'lodash-es';
import cn from 'classnames';
import OutsideClickHandler from 'react-outside-click-handler';

import { SidebarContext } from '../Sidebar/SidebarContext';

import { AppName as DefaultAppName } from '../AppName';
import type { AppNameComponent } from '../AppName';

import './index.scss';

interface SidebarMenuProps {
  /** Название приложения */
  title: string;
  /** Обработчик нажатия на название приложения */
  onAppNameClick?: (event: MouseEvent<HTMLDivElement>) => void;
  /** Кастомный элемент с названием приложения */
  appNameComponent?: AppNameComponent;
  /** Меню */
  menu?: ReactNode;
}

/**
 * Меню боковой панели
 */
export function SidebarMenu(props: SidebarMenuProps): JSX.Element {
  const { menu, onAppNameClick, title, appNameComponent: AppName = DefaultAppName } = props;
  const { closeSidebar } = useContext(SidebarContext);

  const handleAppNameClick = useMemo(
    () => (onAppNameClick ? over(onAppNameClick, closeSidebar) : closeSidebar),
    [onAppNameClick, closeSidebar],
  );

  return (
    <div className="uu-sidebarMenu__backdrop">
      <OutsideClickHandler onOutsideClick={closeSidebar}>
        <div className={cn('uu-sidebarMenu__wrapper')}>
          <AppName title={title} onClick={handleAppNameClick} />
          <div className="uu-sidebarMenu">{menu}</div>
        </div>
      </OutsideClickHandler>
    </div>
  );
}
