import { useState } from 'react';
import { withDesign } from 'storybook-addon-designs';
import { action } from '@storybook/addon-actions';
import type { Story, Meta } from '@storybook/react/types-6-0';
import { upperCase } from 'lodash-es';
import { CopyButton } from '..';
import type { ButtonView } from '../../Button';
import type { CopyButtonProps } from '..';
import { buttonArgTypes } from './argTypes';

const figmaUrl =
  'https://www.figma.com/file/LeE5a4P9cTFQL9HIsFUtAv/UTKONOS-%D0%92%D0%9F%D0%9A-UI-kit?node-id=4618%3A207';

export default {
  title: 'Controls/CopyButton',
  component: CopyButton,
  argTypes: buttonArgTypes,
  decorators: [withDesign],
  parameters: {
    figmaUrl,
  },
} as Meta;

export const Playground: Story<
  CopyButtonProps & {
    text: string;
  }
> = ({ text, square = false, ...args }) => {
  return (
    <CopyButton square={square} {...args}>
      {text}
    </CopyButton>
  );
};

Playground.args = {
  onClick: () => alert('Текст скопирован в буфер обмена!'),
  small: true,
  square: true,
  type: 'button',
  value: 'Копируемый текст',
  view: 'light',
};

Playground.parameters = {
  design: {
    type: 'figma',
    url: figmaUrl,
  },
};

export const Preview = () => {
  const [viewList] = useState<ButtonView[]>([
    'primary',
    'secondary',
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
      <span className="sb-label">Default (light button)</span>
      <div className="sb-row">
        <CopyButton value="Текст для копирования" />
        <CopyButton value="Текст для копирования" disabled />
        <CopyButton value="Текст для копирования" loading />
        <CopyButton value="Текст для копирования" square={false}>
          С текстом
        </CopyButton>
      </div>
      <div className="sb-row">
        <CopyButton value="Текст для копирования" small />
        <CopyButton value="Текст для копирования" small disabled />
        <CopyButton value="Текст для копирования" small loading />
        <CopyButton value="Текст для копирования" small square={false}>
          С текстом
        </CopyButton>
      </div>
      {viewList.map((view) => (
        <>
          <span className="sb-label">{upperCase(view)}</span>
          <div className="sb-row">
            <CopyButton value="Текст для копирования" view={view} />
            <CopyButton value="Текст для копирования" view={view} disabled />
            <CopyButton value="Текст для копирования" view={view} loading />
            <CopyButton value="Текст для копирования" view={view} square={false}>
              С текстом
            </CopyButton>
          </div>
          <div className="sb-row">
            <CopyButton value="Текст для копирования" view={view} small />
            <CopyButton value="Текст для копирования" view={view} small disabled />
            <CopyButton value="Текст для копирования" view={view} small loading />
            <CopyButton value="Текст для копирования" view={view} small square={false}>
              С текстом
            </CopyButton>
          </div>
        </>
      ))}
    </div>
  );
};

export const ViewProp = () => (
  <div className="sb-row">
    <CopyButton value="Текст для копирования" square={false}>
      light (default)
    </CopyButton>
    <CopyButton value="Текст для копирования" square={false} view="primary">
      primary
    </CopyButton>
    <CopyButton value="Текст для копирования" square={false} view="secondary">
      secondary
    </CopyButton>
    <CopyButton value="Текст для копирования" square={false} view="link">
      link
    </CopyButton>
    <CopyButton value="Текст для копирования" square={false} view="danger">
      danger
    </CopyButton>
    <CopyButton value="Текст для копирования" square={false} view="dangerSecondary">
      dangerSecondary
    </CopyButton>
    <CopyButton value="Текст для копирования" square={false} view="dangerLight">
      dangerLight
    </CopyButton>
    <CopyButton value="Текст для копирования" square={false} view="dangerLink">
      dangerLink
    </CopyButton>
    <CopyButton value="Текст для копирования" square={false} view="dangerLinkInline">
      dangerLinkInline
    </CopyButton>
    <CopyButton value="Текст для копирования" square={false} view="linkInline">
      linkInline
    </CopyButton>
  </div>
);

export const SmallProp = () => (
  <div className="sb-row">
    <CopyButton title="Уменьшенная" value="Текст для копирования" small />
    <CopyButton title="Обычная" value="Текст для копирования" />
  </div>
);

export const DisabledProp = () => <CopyButton value="Текст для копирования" disabled />;

export const LoadingProp = () => <CopyButton value="Текст для копирования" loading />;

export const AsProp = () => (
  <div className="sb-row">
    <CopyButton value="Текст для копирования" square={false}>{`as <CopyButton>`}</CopyButton>
    <CopyButton value="Текст для копирования" square={false} as="a">{`as <a>`}</CopyButton>
    <CopyButton value="Текст для копирования" square={false} as="span">{`as <span>`}</CopyButton>
  </div>
);

export const ButtonType = () => {
  const handleSubmit: JSX.IntrinsicElements['form']['onSubmit'] = (event) => {
    event.preventDefault();
    action('submited');
  };

  return (
    <form onSubmit={handleSubmit}>
      <CopyButton value="Текст для копирования" square={false} type="submit">
        Submit
      </CopyButton>
    </form>
  );
};
