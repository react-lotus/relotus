import React, { FC } from 'react';
import type { ReactNode } from 'react';
import { MemoryRouter, Link as RouterLink } from 'react-router-dom';
import type { Meta, Story } from '@storybook/react/types-6-0';
import { Button, Link as UULink } from '../..';

import { Dropdown, DropdownProps, DropdownItem } from '..';
import { Link, LinkProps } from '../../Link';
import { ReactComponent as SettingsSvg } from './assets/settings.svg';
import { ReactComponent as SearchSvg } from './assets/search.svg';
import { ReactComponent as Search2Svg } from './assets/search2.svg';
import { ReactComponent as LockSvg } from './assets/lock.svg';
import { ReactComponent as ExcelSvg } from './assets/excel.svg';
import { ReactComponent as ColumnsSvg } from './assets/columns.svg';
import { dropdownArgTypes } from './argTypes';

import styles from './index.module.scss';

export default {
  title: 'Controls/Dropdown',
  component: Dropdown,
  argTypes: dropdownArgTypes,
} as Meta;

interface CustomLinkComponentProps extends Omit<LinkProps, 'as' | 'children'> {
  children?: ReactNode;
  waybillCode: string;
}

const handleClick = () => (): void => {};

const Link1: FC = () => (
  <UULink className={styles.link} href="#1" onClick={handleClick()}>
    Первая ссылка
  </UULink>
);
const Link2: FC = () => (
  <UULink href="#2" onClick={handleClick()} className={styles.link}>
    Вторая ссылка
  </UULink>
);
const Link3: FC = () => (
  <UULink href="#3" onClick={handleClick()} className={styles.link}>
    Третья ссылка
  </UULink>
);
const Button1: FC = () => (
  <Button className={styles.button} onClick={handleClick()}>
    <ExcelSvg />
    <span>Выгрузить в Excel</span>
  </Button>
);
const Button2: FC = () => (
  <Button className={styles.button} onClick={handleClick()} view="light">
    Нажмите и скачайте
  </Button>
);

const renderDropdownItem1 = () => <DropdownItem onClick={handleClick()}>Блок номер 1</DropdownItem>;
const renderDropdownItem2 = () => (
  <DropdownItem as="a" href="#2">
    Блок номер 2
  </DropdownItem>
);
const renderDropdownItem3 = () => (
  <DropdownItem>
    Чрезвычайно длинный текст выбора, который появляется в выпадающем списке
  </DropdownItem>
);

const SVG_COMPONENTS = {
  SettingsSvg,
  SearchSvg,
  Search2Svg,
  LockSvg,
  ExcelSvg,
  ColumnsSvg,
};

const DROPDOWN_ELEMENTS = {
  Link1: <Link1 />,
  Link2: <Link2 />,
  Link3: <Link3 />,
  Button1: <Button1 />,
  Button2: <Button2 />,
  DropdownItem1: renderDropdownItem1(),
  DropdownItem2: renderDropdownItem2(),
  DropdownItem3: renderDropdownItem3(),
};

const PlaygroundTemplate: Story<
  DropdownProps & {
    text: string;
    icon: keyof typeof SVG_COMPONENTS | 'none';
    iconPosition: 'start' | 'end';
    child1: keyof typeof DROPDOWN_ELEMENTS | 'none';
    child2: keyof typeof DROPDOWN_ELEMENTS | 'none';
    child3: keyof typeof DROPDOWN_ELEMENTS | 'none';
  }
