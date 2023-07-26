import {
  useMemo,
  useCallback,
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import type { ForwardedRef } from 'react';
import { nanoid } from 'nanoid';
import cn from 'classnames';
import { useCombobox, UseComboboxStateChange } from 'downshift';

import { MultiValue } from './MultiValue';
import type { MultiValueProps } from './MultiValue';
import { MenuItem } from './MenuItem';
import { ReactComponent as SearchSvg } from './assets/search.svg';
import { Labeled } from '../Labeled';
import type { LabeledCoreProps } from '../Labeled';
import './index.scss';
import { ArrowIcon, SelectMenu, SelectOptionsWrapper } from '../_select';
import { fallbackFormatOptionLabel, fallbackFilterOption, sliceOptions } from '../_option';
import type {
  Option,
  OptionValue,
  OptionAnyRecord,
  OptionProps,
  SelectFilterOption,
} from '../_option';
import type { SelectProps } from '../_select';
import type { InputErrorProps } from '../_InputError';
import { InputError } from '../_InputError';
import { FieldAddon } from '../FieldAddon';

export type MultiSelectOption = Option;

export type MultiSelectFilterValueClearBy =
  | 'unmount' // Очищение при Unmount всего MultiSelect
  | 'closeMenu' // Очищение при закрытии Меню MultiSelect
  | 'select' // Очищение при выборе одного из элементов
  | 'multi'; // Очищение при закрытии Меню или при выборе одного из элементов

export interface MultiSelectProps<T extends OptionValue = OptionValue, R = OptionAnyRecord>
  extends OptionProps<T, R>,
    SelectProps,
    LabeledCoreProps,
    InputErrorProps {
  /** Функция вызываемая во время события change */
  onChange: (value: Option<T, R>[]) => void;

  /** массив выбранных элементов */
  value: Option<T, R>[];

  /** Функция фильтрации массива опций для настройки должна ли опция отображаться в меню */
  filterOption?: SelectFilterOption<T, R>;

  /**
   * Признак возможности фильтрации вариантов выбора
   *
   * @default false
   */
  filterable?: boolean;

  /**
   * Очищение поля фильтрации
   *
   * @values
   *
   * `unmount` | `closeMenu` | `select` | `multi`
   *
   * @default 'closeMenu'
   */

  clearFilter?: MultiSelectFilterValueClearBy;

  /** Имя класса для враппера */
  className?: string;

  /**
   * Закрывать меню сразу после выбора элемента
   *
   * @default false
   */
  closeMenuOnSelect?: boolean;

  /**
   * Начальное состояние меню
   *
   * @default false
   */
  menuIsOpen?: boolean;

  /** Заблокирован?
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * Уникальный id поля ввода
   *
   * @default nanoid()
   */
  id?: string;

  /** Наименование параметра данных */
  name?: string;

  /**
   * placeholder
   *
   * @default 'Не выбрано'
   */
  placeholder?: string;

  /**
   * Однострочный режим
   */
  singleLine?: boolean;

  /**
   * Визуальное ограничение кол-ва options
   */
  optionsCount?: number;

  /**
   * Показывать только кнопку открытия/закрытия меню
   *
   * @default false
   */
  toggleOnly?: boolean;

  /**
   * Обработчик изменения запроса фильтрации
   */
  onFilterChange?: (query: string) => void;

  /**
   * aria-label, метка для элемента
   */
  ariaLabel?: string;
}

/**
 * Компонент для выпадающего списка с множественным выбором.
 */
export const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(
  <T extends OptionValue = OptionValue, R = OptionAnyRecord>(
    props: MultiSelectProps<T, R>,
    ref: ForwardedRef<HTMLDivElement>,
  ): JSX.Element => {
    const [fallbackId] = useState(nanoid);
    const {
      className,
      options,
      value,
      onChange,
      filterOption = fallbackFilterOption,
      closeMenuOnSelect = false,
      menuIsOpen = false,
      id = fallbackId,
      disabled = false,
      placeholder = 'Не выбрано',
      menuMaxHeight,
      menuWidth,
      menuPosition,
      formatOptionLabel = fallbackFormatOptionLabel,
      singleLine = false,
      name,
      label,
      direction,
      filterable = false,
      clearFilter = 'select',
      optionsCount,
      onFilterChange,
      toggleIcon: ToggleIcon = ArrowIcon,
      appendToBody = false,
      toggleOnly = false,
      error,
      errorPlacement,
      required,
      hint,
      ariaLabel = name ?? (typeof label === 'string' ? label : undefined),
    } = props;

    const rootRef = useRef<HTMLDivElement | null>(null);
    useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(ref, () => rootRef.current);

    const filterInputRef = useRef<HTMLInputElement | null>(null);

    /** Для сохранения состояния searchInput и избежания бага при выборе option */
    const [filterValue, setFilterValue] = useState('');
    const [menuRef, setMenuRef] = useState<HTMLElement | null>();

    const items = useMemo(() => {
      if (filterable && filterValue) {
        return sliceOptions(options.filter(filterOption(filterValue)), optionsCount);
      }
      return sliceOptions(options, optionsCount);
    }, [options, optionsCount, filterable, filterValue, filterOption]);

    const isClearByClose = clearFilter === 'closeMenu';
    const isClearBySelect = clearFilter === 'select';
    const isClearbyMulti = clearFilter === 'multi';

    /** Обработчик фильтрации */
    const onInputValueChange = useCallback(
      ({ inputValue }: Partial<UseComboboxStateChange<Option<T, R>>>) => {
        if (onFilterChange) onFilterChange(inputValue ?? '');
        setFilterValue(inputValue ?? '');
      },
      [onFilterChange],
    );

    /** Обработчик выбора элемента в меню */
    const handleSelectItem = useCallback(
      (selectedItem: Option<T, R>): void => {
        let newSelectedItems;
        const index = value.findIndex((item) => item.value === selectedItem.value);
        if (index === -1) {
          newSelectedItems = [...value, selectedItem];
        } else {
          newSelectedItems = [...value.slice(0, index), ...value.slice(index + 1)];
        }
        onChange(newSelectedItems);
        if (isClearBySelect || isClearbyMulti) onInputValueChange({ inputValue: '' });
      },
      [onChange, value, onInputValueChange, isClearBySelect, isClearbyMulti],
    );

    /** Обработчик нажатия кнопки закрыть для выбранного элемента */
    const handleCloseMultiValue = useCallback(
      (selectedItem: Option): MultiValueProps['onClose'] =>
        (event) => {
          event.stopPropagation();
          const newSelectedItems = value.filter((item) => item.value !== selectedItem.value);
          onChange(newSelectedItems);
        },
      [onChange, value],
    );

    const {
      isOpen,
      getToggleButtonProps,
      getMenuProps,
      getInputProps,
      getLabelProps,
      getComboboxProps,
      highlightedIndex,
      getItemProps,
      openMenu,
    } = useCombobox<Option<T, R>>({
      items,
      initialIsOpen: menuIsOpen,
      selectedItem: null,
      toggleButtonId: id,
      stateReducer: (state, actionAndChanges) => {
        const { changes, type } = actionAndChanges;
        switch (type) {
          case useCombobox.stateChangeTypes.InputKeyDownEnter:
          case useCombobox.stateChangeTypes.ItemClick:
            return {
              ...changes,
              /** оставляем строку выделенной после клика */
              highlightedIndex: state.highlightedIndex,
              /** закрывать меню после выбора */
              isOpen: !closeMenuOnSelect,
              /** для  сохранения значения input после выбора option */
              inputValue: filterValue,
            };
          case useCombobox.stateChangeTypes.ControlledPropUpdatedSelectedItem:
          case useCombobox.stateChangeTypes.InputBlur:
            return {
              ...changes,
              /** для  сохранения значения input после выбора option */
              inputValue: filterValue,
            };
          default:
            return { ...changes };
        }
      },
      onStateChange: ({ type, selectedItem }) => {
        switch (type) {
          case useCombobox.stateChangeTypes.InputKeyDownEnter:
          case useCombobox.stateChangeTypes.ItemClick:
            if (!selectedItem) {
              break;
            }
            handleSelectItem(selectedItem);
            break;
          default:
            break;
        }
      },
      onInputValueChange,
    });

    const handleClickCombobox = useCallback((): void => {
      if (!isOpen && !disabled) openMenu();
    }, [isOpen, openMenu, disabled]);

    const handleResetMenu = useCallback((): void => {
      onChange([]);
    }, [onChange]);

    useEffect(() => {
      if (filterable && isOpen && filterInputRef.current) {
        filterInputRef.current.focus();
      }
    }, [isOpen, filterable]);

    useEffect(() => {
      if (isOpen && (isClearByClose || isClearbyMulti)) {
        onInputValueChange({ inputValue: '' });
      }
    }, [onInputValueChange, isClearByClose, isClearbyMulti, isOpen]);

    const suffix = useMemo(() => {
      return ToggleIcon instanceof Function ? (
        <ToggleIcon isOpen={isOpen} disabled={disabled} />
      ) : (
        ToggleIcon
      );
    }, [ToggleIcon, isOpen, disabled]);

    const toggleButton = (
      <FieldAddon
        disabled={disabled}
        suffix={!disabled && suffix}
        className={cn('uu-multiSelectToggle', { 'uu-multiSelectToggle_toggleOnly': toggleOnly })}
      >
        <InputError
          className="uu-multiSelectErrorTooltip"
          error={error}
          errorPlacement={errorPlacement}
        />
      </FieldAddon>
    );

    const { onBlur, ...inputProps } = getInputProps({
      disabled: disabled || !filterable || !isOpen,
      ref: filterInputRef,
    });

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
          className={cn('uu-multiSelect', {
            'uu-multiSelect_toggleOnly': toggleOnly,
          })}
          {...getComboboxProps({
            ref: rootRef,
            onClick: handleClickCombobox,
          })}
          aria-label={ariaLabel}
          aria-disabled={disabled}
          tabIndex={-1}
        >
          <div
            className={cn('uu-multiSelectValuesContainer', {
              'uu-multiSelectValuesContainer_error': error,
              'uu-multiSelectValuesContainer_toggleOnly': toggleOnly,
            })}
            {...getToggleButtonProps({ disabled, name })}
          >
            {!toggleOnly && (
              <div className="uu-multiSelectValues">
                {value.length === 0 && (
                  <span className="uu-multiSelectPlaceholder">{placeholder}</span>
                )}
                {singleLine && value.length > 0 && (
                  <MultiValue
                    disabled={disabled}
                    onClose={handleResetMenu}
                  >{`Выбрано ${value.length}`}</MultiValue>
                )}
                {!singleLine &&
                  value.map((selectedItem, idx) => (
                    <MultiValue
                      key={selectedItem.value}
                      disabled={disabled}
                      onClose={handleCloseMultiValue(selectedItem)}
                      {...getItemProps({
                        item: selectedItem,
                        index: idx,
                      })}
                    >
                      {
                        // TODO: remove selectedOption on selectMenu refactoring
                        formatOptionLabel({ option: selectedItem, selectedOption: null })
                      }
                    </MultiValue>
                  ))}
              </div>
            )}
            {toggleButton}
          </div>
          <SelectMenu
            appendToBody={appendToBody}
            target={rootRef.current}
            isOpen={isOpen}
            menuWidth={menuWidth}
            menuMaxHeight={menuMaxHeight}
            menuPosition={menuPosition}
            className="uu-multiSelectMenu"
            menuRef={menuRef}
            {...getMenuProps({ hidden: !isOpen, ref: setMenuRef })}
            aria-multiselectable
          >
            <label
              {...getLabelProps()}
              htmlFor={getLabelProps().htmlFor}
              className={cn('uu-multiSelectFilter', { 'uu-multiSelectFilter_hidden': !filterable })}
              role="search"
            >
              <SearchSvg className="uu-multiSelectFilterIcon" />
              <input
                className="uu-multiSelectFilterInput"
                {...inputProps}
                value={filterValue}
                placeholder="Поиск"
                aria-label={`${ariaLabel ?? ''}Search`}
              />
            </label>
            {isOpen && (
              <SelectOptionsWrapper>
                {items.map((item, index) => {
                  const isSelected = value.some((i) => i.value === item.value);
                  return (
                    <MenuItem
                      key={item.value}
                      isActive={highlightedIndex === index}
                      isSelected={isSelected}
                      {...getItemProps({ item, index })}
                      aria-selected={isSelected}
                    >
                      {
                        // TODO: remove selectedOption on selectMenu refactoring
                        formatOptionLabel({ option: item, selectedOption: null })
                      }
                    </MenuItem>
                  );
                })}
                {isOpen && !items.length && (
                  <li className="uu-multiSelectOption uu-multiSelectOption_empty">
                    Нет совпадений
                  </li>
                )}
              </SelectOptionsWrapper>
            )}
          </SelectMenu>
        </div>
      </Labeled>
    );
  },
);
