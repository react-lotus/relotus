import React, { ReactNode } from 'react';
import type { Moment } from 'moment';
import { ReactComponent as PrevArrow } from './assets/prev-arrow.svg';
import { ReactComponent as NextArrow } from './assets/next-arrow.svg';
import { ReactComponent as CalendarIcon } from './assets/calendar.svg';

export * from './defaultPhrases';

export const NAV_PREV = <PrevArrow className="SingleDatePicker_prevArrow" />;
export const NAV_NEXT = <NextArrow className="SingleDatePicker_nextArrow" />;
export const INPUT_ICON = <CalendarIcon />;

export const IS_DAY_HIGHLIGHTED = (d: Moment): boolean => {
  return d.isSame(new Date(), 'day');
};

export const IS_OUTSIDE_RANGE = (): boolean => false;

export function stringifyDate(date: Moment | null): string {
  return date ? date.format('L') : '';
}

export function jsxToString(jsx: ReactNode, defaultValue?: string): string | undefined {
  if (typeof jsx !== 'object' && !!jsx) return String(jsx);
  return defaultValue;
}