> = ({ text = '', icon = 'none', iconPosition, child1, child2, child3, ...args }) => {
  const element1 = child1 !== 'none' ? DROPDOWN_ELEMENTS[child1] : null;
  const element2 = child2 !== 'none' ? DROPDOWN_ELEMENTS[child2] : null;
  const element3 = child3 !== 'none' ? DROPDOWN_ELEMENTS[child3] : null;

  let button = null;

  if (icon === 'none') {
    button = text ?? null;
  } else if (!text) {
    const SvgComponent = SVG_COMPONENTS[icon];
    SvgComponent.toString = () => icon;

    button = <SvgComponent />;
  } else {
    const SvgComponent = SVG_COMPONENTS[icon];
    SvgComponent.toString = () => icon;

    if (iconPosition === 'start') {
      button = (
        <>
          <SvgComponent />
          <span>{text}</span>
        </>
      );
    }
    if (iconPosition === 'end') {
      button = (
        <>
          <span>{text}</span>
          <SvgComponent />
        </>
      );
    }
  }

  return (
    <Dropdown {...args} buttonContent={button}>
      {element1}
      {element2}
      {element3}
    </Dropdown>
  );
};

export const Playground = PlaygroundTemplate.bind({});

Playground.args = {
  text: 'Дропдаун',
  icon: 'none',
  iconPosition: 'start',
  child1: 'DropdownItem1',
  child2: 'none',
  child3: 'none',
  menuWidth: '250px',
  direction: undefined,
  id: undefined,
  menuMaxHeight: undefined,
  menuPosition: undefined,
  view: undefined,
  buttonContent: null,
  children: null,
};

const defaultSet: ReactNode = (
  <>
    {DROPDOWN_ELEMENTS.DropdownItem1}
    <Link1 />
    <Button1 />
  </>
);

