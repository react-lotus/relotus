import React, {
  KeyboardEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import cn from 'clsx';
import { useBooleanState } from '@relotus/hooks';
import { MultiValue } from '../MultiSelect/MultiValue';
import { useEditableValue } from './hooks';
import type { TagValue } from './types';
import { EXCLUDE_PATTERN } from './utils';
import './Tag.scss';

interface TagProps {
  /** Tag value */
  value: TagValue;
  /** Remove tag from list handler */
  onRemove(value: TagValue): void;
  /** Индекс в массиве всех значений */
  index: number;
  /** Is filed disabled or not */
  disabled?: boolean;
  /**
   * Можно ли редактировать через двойной клик
   */
  isEditable?: boolean;
  /**
   * Регулярное выражение запрещенных для ввода символов
   */
  excludePattern?: RegExp;
  /**
   * Обработчик сохранения результата редактирования
   */
  onChange?(index: number, nextValue: string): void;
}

export const Tag = ({
  onRemove,
  value,
  index,
  disabled,
  isEditable: isEditableProp,
  onChange,
  excludePattern = EXCLUDE_PATTERN,
}: TagProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const displayValueRef = useRef<HTMLSpanElement | null>(null);
  const [isEditMode, turnOnEditMode, turnOffEditMode] = useBooleanState();
  const [dirtyValue, changeDirtyValue, resetDirtyValue] = useEditableValue({
    defaultValue: value,
    excludePattern,
  });
  const isEditable = isEditableProp && !disabled;

  const handleRemove = useCallback(
    (e: SyntheticEvent) => {
      e.stopPropagation();
      onRemove(value);
    },
    [onRemove, value],
  );

  const handleChange = useCallback(
    (e: SyntheticEvent, nextValue: string) => {
      if (nextValue) {
        onChange?.(index, nextValue);
      } else {
        handleRemove(e);
      }
      turnOffEditMode();
    },
    [index, onChange, handleRemove, turnOffEditMode],
  );

  const handleCancelEdit = useCallback(() => {
    resetDirtyValue();
    turnOffEditMode();
  }, [turnOffEditMode, resetDirtyValue]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      const { key } = e;
      if (key === 'Enter') {
        handleChange(e, dirtyValue);
      }
      if (key === 'Escape') {
        handleCancelEdit();
      }
    },
    [dirtyValue, handleCancelEdit, handleChange],
  );

  useEffect(() => {
    if (isEditMode) {
      inputRef.current?.focus();
    }
  }, [isEditMode]);

  useLayoutEffect(() => {
    const approximateWidth = dirtyValue.length * 5;
    const inputWidth = displayValueRef.current?.offsetWidth ?? approximateWidth;
    if (inputRef.current) {
      inputRef.current.style.width = `${inputWidth + 8}px`;
    }
  });

  return (
    <MultiValue
      disabled={disabled}
      onClose={handleRemove}
      textClassName={cn({ 'uu-tagInputTagText_isEditing': isEditMode })}
    >
      <span
        ref={displayValueRef}
        className={cn('uu-tagInputTagValue', {
          'uu-tagInputTagValue_isEditable': isEditable,
          'uu-tagInputTagValue_isHidden': isEditMode,
        })}
        onDoubleClick={isEditable ? turnOnEditMode : undefined}
      >
        {isEditMode ? dirtyValue : value}
      </span>
      {isEditMode && (
        <input
          ref={inputRef}
          className="uu-tagInputTagInput"
          value={dirtyValue}
          onKeyDown={handleKeyDown}
          onChange={changeDirtyValue}
          onBlur={handleCancelEdit}
        />
      )}
    </MultiValue>
  );
};
