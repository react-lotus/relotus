import type { StorybookConfig } from '@storybook/core-common';

type StorybookRefs = Extract<Required<StorybookConfig>['refs'], Record<string, unknown>>;

export type AllStorybookRefs = Record<'prodRefs' | 'devRefs', StorybookRefs>;

export interface Host {
  name: string;
  port: number;
}
