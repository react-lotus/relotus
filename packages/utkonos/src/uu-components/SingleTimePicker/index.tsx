import React, { useMemo, useCallback, forwardRef } from 'react';
import moment from 'moment';
import type { Moment } from 'moment';
import cn from 'classnames';

import { SingleSelect } from '../SingleSelect';
import type { SingleSelectProps } from '../SingleSelect';
import type { Option } from '../_option';
import { defaultTimeOptions, CLOCK_ICON, isTimeValue } from '../_timepicker';

import './index.scss';

export interface SingleTimePickerProps
  extends Omit<SingleSelectProps, 'options' | 'value' | 'onChange' | 'onValueChange'> {
  /** Время */
  time: Moment | null;

  /** Список опций для выбора */
  timeOptions?: Option<string | undefined>[];

  /** Обработчик изменения выбранного диапазона */
  onTimeChange: (value: Moment | null) => void;
}

/**
 * Компонент выбора времени.
 */
export const SingleTimePicker = forwardRef<HTMLDivElement, SingleTimePickerProps>(
  (props, ref): JSX.Element => {
    const {
      time,
      onTimeChange,
      className,
      timeOptions = defaultTimeOptions,
      toggleIcon = CLOCK_ICON,
      ...rest
    } = props;

    const timeValue = useMemo(() => (time ? time.format('HH:mm') : undefined), [time]);

    const onSelectTimeChange = useCallback<
      Required<SingleSelectProps<string | undefined>>['onValueChange']
    >(
      (nextTimeValue) => {
        let nextTime: Moment | null = null;
        if (isTimeValue(nextTimeValue)) {
          const [hour, minute] = nextTimeValue.split(':');
          nextTime = (time ? time.clone() : moment()).set({
            hour: Number(hour),
            minute: Number(minute),
          });
        }
        onTimeChange(nextTime);
      },
      [onTimeChange, time],
    );

    return (
      <SingleSelect
        className={cn('uu-singleTimePicker', className)}
        value={timeValue}
        options={timeOptions}
        onValueChange={onSelectTimeChange}
        toggleIcon={toggleIcon}
        placeholder="Время"
        {...rest}
        ref={ref}
      />
    );
  },
);
