import React from 'react';
import { MemoryRouter, Link } from 'react-router-dom';
import { MenuItem } from '.';

export default {
  title: 'Page/MenuItem',
  component: MenuItem,
};

export const Preview = () => (
  <MemoryRouter>
    <div className="sb-shadow" style={{ width: 200 }}>
      <MenuItem href="#1">item 1</MenuItem>
      <MenuItem href="#2">item 2</MenuItem>
    </div>
  </MemoryRouter>
);

export const WithReactRouterDom = () => (
  <MemoryRouter>
    <div className="sb-shadow" style={{ width: 200 }}>
      <MenuItem to="#1" as={Link}>
        Link 1
      </MenuItem>
      <MenuItem to="#2" as={Link}>
        Link 2
      </MenuItem>
    </div>
  </MemoryRouter>
);
