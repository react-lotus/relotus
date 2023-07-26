import type {
  CalendarDayPhrases,
  DateRangePickerInputPhrases,
  DateRangePickerPhrases,
  DayPickerKeyboardShortcutsPhrases,
  DayPickerNavigationPhrases,
  DayPickerPhrases,
  SingleDatePickerPhrases,
  SingleDatePickerInputPhrases,
} from 'react-dates';

const calendarLabel = 'Calendar';
const roleDescription = 'datepicker';
const closeDatePicker = 'Close';
const focusStartDate = 'Interact with the calendar and add the check-in date for your trip.';
const clearDate = 'Clear Date';
const clearDates = 'Clear Dates';
const jumpToPrevMonth = 'Move backward to switch to the previous month.';
const jumpToNextMonth = 'Move forward to switch to the next month.';
const keyboardShortcuts = 'Горячие клавиши';
const showKeyboardShortcutsPanel = 'Open the keyboard shortcuts panel.';
const hideKeyboardShortcutsPanel = 'Close the shortcuts panel.';
const openThisPanel = 'Открыть это окно';
const enterKey = 'Enter key';
const leftArrowRightArrow = 'Right and left arrow keys';
const upArrowDownArrow = 'up and down arrow keys';
const pageUpPageDown = 'page up and page down keys';
const homeEnd = 'Home and end keys';
const escape = 'Escape key';
const questionMark = 'Question mark';
const selectFocusedDate = 'Фокус на инпут даты';
const moveFocusByOneDay = 'Переместить фокус на один день';
const moveFocusByOneWeek = 'Переместить фокус на одну неделю';
const moveFocusByOneMonth = 'Переместить фокус на один месяц';
const moveFocustoStartAndEndOfWeek = 'Переместить фокус к началу или к концу недели';
const returnFocusToInput = 'Вернуть фокус на инпут';
const keyboardForwardNavigationInstructions =
  'Navigate forward to interact with the calendar and select a date. Press the question mark key to get the keyboard shortcuts for changing dates.';
const keyboardBackwardNavigationInstructions =
  'Navigate backward to interact with the calendar and select a date. Press the question mark key to get the keyboard shortcuts for changing dates.';

type PhraseArg = { date: string };
const chooseAvailableStartDate = ({ date }: PhraseArg) =>
  `Choose ${date} as your check-in date. It’s available.`;
const chooseAvailableEndDate = ({ date }: PhraseArg) =>
  `Choose ${date} as your check-out date. It’s available.`;
const chooseAvailableDate = ({ date }: PhraseArg) => date;
const dateIsUnavailable = ({ date }: PhraseArg) => `Not available. ${date}`;
const dateIsSelected = ({ date }: PhraseArg) => `Selected. ${date}`;
const dateIsSelectedAsStartDate = ({ date }: PhraseArg) => `Selected as start date. ${date}`;
const dateIsSelectedAsEndDate = ({ date }: PhraseArg) => `Selected as end date. ${date}`;

export default {
  calendarLabel,
  roleDescription,
  closeDatePicker,
  focusStartDate,
  clearDate,
  clearDates,
  jumpToPrevMonth,
  jumpToNextMonth,
  keyboardShortcuts,
  showKeyboardShortcutsPanel,
  hideKeyboardShortcutsPanel,
  openThisPanel,
  enterKey,
  leftArrowRightArrow,
  upArrowDownArrow,
  pageUpPageDown,
  homeEnd,
  escape,
  questionMark,
  selectFocusedDate,
  moveFocusByOneDay,
  moveFocusByOneWeek,
  moveFocusByOneMonth,
  moveFocustoStartAndEndOfWeek,
  returnFocusToInput,
  keyboardForwardNavigationInstructions,
  keyboardBackwardNavigationInstructions,

  chooseAvailableStartDate,
  chooseAvailableEndDate,
  dateIsUnavailable,
  dateIsSelected,
  dateIsSelectedAsStartDate,
  dateIsSelectedAsEndDate,
};

