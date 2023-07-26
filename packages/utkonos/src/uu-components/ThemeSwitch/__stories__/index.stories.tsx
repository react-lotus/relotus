import { useCallback, useLayoutEffect, useState } from 'react';
import type { Meta, Story } from '@storybook/react/types-6-0';
import { PageLayout, SidebarItem } from '../..';
import { ThemeSwitch } from '..';
import type { ThemeSwitchProps } from '..';

export default {
  title: 'Page/ThemeSwitch',
  component: ThemeSwitch,
} as Meta;

const rootElement = document.documentElement;

export const Playground: Story<ThemeSwitchProps> = ({ ...args }) => {
  const sidebar = (
    <SidebarItem as="span">
      <ThemeSwitch {...args} rootElement={rootElement} />
    </SidebarItem>
  );

  const [theme, setTheme] = useState('light');

  const onChangeTheme = useCallback(() => {
    setTheme(rootElement.getAttribute('data-theme') ?? 'light');
  }, []);

  useLayoutEffect(() => {
    onChangeTheme();
    const observer = new MutationObserver(() => onChangeTheme());
    observer.observe(rootElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => {
      observer.disconnect();
    };
  }, [onChangeTheme]);

  return (
    <PageLayout
      pageTitle="Переключатель темы светлая/тёмная"
      title="App Name"
      version="0.1.0"
      sidebarContent={sidebar}
    >
      <p style={{ fontSize: '1.2em', padding: '20px' }}>
        В настоящий момент используется тема {theme}
      </p>
    </PageLayout>
  );
};
