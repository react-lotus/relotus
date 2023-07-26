import React, { useState, useCallback, FormEvent, forwardRef, Component } from 'react';
import { nanoid } from 'nanoid';
import { SingleDatePicker as SingleDatePickerComponent } from 'react-dates';
import type {
  SingleDatePickerShape,
  SingleDatePickerPhrases,
  IconPositionShape,
} from 'react-dates';
import cn from 'classnames';
import type { Moment } from 'moment';
import { InputError } from '../_InputError';
import {
  NAV_PREV,
  NAV_NEXT,
  INPUT_ICON,
  IS_OUTSIDE_RANGE,
  IS_DAY_HIGHLIGHTED,
  stringifyDate,
  singleDatePickerPhrases,
  jsxToString,
} from '../_datepicker';
import { DISABLED_ICON } from '../_input';
import { Labeled } from '../Labeled';
import type { LabeledCoreProps } from '../Labeled';

export interface SingleDatePickerProps
  extends LabeledCoreProps,
    Omit<SingleDatePickerShape, 'renderMonthText' | 'id' | 'focused' | 'onFocusChange'> {
  /** Дата */
  date: Moment | null;
  /** Обработчик даты */
  onDateChange: (date: Moment | null) => void;
  /** Дополнительный класс */
  className?: string;
  /** Состояние отображения календаря */
  focused?: boolean;
  /** обработчик состояния отображения календаря */
  onFocusChange?: (arg: { focused: boolean | null }) => void;
  /**
   * Уникальный id
   *
   * Необходим, если на странице несколько компонентов SingleDatePicker
   * @default nanoid()
   */
  id?: string;
  /**
   * Иконка календаря
   *
   * @default INPUT_ICON
   */
  customInputIcon?: JSX.Element;
  /**
   * Положение иконки календаря
   *
   * @default "after"
   */
  inputIconPosition?: IconPositionShape;
  /**
   * Иконка переключения вправо
   *
   * @default NAV_NEXT
   */
  navNext?: JSX.Element;
  /**
   * Иконка переключения влево
   *
   * @default NAV_PREV
   */
  navPrev?: JSX.Element;
  /**
   * Фразы
   *
   * @default PHRASES
   */
  phrases?: SingleDatePickerPhrases;
  /**
   * Текстовая подсказка в инпуте
   *
   * @default "Дата"
   */
  placeholder?: string;
  /**
   * Подсветка дней в календаре
   *
   * По умолчанию подсвечивается сегодня
   * @default IS_DAY_HIGHLIGHTED
   */
  isDayHighlighted?: (day: Moment) => boolean;
  /**
   * Функция, определяющая доступна ли конкретная дата для выбора
   *
   * По умолчанию доступны все даты
   * @default IS_OUTSIDE_RANGE
   */
  isOutsideRange?: (day: Moment) => boolean;
  /** Функция валидации значения, введенного вручную */
  validate?: (value: string) => void;
  /** Оставляет открытым календарь при выборе даты */
  keepOpenOnDateSelect?: SingleDatePickerShape['keepOpenOnDateSelect'];
  /** Текст или флаг ошибки */
  error?: string | boolean;
  /** Положение подсказки
   * @default "right"
   */
  errorPlacement?: 'right' | 'left' | 'top' | 'bottom';

  /** Наименование параметра данных */
  name?: string;
}

/**
 * Компонент выбора одной даты.
 *
 * Поддерживает все пропсы оригинального компонента SingleDatePicker библиотеки react-dates.
 *
 * **Подключение** Использование компонента требует дополнительных настроек на уровне проекта.
 */
export const SingleDatePicker = forwardRef<
  Component<SingleDatePickerShape, never, never>,
  SingleDatePickerProps
>((props, ref): JSX.Element => {
  const [fallbackId] = useState(nanoid);
  const [fallbackFocused, setFallbackFocused] = useState<boolean>(false);
  const fallbackOnFocusChange = useCallback(
    ({ focused }: { focused: boolean }) => {
      setFallbackFocused(focused);
    },
    [setFallbackFocused],
  );

  const {
    onDateChange,
    className,
    disabled,
    customInputIcon = disabled ? DISABLED_ICON : INPUT_ICON,
    focused = fallbackFocused,
    onFocusChange = fallbackOnFocusChange,
    id = fallbackId,
    inputIconPosition = 'after',
    isDayHighlighted = IS_DAY_HIGHLIGHTED,
    isOutsideRange = IS_OUTSIDE_RANGE,
    navNext = NAV_NEXT,
    navPrev = NAV_PREV,
    phrases = singleDatePickerPhrases,
    placeholder = 'Дата',
    dayAriaLabelFormat = 'L',
    validate,
    label,
    direction,
    error,
    errorPlacement,
    required,
    hint,
    name,
    ariaLabel = name ?? jsxToString(label, placeholder),
    ...rest
  } = props;

  const validateOnInputChange = useCallback(
    (value: FormEvent<HTMLDivElement>) => {
      if (validate) {
        validate((value.target as HTMLInputElement).value);
      }
    },
    [validate],
  );

  const dateChangeHandler = useCallback(
    (date: Moment | null): void => {
      if (date === rest.date) {
        return;
      }
      if (validate) {
        validate(stringifyDate(date));
      }
      onDateChange(date);
    },
    [rest.date, validate, onDateChange],
  );

  return (
    <Labeled
      className={className}
      id={id}
      label={label}
      direction={direction}
      required={required}
      hint={hint}
    >
      <div onChange={validateOnInputChange} className={cn({ SingleDatePickerError: error })}>
        <SingleDatePickerComponent
          customInputIcon={
            !error ? customInputIcon : <InputError error={error} errorPlacement={errorPlacement} />
          }
          focused={focused}
          onFocusChange={onFocusChange}
          id={id}
          inputIconPosition={inputIconPosition}
          isDayHighlighted={isDayHighlighted}
          isOutsideRange={isOutsideRange}
          navNext={navNext}
          navPrev={navPrev}
          onDateChange={dateChangeHandler}
          phrases={phrases}
          placeholder={placeholder}
          disabled={disabled}
          ariaLabel={ariaLabel}
          dayAriaLabelFormat={dayAriaLabelFormat}
          hideKeyboardShortcutsPanel
          ref={ref}
          {...rest}
        />
      </div>
    </Labeled>
  );
});
