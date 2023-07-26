import { ForwardedRef, forwardRef, useCallback } from 'react';
import type { ElementType, ComponentProps, ReactNode } from 'react';
import { useCopyToClipboard } from 'react-use';

import { ReactComponent as ContentCopySvg } from './assets/copy-icon.svg';
import { Button } from '../Button';
import type { ButtonProps } from '../Button';

export const CopyIcon = <ContentCopySvg />;
const defaultElement = 'button';

export type CopyButtonProps<E = typeof defaultElement> = Omit<ButtonProps, 'as' | 'children'> & {
  children?: ReactNode;
  /** Коллбэк для события копирования (показать всплывающее окно и т.д.) */
  onClick?: () => void;
  /** Значение, которое нужно скопировать в буфер обмена */
  value: string;
  as?: E;
};

export type CommonCopyButtonProps<E extends ElementType = ElementType> = CopyButtonProps<E> &
  Omit<ComponentProps<E>, keyof CopyButtonProps<E>>;

const CopyButtonWithoutRef = <E extends ElementType = typeof defaultElement>(
  props: CommonCopyButtonProps<E>,
  ref: ForwardedRef<HTMLButtonElement> | null,
): JSX.Element => {
  const { children, onClick, square = true, value, view = 'light', ...rest } = props;

  const [, copyToClipboard] = useCopyToClipboard();

  const handleCopy = useCallback(() => {
    copyToClipboard(value);
    onClick?.();
  }, [copyToClipboard, onClick, value]);

  return (
    <Button onClick={handleCopy} square={square} view={view} {...rest} ref={ref}>
      {CopyIcon}
      {children && <span>{children}</span>}
    </Button>
  );
};

/**
 * Компонент для кнопки копирования
 */
export const CopyButton = forwardRef<HTMLButtonElement, CommonCopyButtonProps>(
  CopyButtonWithoutRef,
) as <E extends ElementType = ElementType>(
  props: CommonCopyButtonProps<E> & { ref?: ForwardedRef<HTMLButtonElement> | null },
) => JSX.Element;
