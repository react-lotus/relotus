import React, { useState, useCallback, createRef, Component } from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import moment, { Moment } from 'moment';
import 'moment/locale/ru';
import { SingleDatePickerShape } from 'react-dates';
import { SingleDatePicker } from '..';
import type { SingleDatePickerProps } from '..';
import { Button } from '../..';

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

const SingleDatePickerWrapper = (props: Partial<SingleDatePickerProps>) => {
  const [fallbackDate, setFallbackDate] = useState(moment('01.10.2020', 'DD.MM.YYYY'));
  const fallbackOnDateChange = useCallback((newDate) => setFallbackDate(newDate), []);

  const { date = fallbackDate, onDateChange = fallbackOnDateChange, ...rest } = props;

  return <SingleDatePicker date={date} onDateChange={onDateChange} {...rest} />;
};

describe('SingleDatePicker component', () => {
  const onDateChange = jest.fn();

  // hide console.warn due to not recommended for use `react-dates` methods
  jest.spyOn(global.console, 'warn').mockImplementation(jest.fn());
  afterEach(() => onDateChange.mockClear());

  it('should render without errors', () => {
    render(<SingleDatePicker date={moment()} onDateChange={onDateChange} />);
  });

  it('should open the calendar, select a day and change the date', () => {
    render(
      <SingleDatePicker date={moment('01.10.2020', 'DD.MM.YYYY')} onDateChange={onDateChange} />,
    );

    const singleDatePickerInput = screen.getByLabelText(/Дата/);
    expect(singleDatePickerInput).toBeTruthy();

    // will focus the input and show the calendar
    fireEvent.focus(singleDatePickerInput);

    // `getByLabelText` will find an element with aria-label attribute
    const calendar = screen.getByLabelText('Calendar');
    expect(calendar).toBeTruthy();

    const day = screen.getByLabelText(/05.10.2020/);
    fireEvent.click(day);

    // the calendar will be closed after the day selection
    expect(calendar).not.toBeInTheDocument();
    // date selection will trigger `onDateChange` callback
    expect(onDateChange).toBeCalledTimes(1);
  });

  it('should not change date when the date is outside range', () => {
    render(
      <SingleDatePicker
        isOutsideRange={(day: Moment): boolean =>
          day.isAfter(moment('03.10.2020', 'DD.MM.YYYY'), 'day')
        }
        date={moment('01.10.2020', 'DD.MM.YYYY')}
        onDateChange={onDateChange}
      />,
    );

    const singleDatePickerInput = screen.getByLabelText(/Дата/);

    // will focus the input and show the calendar
    fireEvent.focus(singleDatePickerInput);

    const dayOutsideRange = screen.getByLabelText(/Not available. 11.10.2020/);
    fireEvent.click(dayOutsideRange);

    // `getByLabelText` will find an element with aria-label attribute
    const calendar = screen.getByLabelText('Calendar');
    // the calendar will be open - the clicked date is not available
    expect(calendar).toBeInTheDocument();
    // `onDateChange` callback will not be called
    expect(onDateChange).toBeCalledTimes(0);
  });

  it('should not close calendar on `dateChange`', () => {
    render(<SingleDatePickerWrapper keepOpenOnDateSelect />);

    const singleDatePickerInput = screen.getByLabelText(/Дата/);

    fireEvent.focus(singleDatePickerInput);

    let day = screen.getByLabelText(/05.10.2020/);
    fireEvent.click(day);

    const calendar = screen.getByLabelText('Calendar');
    expect(calendar).toBeInTheDocument();

    expect((singleDatePickerInput as HTMLInputElement).value).toBe('05.10.2020');

    day = screen.getByLabelText(/07.10.2020/);
    fireEvent.click(day);

    expect((singleDatePickerInput as HTMLInputElement).value).toBe('07.10.2020');
  });

  it('Ref provided correctly', async () => {
    const handleFocusChange = jest.fn();
    const Wrapper = () => {
      const [date, setDate] = useState<Moment | null>(null);
      const ref = createRef<Component<SingleDatePickerShape, never, never>>();
      const handleClick = () => {
        ref.current?.props?.onFocusChange({ focused: true });
      };
      return (
        <div className="sb-col">
          <div className="sb-row">
            <SingleDatePicker
              label="Название поля"
              date={date}
              onDateChange={setDate}
              ref={ref}
              onFocusChange={handleFocusChange}
            />
          </div>
          <Button onClick={handleClick} data-testid="button">
            Нажми меня
          </Button>
        </div>
      );
    };

    render(<Wrapper />);

    const FocusButton = screen.getByTestId('button');

    await waitFor(() => fireEvent.click(FocusButton));

    expect(FocusButton).not.toBeNull();
    expect(handleFocusChange).toBeCalledTimes(1);
  });
});
