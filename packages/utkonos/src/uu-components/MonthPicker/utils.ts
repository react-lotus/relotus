import type { MonthPickerValue } from '.';

const MIN_YEAR = 1900;
const MAX_YEAR = 2100;

export enum Directions {
  'prev' = 'prev',
  'next' = 'next',
}

export const monthsRus = [
  'январь',
  'февраль',
  'март',
  'апрель',
  'май',
  'июнь',
  'июль',
  'август',
  'сентябрь',
  'октябрь',
  'ноябрь',
  'декабрь',
];

export const months = monthsRus.map((monthName, idx) => ({ monthName, monthValue: idx }));

export const getNextYear = (year: number): number => (year < MAX_YEAR ? year + 1 : MAX_YEAR);

export const getPrevYear = (year: number): number => (year > MIN_YEAR ? year - 1 : MIN_YEAR);

export const getNextValue = (oldValue: MonthPickerValue): MonthPickerValue => {
  const isLastMonth = oldValue.month === 11;
  return {
    month: isLastMonth ? 0 : oldValue.month + 1,
    year: isLastMonth ? oldValue.year + 1 : oldValue.year,
  };
};

export const getPrevValue = (oldValue: MonthPickerValue): MonthPickerValue => {
  const isFirstMonth = oldValue.month === 0;
  return {
    month: isFirstMonth ? 11 : oldValue.month - 1,
    year: isFirstMonth ? oldValue.year - 1 : oldValue.year,
  };
};
