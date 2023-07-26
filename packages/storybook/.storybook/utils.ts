import { hosts } from './constants';
import type { AllStorybookRefs } from './types';

export const { devRefs, prodRefs } = hosts.reduce<AllStorybookRefs>(
  (acc, { name, port }) => {
    const title = `@relotus/${name}`;

    acc.devRefs[name] = {
      title,
      url: `http://localhost:${port}`,
    };

    acc.prodRefs[name] = {
      title,
      url: `../${name}`,
    };

    return acc;
  },
  { devRefs: {}, prodRefs: {} },
);
