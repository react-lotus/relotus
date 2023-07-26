import React from 'react';
import type { FC } from 'react';
import cn from 'classnames';
import { Button } from '../Button';
import arrowRightIcon from './assets/arrow-right.svg';
import './MonthArrowButton.scss';

interface Props {
  onClick: () => void;
  isPrev?: boolean;
}

export const MonthArrowButton: FC<Props> = ({ onClick, isPrev }) => (
  <Button
    small
    square
    view="link"
    onClick={onClick}
    title={isPrev ? 'Предыдущий месяц' : 'Следующий месяц'}
    className={cn([
      'uu-monthPicker__monthArrowButton',
      { 'uu-monthPicker__monthArrowButton_prev': isPrev },
    ])}
  >
    <img width={14} height={14} src={arrowRightIcon} alt={isPrev ? 'Назад' : 'Вперед'} />
  </Button>
);