export const dateRangePickerPhrases: Required<DateRangePickerPhrases> = {
  calendarLabel,
  roleDescription,
  closeDatePicker,
  clearDates,
  focusStartDate,
  jumpToPrevMonth,
  jumpToNextMonth,
  keyboardShortcuts,
  showKeyboardShortcutsPanel,
  hideKeyboardShortcutsPanel,
  openThisPanel,
  enterKey,
  leftArrowRightArrow,
  upArrowDownArrow,
  pageUpPageDown,
  homeEnd,
  escape,
  questionMark,
  selectFocusedDate,
  moveFocusByOneDay,
  moveFocusByOneWeek,
  moveFocusByOneMonth,
  moveFocustoStartAndEndOfWeek,
  returnFocusToInput,
  keyboardForwardNavigationInstructions,
  keyboardBackwardNavigationInstructions,
  chooseAvailableStartDate,
  chooseAvailableEndDate,
  dateIsUnavailable,
  dateIsSelected,
  dateIsSelectedAsStartDate,
  dateIsSelectedAsEndDate,
};

export const dateRangePickerInputPhrases: Required<DateRangePickerInputPhrases> = {
  focusStartDate,
  clearDates,
  keyboardForwardNavigationInstructions,
  keyboardBackwardNavigationInstructions,
};

export const singleDatePickerPhrases: Required<SingleDatePickerPhrases> = {
  calendarLabel,
  roleDescription,
  closeDatePicker,
  clearDate,
  jumpToPrevMonth,
  jumpToNextMonth,
  keyboardShortcuts,
  showKeyboardShortcutsPanel,
  hideKeyboardShortcutsPanel,
  openThisPanel,
  enterKey,
  leftArrowRightArrow,
  upArrowDownArrow,
  pageUpPageDown,
  homeEnd,
  escape,
  questionMark,
  selectFocusedDate,
  moveFocusByOneDay,
  moveFocusByOneWeek,
  moveFocusByOneMonth,
  moveFocustoStartAndEndOfWeek,
  returnFocusToInput,
  keyboardForwardNavigationInstructions,
  keyboardBackwardNavigationInstructions,
  chooseAvailableDate,
  dateIsUnavailable,
  dateIsSelected,
};

export const singleDatePickerInputPhrases: Required<SingleDatePickerInputPhrases> = {
  clearDate,
  keyboardForwardNavigationInstructions,
  keyboardBackwardNavigationInstructions,
};

export const dayPickerPhrases: Required<DayPickerPhrases> = {
  calendarLabel,
  roleDescription,
  jumpToPrevMonth,
  jumpToNextMonth,
  keyboardShortcuts,
  showKeyboardShortcutsPanel,
  hideKeyboardShortcutsPanel,
  openThisPanel,
  enterKey,
  leftArrowRightArrow,
  upArrowDownArrow,
  pageUpPageDown,
  homeEnd,
  escape,
  questionMark,
  selectFocusedDate,
  moveFocusByOneDay,
  moveFocusByOneWeek,
  moveFocusByOneMonth,
  moveFocustoStartAndEndOfWeek,
  returnFocusToInput,
  chooseAvailableStartDate,
  chooseAvailableEndDate,
  chooseAvailableDate,
  dateIsUnavailable,
  dateIsSelected,
  dateIsSelectedAsStartDate,
  dateIsSelectedAsEndDate,
};

export const dayPickerKeyboardShortcutsPhrases: Required<DayPickerKeyboardShortcutsPhrases> = {
  keyboardShortcuts,
  showKeyboardShortcutsPanel,
  hideKeyboardShortcutsPanel,
  openThisPanel,
  enterKey,
  leftArrowRightArrow,
  upArrowDownArrow,
  pageUpPageDown,
  homeEnd,
  escape,
  questionMark,
  selectFocusedDate,
  moveFocusByOneDay,
  moveFocusByOneWeek,
  moveFocusByOneMonth,
  moveFocustoStartAndEndOfWeek,
  returnFocusToInput,
};

export const dayPickerNavigationPhrases: Required<DayPickerNavigationPhrases> = {
  jumpToPrevMonth,
  jumpToNextMonth,
};

export const calendarDayPhrases: Required<CalendarDayPhrases> = {
  chooseAvailableDate,
  dateIsUnavailable,
  dateIsSelected,
  dateIsSelectedAsStartDate,
  dateIsSelectedAsEndDate,
};
