import React, { useState, useCallback, useEffect, useRef } from 'react';
import moment from 'moment';
import type { Moment } from 'moment';
import type { Meta } from '@storybook/react/types-6-0';
import { useBooleanState } from '@relotus/hooks';
import type { Dates } from '..';
import { RangeDatePicker } from '..';
import { Button } from '../../Button';

export default {
  title: 'Controls/RangeDatePicker',
  component: RangeDatePicker,
} as Meta;

const storyDecorators: Meta['decorators'] = [
  (Story) => (
    <div className="sb-col">
      <div className="sb-row">
        <Story />
      </div>
    </div>
  ),
];

export const Preview = () => {
  const [dates, setDates] = useState<Dates>({ startDate: null, endDate: null });

  return (
    <RangeDatePicker startDate={dates.startDate} endDate={dates.endDate} onDatesChange={setDates} />
  );
};
Preview.decorators = storyDecorators;

export const IsOutsideRange = () => {
  const [dates, setDates] = useState<Dates>({ startDate: null, endDate: null });

  const availablePeriod = {
    startDate: moment(),
    endDate: moment().add({ days: 13 }),
  };

  const isOutsideTwoWeeksRange = (day: Moment): boolean => {
    return day < availablePeriod.startDate || day > availablePeriod.endDate;
  };

  return (
    <RangeDatePicker
      startDate={dates.startDate}
      endDate={dates.endDate}
      onDatesChange={setDates}
      isOutsideRange={isOutsideTwoWeeksRange}
    />
  );
};

IsOutsideRange.storyName = 'isOutsideRange (next 2 weeks)';
IsOutsideRange.decorators = storyDecorators;

export const ReadOnly = () => {
  const [dates, setDates] = useState<Dates>({ startDate: null, endDate: null });

  return (
    <RangeDatePicker
      readOnly
      startDate={dates.startDate}
      endDate={dates.endDate}
      onDatesChange={setDates}
    />
  );
};
ReadOnly.decorators = storyDecorators;

export const KeepOpenOnDateSelect = () => {
  const [dates, setDates] = useState<Dates>({ startDate: null, endDate: null });

  return (
    <RangeDatePicker
      keepOpenOnDateSelect
      startDate={dates.startDate}
      endDate={dates.endDate}
      onDatesChange={setDates}
    />
  );
};

KeepOpenOnDateSelect.storyName = 'Does not autoclose the DayPicker on date selection';
KeepOpenOnDateSelect.decorators = storyDecorators;

export const AppendToBody = () => {
  const [dates, setDates] = useState<Dates>({ startDate: null, endDate: null });

  return (
    <RangeDatePicker
      appendToBody
      startDate={dates.startDate}
      endDate={dates.endDate}
      onDatesChange={setDates}
    />
  );
};
AppendToBody.decorators = storyDecorators;

export const WithPortal = () => {
  const [dates, setDates] = useState<Dates>({ startDate: null, endDate: null });

  return (
    <div>
      <RangeDatePicker
        withPortal
        startDate={dates.startDate}
        endDate={dates.endDate}
        onDatesChange={setDates}
      />
    </div>
  );
};
WithPortal.decorators = storyDecorators;

export const MinimumNights = () => {
  const [dates, setDates] = useState<Dates>({ startDate: null, endDate: null });

  return (
    <RangeDatePicker
      minimumNights={3}
      onDatesChange={setDates}
      startDate={dates.startDate}
      endDate={dates.endDate}
    />
  );
};
MinimumNights.decorators = storyDecorators;

export const HandleDirectInputChange = () => {
  const [dates, setDates] = useState<Dates>({ startDate: null, endDate: null });

  const [values, setValues] = useState<[string, string]>(['', '']);
  const validateHandler = useCallback(
    (startDateValue: string, endDateValue: string): void => {
      setValues([startDateValue, endDateValue]);
    },
    [setValues],
  );

  return (
    <div className="sb-col">
      <div
        style={{
          color: '#4b5750',
          backgroundColor: '#fff',
          width: '220px',
          borderRadius: '5px',
          border: '1px solid #e2e2e2',
          padding: '5px 10px',
          margin: 0,
        }}
      >
        <div className="sb-col">
          <span style={{ fontWeight: 500 }}>Значения для валидации</span>
          <span>{`startDate: ${values[0] || '-'}`}</span>
          <span>{`endDate: ${values[1] || '-'}`}</span>
        </div>
      </div>
      <div className="sb-row">
        <RangeDatePicker
          onDatesChange={setDates}
          startDate={dates.startDate}
          endDate={dates.endDate}
          validate={validateHandler}
        />
      </div>
    </div>
  );
};

