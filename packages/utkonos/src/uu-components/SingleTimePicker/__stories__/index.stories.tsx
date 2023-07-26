import React, { useRef, useEffect, useState } from 'react';
import moment, { Moment } from 'moment';
import type { Meta } from '@storybook/react/types-6-0';
import { useBooleanState } from '@relotus/hooks';
import { SingleDatePicker } from '../../SingleDatePicker';
import { Text } from '../../Text';
import { SingleTimePicker } from '..';

import styles from './index.module.scss';
import { Button } from '../../Button';

export default {
  title: 'Controls/SingleTimePicker',
  component: SingleTimePicker,
};

const storyDecorators: Meta['decorators'] = [
  (Story) => (
    <div className={styles.root}>
      <Story />
    </div>
  ),
];

export const Preview = () => {
  const [time, setTime] = useState<Moment | null>(null);

  return <SingleTimePicker time={time} onTimeChange={setTime} />;
};
Preview.decorators = storyDecorators;

export const WithLabel = () => {
  const [time, setTime] = useState<Moment | null>(null);

  return <SingleTimePicker label="My super label" time={time} onTimeChange={setTime} />;
};
WithLabel.decorators = storyDecorators;

export const Disabled = () => {
  const [time, setTime] = useState<Moment | null>(moment({ hour: 10 }));

  return <SingleTimePicker time={time} onTimeChange={setTime} disabled />;
};
Disabled.decorators = storyDecorators;

export const SingleDateTime = () => {
  const [date, setDate] = useState<Moment | null>(null);

  return (
    <div className={styles.dateTimeRoot}>
      <SingleDatePicker date={date} onDateChange={setDate} />
      <SingleTimePicker time={date} onTimeChange={setDate} />
      <Text>{date?.format('DD.MM.YYYY  HH:mm') || ' - '}</Text>
    </div>
  );
};

export const SingleTimePickerWithRef = () => {
  const [date, setDate] = useState<Moment | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [labelToggled, , , toggleLabelToggled] = useBooleanState(false);

  useEffect(() => {
    ref.current?.setAttribute(
      'style',
      !labelToggled ? 'box-shadow: none' : 'box-shadow: 0 0 5px 5px black; border-radius: 5px;',
    );
  }, [labelToggled, ref]);

  return (
    <div className="sb-col">
      <div className="sb-row">
        <SingleTimePicker label="Название поля" time={date} onTimeChange={setDate} ref={ref} />
      </div>
      <Button onClick={toggleLabelToggled}>Нажми меня</Button>
    </div>
  );
};
SingleDateTime.decorators = storyDecorators;
