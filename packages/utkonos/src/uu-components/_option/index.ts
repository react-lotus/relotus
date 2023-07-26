import type { ReactNode } from 'react';

export type OptionValue = JSX.IntrinsicElements['input']['value'];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OptionAnyRecord = Record<string, any>;

export type Option<T extends OptionValue = OptionValue, R = OptionAnyRecord> = {
  value: T;
  label?: string;
  options?: Option<T, R>[];
} & R;

export type OptionFormatLabel<T extends OptionValue = OptionValue, R = OptionAnyRecord> = (data: {
  option: Option<T, R>;
  selectedOption: Option<T, R> | null;
}) => ReactNode;

export type FormatGroupLabel<T extends OptionValue = OptionValue, R = OptionAnyRecord> = (data: {
  option: Option<T, R>;
}) => ReactNode;

export type SelectFilterOption<T extends OptionValue = OptionValue, R = OptionAnyRecord> = (
  filterText: string,
) => Parameters<Option<T, R>[]['filter']>[0];

export interface OptionProps<T extends OptionValue = OptionValue, R = OptionAnyRecord> {
  /** Варианты выбора */
  options: Option<T, R>[];

  /**
   * Форматированный вывод вариантов выбора
   *
   * @default ({ option }) => option.label || String(option.value)
   */
  formatOptionLabel?: OptionFormatLabel<T, R>;

  /**
   * Форматированный вывод заголовка группы options
   *
   * @default ({ option }) => option.label || String(option.value)
   */
  formatGroupLabel?: FormatGroupLabel<T, R>;
}

export const fallbackFormatOptionLabel: OptionFormatLabel = ({ option }) =>
  option.label || String(option.value);

export const fallbackFormatGroupLabel: FormatGroupLabel = ({ option }) => option.label;

export const fallbackFilterOption: SelectFilterOption = (filterText) => {
  const search = filterText.toLowerCase();
  return (option) => (option.label || String(option.value)).toLowerCase().includes(search);
};

export const sliceOptions = <T extends OptionValue = OptionValue, R = OptionAnyRecord>(
  options: Option<T, R>[],
  optionsCount?: number,
): Option<T, R>[] => (optionsCount ? options.slice(0, optionsCount) : options);

export default {};
