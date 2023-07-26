import React, {
  useCallback,
  KeyboardEvent,
  FocusEvent,
  ClipboardEventHandler,
  forwardRef,
} from 'react';
import type { TagValue } from './types';
import { Tag } from './Tag';
import { TagInputSplittersRegExp } from './utils';

export type TagInputBaseProps = {
  /** Current input values */
  value: TagValue[];
  /** Values changes handler */
  onChange(values: TagValue[]): void;
  removeDuplicates?: boolean;
  tagSplitters?: RegExp;
  emptyPlaceholder?: string;
  /**
   * Можно ли редактировать тескт тегов
   */
  isTagEditable?: boolean;
} & Omit<JSX.IntrinsicElements['input'], 'value' | 'onChange'>;

export const TagInputBase = forwardRef<HTMLInputElement, TagInputBaseProps>(
  (
    {
      value,
      onChange,
      name,
      disabled,
      removeDuplicates = true,
      tagSplitters = TagInputSplittersRegExp.ALL_SPLITTERS,
      placeholder,
      emptyPlaceholder = placeholder,
      onBlur,
      isTagEditable,
      ...props
    },
    ref,
  ) => {
    const addTags = useCallback(
      (...tags: TagValue[]) => {
        let newTags;

        if (!removeDuplicates) {
          newTags = value.concat(tags.filter(Boolean).map((newValue) => newValue));
        } else {
          const uniqValues = value.filter((val) => !tags.includes(val));
          newTags = uniqValues.concat([...new Set(tags)]);
        }
        onChange(newTags as string[]);
      },
      [removeDuplicates, value, onChange],
    );

    const changeTag = useCallback(
      (index: number, nextTag: string) => {
        let nextValue = [...value];
        nextValue[index] = nextTag;

        if (removeDuplicates) {
          nextValue = [...new Set(nextValue)];
        }
        onChange(nextValue);
      },
      [removeDuplicates, value, onChange],
    );

    const removeTag = useCallback(
      (item: TagValue) => {
        if (disabled) return;

        const newValues = value.filter((val) => val !== item);
        onChange(newValues);
      },
      [value, disabled, onChange],
    );

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        const { key } = e;
        const target = e.target as HTMLInputElement;
        const { value: inputValue } = target;
        const trimVal = inputValue.trim();

        if (key === 'Enter' || tagSplitters.test(key)) {
          if (!trimVal) return;

          e.stopPropagation();
          e.preventDefault();
          addTags(trimVal);
          target.value = '';
          target.focus();
        }
        if (key === 'Backspace' && !trimVal) {
          onChange(value.slice(0, -1));
        }
      },
      [addTags, value, onChange, tagSplitters],
    );

    const handleBlur = useCallback(
      (e: FocusEvent<HTMLInputElement>) => {
        onBlur?.(e);
        const target = e.target as HTMLInputElement;
        const { value: inputValue } = target;
        const trimVal = inputValue.trim();
        if (!trimVal) return;

        addTags(trimVal);
        target.value = '';
      },
      [addTags, onBlur],
    );

    const handlePaste: ClipboardEventHandler<HTMLInputElement> = useCallback(
      (e) => {
        e.preventDefault();
        const { clipboardData } = e;
        const text = clipboardData.getData('text').trim();
        const parsedTags = text.split(tagSplitters).map((v) => v.trim());
        if (tagSplitters) {
          addTags(...parsedTags);
        } else {
          addTags(text);
        }
      },
      [addTags, tagSplitters],
    );

    return (
      <>
        {value.map((v, index) => {
          const key = `${v}_${index}`;
          return (
            <Tag
              value={v}
              key={key}
              index={index}
              onRemove={removeTag}
              disabled={disabled}
              isEditable={isTagEditable}
              onChange={changeTag}
            />
          );
        })}
        <input
          className="uu-tagInputNewItem"
          disabled={disabled}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onBlur={handleBlur}
          name={name}
          ref={ref}
          placeholder={value.length > 0 ? placeholder : emptyPlaceholder}
          {...props}
        />
      </>
    );
  },
);