export const Preview = () => {
  return (
    <>
      <Dropdown buttonContent="Кнопка" menuWidth="auto">
        {defaultSet}
      </Dropdown>
      <Dropdown
        buttonContent={
          <>
            <SettingsSvg />
            <span>Кнопка</span>
          </>
        }
        menuWidth="auto"
      >
        {defaultSet}
      </Dropdown>
      <Dropdown
        buttonContent={
          <>
            <span>Кнопка</span>
            <SettingsSvg />
          </>
        }
        menuWidth="auto"
      >
        {defaultSet}
      </Dropdown>
      <Dropdown disabled buttonContent={<SettingsSvg />} withoutArrow menuWidth="auto">
        {defaultSet}
      </Dropdown>
      <Dropdown
        buttonContent={<SettingsSvg />}
        withoutArrow
        menuPosition="bottom-end"
        menuWidth="auto"
      >
        {defaultSet}
      </Dropdown>
      <Dropdown buttonContent="Кнопка" view="secondary" menuWidth="auto">
        {defaultSet}
      </Dropdown>
      <Dropdown
        buttonContent={
          <>
            <SearchSvg />
            <span>Кнопка</span>
          </>
        }
        view="secondary"
        menuWidth="auto"
      >
        {defaultSet}
      </Dropdown>
      <Dropdown
        buttonContent={
          <>
            <span>Кнопка</span>
            <SearchSvg />
          </>
        }
        view="secondary"
        menuWidth="auto"
      >
        {defaultSet}
      </Dropdown>
      <Dropdown disabled buttonContent="Выключено" view="secondary" menuWidth="auto">
        {defaultSet}
      </Dropdown>
      <Dropdown
        buttonContent={<SearchSvg />}
        withoutArrow
        menuPosition="bottom-end"
        view="secondary"
        menuWidth="auto"
      >
        {defaultSet}
      </Dropdown>
      <Dropdown buttonContent="Кнопка" view="light" menuWidth="auto">
        {defaultSet}
      </Dropdown>
      <Dropdown
        buttonContent={
          <>
            <ExcelSvg />
            <span>Кнопка</span>
          </>
        }
        view="light"
        menuWidth="auto"
      >
        {defaultSet}
      </Dropdown>
      <Dropdown
        buttonContent={
          <>
            <span>Кнопка</span>
            <ExcelSvg />
          </>
        }
        view="light"
        menuWidth="auto"
      >
        {defaultSet}
      </Dropdown>
      <Dropdown loading buttonContent="Выполняется..." view="light" menuWidth="auto">
        {defaultSet}
      </Dropdown>
      <Dropdown
        buttonContent={<ExcelSvg />}
        withoutArrow
        menuPosition="bottom-end"
        view="light"
        menuWidth="auto"
      >
        {defaultSet}
      </Dropdown>
      <Dropdown buttonContent="Кнопка" view="dangerSecondary" menuWidth="auto">
        {defaultSet}
      </Dropdown>
      <Dropdown
        buttonContent={
          <>
            <SearchSvg />
            <span>Кнопка</span>
          </>
        }
        view="dangerSecondary"
        menuWidth="auto"
      >
        {defaultSet}
      </Dropdown>
      <Dropdown
        buttonContent={
          <>
            <span>Кнопка</span>
            <SearchSvg />
          </>
        }
        view="dangerSecondary"
        menuWidth="auto"
      >
        {defaultSet}
      </Dropdown>
      <Dropdown
        disabled
        buttonContent={
          <>
            <span>Выключено</span>
            <SearchSvg />
          </>
        }
        view="dangerSecondary"
        menuWidth="auto"
      >
        {defaultSet}
      </Dropdown>
      <Dropdown
        buttonContent={<SearchSvg />}
        withoutArrow
        menuPosition="bottom-end"
        view="dangerSecondary"
        menuWidth="auto"
      >
        {defaultSet}
      </Dropdown>
      <Dropdown buttonContent="Кнопка" view="dangerLight" menuWidth="auto">
        {defaultSet}
      </Dropdown>
      <Dropdown
        buttonContent={
          <>
            <SearchSvg />
            <span>Кнопка</span>
          </>
        }
        view="dangerLight"
        menuWidth="auto"
      >
        {defaultSet}
      </Dropdown>
      <Dropdown
        buttonContent={
          <>
            <span>Кнопка</span>
            <SearchSvg />
          </>
        }
        view="dangerLight"
        menuWidth="auto"
      >
        {defaultSet}
      </Dropdown>
      <Dropdown
        disabled
        buttonContent={
          <>
            <SearchSvg />
            <span>Выключено</span>
          </>
        }
        view="dangerLight"
        menuWidth="auto"
      >
        {defaultSet}
      </Dropdown>
      <Dropdown
        buttonContent={<SearchSvg />}
        withoutArrow
        menuPosition="bottom-end"
        view="dangerLight"
        menuWidth="auto"
      >
        {defaultSet}
      </Dropdown>
      <Dropdown buttonContent="Кнопка" view="danger" menuWidth="auto">
        {defaultSet}
      </Dropdown>
      <Dropdown
        buttonContent={
          <>
            <LockSvg />
            <span>Кнопка</span>
          </>
        }
        view="danger"
        menuWidth="auto"
      >
        {defaultSet}
      </Dropdown>
      <Dropdown
        buttonContent={
          <>
            <span>Кнопка</span>
            <LockSvg />
          </>
        }
        view="danger"
        menuWidth="auto"
      >
        {defaultSet}
      </Dropdown>
      <Dropdown disabled buttonContent="Выключено" view="danger" menuWidth="auto">
        {defaultSet}
      </Dropdown>
      <Dropdown
        buttonContent={<LockSvg />}
        withoutArrow
        menuPosition="bottom-end"
        view="danger"
        menuWidth="auto"
      >
        {defaultSet}
      </Dropdown>
    </>
  );
};

const getMarginBottomDecorator = (marginBottom: number | string) => (StoryComponent: Story) =>
  (
    <div style={{ marginBottom }}>
      <StoryComponent />
    </div>
  );

const getLayoutDecorator = () => (StoryComponent: Story) =>
  (
    <div className={styles.layout}>
      <StoryComponent />
    </div>
  );

Preview.decorators = [getLayoutDecorator(), getMarginBottomDecorator(140)];

export const Labeled = () => {
  return (
    <>
      <Dropdown menuWidth="auto" label="Название сверху" buttonContent="Дропдаун">
        {defaultSet}
      </Dropdown>
      <Dropdown menuWidth="auto" label="Название сбоку" buttonContent="Дропдаун" direction="row">
        {defaultSet}
      </Dropdown>
    </>
  );
};

Labeled.decorators = [getLayoutDecorator(), getMarginBottomDecorator(140)];

