import React, { useState, useCallback, useRef, useEffect } from 'react';
import moment, { Moment } from 'moment';
import type { Meta } from '@storybook/react/types-6-0';
import { useBooleanState } from '@relotus/hooks';
import { SingleDatePicker } from '../../SingleDatePicker';
import { Text } from '../../Text';
import { RangeTimePicker, RangeTimePickerValue } from '..';

import styles from './index.module.scss';
import { Button } from '../../Button';

export default {
  title: 'Controls/RangeTimePicker',
  component: RangeTimePicker,
};

const storyDecorators: Meta['decorators'] = [
  (Story) => (
    <div className={styles.root}>
      <Story />
    </div>
  ),
];

export const Preview = () => {
  const [times, setTimes] = useState<RangeTimePickerValue>({
    startTime: null,
    endTime: null,
  });

  return (
    <RangeTimePicker startTime={times.startTime} endTime={times.endTime} onTimesChange={setTimes} />
  );
};
Preview.decorators = storyDecorators;

export const WithLabel = () => {
  const [times, setTimes] = useState<RangeTimePickerValue>({
    startTime: null,
    endTime: null,
  });

  return (
    <RangeTimePicker
      label="My super label"
      startTime={times.startTime}
      endTime={times.endTime}
      onTimesChange={setTimes}
    />
  );
};
WithLabel.decorators = storyDecorators;

export const Disabled = () => {
  const [times, setTimes] = useState<RangeTimePickerValue>({
    startTime: moment({ hour: 10 }),
    endTime: moment({ hour: 19 }),
  });

  return (
    <RangeTimePicker
      startTime={times.startTime}
      endTime={times.endTime}
      onTimesChange={setTimes}
      disabled
    />
  );
};
Disabled.decorators = storyDecorators;

export const DateRangeTime = () => {
  const [times, setTimes] = useState<RangeTimePickerValue>({
    startTime: null,
    endTime: null,
  });
  const onDateChange = useCallback(
    (nextDate: Moment | null) => {
      if (nextDate) {
        const { startTime, endTime } = times;
        const nextDateSet = {
          date: nextDate.date(),
          month: nextDate.month(),
          year: nextDate.year(),
        };
        setTimes({
          startTime: startTime
            ? startTime.clone().set(nextDateSet)
            : nextDate.clone().startOf('day'),
          endTime: endTime ? endTime.clone().set(nextDateSet) : nextDate.clone().endOf('day'),
        });
      } else {
        setTimes({
          startTime: null,
          endTime: null,
        });
      }
    },
    [times, setTimes],
  );

  return (
    <div className={styles.dateTimeRoot}>
      <SingleDatePicker date={times.startTime || times.endTime} onDateChange={onDateChange} />
      <RangeTimePicker
        startTime={times.startTime}
        endTime={times.endTime}
        onTimesChange={setTimes}
      />
      <Text>
        {[times.startTime, times.endTime]
          .filter(Boolean)
          .map((date) => date?.format('DD.MM.YYYY  HH:mm'))
          .join(' - ')}
      </Text>
    </div>
  );
};

export const TimePickerWithRef = () => {
  const [dates, setDates] = useState<{
    startTime: Moment | null;
    endTime: Moment | null;
  }>({
    startTime: moment(),
    endTime: moment().add({ days: 5 }),
  });
  const ref = useRef<HTMLDivElement>(null);
  const [labelToggled, , , toggleLabelToggled] = useBooleanState(false);

  useEffect(() => {
    ref.current?.setAttribute(
      'style',
      !labelToggled ? 'box-shadow: none' : 'box-shadow: 0 0 5px 5px black; border-radius: 5px;',
    );
  }, [labelToggled, ref]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <RangeTimePicker
        startTime={dates.startTime}
        endTime={dates.endTime}
        onTimesChange={setDates}
        ref={ref}
      />
      <Button style={{ marginTop: '10px' }} onClick={toggleLabelToggled}>
        Нажми меня и появится тень
      </Button>
    </div>
  );
};
DateRangeTime.decorators = storyDecorators;
