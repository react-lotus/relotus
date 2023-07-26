import React, { useContext } from 'react';
import { Figma } from 'storybook-addon-designs/blocks';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
  DocsContext,
} from '@storybook/addon-docs';

export const DocPage = () => {
  const context = useContext(DocsContext);
  const { figmaUrl } = context.parameters;

  return (
    <>
      <Title />
      <Subtitle />
      <Description />
      <Primary />
      <ArgsTable story={PRIMARY_STORY} />
      {figmaUrl && <Figma placeholder="Relotus UI" url={figmaUrl} />}
      <Stories />
    </>
  );
};