export const LongLabelOption = () => {
  return (
    <Dropdown
      buttonContent={
        <>
          <SettingsSvg />
          <span>Вариант выбора с длинным текстом</span>
        </>
      }
    >
      {DROPDOWN_ELEMENTS.DropdownItem1}
      {DROPDOWN_ELEMENTS.DropdownItem2}
      {DROPDOWN_ELEMENTS.DropdownItem3}
    </Dropdown>
  );
};

LongLabelOption.decorators = [getMarginBottomDecorator(120)];

export const LongList = () => {
  return (
    <Dropdown
      buttonContent={
        <>
          <ColumnsSvg />
          <span>Длинный список вариантов выбора</span>
        </>
      }
      view="light"
    >
      <Link1 />
      <Button1 />
      <Button2 />
      <Link2 />
      {DROPDOWN_ELEMENTS.DropdownItem3}
      <Link3 />
      {DROPDOWN_ELEMENTS.DropdownItem1}
      {DROPDOWN_ELEMENTS.DropdownItem2}
      {DROPDOWN_ELEMENTS.DropdownItem3}
      <Link1 />
      <Button1 />
      <Button2 />
      <Link2 />
      {DROPDOWN_ELEMENTS.DropdownItem3}
      <Link3 />
      {DROPDOWN_ELEMENTS.DropdownItem1}
      {DROPDOWN_ELEMENTS.DropdownItem2}
    </Dropdown>
  );
};

LongList.decorators = [getMarginBottomDecorator(300)];

export const IconPosition = () => {
  return (
    <>
      <Dropdown
        menuWidth="auto"
        buttonContent={
          <>
            <span>Иконка справа</span>
            <SettingsSvg />
          </>
        }
      >
        {defaultSet}
      </Dropdown>
      <Dropdown
        menuWidth="auto"
        buttonContent={
          <>
            <SettingsSvg />
            <span>Иконка слева</span>
          </>
        }
      >
        {defaultSet}
      </Dropdown>
    </>
  );
};

IconPosition.decorators = [getLayoutDecorator(), getMarginBottomDecorator(140)];

export const IconArrow = () => {
  return (
    <Dropdown buttonContent="Дропдаун без стрелки" view="secondary" withoutArrow>
      {defaultSet}
    </Dropdown>
  );
};

IconArrow.decorators = [getMarginBottomDecorator(140)];

export const MenuWidth = () => {
  return (
    <Dropdown
      buttonContent="Ширина 200"
      view="light"
      menuWidth={200}
      label="Ширина блока с компонентом"
    >
      {defaultSet}
    </Dropdown>
  );
};

MenuWidth.decorators = [getMarginBottomDecorator(140)];

export const WithRouterDomLink = () => {
  const CustomLinkComponent = ({
    children,
    waybillCode,
    ...props
  }: CustomLinkComponentProps): JSX.Element => {
    return (
      <Link to={`/${waybillCode}`} {...props} as={RouterLink}>
        {children || waybillCode}
      </Link>
    );
  };

  return (
    <MemoryRouter>
      <Dropdown
        buttonContent={'Внутри роутинг через <Link to="#" />'}
        label="С использованием react-router-dom"
        direction="row"
      >
        <DropdownItem as={RouterLink} to="/">
          Ссылка на /
        </DropdownItem>
        <DropdownItem as={RouterLink} to="/page">
          Ссылка на /page
        </DropdownItem>
        <DropdownItem as={CustomLinkComponent} waybillCode="customLink">
          Пример кастомного компонента ссылки с нестандартными пропсами
        </DropdownItem>
      </Dropdown>
    </MemoryRouter>
  );
};

export const SomeItemsDisabled = () => (
  <MemoryRouter>
    <Dropdown buttonContent="Дропдаун с неактивными элементами">
      <DropdownItem disabled>Я не активен и по мне не кликнуть</DropdownItem>
      <DropdownItem>А я обычный элемент</DropdownItem>
    </Dropdown>
  </MemoryRouter>
);

WithRouterDomLink.decorators = [getMarginBottomDecorator(80)];
