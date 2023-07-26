import { useRef, useMemo, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import type { ReactNode, CSSProperties, ForwardedRef } from 'react';
import cn from 'classnames';
import { nanoid } from 'nanoid';
import { useCombobox } from 'downshift';
import { Labeled } from '../Labeled';
import type { LabeledCoreProps } from '../Labeled';
import {
  fallbackFormatOptionLabel,
  fallbackFormatGroupLabel,
  fallbackFilterOption,
  sliceOptions,
} from '../_option';
import type {
  OptionProps,
  Option,
  OptionValue,
  OptionAnyRecord,
  SelectFilterOption,
} from '../_option';
import { ArrowIcon, SelectMenu, SelectMenuItems } from '../_select';
import type { SelectProps } from '../_select';
import type { InputErrorProps } from '../_InputError';
import { InputError } from '../_InputError';
import { FieldAddon } from '../FieldAddon';

import './index.scss';

import { ReactComponent as SearchSvg } from './assets/search.svg';

export type SingleSelectOption = Option;

type ButtonElement = Omit<
  JSX.IntrinsicElements['button'],
  'value' | 'onChange' | 'placeholder' | 'type' | 'ref'
>;

export interface SingleSelectProps<T extends OptionValue = OptionValue, R = OptionAnyRecord>
  extends OptionProps<T, R>,
    SelectProps,
    LabeledCoreProps,
    InputErrorProps,
    ButtonElement {
  /** Callback изменения выбранного значения */
  onChange?: (event: {
    target: {
      id: string;
      name?: string;
      value: Option<T>['value'];
    };
  }) => void;
  /** Callback изменения выбранного значения */
  onValueChange?: (value: Option<T>['value']) => void;

  /** Текущее выбранное значение */
  value?: Option<T>['value'] | null;

  /** Дополнительный класс */
  className?: string;

  /**
   * Признак возможности фильтрации вариантов выбора
   *
   * @default false
   */
  filterable?: boolean;

  /**
   * Метод фильтрации вариантов выбора в меню
   *
   *  @default (filterText) => {
   *    const search = filterText.toLowerCase();
   *    return (option: Option): boolean => option.label.toLowerCase().includes(search);
   *  };
   */
  filterOption?: SelectFilterOption<T, R>;

  /**
   * Вместо значения
   *
   * @default 'Выберите'
   */
  placeholder?: ReactNode;

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
   * Не отрисовывать границы
   *
   * @default false
   */
  noBorder?: boolean;

  /**
   * Визуальное ограничение кол-ва options
   */
  optionsCount?: number;

  /**
   * Обработчик изменения запроса фильтрации
   */
  onFilterChange?: (query: string) => void;

  /**
   * Функция фильтрации `options` в выпадающем меню
   *
   * Если не задано, то в меню будут показаны все `options`
   */
  isOptionShown?: Parameters<Array<Option<T, R>>['filter']>[0];

  /**
   * aria-label, метка для элемента
   */
  ariaLabel?: string;
}

/**
 * Компонент выбора из выпадающего списка
 */
export const SingleSelectWithoutRef = <T extends OptionValue = OptionValue, R = OptionAnyRecord>(
  props: SingleSelectProps<T, R>,
  ref: ForwardedRef<HTMLDivElement> | null,
): JSX.Element => {
  const [fallbackId] = useState(nanoid);

  const {
    value,
    options,
    className,
    onChange,
    onValueChange,
    filterable = false,
    filterOption = fallbackFilterOption,
    formatOptionLabel = fallbackFormatOptionLabel,
    formatGroupLabel = fallbackFormatGroupLabel,
    placeholder = 'Выберите',
    disabled = false,
    id = fallbackId,
    name,
    style,
    label,
    direction,
    toggleIcon = ArrowIcon,
    noBorder = false,
    optionsCount,
    onFilterChange,
    appendToBody = false,
    menuMaxHeight,
    menuWidth,
    menuPosition,
    error,
    errorPlacement,
    required,
    isOptionShown,
    hint,
    ariaLabel = name ?? (typeof label === 'string' ? label : undefined),
    ...rest
  } = props;
  const [filterValue, setFilterValue] = useState('');
  const isOptionsContainGroups = useMemo(() => options.some((item) => item.options), [options]);

  /**
   * items - начальный массив option, фильтрованный при необходимости
   * flattenedItems - плоский массив всех options, без фильтрации
   * flattenFiltredItems - плоский массив всех options, фильтрованный при необходимости
   */
  const { items, flattenedItems, flattenFiltredItems } = useMemo(() => {
    if (isOptionsContainGroups) {
      return options.reduce<{
        items: Option<T, R>[];
        flattenedItems: Option<T, R>[];
        flattenFiltredItems: Option<T, R>[];
      }>(
        (acc, currentOption) => {
          acc.flattenedItems.push(...(currentOption.options || []));
          const shownOptions =
            (isOptionShown
              ? currentOption.options?.filter(isOptionShown)
              : currentOption.options) || [];
          const slicedOptions =
            filterable && filterValue
              ? sliceOptions(shownOptions.filter(filterOption(filterValue)), optionsCount)
              : sliceOptions(shownOptions, optionsCount);
          acc.flattenFiltredItems.push(...slicedOptions);
          acc.items.push({ ...currentOption, options: slicedOptions });
          return acc;
        },
        { items: [], flattenedItems: [], flattenFiltredItems: [] },
      );
    }

    const shownOptions = isOptionShown ? options.filter(isOptionShown) : options;
    const slicedOptions =
      filterable && filterValue
        ? sliceOptions(shownOptions.filter(filterOption(filterValue)), optionsCount)
        : sliceOptions(shownOptions, optionsCount);
    return { items: slicedOptions, flattenFiltredItems: slicedOptions, flattenedItems: options };
  }, [
    options,
    optionsCount,
    filterable,
    filterValue,
    filterOption,
    isOptionShown,
    isOptionsContainGroups,
  ]);

  const selectedItem = useMemo(
    () => flattenedItems.find((option) => option.value === value) || null,
    [flattenedItems, value],
  );

  const [menuRef, setMenuRef] = useState<HTMLElement | null>();

  const rootRef = useRef<HTMLDivElement>(null);
  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(ref, () => rootRef.current);

  const filterInputId = useMemo(nanoid, []);
  const filterInputRef = useRef<HTMLInputElement | null>(null);

  const {
    isOpen,
    highlightedIndex,
    getItemProps,
    getMenuProps,
    getComboboxProps,
    getInputProps,
    getLabelProps,
    getToggleButtonProps,
  } = useCombobox<Option<T, R>>({
    items: flattenFiltredItems,
    selectedItem,
    inputId: filterInputId,
    toggleButtonId: id,
    inputValue: filterValue,
    itemToString: () => filterValue,
    onSelectedItemChange: (changes) => {
      const nextValue = changes.selectedItem?.value as T;
      onChange?.({
        target: {
          id,
          name,
          value: nextValue,
        },
      });

      onValueChange?.(nextValue);
    },
    onInputValueChange: ({ inputValue }) => {
      onFilterChange?.(inputValue ?? '');
      setFilterValue(inputValue ?? '');
    },
    stateReducer: (state, action) => {
      return {
        ...state,
        ...action.changes,
        inputValue: action.changes.isOpen ? action.changes.inputValue : '',
      };
    },
  });

  useEffect(() => {
    if (filterable && isOpen && filterInputRef.current) {
      filterInputRef.current.focus();
    }
  }, [isOpen, filterable]);

  const suffix = useMemo(() => {
    return typeof toggleIcon === 'function' ? toggleIcon({ isOpen, disabled }) : toggleIcon;
  }, [toggleIcon, isOpen, disabled]);

  return (
    <Labeled
      className={className}
      id={id}
      label={label}
      direction={direction}
      required={required}
      hint={hint}
    >
      <div
        className={cn('uu-singleSelect')}
        {...getComboboxProps({ ref: rootRef, style })}
        aria-label={ariaLabel}
        aria-autocomplete={filterable ? 'list' : 'none'}
        aria-disabled={disabled}
        tabIndex={-1}
      >
        <button
          type="button"
          className={cn('uu-singleSelectInput', {
            'uu-singleSelectInput_noBorder': noBorder,
            'uu-singleSelectInput_disabled': disabled,
            'uu-singleSelectInput_error': !!error,
          })}
          {...getToggleButtonProps({ disabled, name })}
          {...rest}
        >
          <span
            className={cn('uu-singleSelectInputText', {
              'uu-singleSelectInputText_placeholder': selectedItem === null,
            })}
          >
            {selectedItem !== null && (
              <span>
                {formatOptionLabel({
                  option: selectedItem,
                  selectedOption: selectedItem,
                })}
              </span>
            )}
            {selectedItem === null && !disabled && <span>{placeholder}</span>}
            {selectedItem === null && disabled && <span>Не выбрано</span>}
          </span>
          <FieldAddon disabled={disabled} suffix={!disabled && suffix}>
            <InputError
              className="uu-singleSelectErrorTooltip"
              error={error}
              errorPlacement={errorPlacement}
            />
          </FieldAddon>
        </button>
        <SelectMenu
          appendToBody={appendToBody}
          target={rootRef.current}
          isOpen={isOpen}
          menuMaxHeight={menuMaxHeight}
          menuWidth={menuWidth}
          menuPosition={menuPosition}
          className="uu-singleSelectMenu"
          menuRef={menuRef}
          {...getMenuProps({ ref: setMenuRef })}
          aria-multiselectable="false"
        >
          <label
            htmlFor={filterInputId}
            role="search"
            className={cn('uu-singleSelectFilter', {
              'uu-singleSelectFilter_hidden': !filterable,
              'uu-singleSelectFilter_placeholder': !filterValue,
            })}
            {...getLabelProps()}
          >
            <SearchSvg className="uu-singleSelectFilterIcon" />
            <input
              className="uu-singleSelectFilterInput"
              {...getInputProps({
                disabled: disabled || !filterable || !isOpen,
                ref: filterInputRef,
              })}
              placeholder="Поиск"
              aria-label={`${ariaLabel ?? ''}Search`}
            />
          </label>
          {isOpen && (
            <SelectMenuItems<T, R>
              options={items}
              filterable={filterable && !isOptionsContainGroups}
              formatGroupLabel={formatGroupLabel}
            >
              {(option, index) => (
                <li
                  key={String(option.value)}
                  className={cn('uu-singleSelectOption', {
                    'uu-singleSelectOption_selected': option === selectedItem,
                    'uu-singleSelectOption_highlighted': index === highlightedIndex,
                  })}
                  {...getItemProps({
                    item: option,
                    index,
                  })}
                  role="option"
                  aria-selected={option === selectedItem}
                >
                  {formatOptionLabel({ option, selectedOption: selectedItem })}
                </li>
              )}
            </SelectMenuItems>
          )}
        </SelectMenu>
      </div>
    </Labeled>
  );
};

/**
 * Компонент выбора из выпадающего списка
 */
export const SingleSelect = forwardRef<HTMLDivElement, SingleSelectProps>(
  SingleSelectWithoutRef,
) as <T extends OptionValue = OptionValue, R = OptionAnyRecord>(
  props: SingleSelectProps<T, R> & { ref?: ForwardedRef<HTMLDivElement> | null },
) => JSX.Element;
