import React, { useState } from 'react';
import { withDesign } from 'storybook-addon-designs';
import { action } from '@storybook/addon-actions';
import type { Story, Meta } from '@storybook/react/types-6-0';
import { MemoryRouter, Link } from 'react-router-dom';
import { upperCase } from 'lodash-es';
import { Button } from '..';
import type { ButtonView, ButtonProps } from '..';
import SettingsIcon, { ReactComponent as SettingsSvg } from './assets/settings.svg';
import ContentCopyIcon, { ReactComponent as ContentCopySvg } from './assets/content-copy.svg';
import { ReactComponent as PencilSvg } from './assets/pencil.svg';
import { ReactComponent as ExcelSvg } from './assets/excel.svg';
import { buttonArgTypes } from './argTypes';

const figmaUrl =
  'https://www.figma.com/file/LeE5a4P9cTFQL9HIsFUtAv/UTKONOS-UI-kit?node-id=4458%3A1';

export default {
  title: 'Controls/Button',
  component: Button,
  argTypes: buttonArgTypes,
  decorators: [withDesign],
  parameters: {
    figmaUrl,
  },
} as Meta;

const SVG_COMPONENTS = {
  SettingsSvg,
  ContentCopySvg,
  PencilSvg,
  ExcelSvg,
};

export const Playground: Story<
  ButtonProps & {
    text: string;
    icon: keyof typeof SVG_COMPONENTS | 'none';
    iconPosition: 'start' | 'end' | 'only';
  }
> = ({ text, icon, iconPosition, ...args }) => {
  if (icon === 'none') {
    return <Button {...args}>{text}</Button>;
  }
  const SvgComponent = SVG_COMPONENTS[icon];
  SvgComponent.toString = () => icon;
  if (iconPosition === 'start') {
    return (
      <Button {...args}>
        <SvgComponent />
        <span>{text}</span>
      </Button>
    );
  }
  if (iconPosition === 'end') {
    return (
      <Button {...args}>
        <span>{text}</span>
        <SvgComponent />
      </Button>
    );
  }
  return (
    <Button title={text} {...args}>
      <SvgComponent />
    </Button>
  );
};

Playground.args = {
  type: undefined,
  view: undefined,
  text: 'Скопировать',
  icon: 'ContentCopySvg',
  iconPosition: 'start',
};

Playground.parameters = {
  design: {
    type: 'figma',
    url: figmaUrl,
  },
};

export const Preview = () => {
  const [viewList] = useState<ButtonView[]>([
    'secondary',
    'light',
    'link',
    'danger',
    'dangerSecondary',
    'dangerLight',
    'dangerLink',
    'dangerLinkInline',
    'linkInline',
  ]);
  return (
    <div className="sb-col">
      <span className="sb-label">primary (default)</span>
      <div className="sb-row">
        <Button onClick={action('clicked')}>Кнопка</Button>
        <Button>
          <SettingsSvg />
          <span>Кнопка</span>
        </Button>
        <Button>
          <span>Кнопка</span>
          <ContentCopySvg />
        </Button>
        <Button title="Описание">
          <PencilSvg width="17" height="17" />
        </Button>
        <Button square title="Описание">
          <ExcelSvg width="18" height="22" />
        </Button>
        <Button disabled>Кнопка</Button>
        <Button loading>Кнопка</Button>
      </div>
      <div className="sb-row">
        <Button small>Кнопочка</Button>
        <Button small disabled>
          Кнопочка
        </Button>
        <Button small loading>
          Кнопочка
        </Button>
        <Button small title="Описание">
          <PencilSvg width="14" height="14" />
        </Button>
        <Button small square title="Описание">
          <ExcelSvg width="14" height="18" />
        </Button>
        <Button small square title="Описание">
          +
        </Button>
      </div>
      {viewList.map((view) => (
        <>
          <span className="sb-label">{upperCase(view)}</span>
          <div className="sb-row">
            <Button view={view} onClick={action('clicked')}>
              Кнопка
            </Button>
            <Button view={view}>
              <SettingsSvg />
              <span>Кнопка</span>
            </Button>
            <Button view={view}>
              <span>Кнопка</span>
              <ContentCopySvg />
            </Button>
            <Button view={view} title="Описание">
              <PencilSvg width="17" height="17" />
            </Button>
            <Button view={view} square title="Описание">
              <ExcelSvg width="18" height="22" />
            </Button>
            <Button view={view} disabled>
              Кнопка
            </Button>
            <Button view={view} loading>
              Кнопка
            </Button>
          </div>
          <div className="sb-row">
            <Button view={view} small>
              Кнопочка
            </Button>
            <Button view={view} small disabled>
              Кнопочка
            </Button>
            <Button view={view} small loading>
              Кнопочка
            </Button>
            <Button view={view} small title="Описание">
              <PencilSvg width="14" height="14" />
            </Button>
            <Button view={view} small square title="Описание">
              <ExcelSvg width="14" height="18" />
            </Button>
            <Button view={view} small square title="Описание">
              +
            </Button>
          </div>
        </>
      ))}
    </div>
  );
};

export const ViewProp = () => (
  <div className="sb-row">
    <Button>primary</Button>
    <Button view="secondary">secondary</Button>
  </div>
);

export const SmallProp = () => (
  <div className="sb-row">
    <Button small>Уменьшенная</Button>
    <Button>Обычная</Button>
  </div>
);

export const DisabledProp = () => <Button disabled>Кнопка</Button>;

export const LoadingProp = () => <Button loading>Кнопка</Button>;

export const AsProp = () => (
  <div className="sb-row">
    <Button>{`as <button>`}</Button>
    <Button as="a">{`as <a>`}</Button>
    <Button as="span">{`as <span>`}</Button>
  </div>
);

export const ReactRouterDom = () => (
  <MemoryRouter>
    <Button as={Link} to="/">
      {'react-router-dom <Link>'}
    </Button>
  </MemoryRouter>
);

export const ReactComponentIcon = () => (
  <Button>
    <SettingsSvg />
    <span>Настройки</span>
  </Button>
);

export const ImgIcon = () => (
  <Button>
    <img src={SettingsIcon} alt="Настройки" />
    <span>Иконка в теге img</span>
  </Button>
);

export const PictureIcon = () => (
  <Button>
    <span>Иконка в теге picture</span>
    <picture>
      <source media="(min-width:650px)" srcSet={ContentCopyIcon} />
      <img src={SettingsIcon} alt="Иконка" />
    </picture>
  </Button>
);

export const ButtonType = () => {
  const handleSubmit: JSX.IntrinsicElements['form']['onSubmit'] = (event) => {
    event.preventDefault();
    action('submited');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button type="submit">Submit</Button>
    </form>
  );
};
