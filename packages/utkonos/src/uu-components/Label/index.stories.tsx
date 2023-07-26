import { useBooleanState } from '@relotus/hooks';
import React, { useRef, useEffect } from 'react';
import { Label } from '.';
import { Button } from '../Button';

export default {
  title: 'Typography/Label',
  component: Label,
};

export const Preview = () => <Label htmlFor="123">Название поля</Label>;

export const Required = () => (
  <Label htmlFor="123" required>
    Обязательное поле
  </Label>
);

export const LabelWithRef = () => {
  const ref = useRef<HTMLLabelElement>(null);
  const [labelToggled, , , toggleLabelToggled] = useBooleanState(false);

  useEffect(() => {
    ref.current?.setAttribute('style', labelToggled ? 'color: blue' : 'color: red');
  }, [labelToggled, ref]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <Label htmlFor="123" ref={ref}>
        Лейбл меняет цвет при клике на кнопку
      </Label>
      <Button style={{ marginTop: '10px' }} onClick={toggleLabelToggled}>
        Нажми меня
      </Button>
    </div>
  );
};
