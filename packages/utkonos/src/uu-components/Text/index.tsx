import React from 'react';
import cn from 'classnames';
import type { TextElements } from '../_typography';

import './index.scss';

export type TextAlignValue = 'left' | 'right' | 'center' | 'justify';

export type TextWeightValue = '300' | '400' | '500' | '700';

export type TextProps = {
  /** Текст */
  children: React.ReactNode;
  /**
   * HTML-тег или компонент для рендера текста
   * @type React.ElementType | React.ComponentType
   * @default "span"
   */
  as?: unknown;
  /** Задает выравнивание текста в компоненте. */
  align?: TextAlignValue;
  /** Задает жирность текста в компоненте. */
  weight?: TextWeightValue;
  /**
   * Eсли текст целиком не помещается в заданную область, то он обрезается и к концу строки добавляется многоточие.
   *
   * В качестве параметра можно передать максимальное количество строк текста. По умолчанию 1.
   */
  ellipsis?: boolean | number;
  /** Дополнительный класс */
  className?: string;
  /** Дополнительные стили */
  style?: React.CSSProperties;
};

type ElementProps<T extends keyof TextElements> = { as: T } & TextElements[T] & TextProps;

/**
 * Базовый примитив представления текстовых данных.
 */
export function Text(props: TextProps): JSX.Element;
export function Text(props: { as: React.ComponentType<any> } & TextProps): JSX.Element; // eslint-disable-line @typescript-eslint/no-explicit-any
export function Text(props: ElementProps<'a'>): JSX.Element;
export function Text(props: ElementProps<'article'>): JSX.Element;
export function Text(props: ElementProps<'aside'>): JSX.Element;
export function Text(props: ElementProps<'b'>): JSX.Element;
export function Text(props: ElementProps<'blockquote'>): JSX.Element;
export function Text(props: ElementProps<'button'>): JSX.Element;
export function Text(props: ElementProps<'caption'>): JSX.Element;
export function Text(props: ElementProps<'code'>): JSX.Element;
export function Text(props: ElementProps<'dd'>): JSX.Element;
export function Text(props: ElementProps<'details'>): JSX.Element;
export function Text(props: ElementProps<'dfn'>): JSX.Element;
export function Text(props: ElementProps<'dt'>): JSX.Element;
export function Text(props: ElementProps<'em'>): JSX.Element;
export function Text(props: ElementProps<'h1'>): JSX.Element;
export function Text(props: ElementProps<'h2'>): JSX.Element;
export function Text(props: ElementProps<'h3'>): JSX.Element;
export function Text(props: ElementProps<'h4'>): JSX.Element;
export function Text(props: ElementProps<'h5'>): JSX.Element;
export function Text(props: ElementProps<'h6'>): JSX.Element;
export function Text(props: ElementProps<'i'>): JSX.Element;
export function Text(props: ElementProps<'ins'>): JSX.Element;
export function Text(props: ElementProps<'kbd'>): JSX.Element;
export function Text(props: ElementProps<'label'>): JSX.Element;
export function Text(props: ElementProps<'legend'>): JSX.Element;
export function Text(props: ElementProps<'li'>): JSX.Element;
export function Text(props: ElementProps<'option'>): JSX.Element;
export function Text(props: ElementProps<'p'>): JSX.Element;
export function Text(props: ElementProps<'pre'>): JSX.Element;
export function Text(props: ElementProps<'span'>): JSX.Element;
export function Text(props: ElementProps<'q'>): JSX.Element;
export function Text(props: ElementProps<'rp'>): JSX.Element;
export function Text(props: ElementProps<'rt'>): JSX.Element;
export function Text(props: ElementProps<'ruby'>): JSX.Element;
export function Text(props: ElementProps<'s'>): JSX.Element;
export function Text(props: ElementProps<'samp'>): JSX.Element;
export function Text(props: ElementProps<'script'>): JSX.Element;
export function Text(props: ElementProps<'small'>): JSX.Element;
export function Text(props: ElementProps<'strong'>): JSX.Element;
export function Text(props: ElementProps<'sub'>): JSX.Element;
export function Text(props: ElementProps<'summary'>): JSX.Element;
export function Text(props: ElementProps<'sup'>): JSX.Element;
export function Text(props: ElementProps<'td'>): JSX.Element;
export function Text(props: ElementProps<'th'>): JSX.Element;
export function Text(props: ElementProps<'time'>): JSX.Element;
export function Text(props: ElementProps<'title'>): JSX.Element;
export function Text(props: ElementProps<'u'>): JSX.Element;
export function Text(props: ElementProps<'var'>): JSX.Element;
export function Text(props: JSX.IntrinsicElements['span'] & Omit<TextProps, 'as'>): JSX.Element;
export function Text(
  props: Omit<TextProps, 'as'> & Record<string, any>, // eslint-disable-line @typescript-eslint/no-explicit-any
): JSX.Element {
  const { children, className, style = {}, as = 'span', align, weight, ellipsis, ...rest } = props;

  const RenderAs = as;

  const isEllipsis = Boolean(ellipsis);
  if (isEllipsis) {
    style.WebkitLineClamp = typeof ellipsis === 'number' && ellipsis > 1 ? ellipsis : 1;
  }

  return (
    <RenderAs
      className={cn(className, 'uu-text', {
        'uu-text_ellipsis': isEllipsis,
        [`uu-text_align_${align}`]: align,
        [`uu-text_weight_${weight}`]: weight,
      })}
      style={style}
      {...rest}
    >
      {children}
    </RenderAs>
  );
}
