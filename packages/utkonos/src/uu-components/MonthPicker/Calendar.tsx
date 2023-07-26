import React from 'react';
import type { FC, ReactElement } from 'react';
import cn from 'classnames';
import OutsideClickHandler from 'react-outside-click-handler';
import type { MonthPickerProps } from '.';
import { Directions, months } from './utils';
import { Button } from '../Button';
import { Popover } from '../Popover';
import prevIcon from '../_datepicker/assets/prev-arrow.svg';
import nextIcon from '../_datepicker/assets/next-arrow.svg';
import './Calendar.scss';

interface Props {
  value: MonthPickerProps['value'];
  isOpen: boolean;
  calendarYear: number;
  handleClickMonth: (month: number) => () => void;
  handleClickYearDirection: (direction: Directions) => () => void;
  handleClose: () => void;
  children: ReactElement;
}

export const Calendar: FC<Props> = ({
  value,
  isOpen,
  children,
  calendarYear,
  handleClickMonth,
  handleClickYearDirection,
  handleClose,
}) => {
  return (
    <Popover
      open={isOpen}
      offset={0}
      placement="bottom-start"
      className="uu-monthPicker__calendar"
      content={
        <OutsideClickHandler onOutsideClick={handleClose}>
          <section className="uu-monthPicker__calendarWrapper">
            <header className="uu-monthPicker__calendarHead">
              <Button
                square
                view="link"
                title="Предыдущий год"
                onClick={handleClickYearDirection(Directions.prev)}
                className="uu-monthPicker__calendarButtonArrow"
              >
                <img src={prevIcon} alt="Назад" />
              </Button>
              <span className="uu-monthPicker__calendarYear">{calendarYear}</span>
              <Button
                square
                view="link"
                title="Cледующий год"
                onClick={handleClickYearDirection(Directions.next)}
                className="uu-monthPicker__calendarButtonArrow"
              >
                <img src={nextIcon} alt="Вперед" />
              </Button>
            </header>
            <main className="uu-monthPicker__calendarMain">
              {months.map(({ monthName, monthValue }) => {
                const isActive = value.month === monthValue && value.year === calendarYear;
                return (
                  <Button
                    key={monthValue}
                    view="light"
                    className={cn('uu-monthPicker__calendarMonth', {
                      'uu-monthPicker__calendarMonth_active': isActive,
                    })}
                    onClick={handleClickMonth(monthValue)}
                  >
                    {monthName}
                  </Button>
                );
              })}
            </main>
          </section>
        </OutsideClickHandler>
      }
    >
      {children}
    </Popover>
  );
};
