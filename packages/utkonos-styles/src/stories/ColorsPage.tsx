// eslint-disable-next-line import/no-extraneous-dependencies
import { ColorPalette, ColorItem } from '@storybook/addon-docs';
import '../colors.css';

const reduceRootCSSVariables = (def: string[], rule: CSSRule) => {
  return rule instanceof CSSStyleRule && rule.selectorText === ':root'
    ? [
        ...def,
        ...Array.from(rule.style).filter(
          (name: string) => name.startsWith('--') && !name.startsWith('--uu'),
        ),
      ]
    : def;
};

export const ColorsPage = () => {
  const colors = Array.from(document.styleSheets)
    .filter(
      (sheet: CSSStyleSheet) =>
        sheet.href === null || sheet.href.startsWith(window.location.origin),
    )
    .reduce(
      (acc, sheet: CSSStyleSheet) =>
        [
          ...acc,
          ...Array.from(sheet.cssRules).reduce(reduceRootCSSVariables, [] as Array<string>),
        ] as string[],
      [] as Array<string>,
    )
    .reduce((acc, curr) => {
      if (!acc.includes(curr)) {
        return [...acc, curr];
      }
      return acc;
    }, [] as string[]);

  return (
    <ColorPalette>
      {colors.map((item) => (
        <ColorItem
          title={item}
          subtitle={''}
          key={item}
          colors={{
            '': `var(${item})`,
          }}
        />
      ))}
    </ColorPalette>
  );
};
