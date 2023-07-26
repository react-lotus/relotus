import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { nanoid } from 'nanoid';
import moment from 'moment';
import { useBooleanState } from '@relotus/hooks';

import { Calendar } from './Calendar';
import { MonthArrowButton } from './MonthArrowButton';
import { Directions, getNextValue, getNextYear, getPrevYear, getPrevValue } from './utils';
import { Labeled } from '../Labeled';
import type { LabeledCoreProps } from '../Labeled';

import calendarIcon from '../_datepicker/assets/calendar.svg';

import './index.scss';

export interface MonthPickerValue {
  year: number;
  month: number;
}

export interface MonthPickerProps extends LabeledCoreProps {
  /** Текущее значение */
  value: MonthPickerValue;
  /** Обработчик изменения значения даты */
  onChange: (value: MonthPickerProps['value']) => void;
  /** Уникальный id
   * @default nanoid()
   */
  id?: string;
  /** Дополнительный класс */
  className?: string;
  /** Формат отображения месяца */
  displayFormat?: string;
  /** Показать кнопки-стрелки для изменения месяца вперед/назад */
  showMonthArrows?: boolean;
}

/**
 * Компонент выбора месяца MonthPicker
 */
export function MonthPicker(props: MonthPickerProps): JSX.Element {
  const [fallbackId] = useState(nanoid);
  const {
    value,
    onChange,
    id = fallbackId,
    direction,
    label,
    required,
    className,
    showMonthArrows,
    displayFormat = 'MMMM',
    hint,
  } = props;

  const displayValue = moment(value).format(displayFormat);

  const [isOpen, setIsOpen, setIsClose] = useBooleanState(false);
  const [calendarYear, setCalendarYear] = useState(value.year);

  useEffect(() => {
    if (!isOpen) return;
    setCalendarYear(value.year);
  }, [value, isOpen]);

  const handleClickMonth = (month: number) => () => {
    setIsClose();
    onChange({ month, year: calendarYear });
  };

  const handleClickYearDirection = (rel: Directions) => () => {
    const fn = rel === Directions.next ? getNextYear : getPrevYear;
    const updatedYear = fn(calendarYear);
    setCalendarYear(updatedYear);
  };

  const handleClickMonthArrow = (rel: Directions) => () => {
    const fn = rel === Directions.next ? getNextValue : getPrevValue;
    const updatedValue = fn(value);
    onChange(updatedValue);
  };

  return (
    <Labeled
      className={className}
      id={id}
      label={label}
      direction={direction}
      required={required}
      hint={hint}
    >
      <div className="uu-monthPicker">
        {showMonthArrows && (
          <MonthArrowButton onClick={handleClickMonthArrow(Directions.prev)} isPrev />
        )}
        <Calendar
          value={value}
          isOpen={isOpen}
          calendarYear={calendarYear}
          handleClose={setIsClose}
          handleClickYearDirection={handleClickYearDirection}
          handleClickMonth={handleClickMonth}
        >
          <button
            className={cn('uu-monthPicker__date', {
              'uu-monthPicker__date_secondary': showMonthArrows,
            })}
            type="button"
            onClick={setIsOpen}
          >
            <span className="uu-monthPicker__dateText">{displayValue}</span>
            {!showMonthArrows && <img src={calendarIcon} alt="Календарь" />}
          </button>
        </Calendar>
        {showMonthArrows && <MonthArrowButton onClick={handleClickMonthArrow(Directions.next)} />}
      </div>
    </Labeled>
  );
}
