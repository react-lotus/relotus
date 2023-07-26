export const TagInputSplittersRegExp: Record<'ALL_SPLITTERS' | 'WITHOUT_SPACE', RegExp> = {
  ALL_SPLITTERS: /[.,;\n\s]+/,
  WITHOUT_SPACE: /[.,;]+/,
};

export const EXCLUDE_PATTERN = new RegExp(TagInputSplittersRegExp.ALL_SPLITTERS, 'g');
