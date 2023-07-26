import React from 'react';
import { Link, MemoryRouter } from 'react-router-dom';
import { withDesign } from 'storybook-addon-designs';
import type { Meta } from '@storybook/react/types-6-0';
import { MenuItem } from '../../MenuItem';
import { SidebarMenu } from '..';

const figmaUrl =
  'https://www.figma.com/file/LeE5a4P9cTFQL9HIsFUtAv/UTKONOS-ВПК-UI-kit?node-id=99%3A812';

export default {
  title: 'Page/SidebarMenu',
  component: SidebarMenu,
  decorators: [withDesign],
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 300,
    },
    figmaUrl,
  },
} as Meta;

export const Preview = () => (
  <MemoryRouter>
    <SidebarMenu
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
);

export const WithLongMenu = () => {
  return (
    <SidebarMenu
      menu={
        <>
          {Array(20)
            .fill(undefined)
            .map((_, index) => (
              <MenuItem key={`item${index + 1}`} as="span">
                Раздел {index + 1}
              </MenuItem>
            ))}
        </>
      }
      title="Название приложения"
    />
  );
};
