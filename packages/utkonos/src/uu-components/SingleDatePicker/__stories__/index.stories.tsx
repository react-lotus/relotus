import React, { Component, useRef, useEffect, useState } from 'react';
import moment, { Moment } from 'moment';
import type { Meta } from '@storybook/react/types-6-0';
import { SingleDatePickerShape } from 'react-dates';
import { SingleDatePicker } from '..';
import { Button } from '../../Button';

export default {
  title: 'Controls/SingleDatePicker',
  component: SingleDatePicker,
};

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
  const [date, setDate] = useState<Moment | null>(null);

  return <SingleDatePicker date={date} onDateChange={setDate} />;
};
Preview.decorators = storyDecorators;

export const IsOutsideRange = () => {
  const [date, setDate] = useState<Moment | null>(null);

  const rangeFunc = (startDate: Moment, endDate: Moment) => (d: Moment) => {
    return d.startOf('day').isBefore(startDate.startOf('day')) || d.isAfter(endDate.endOf('day'));
  };

  return (
    <SingleDatePicker
      date={date}
      isOutsideRange={rangeFunc(moment(), moment().add({ days: 14 }))}
      onDateChange={setDate}
    />
  );
};
IsOutsideRange.decorators = storyDecorators;
IsOutsideRange.storyName = 'isOutsideRange';

export const ReadOnly = () => {
  const [date, setDate] = useState<Moment | null>(null);

  return <SingleDatePicker readOnly date={date} onDateChange={setDate} />;
};
ReadOnly.decorators = storyDecorators;

export const KeepOpenOnDateSelect = () => {
  const [date, setDate] = useState<Moment | null>(null);

  return <SingleDatePicker keepOpenOnDateSelect date={date} onDateChange={setDate} />;
};
KeepOpenOnDateSelect.decorators = storyDecorators;
KeepOpenOnDateSelect.storyName = 'Does not autoclose the DayPicker on date selection';

export const AppendToBody = () => {
  const [date, setDate] = useState<Moment | null>(null);

  return <SingleDatePicker appendToBody date={date} onDateChange={setDate} />;
};
AppendToBody.decorators = storyDecorators;

export const WithPortal = () => {
  const [date, setDate] = useState<Moment | null>(null);

  return <SingleDatePicker withPortal date={date} onDateChange={setDate} />;
};
WithPortal.decorators = storyDecorators;

export const HandleDirectInputChange = () => {
  const [date, setDate] = useState<Moment | null>(null);
  const [value, setValue] = useState<string>('');

  return (
    <div className="sb-col">
      <div
        style={{
          color: '#4b5750',
          backgroundColor: '#fff',
          width: '270px',
          borderRadius: '5px',
          border: '1px solid #e2e2e2',
          padding: '5px 10px',
          margin: 0,
        }}
      >
        <span style={{ fontWeight: 500 }}>Значение для валидации: </span>
        <span>{value || '-'}</span>
      </div>
      <div className="sb-row">
        <SingleDatePicker onDateChange={setDate} date={date} validate={setValue} />
      </div>
    </div>
  );
};
HandleDirectInputChange.storyName = 'Handle direct input value change';

export const WithError = () => {
  const [date, setDate] = useState<Moment | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!date) setError('Выберите дату');
    if (error && date) setError('');
  }, [date, error]);

  return (
    <SingleDatePicker errorPlacement="bottom" error={error} date={date} onDateChange={setDate} />
  );
};
WithError.decorators = storyDecorators;

export const LabeledRow = () => {
  const [date, setDate] = useState<Moment | null>(null);

  return (
    <div className="sb-col">
      <div className="sb-row">
        <SingleDatePicker
          label="Название поля"
          direction="row"
          date={date}
          onDateChange={setDate}
        />
      </div>
    </div>
  );
};
LabeledRow.decorators = storyDecorators;

export const LabeledColumn = () => {
  const [date, setDate] = useState<Moment | null>(null);

  return (
    <div className="sb-col">
      <div className="sb-row">
        <SingleDatePicker label="Название поля" date={date} onDateChange={setDate} />
      </div>
    </div>
  );
};
LabeledColumn.decorators = storyDecorators;

export const Stretching = () => {
  const [widthList] = useState([100, 120, 200, 300, 400, '100%']);
  const [date, setDate] = useState<Moment | null>(null);

  return (
    <div className="sb-col">
      {widthList.map((width) => (
        <div key={width} style={{ width }}>
          <SingleDatePicker date={date} onDateChange={setDate} />
        </div>
      ))}
    </div>
  );
};

export const Disabled = () => {
  const [date, setDate] = useState<Moment | null>(moment);
  return <SingleDatePicker date={date} onDateChange={setDate} disabled />;
};

export const SingleDatePickerWithRef = () => {
  const [date, setDate] = useState<Moment | null>(null);
  const ref = useRef<Component<SingleDatePickerShape, never, never>>(null);
  const handleClick = () => {
    ref.current?.props?.onFocusChange({ focused: true });
  };

  return (
    <div className="sb-col">
      <div className="sb-row">
        <SingleDatePicker label="Название поля" date={date} onDateChange={setDate} ref={ref} />
      </div>
      <Button onClick={handleClick}>Нажми меня</Button>
    </div>
  );
};

Disabled.decorators = storyDecorators;
