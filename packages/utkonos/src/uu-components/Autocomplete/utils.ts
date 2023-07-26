import type { Dispatch, SetStateAction } from 'react';
import type {
  AutocompleteOption,
  BaseAutocompleteProps,
  ControlledAutocompleteProps,
} from './types';

export const sliceOptions = (
  options: AutocompleteOption[],
  optionsCount?: number,
): AutocompleteOption[] => (optionsCount ? options.slice(0, optionsCount) : options);

export const fallbackFormatOptionLabel: NonNullable<BaseAutocompleteProps['formatOptionLabel']> = ({
  option,
}) => option.label || String(option.value);

export const fallbackFilterOption: NonNullable<BaseAutocompleteProps['filterOption']> = (
  filterText,
) => {
  const search = filterText.toLowerCase();
  return (option: AutocompleteOption): boolean =>
    (option.label || String(option.value)).toLowerCase().includes(search);
};

export const fallbackFormatInputValue = (item: AutocompleteOption | null) => {
  if (item?.label) {
    return item.label;
  }
  if (item?.value) {
    return String(item.value);
  }

  return '';
};

export const fallbackOnInputValueChange =
  (
    options: AutocompleteOption[],
    value: AutocompleteOption['value'],
    selectedItem: AutocompleteOption | null,
    setSelectedValue: Dispatch<SetStateAction<AutocompleteOption['value']>>,
    onChange: BaseAutocompleteProps['onChange'],
    id: string,
    name?: string,
  ) =>
  (nextInputValue: AutocompleteOption['value']) => {
    if (value === undefined && selectedItem?.label !== nextInputValue && selectedItem) {
      setSelectedValue(null);
      onChange?.({
        target: {
          id,
          name,
          value: null,
        },
        selectedItem: null,
      });
    }
  };

export const fallbackSelectOption =
  (value?: AutocompleteOption['value'], selectedValue?: AutocompleteOption['value']) =>
  (option: AutocompleteOption) => {
    if (value !== undefined) {
      // is controlled mode
      return option.value === value;
    }
    return option.value === selectedValue;
  };

export const isControlledPredicate = (
  props: BaseAutocompleteProps,
): props is ControlledAutocompleteProps =>
  (props as ControlledAutocompleteProps).value !== undefined;
