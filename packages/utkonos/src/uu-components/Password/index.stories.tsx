import React, { useRef } from 'react';
import { Password } from '.';
import { Button } from '../Button';

export default {
  title: 'Controls/Password',
  component: Password,
};

export const Preview = () => (
  <div className="sb-inputWrapper">
    <Password name="pass" placeholder="Введите пароль" />
  </div>
);

export const Disabled = () => (
  <div className="sb-inputWrapper">
    <Password name="pass" placeholder="Введите пароль" disabled />
  </div>
);

export const LabeledColumn = () => (
  <div className="sb-inputWrapper">
    <Password label="Название поля сверху" name="pass" placeholder="Введите пароль" />
  </div>
);

export const LabeledRow = () => (
  <div className="sb-inputWrapper">
    <Password label="Название поля" direction="row" name="pass" placeholder="Введите пароль" />
  </div>
);

export const Error = () => (
  <div className="sb-inputWrapper">
    <Password error="Ошибка" />
  </div>
);

export const PasswordWithRef = () => {
  const ref = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    ref.current?.focus();
  };

  return (
    <div className="sb-inputWrapper">
      <Password
        label="Название поля"
        ref={ref}
        direction="row"
        name="pass"
        placeholder="Введите пароль"
      />
      <Button style={{ marginTop: '20px' }} onClick={handleClick}>
        Нажми меня и сфокусируешься на инпуте
      </Button>
    </div>
  );
};
