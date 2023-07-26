import React, { useRef, useMemo, useState, useEffect, forwardRef } from 'react';
import cn from 'classnames';
import { omit } from 'lodash-es';
import { nanoid } from 'nanoid';
import { useCombobox } from 'downshift';
import { Labeled } from '../Labeled';
import { SelectMenu, SelectOptionsWrapper } from '../_select';
import { InputError } from '../_InputError';
import { FieldAddon } from '../FieldAddon';
import type { AutocompleteOption as Option, AutocompleteProps } from './types';
import {
  sliceOptions,
  fallbackFormatOptionLabel,
  fallbackFilterOption,
  fallbackFormatInputValue,
  fallbackOnInputValueChange,
  fallbackSelectOption,
  isControlledPredicate,
} from './utils';
import './index.scss';

/**
 * Компонент выбора из выпадающего списка
 */
export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  (props, inputRef): JSX.Element => {
    const [fallbackId] = useState(nanoid);

    let value: Option['value'];
    let defaultValue: Option['value'];

    if (isControlledPredicate(props)) {
      value = props.value;
    } else {
      defaultValue = props.defaultValue;
    }

    // interior input value state
    const [inputValue, setInputValue] = useState('');
    // value(controlled mode)
    const [selectedValue, setSelectedValue] = useState<Option['value']>(defaultValue);

    const {
      options,
      onChange,
      name,
      id = fallbackId,
      selectOption = fallbackSelectOption(value, selectedValue),
      ...remainingProps
    } = omit(props, 'value', 'defaultValue');

    // find selectedItem
    const selectedItem = useMemo(() => options.find(selectOption) || null, [options, selectOption]);

    const {
      className,
      onInputValueChange = fallbackOnInputValueChange(
        options,
        value,
        selectedItem,
        setSelectedValue,
        onChange,
        id,
        name,
      ),
      filterOption = fallbackFilterOption,
      formatOptionLabel = fallbackFormatOptionLabel,
      formatInputValue = fallbackFormatInputValue,
      placeholder = 'Поиск',
      disabled = false,
      style,
      label,
      direction,
      optionsCount,
      appendToBody = false,
      menuMaxHeight,
      menuWidth,
      menuPosition,
      error,
      errorPlacement,
      suffix,
      required,
      isOpen: isOpenProp,
      onIsOpenChange,
      hint,
      ariaLabel = name || label,
      ...rest
    } = remainingProps;

    // items
    const [items, setItems] = useState<Option[]>(() => sliceOptions(options, optionsCount));
    const [menuRef, setMenuRef] = useState<HTMLElement | null>();

    const rootRef = useRef<HTMLDivElement | null>(null);
    const filterInputId = useMemo(nanoid, []);
    const {
      isOpen,
      highlightedIndex,
      getItemProps,
      getMenuProps,
      getComboboxProps,
      getInputProps,
    } = useCombobox<Option>({
      items,
      itemToString: formatInputValue,
      selectedItem,
      inputId: filterInputId,
      toggleButtonId: id,
      isOpen: isOpenProp,
      onIsOpenChange,
      onSelectedItemChange: ({ selectedItem: nextSelectedItem }) => {
        const nextValue =
          nextSelectedItem?.value !== undefined ? String(nextSelectedItem.value) : undefined;
        if (value === undefined) {
          // is uncontrolled mode
          setSelectedValue(nextValue);
        }

        onChange?.({
          target: {
            id,
            name,
            value: nextValue,
          },
          selectedItem: nextSelectedItem,
        });
      },
      onInputValueChange: ({ inputValue: nextInputValue }) => {
        onInputValueChange(nextInputValue);
        setInputValue(nextInputValue || '');
      },
      stateReducer: (state, actionAndChanges) => {
        const { changes, type } = actionAndChanges;
        switch (type) {
          case useCombobox.stateChangeTypes.ControlledPropUpdatedSelectedItem:
            return {
              ...changes,
              /** для  сохранения значения input после выбора автокомплита */
              inputValue: !inputValue ? '' : String(inputValue),
            };
          default:
        }
        return changes;
      },
    });
    useEffect(() => {
      if (inputValue) {
        setItems(sliceOptions(options.filter(filterOption(String(inputValue))), optionsCount));
      } else {
        setItems(sliceOptions(options, optionsCount));
      }
    }, [options, optionsCount, inputValue, setItems, filterOption]);

    const comboboxProps = getComboboxProps({ ref: rootRef, style });
    const inputProps = getInputProps({
      disabled,
      ref: inputRef,
    });
    const menuProps = getMenuProps({ ref: setMenuRef });
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
          className={cn('uu-autocomplete', {
            'uu-autocomplete_disabled': disabled,
            'uu-autocomplete_error': !!error,
          })}
          {...comboboxProps}
          {...rest}
          aria-label={ariaLabel}
          aria-autocomplete="list"
          aria-disabled={disabled}
        >
          <input
            className="uu-autocompleteInput"
            {...inputProps}
            value={inputValue}
            ref={inputRef}
            placeholder={disabled ? '' : placeholder}
          />
          <SelectMenu
            appendToBody={appendToBody}
            target={rootRef.current}
            isOpen={isOpen}
            menuMaxHeight={menuMaxHeight}
            menuWidth={menuWidth}
            menuPosition={menuPosition}
            className="uu-autocompleteMenu"
            menuRef={menuRef}
            {...menuProps}
            aria-multiselectable="false"
          >
            {isOpen && (
              <SelectOptionsWrapper>
                {items.map((option: Option, i: number) => (
                  <li
                    key={option.value}
                    className={cn('uu-autocompleteOption', {
                      'uu-autocompleteOption_selected': option === selectedItem,
                      'uu-autocompleteOption_highlighted': i === highlightedIndex,
                    })}
                    {...getItemProps({
                      item: option,
                      index: i,
                    })}
                    role="option"
                    aria-selected={option === selectedItem}
                  >
                    {formatOptionLabel({ option, selectedOption: selectedItem })}
                  </li>
                ))}
                {!items.length && (
                  <li className={cn('uu-autocompleteOption', 'uu-autocompleteOption_empty')}>
                    Нет совпадений
                  </li>
                )}
              </SelectOptionsWrapper>
            )}
          </SelectMenu>
          <InputError
            className="uu-autocompleteError"
            error={error}
            errorPlacement={errorPlacement}
          />
          <FieldAddon disabled={disabled} suffix={!disabled && suffix} />
        </div>
      </Labeled>
    );
  },
);

export type AutocompleteOption = Option;
