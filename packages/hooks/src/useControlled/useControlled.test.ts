import { renderHook, act } from '@testing-library/react-hooks';
import { useControlled } from '.';

describe('HOOKS | useControlled', () => {
  it('should works correctly when is uncontrolled', () => {
    const { result } = renderHook(() => useControlled({ default: 1 }));
    expect(result.current[0]).toBe(1);

    act(() => {
      result.current[1](2);
    });

    expect(result.current[0]).toBe(2);
  });

  it('should works correctly when is controlled', () => {
    const { result } = renderHook(() => useControlled({ controlled: 1 }));
    expect(result.current[0]).toBe(1);

    act(() => {
      result.current[1](2);
    });

    expect(result.current[0]).toBe(1);
  });
});
