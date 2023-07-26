import React from 'react';
import { MemoryRouter, Link } from 'react-router-dom';
import { SidebarItem } from '.';

export default {
  title: 'Page/SidebarItem',
  component: SidebarItem,
};

export const Preview = () => (
  <div className="sb-shadow" style={{ width: 60 }}>
    <SidebarItem>item</SidebarItem>
  </div>
);

export const WithReactRouterDom = () => (
  <MemoryRouter>
    <div className="sb-shadow" style={{ width: 60 }}>
      <SidebarItem to="#1" as={Link}>
        Link 1
      </SidebarItem>
      <SidebarItem to="#2" as={Link}>
        Link 2
      </SidebarItem>
    </div>
  </MemoryRouter>
);
