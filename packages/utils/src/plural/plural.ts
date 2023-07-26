const pluralRule = new Intl.PluralRules('ru-RU');

const templateIndexes: Record<Intl.LDMLPluralRule, 0 | 1 | 2> = {
  zero: 2,
  one: 0,
  two: 1,
  few: 1,
  many: 2,
  other: 2,
};

type PluralTemplate = string | ((n: number) => string);

/**
 * Склонение существительных после числительных
 */
export const plural = (one: PluralTemplate, few: PluralTemplate, many: PluralTemplate) => {
  const templates = [one, few, many].map((template) =>
    typeof template === 'string' ? (n: number) => `${n} ${template}` : template,
  );
  return (n: number): string => {
    const index = templateIndexes[pluralRule.select(n)];
    return templates[index](n);
  };
};
