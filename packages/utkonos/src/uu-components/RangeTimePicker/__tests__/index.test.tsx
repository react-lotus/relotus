import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import moment from 'moment';
import 'moment/locale/ru';
import { RangeTimePicker } from '..';

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

describe('RangeDatePicker component', () => {
  const onDatesChange = jest.fn();

  // hide console.warn due to not recommended for use `react-dates` methods
  jest.spyOn(global.console, 'warn').mockImplementation(jest.fn());
  afterEach(() => onDatesChange.mockClear());

  it('should render without errors', () => {
    render(
      <RangeTimePicker startTime={moment()} endTime={moment()} onTimesChange={onDatesChange} />,
    );
  });

  it('Ref provided correctly', () => {
    const wrapperRef = createRef<HTMLDivElement>();
    const ref = createRef<HTMLDivElement>();
    render(
      <div ref={wrapperRef}>
        <RangeTimePicker
          startTime={moment()}
          endTime={moment()}
          onTimesChange={onDatesChange}
          ref={ref}
        />
      </div>,
    );
    expect(wrapperRef.current).toContainElement(ref.current);
  });
});
