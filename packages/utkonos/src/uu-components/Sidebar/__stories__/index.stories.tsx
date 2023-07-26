import React from 'react';
import { Link, MemoryRouter } from 'react-router-dom';
import { withDesign } from 'storybook-addon-designs';
import type { Meta } from '@storybook/react/types-6-0';
import { Button } from '../../Button';
import { MenuItem } from '../../MenuItem';
import { SidebarItem } from '../../SidebarItem';
import { Sidebar } from '..';

const figmaUrl =
  'https://www.figma.com/file/LeE5a4P9cTFQL9HIsFUtAv/UTKONOS-ВПК-UI-kit?node-id=7093%3A7518';

export default {
  title: 'Page/Sidebar',
  component: Sidebar,
  decorators: [withDesign],
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 300,
    },
    figmaUrl,
  },
} as Meta;

export const Preview = () => {
  return (
    <div className="sb-shadow sb-sideBarWrapper">
      <Sidebar title="Название приложения" />
    </div>
  );
};

export const WithMenu = () => (
  <div className="sb-shadow sb-sideBarWrapper">
    <MemoryRouter>
      <Sidebar
        menu={
          <>
            <MenuItem to="#1" as={Link}>
              Раздел 1
            </MenuItem>
            <MenuItem to="#2" as={Link}>
              Раздел 2
            </MenuItem>
            <MenuItem to="#3" as={Link}>
              Раздел 3
            </MenuItem>
            <MenuItem to="#4" as={Link}>
              <span role="img" aria-label="hot">
                Раздел 🔥
              </span>
            </MenuItem>
          </>
        }
        title="Название приложения"
      />
    </MemoryRouter>
    <Button>Кнопка</Button>
  </div>
);

export const WithVersion = () => (
  <div className="sb-shadow sb-sideBarWrapper">
    <Sidebar title="Название приложения" version="0.0.0" />
  </div>
);

export const WithSidebarItems = () => (
  <div className="sb-shadow sb-sideBarWrapper">
    <Sidebar title="Название приложения">
      <SidebarItem>item 1</SidebarItem>
      <SidebarItem>item 2</SidebarItem>
    </Sidebar>
  </div>
);
