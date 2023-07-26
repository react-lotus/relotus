import { useCallback, useLayoutEffect } from 'react';
import { useLocalStorage } from 'react-use';
import { Button } from '../Button';

import { ReactComponent as DarkIcon } from './assets/dark-icon.svg';
import { ReactComponent as LightIcon } from './assets/light-icon.svg';

export type ThemeSwitchProps = {
  rootElement?: HTMLElement;
};

export const ThemeSwitch = (props: ThemeSwitchProps) => {
  const { rootElement = document.documentElement } = props;
  const [value, setValue] = useLocalStorage('uu-theme', 'light');

  useLayoutEffect(() => {
    if (value) {
      rootElement.setAttribute('data-theme', value);
    }
  }, [rootElement, value]);

  const handleClick = useCallback(() => {
    const newValue = value === 'light' ? 'dark' : 'light';
    setValue(newValue);
  }, [setValue, value]);

  return (
    <Button onClick={handleClick} view="link">
      {value === 'light' && <LightIcon />}
      {value === 'dark' && <DarkIcon />}
    </Button>
  );
};