HandleDirectInputChange.storyName = 'Handle direct input value change';

export const TwoWeekIntervalInPast = () => {
  const INTERVAL = 14; // Set interval in days

  const [{ startDate, endDate }, setDates] = useState<Dates>({ startDate: null, endDate: null });
  const [focusedInput, onFocusChange] = useState<'startDate' | 'endDate' | null>(null);

  const isOutsideRange = useCallback(
    (day: Moment): boolean => {
      if (day.isAfter(moment(), 'day')) return true;
      if (startDate && focusedInput === 'endDate')
        return day.isAfter(startDate?.clone().add(INTERVAL - 1, 'days'), 'day');
      if (!startDate && endDate && focusedInput === 'startDate')
        return day.isBefore(endDate?.clone().subtract(INTERVAL - 1, 'days'), 'day');
      return false;
    },
    [focusedInput, startDate, endDate],
  );

  const onDatesChange = useCallback((dates: Dates) => {
    const { startDate: nextStartDate } = dates;
    let { endDate: nextEndDate } = dates;
    if (nextStartDate && nextEndDate) {
      nextEndDate = moment.min(nextEndDate, nextStartDate?.clone().add(INTERVAL - 1, 'days'));
    }
    setDates({ startDate: nextStartDate, endDate: nextEndDate });
  }, []);

  return (
    <RangeDatePicker
      startDate={startDate}
      endDate={endDate}
      onDatesChange={onDatesChange}
      isOutsideRange={isOutsideRange}
      focusedInput={focusedInput}
      onFocusChange={onFocusChange}
    />
  );
};
TwoWeekIntervalInPast.decorators = storyDecorators;

export const WithError = () => {
  const [dates, setDates] = useState<Dates>({ startDate: null, endDate: null });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!dates.startDate || !dates.endDate) setError('Выберите корректный интервал дат');
    if (error && dates.startDate && dates.endDate) {
      setError('');
    }
  }, [dates, error]);

  return (
    <RangeDatePicker
      error={error}
      startDate={dates.startDate}
      endDate={dates.endDate}
      onDatesChange={setDates}
    />
  );
};
WithError.decorators = storyDecorators;

export const LabeledRow = () => {
  const [dates, setDates] = useState<Dates>({ startDate: null, endDate: null });

  return (
    <RangeDatePicker
      startDate={dates.startDate}
      endDate={dates.endDate}
      onDatesChange={setDates}
      label="Название поля"
      direction="row"
    />
  );
};
LabeledRow.decorators = storyDecorators;

export const LabeledColumn = () => {
  const [dates, setDates] = useState<Dates>({ startDate: null, endDate: null });

  return (
    <RangeDatePicker
      startDate={dates.startDate}
      endDate={dates.endDate}
      onDatesChange={setDates}
      label="Название поля"
    />
  );
};
LabeledColumn.decorators = storyDecorators;

const days = 6;
export const DateOffset = () => {
  const [dates, setDates] = useState<Dates>({ startDate: null, endDate: null });
  const handleOffset = useCallback((day: Moment) => day.add(days, 'days'), []);

  return (
    <RangeDatePicker
      endDateOffset={handleOffset}
      startDate={dates.startDate}
      endDate={dates.endDate}
      onDatesChange={setDates}
    />
  );
};
DateOffset.decorators = storyDecorators;

export const Stretching = () => {
  const [widthList] = useState([100, 210, 300, 400, 500, '100%']);
  const [dates, setDates] = useState<Dates>({ startDate: null, endDate: null });

  return (
    <div className="sb-col">
      {widthList.map((width) => (
        <div key={width} style={{ width }}>
          <RangeDatePicker
            startDate={dates.startDate}
            endDate={dates.endDate}
            onDatesChange={setDates}
          />
        </div>
      ))}
    </div>
  );
};

export const Disabled = () => {
  const [dates, setDates] = useState<Dates>({
    startDate: moment(),
    endDate: moment().add({ days: 5 }),
  });

  return (
    <RangeDatePicker
      startDate={dates.startDate}
      endDate={dates.endDate}
      onDatesChange={setDates}
      disabled
    />
  );
};

export const DatePickerWithRef = () => {
  const [dates, setDates] = useState<Dates>({
    startDate: moment(),
    endDate: moment().add({ days: 5 }),
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
      <RangeDatePicker
        startDate={dates.startDate}
        endDate={dates.endDate}
        onDatesChange={setDates}
        ref={ref}
      />
      <Button style={{ marginTop: '10px' }} onClick={toggleLabelToggled}>
        Нажми меня и появится тень
      </Button>
    </div>
  );
};
Disabled.decorators = storyDecorators;
