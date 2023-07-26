import React, { useMemo, useCallback, forwardRef } from 'react';
import { nanoid } from 'nanoid';
import moment from 'moment';
import type { Moment } from 'moment';

import { SingleSelect } from '../SingleSelect';
import type { SingleSelectProps } from '../SingleSelect';
import type { Option } from '../_option';
import { defaultTimeOptions, CLOCK_ICON, isTimeValue } from '../_timepicker';
import { Labeled } from '../Labeled';

import './index.scss';

export { defaultTimeOptions };

export interface RangeTimePickerValue {
  /** Дата начала диапазона */
  startTime: Moment | null;
  /** Дата конца диапазона */
  endTime: Moment | null;
}

export interface RangeTimePickerProps
  extends Omit<SingleSelectProps, 'options' | 'value' | 'onChange' | 'onValueChange'>,
    RangeTimePickerValue {
  /** Список опций для выбора начала диапазона */
  startTimeOptions?: Option<string | undefined>[];

  /** Список опций для выбора окончания диапазона */
  endTimeOptions?: Option<string | undefined>[];

  /** Обработчик изменения выбранного диапазона */
  onTimesChange: (value: RangeTimePickerValue) => void;
}

/**
 * Компонент выбора периода времени.
 */
export const RangeTimePicker = forwardRef<HTMLDivElement, RangeTimePickerProps>(
  (props, ref): JSX.Element => {
    const fallbackId = useMemo(nanoid, []);

    const {
      startTime,
      endTime,
      onTimesChange,
      className,
      id = fallbackId,
      label,
      direction,
      required,
      startTimeOptions = defaultTimeOptions,
      endTimeOptions = defaultTimeOptions,
      toggleIcon = CLOCK_ICON,
      hint,
      ...rest
    } = props;

    const startTimeValue = useMemo(
      () => (startTime ? startTime.format('HH:mm') : undefined),
      [startTime],
    );
    const endTimeValue = useMemo(() => (endTime ? endTime.format('HH:mm') : undefined), [endTime]);

    const onStartTimeChange = useCallback<
      Required<SingleSelectProps<string | undefined>>['onValueChange']
    >(
      (nextStartTimeValue) => {
        let nextStartTime: Moment | null = null;
        if (isTimeValue(nextStartTimeValue)) {
          const [hour, minute] = nextStartTimeValue.split(':');
          nextStartTime = (startTime ? startTime.clone() : moment()).set({
            hour: Number(hour),
            minute: Number(minute),
          });
        }
        if (nextStartTime) {
          onTimesChange({
            startTime: nextStartTime,
            endTime: endTime || nextStartTime.clone().endOf('day'),
          });
        } else {
          onTimesChange({
            startTime: null,
            endTime,
          });
        }
      },
      [onTimesChange, endTime, startTime],
    );

    const onEndTimeChange = useCallback<
      Required<SingleSelectProps<string | undefined>>['onValueChange']
    >(
      (nextEndTimeValue) => {
        let nextEndTime: Moment | null = null;
        if (isTimeValue(nextEndTimeValue)) {
          const [hour, minute] = nextEndTimeValue.split(':');
          nextEndTime = (endTime ? endTime.clone() : moment()).set({
            hour: Number(hour),
            minute: Number(minute),
          });
        }
        if (nextEndTime) {
          onTimesChange({
            startTime: startTime || nextEndTime.clone().startOf('day'),
            endTime: nextEndTime,
          });
        } else {
          onTimesChange({
            startTime,
            endTime: null,
          });
        }
      },
      [onTimesChange, endTime, startTime],
    );

    const startTimeOptionsFiltered = useMemo(
      () =>
        endTimeValue
          ? startTimeOptions.filter((option) => !option.value || option.value < endTimeValue)
          : startTimeOptions,
      [endTimeValue, startTimeOptions],
    );

    const endTimeOptionsFiltered = useMemo(
      () =>
        startTimeValue
          ? endTimeOptions.filter((option) => !option.value || option.value > startTimeValue)
          : endTimeOptions,
      [startTimeValue, endTimeOptions],
    );

    return (
      <Labeled
        id={id}
        label={label}
        direction={direction}
        className={className}
        required={required}
        hint={hint}
      >
        <div className="uu-rangeTimePicker" ref={ref} data-testid="time-picker-wrapper">
          <SingleSelect
            id={id}
            className="uu-rangeTimePicker__start"
            value={startTimeValue}
            options={startTimeOptionsFiltered}
            onValueChange={onStartTimeChange}
            toggleIcon={toggleIcon}
            placeholder="Время"
            {...rest}
          />
          <SingleSelect
            className="uu-rangeTimePicker__end"
            value={endTimeValue}
            options={endTimeOptionsFiltered}
            onValueChange={onEndTimeChange}
            toggleIcon={toggleIcon}
            placeholder="Время"
            {...rest}
          />
        </div>
      </Labeled>
    );
  },
);
