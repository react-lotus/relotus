// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom/extend-expect';

expect.extend({
  hasSymbol(received: unknown, target: string) {
    if (typeof received !== 'symbol') {
      throw new Error(
        `expected value to be a Symbol got ${typeof received} - ${received as string}`,
      );
    }

    const targetStr = `Symbol(${target})`;

    return {
      pass: received.toString() === targetStr,
      message: () => `Expected ${received.toString()} not to be a ${targetStr}`,
    };
  },
});

interface CustomMatchers {
  hasSymbol: (target: string) => void;
}

/* eslint-disable @typescript-eslint/no-empty-interface,  @typescript-eslint/no-namespace */
declare global {
  namespace jest {
    interface Expect extends CustomMatchers {}
    interface InverseAsymmetricMatchers extends CustomMatchers {}
  }
}
/* eslint-enable @typescript-eslint/no-empty-interface,  @typescript-eslint/no-namespace */
