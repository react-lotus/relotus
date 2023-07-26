/**
 * Jest's setup
 *
 * Модуль c кодом для настройки среды тестирования.
 * Код будет запускаться один раз для **каждого** тестового файла.
 */

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import 'react-dates/initialize';

jest.mock('nanoid', () => ({
  nanoid: (): string => 'nanoid',
}));
