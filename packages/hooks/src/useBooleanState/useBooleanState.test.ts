import { renderHook, act } from '@testing-library/react-hooks';
import { useBooleanState } from './useBooleanState';

describe('HOOKS | useBooleanState', () => {
  it('should be false by default', () => {
    const { result } = renderHook(() => useBooleanState());
    expect(result.current[0]).toBe(false);
  });
  it('should be true if true passed as default', () => {
    const { result } = renderHook(() => useBooleanState(true));
    expect(result.current[0]).toBe(true);
  });

  describe('setTrue', () => {
    it('should change state to true', () => {
      const { result } = renderHook(() => useBooleanState());
      act(() => {
        result.current[1]();
      });
      expect(result.current[0]).toBe(true);
    });

    it('should not change state if current value is true', () => {
      const { result } = renderHook(() => useBooleanState(true));
      act(() => {
        result.current[1]();
      });
      expect(result.current[0]).toBe(true);
    });
  });

  describe('setFalse', () => {
    it('should change state to false', () => {
      const { result } = renderHook(() => useBooleanState(true));
      act(() => {
        result.current[2]();
      });
      expect(result.current[0]).toBe(false);
    });

    it('should not change state if current value is false', () => {
      const { result } = renderHook(() => useBooleanState(false));
      act(() => {
        result.current[2]();
      });
      expect(result.current[0]).toBe(false);
    });
  });

  describe('toggle', () => {
    it('should change state to false', () => {
      const { result } = renderHook(() => useBooleanState(true));
      act(() => {
        result.current[3]();
      });
      expect(result.current[0]).toBe(false);
    });

    it('should change state to true', () => {
      const { result } = renderHook(() => useBooleanState());
      act(() => {
        result.current[3]();
      });
      expect(result.current[0]).toBe(true);
    });
  });
});
