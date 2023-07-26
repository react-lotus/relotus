import React, { createRef, useState } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import moment, { Moment } from 'moment';
import 'moment/locale/ru';
import { RangeDatePicker } from '..';
import type { Dates, RangeDatePickerProps } from '..';

moment.locale('ru-Ru');

/*
 * hack to prevent error in the console due to `getComputedStyle` function
 * https://github.com/airbnb/react-dates/issues/1426
 * */
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  }),
});

const RangeDatePickerWrapper = (props: Partial<RangeDatePickerProps>) => {
  const [dates, setDates] = useState<Dates>({
    startDate: moment('01.10.2020', 'DD.MM.YYYY'),
    endDate: moment('10.10.2020', 'DD.MM.YYYY'),
  });

  return (
    <RangeDatePicker
      startDate={dates.startDate}
      endDate={dates.endDate}
      onDatesChange={setDates}
      {...props}
    />
  );
};

describe('RangeDatePicker component', () => {
  const onDatesChange = jest.fn();

  // hide console.warn due to not recommended for use `react-dates` methods
  jest.spyOn(global.console, 'warn').mockImplementation(jest.fn());
  afterEach(() => onDatesChange.mockClear());

  it('should render without errors', () => {
    render(
      <RangeDatePicker startDate={moment()} endDate={moment()} onDatesChange={onDatesChange} />,
    );
  });

  it('should open the calendar, select a day and change the date', () => {
    render(
      <RangeDatePicker
        startDate={moment('01.10.2020', 'DD.MM.YYYY')}
        endDate={moment('11.10.2020', 'DD.MM.YYYY')}
        onDatesChange={onDatesChange}
      />,
    );

    const inputs = screen.getAllByLabelText(/Дата/);
    expect(inputs).toBeTruthy();

    // will focus the input and show the calendar
    fireEvent.focus(inputs[0]);

    // `getByLabelText` will find an element with aria-label attribute
    const calendar = screen.getByLabelText(/Calendar/);
    expect(calendar).toBeTruthy();

    let day = screen.getByLabelText(/, 5 октября 2020 г/);
    fireEvent.click(day);

    day = screen.getByLabelText(/среда, 7 октября 2020 г/);
    fireEvent.click(day);

    // the calendar will be closed after the day selection
    expect(calendar).not.toBeInTheDocument();
    // date selection will trigger `onDatesChange` callback
    expect(onDatesChange).toBeCalledTimes(2);
  });

  it('should not change date when the date is outside range', () => {
    render(
      <RangeDatePicker
        isOutsideRange={(day: Moment): boolean =>
          day.isAfter(moment('03.10.2020', 'DD.MM.YYYY'), 'day')
        }
        startDate={moment('01.10.2020', 'DD.MM.YYYY')}
        endDate={moment('10.10.2020', 'DD.MM.YYYY')}
        onDatesChange={onDatesChange}
      />,
    );

    const inputs = screen.getAllByLabelText(/Дата/);

    // will focus the input and show the calendar
    fireEvent.focus(inputs[0]);

    const dayOutsideRange = screen.getByLabelText(/Not available. воскресенье, 11 октября 2020 г/);
    fireEvent.click(dayOutsideRange);

    // `getByLabelText` will find an element with aria-label attribute
    const calendar = screen.getByLabelText(/Calendar/);
    // the calendar will be open - the clicked date is not available
    expect(calendar).toBeInTheDocument();
    // `onDatesChange` callback will not be called
    expect(onDatesChange).toBeCalledTimes(0);
  });

  it('should not close calendar on `dateChange`', () => {
    render(<RangeDatePickerWrapper keepOpenOnDateSelect />);

    const inputs = screen.getAllByLabelText(/Дата/);

    fireEvent.focus(inputs[0]);

    let day = screen.getByLabelText(/, 5 октября 2020 г/);
    fireEvent.click(day);

    const calendar = screen.getByLabelText(/Calendar/);
    expect(calendar).toBeInTheDocument();

    expect((inputs[0] as HTMLInputElement).value).toBe('05.10.2020');

    day = screen.getByLabelText(/среда, 7 октября 2020 г/);
    fireEvent.click(day);

    expect((inputs[1] as HTMLInputElement).value).toBe('07.10.2020');
    expect(calendar).toBeInTheDocument();

    // second lap of the dates selection
    day = screen.getByLabelText(/, 4 октября 2020 г/);
    fireEvent.click(day);
    expect((inputs[0] as HTMLInputElement).value).toBe('04.10.2020');

    day = screen.getByLabelText(/30 октября 2020 г/);
    fireEvent.click(day);
    expect((inputs[1] as HTMLInputElement).value).toBe('30.10.2020');
  });

  it('Ref provided correctly', () => {
    const wrapperRef = createRef<HTMLDivElement>();
    const ref = createRef<HTMLDivElement>();
    render(
      <div ref={wrapperRef}>
        <RangeDatePicker
          startDate={moment()}
          endDate={moment()}
          onDatesChange={onDatesChange}
          ref={ref}
        />
      </div>,
    );
    expect(wrapperRef.current).toContainElement(ref.current);
  });
});
