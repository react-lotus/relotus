import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { nanoid } from 'nanoid';
import cn from 'clsx';

import { Labeled, LabeledProps } from '../Labeled';
import { InputError, InputErrorProps } from '../_InputError';
import { ResetButton } from './ResetButton';
import { TagInputBase, TagInputBaseProps } from './TagInputBase';

import './index.scss';

export type TagInputProps = Partial<LabeledProps> &
  TagInputBaseProps & {
    /** Input error */
    error?: InputErrorProps['error'];
    /** Input error tooltip placement */
    errorPlacement?: InputErrorProps['errorPlacement'];
    /** Hide reset button optional */
    hideReset?: boolean;
    /** Text for link to reset all tags */
    resetText?: string;
  };

/**
 * Компонент текстового ввода в виде тегов (чипсов)
 */
export const TagInput = forwardRef<HTMLInputElement, TagInputProps>(
  (
    {
      className,
      id,
      label,
      direction,
      disabled,
      error,
      errorPlacement = 'right',
      hideReset = false,
      hint,
      isTagEditable,
      onChange,
      resetText = 'Сбросить значения',
      value,
      ...props
    }: TagInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ): JSX.Element => {
    const [fallbackId] = useState(nanoid);
    const rootRef = useRef<HTMLInputElement>(null);
    useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
      ref,
      () => rootRef.current,
    );
    const handleClick = useCallback(() => {
      const { current: input } = rootRef;
      input?.focus();
    }, [rootRef]);

    /** Reset all tags */
    const handleReset = useCallback(() => {
      onChange([]);
    }, [onChange]);

    return (
      <>
        <Labeled
          className={className}
          id={id || fallbackId}
          label={label}
          direction={direction}
          hint={hint}
        >
          <div>
            <div
              className={cn('uu-tagInput', {
                'uu-input_hasError': error,
              })}
              role="none"
              onClick={!isTagEditable ? handleClick : undefined}
            >
              <TagInputBase
                {...props}
                disabled={disabled}
                id={id || fallbackId}
                onChange={onChange}
                ref={rootRef}
                isTagEditable={isTagEditable}
                value={value}
              />
              <InputError error={error} errorPlacement={errorPlacement} />
            </div>
            {!hideReset && (
              <ResetButton
                disabled={disabled || value.length === 0}
                onReset={handleReset}
                text={resetText}
              />
            )}
          </div>
        </Labeled>
      </>
    );
  },
);

export type { TagValue } from './types';
export { TagInputSplittersRegExp } from './utils';
