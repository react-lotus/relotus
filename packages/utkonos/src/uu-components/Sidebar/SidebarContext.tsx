import { createContext } from 'react';
import { noop } from 'lodash-es';

export const SidebarContext = createContext({
  closeSidebar: noop,
});
