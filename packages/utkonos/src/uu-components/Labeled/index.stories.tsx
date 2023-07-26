import React, { useRef, useEffect } from 'react';
import type { Moment } from 'moment';
import { nanoid } from 'nanoid';
import { useBooleanState } from '@relotus/hooks';
import { Labeled } from '.';
import { SingleDatePicker } from '../SingleDatePicker';
import { Input } from '../Input';
import { Button } from '../Button';

export default {
  title: 'Controls/Labeled',
  component: Labeled,
};

export const Preview = () => {
  const [idX] = React.useState(nanoid);
  const [idY] = React.useState(nanoid);
  const [date, setDate] = React.useState<Moment | null>(null);

  return (
    <div className="sb-col">
      <div className="sb-row">
        <Labeled label="Название поля" id={idY}>
          <SingleDatePicker id={idY} date={date} onDateChange={setDate} />
        </Labeled>
      </div>
      <div className="sb-row">
        <Labeled label="Название поля" id={idX} direction="row">
          <SingleDatePicker id={idX} date={date} onDateChange={setDate} />
        </Labeled>
      </div>
    </div>
  );
};

export const Required = () => {
  const [idX] = React.useState(nanoid);
  const [idY] = React.useState(nanoid);

  return (
    <div className="sb-col">
      <div className="sb-row">
        <Labeled label="Название поля" id={idY} required>
          <Input id={idY} />
        </Labeled>
      </div>
      <div className="sb-row">
        <Labeled label="Название поля" id={idX} direction="row" required>
          <Input id={idX} />
        </Labeled>
      </div>
    </div>
  );
};

export const WithProxyClassName = () => {
  const [id] = React.useState(nanoid);
  return (
    <div className="sb-col">
      <div className="sb-row">
        <Labeled id={id} className="proxyClassName">
          <div id={id} className="ownClassName">
            Без лейбла
          </div>
        </Labeled>
      </div>
    </div>
  );
};

export const Hint = () => {
  const [idX] = React.useState(nanoid);
  const [idY] = React.useState(nanoid);

  return (
    <div className="sb-col">
      <div className="sb-row">
        <Labeled label="Название поля" id={idY} required hint="Hint">
          <Input id={idY} />
        </Labeled>
      </div>
      <div className="sb-row">
        <Labeled label="Название поля" id={idX} direction="row" required hint="Hint">
          <Input id={idX} />
        </Labeled>
      </div>
    </div>
  );
};

export const LabeledButtonWithRef = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [labelToggled, , , toggleLabelToggled] = useBooleanState(false);

  useEffect(() => {
    ref.current?.setAttribute(
      'style',
      labelToggled ? 'box-shadow: none' : 'box-shadow: 0 0 5px 5px black; border-radius: 5px;',
    );
  }, [labelToggled, ref]);

  return (
    <Labeled id="123" ref={ref} label="Лейбл получает тень при клике на кнопку">
      <Button style={{ marginTop: '10px' }} onClick={toggleLabelToggled}>
        Нажми меня
      </Button>
    </Labeled>
  );
};

WithProxyClassName.storyName = 'WithProxyClassName';
