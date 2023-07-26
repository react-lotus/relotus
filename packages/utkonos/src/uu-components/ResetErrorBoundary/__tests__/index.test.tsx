/* eslint-disable no-console */
import React from 'react';
import { render } from '@testing-library/react';

import { ResetErrorBoundary } from '..';

const voidFn = (): void => {};

function Bomb({ getError = () => null }: { getError?: () => Error | null }) {
  const error = getError();
  if (error) {
    throw error;
  } else {
    return null;
  }
}

describe('<ResetErrorBoundary  />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllTimers();
    (console.error as jest.Mock).mockRestore();
  });

  it('should not call reset if error was not thrown', () => {
    const mockReset = jest.fn();
    render(<Bomb />, {
      wrapper: ({ children }) => (
        <ResetErrorBoundary reset={mockReset}>{children}</ResetErrorBoundary>
      ),
    });
    expect(console.error).not.toHaveBeenCalled();
    expect(mockReset).not.toBeCalled();
  });

  it('throws an error on rendering that there was a problem', () => {
    const { rerender } = render(<Bomb />, {
      wrapper: ({ children }) => <ResetErrorBoundary reset={voidFn}>{children}</ResetErrorBoundary>,
    });
    const BombError = new Error('💣');
    expect(() => rerender(<Bomb getError={() => BombError} />)).toThrow(BombError);
    expect(console.error).toHaveBeenCalled();
  });

  it('calls reset function with correct error instance', () => {
    const BombError: Error = new Error('💣');
    const mockReset = jest.fn();
    expect(() =>
      render(<Bomb getError={() => BombError} />, {
        wrapper: ({ children }) => (
          <ResetErrorBoundary reset={mockReset}>{children}</ResetErrorBoundary>
        ),
      }),
    ).toThrow(BombError);
    expect(mockReset).toBeCalledTimes(1);
    expect(mockReset).toBeCalledWith(BombError);
  });

  it("doesn't throw an error when reset function fix a problem", () => {
    let problem = true;
    const mockRollbackReset = jest.fn();
    const mockReset = jest.fn(() => {
      problem = false;
      return mockRollbackReset;
    });
    render(<Bomb getError={() => (problem ? new Error('💣') : null)} />, {
      wrapper: ({ children }) => (
        <ResetErrorBoundary reset={mockReset}>{children}</ResetErrorBoundary>
      ),
    });
    expect(console.error).toHaveBeenCalled();
    expect(mockReset).toHaveBeenCalledTimes(1);
    expect(problem).toBe(false);
    expect(mockRollbackReset).toHaveBeenCalledTimes(0);
  });

  it('rollback fixed problem when error still throws', () => {
    let problem = true;
    const mockRollbackReset = jest.fn(() => {
      problem = true;
    });
    const mockReset = jest.fn(() => {
      problem = false;
      return mockRollbackReset;
    });
    expect(() =>
      render(<Bomb getError={() => new Error('💣')} />, {
        wrapper: ({ children }) => (
          <ResetErrorBoundary reset={mockReset}>{children}</ResetErrorBoundary>
        ),
      }),
    ).toThrowError();
    expect(console.error).toHaveBeenCalled();
    expect(mockReset).toHaveBeenCalledTimes(1);
    expect(problem).toBe(true);
    expect(mockRollbackReset).toHaveBeenCalledTimes(1);
  });

  it("doesn't call rollback when errors are different", () => {
    let problem = true;
    const mockRollbackReset = jest.fn(() => {
      problem = true;
    });
    const mockReset = jest.fn(() => {
      problem = false;
      return mockRollbackReset;
    });
    expect(() =>
      render(<Bomb getError={() => (problem ? new Error('💣') : new Error('😥'))} />, {
        wrapper: ({ children }) => (
          <ResetErrorBoundary reset={mockReset}>{children}</ResetErrorBoundary>
        ),
      }),
    ).toThrowError();
    expect(console.error).toHaveBeenCalled();
    expect(mockReset).toHaveBeenCalledTimes(1);
    expect(problem).toBe(false);
    expect(mockRollbackReset).toHaveBeenCalledTimes(0);
  });

  it("doesn't throw an error when reset function fix a problem and problem is back", () => {
    let problem = true;
    const mockRollbackReset = jest.fn();
    const mockReset = jest.fn(() => {
      problem = false;
      return mockRollbackReset;
    });
    const { rerender } = render(<Bomb getError={() => (problem ? new Error('💣') : null)} />, {
      wrapper: ({ children }) => (
        <ResetErrorBoundary reset={mockReset}>{children}</ResetErrorBoundary>
      ),
    });
    jest.runAllTimers();
    expect(console.error).toHaveBeenCalled();
    expect(mockReset).toHaveBeenCalledTimes(1);
    expect(problem).toBe(false);
    expect(mockRollbackReset).toHaveBeenCalledTimes(0);

    problem = true;
    rerender(<Bomb getError={() => (problem ? new Error('😥') : null)} />);
    expect(mockReset).toHaveBeenCalledTimes(2);
    expect(problem).toBe(false);
    expect(mockRollbackReset).toHaveBeenCalledTimes(0);
  });

  it('correct reset and rollback problems in runtime app', () => {
    let problem = true;
    const mockResetProblem = jest.fn(() => {
      problem = false;
      return voidFn;
    });

    let storage = true;
    const mockRollbackResetStorage = jest.fn(() => {
      storage = true;
    });
    const mockResetStorage = jest.fn(() => {
      storage = false;
      jest.runAllTimers();
      return mockRollbackResetStorage;
    });

    const { rerender } = render(<Bomb getError={() => (problem ? new Error('💣') : null)} />, {
      wrapper: ({ children }) => (
        <ResetErrorBoundary reset={mockResetProblem}>
          <ResetErrorBoundary reset={mockResetStorage}>{children}</ResetErrorBoundary>
        </ResetErrorBoundary>
      ),
    });
    expect(problem).toBe(false);
    expect(storage).toBe(true);

    rerender(<Bomb />);

    problem = true;
    rerender(<Bomb getError={() => (problem ? new Error('💣') : null)} />);
    expect(problem).toBe(false);
    expect(storage).toBe(true);

    rerender(<Bomb getError={() => (storage ? new Error('😖') : null)} />);
    expect(storage).toBe(false);
  });
});
