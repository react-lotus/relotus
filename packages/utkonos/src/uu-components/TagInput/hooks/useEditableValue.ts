import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import type { TagValue } from '../types';

interface UseEditableValueProps {
  defaultValue: TagValue;
  excludePattern: RegExp;
}

export function useEditableValue({ defaultValue, excludePattern }: UseEditableValueProps) {
  const [dirtyValue, setDirtyValue] = useState(() => String(defaultValue));

  const excludeReg = useMemo(
    () => (excludePattern.global ? excludePattern : new RegExp(excludePattern, 'g')),
    [excludePattern],
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const nextValue = e.target.value.replace(excludeReg, '');
      setDirtyValue(nextValue);
    },
    [excludeReg],
  );

  const handleReset = useCallback(() => {
    setDirtyValue(String(defaultValue));
  }, [defaultValue]);

  useEffect(() => {
    handleReset();
  }, [handleReset]);

  return [dirtyValue, handleChange, handleReset] as const;
}
