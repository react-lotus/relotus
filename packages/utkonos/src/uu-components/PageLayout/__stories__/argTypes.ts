import type { Meta } from '@storybook/react/types-6-0';

export const pageLayoutArgTypes: Meta['argTypes'] = {
  children: {
    control: {
      type: null,
    },
  },
  title: {
    control: {
      type: 'text',
    },
  },
  pageTitle: {
    control: {
      type: 'text',
    },
  },
  onAppNameClick: {
    control: null,
    table: {
      type: {
        summary: '() => void',
      },
    },
  },
  className: {
    control: {
      type: null,
    },
  },
  headerContent: {
    control: {
      type: null,
    },
  },
  version: {
    control: {
      type: null,
    },
  },
  menu: {
    control: {
      type: null,
    },
  },
  sidebarContent: {
    control: {
      type: null,
    },
  },
  appNameComponent: {
    control: {
      type: null,
    },
  },
  headerComponent: {
    control: {
      type: null,
    },
  },
  sidebarComponent: {
    control: {
      type: null,
    },
  },
  sidebarItemLogoComponent: {
    control: {
      type: null,
    },
  },
};
