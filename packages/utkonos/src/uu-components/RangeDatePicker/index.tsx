import React, { useState, useCallback, FormEvent, forwardRef } from 'react';
import { nanoid } from 'nanoid';
import { DateRangePicker as DateRangePickerComponent } from 'react-dates';
import type { DateRangePickerShape, DateRangePickerPhrases, IconPositionShape } from 'react-dates';
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
  dateRangePickerPhrases,
} from '../_datepicker';
import { DISABLED_ICON } from '../_input';
import { Labeled } from '../Labeled';
import type { LabeledCoreProps } from '../Labeled';

export type Dates = {
  startDate: Moment | null;
  endDate: Moment | null;
};

export interface RangeDatePickerProps
  extends LabeledCoreProps,
    Omit<
      DateRangePickerShape,
      'renderMonthText' | 'startDateId' | 'endDateId' | 'focusedInput' | 'onFocusChange'
    > {
  /** Дата начала диапазона */
  startDate: Moment | null;
  /** Дата конца диапазона */
  endDate: Moment | null;
  /** Обработчик дат */
  onDatesChange: (dates: Dates) => void;
  /** Дополнительный класс */
  className?: string;
  /** Состояние отображения календаря */
  focusedInput?: 'startDate' | 'endDate' | null;
  /** обработчик состояния отображения календаря */
  onFocusChange?: (focusedInput: 'startDate' | 'endDate' | null) => void;
  /**
   * Уникальный id инпута `startDate`
   *
   * Необходим, если на странице несколько компонентов SingleDatePicker
   * @default nanoid()
   */
  startDateId?: string;
  /**
   * Уникальный id `endDate`
   *
   * Необходим, если на странице несколько компонентов SingleDatePicker
   * @default nanoid()
   */
  endDateId?: string;
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
   * Минимальный интервал в днях
   *
   * @default 0
   */
  minimumNights?: number;
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
  phrases?: DateRangePickerPhrases;
  /**
   * Текстовая подсказка в инпуте `startDate`
   *
   * @default "Дата"
   */
  startDatePlaceholderText?: string;
  /**
   * Текстовая подсказка в инпуте `endDate`
   *
   * @default "Дата"
   */
  endDatePlaceholderText?: string;
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
  validate?: (startDateValue: string, endDateValue: string) => void;
  /** Оставляет открытым календарь при выборе дат */
  keepOpenOnDateSelect?: DateRangePickerShape['keepOpenOnDateSelect'];
  /** Текст или флаг ошибки */
  error?: string | boolean;
  /** Положение подсказки
   * @default "right"
   */
  errorPlacement?: 'right' | 'left' | 'top' | 'bottom';
}

/**
 * Компонент выбора диапазона дат.
 *
 * Поддерживает все пропсы оригинального компонента DateRangePicker библиотеки react-dates.
 *
 * **Подключение** Использование компонента требует дополнительных настроек на уровне проекта.
 */
export const RangeDatePicker = forwardRef<HTMLDivElement, RangeDatePickerProps>(
  (props, ref): JSX.Element => {
    const [fallbackStartDateId] = useState(nanoid);
    const [fallbackEndDateId] = useState(nanoid);
    const [fallbackFocused, setFallbackFocused] = useState<'startDate' | 'endDate' | null>(null);

    const {
      startDate,
      endDate,
      onDatesChange,
      className,
      disabled,
      customInputIcon = disabled ? DISABLED_ICON : INPUT_ICON,
      focusedInput = fallbackFocused,
      onFocusChange = setFallbackFocused,
      startDateId = fallbackStartDateId,
      endDateId = fallbackEndDateId,
      inputIconPosition = 'after',
      isDayHighlighted = IS_DAY_HIGHLIGHTED,
      isOutsideRange = IS_OUTSIDE_RANGE,
      navNext = NAV_NEXT,
      navPrev = NAV_PREV,
      phrases = dateRangePickerPhrases,
      minimumNights = 0,
      startDatePlaceholderText = 'Дата',
      endDatePlaceholderText = 'Дата',
      validate,
      label,
      direction,
      error,
      errorPlacement,
      required,
      hint,
      ...rest
    } = props;

    const [startDateValue, setStartDateValue] = useState<string>(() => stringifyDate(startDate));
    const [endDateValue, setEndDateValue] = useState<string>(() => stringifyDate(endDate));

    const validateOnInputChange = useCallback(
      (value: FormEvent<HTMLDivElement>) => {
        if (!validate) {
          return;
        }

        const target = value.target as HTMLInputElement;
        let nextStartDateValue = startDateValue;
        let nextEndDateValue = endDateValue;
        if (target.id === startDateId) {
          nextStartDateValue = target.value;
          setStartDateValue(nextStartDateValue);
        } else if (target.id === endDateId) {
          nextEndDateValue = target.value;
          setEndDateValue(nextEndDateValue);
        }

        Promise.resolve().then((): void => {
          validate(nextStartDateValue, nextEndDateValue);
        });
      },
      [startDateValue, endDateValue, startDateId, endDateId, validate],
    );

    const datesChangeHandler = useCallback(
      (dates: { startDate: Moment | null; endDate: Moment | null }): void => {
        onDatesChange(dates);

        if (!validate) {
          return;
        }

        const { startDate: nextStartDate, endDate: nextEndDate } = dates;
        let nextStartDateValue = startDateValue;
        let nextEndDateValue = endDateValue;
        if (startDate !== nextStartDate) {
          nextStartDateValue = stringifyDate(nextStartDate);
          setStartDateValue(nextStartDateValue);
        }
        if (endDate !== nextEndDate) {
          nextEndDateValue = stringifyDate(nextEndDate);
          setEndDateValue(nextEndDateValue);
        }
        validate(nextStartDateValue, nextEndDateValue);
      },
      [startDate, endDate, startDateValue, endDateValue, onDatesChange, validate],
    );

    return (
      <Labeled
        className={className}
        id={startDateId}
        label={label}
        direction={direction}
        required={required}
        hint={hint}
      >
        <div
          onChange={validateOnInputChange}
          className={cn({ DateRangePickerError: error })}
          ref={ref}
        >
          <DateRangePickerComponent
            startDate={startDate}
            endDate={endDate}
            onDatesChange={datesChangeHandler}
            startDateId={startDateId}
            endDateId={endDateId}
            customInputIcon={
              !error ? (
                customInputIcon
              ) : (
                <InputError error={error} errorPlacement={errorPlacement} />
              )
            }
            focusedInput={focusedInput}
            onFocusChange={onFocusChange}
            inputIconPosition={inputIconPosition}
            startDatePlaceholderText={startDatePlaceholderText}
            endDatePlaceholderText={endDatePlaceholderText}
            customArrowIcon="-"
            minimumNights={minimumNights}
            isDayHighlighted={isDayHighlighted}
            isOutsideRange={isOutsideRange}
            navNext={navNext}
            navPrev={navPrev}
            phrases={phrases}
            disabled={disabled}
            hideKeyboardShortcutsPanel
            {...rest}
          />
        </div>
      </Labeled>
    );
  },
);
