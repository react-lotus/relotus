import type { ReactNode, CSSProperties } from 'react';
import type { UseComboboxProps } from 'downshift';
import type { LabeledCoreProps } from '../Labeled';
import type { SelectMenuProps } from '../_select';
import type { InputErrorProps } from '../_InputError';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface AutocompleteOption extends Record<string, any> {
  /** Значение варианта выбора */
  value: JSX.IntrinsicElements['input']['value'] | null;
  /** Возможное отображаемое значение варианта выбора */
  label?: string;
}

type DivElement = Omit<JSX.IntrinsicElements['div'], 'onChange' | 'defaultValue'>;

export interface BaseAutocompleteProps
  extends SelectMenuProps,
    LabeledCoreProps,
    InputErrorProps,
    DivElement {
  /** Варианты выбора */
  options: AutocompleteOption[];

  /** Callback изменения выбранного значения */
  onChange?: (event: {
    target: {
      id: string;
      value: AutocompleteOption['value'];
      name?: string;
    };
    selectedItem?: AutocompleteOption | null;
  }) => void;

  /** Callback изменения input value */
  onInputValueChange?: (inputValue: string | undefined) => void;
  /** Алгоритм по которому выбирается значение */
  selectOption?: (option: AutocompleteOption) => boolean;

  /**
   * Форматированный вывод вариантов выбора
   *
   * @default ({ option }) => option.label || String(option.value)
   */
  formatOptionLabel?: (data: {
    option: AutocompleteOption;
    selectedOption: AutocompleteOption | null;
  }) => ReactNode;

  /**
   * Форматированный вывод в input
   *
   * @default (item: AutocompleteOption | null) => {
   *    if (item?.label) {
   *      return item.label;
   *    }
   *    if (item?.value) {
   *      return String(item.value);
   *    }
   *
   *    return '';
   *  }
   */
  formatInputValue?: (item: AutocompleteOption | null) => string;

  /** Дополнительный класс */
  className?: string;

  /**
   * Метод фильтрации вариантов выбора в меню
   *
   *  @default (filterText) => {
   *    const search = filterText.toLowerCase();
   *    return (option: AutocompleteOption): boolean => option.label.toLowerCase().includes(search);
   *  };
   */
  filterOption?: (filterText: string) => Parameters<BaseAutocompleteProps['options']['filter']>[0];

  /**
   * Вместо значения
   *
   * @default 'Поиск'
   */
  placeholder?: string;

  /**
   * Неактивное состояние
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * Уникальный id
   *
   * Необходим для связки заголовка и поля ввода
   *
   * @default nanoid()
   */
  id?: string;

  /** Наименование параметра данных */
  name?: string;

  /** Дополнительные стили */
  style?: CSSProperties;

  /**
   * Визуальное ограничение кол-ва options
   */
  optionsCount?: number;

  /**
   * Суффикс для автокомплита
   */
  suffix?: ReactNode;

  /**
   * Открыт ли автокомплит в данный момент
   */
  isOpen?: boolean;

  /**
   * Обработчик изменения состояния isOpen
   */
  onIsOpenChange?: UseComboboxProps<AutocompleteOption>['onIsOpenChange'];

  /**
   * aria-label, метка для элемента
   */
  ariaLabel?: string;
}

export interface ControlledAutocompleteProps extends BaseAutocompleteProps {
  /** Текущее выбранное значение */
  value?: AutocompleteOption['value'];
}

export interface UncontrolledAutocompleteProps extends BaseAutocompleteProps {
  /** Значение по умолчанию */
  defaultValue?: JSX.IntrinsicElements['input']['value'];
}

export type AutocompleteProps = ControlledAutocompleteProps | UncontrolledAutocompleteProps;

export default {};
