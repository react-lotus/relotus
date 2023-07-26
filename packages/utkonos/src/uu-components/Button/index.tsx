import React, { ForwardedRef, forwardRef, MouseEventHandler } from 'react';
import type { ReactNode } from 'react';
import cn from 'classnames';

import type { Link as RouterLink, LinkProps } from 'react-router-dom';
import './index.scss';

export type ButtonView =
  | 'primary'
  | 'secondary'
  | 'light'
  | 'link'
  | 'danger'
  | 'dangerSecondary'
  | 'dangerLight'
  | 'dangerLink'
  | 'dangerLinkInline'
  | 'linkInline';

export interface ButtonProps {
  /** Контент кнопки */
  children: ReactNode;
  /**
   * Вид кнопки
   * @default primary
   */
  view?: ButtonView;
  /** Уменьшенный вариант кнопки */
  small?: true;
  /** Квадратная кнопка */
  square?: boolean;
  /** Стилевое оформление для визуального выделения блокирующего действие процесса */
  loading?: boolean;
  /**
   * Неактивное состояние кнопки.
   *
   * Состояние, при котором кнопка отображается, но недоступна для действий пользователя.
   */
  disabled?: boolean;
  /** Дополнительный класс */
  className?: string;
  /**
   * Тип кнопки.
   *
   * Значение по умолчанию применяется, только для рендера через тег button.
   * @default button
   */
  type?: string;
  /** Всплывающая подсказка */
  title?: string;
  /** Обработчик клика на кнопку */
  onClick?: MouseEventHandler<HTMLElement>;
  /** Отрисовать как */
  as?: 'button' | 'a' | 'span' | React.ComponentType<any> | typeof RouterLink;
}

export type ButtonOwnProps = ButtonProps &
  (
    | Omit<JSX.IntrinsicElements['button'], keyof ButtonProps>
    | Omit<LinkProps, keyof ButtonProps>
    | Omit<JSX.IntrinsicElements['span'], keyof ButtonProps>
    | Omit<JSX.IntrinsicElements['a'], keyof ButtonProps>
  );

/**
 * Компонент для создания кнопок.
 */
export const ButtonWithoutRef = (
  props: ButtonOwnProps,
  ref: ForwardedRef<
    HTMLButtonElement | HTMLSpanElement | HTMLAnchorElement | typeof RouterLink
  > | null,
): JSX.Element => {
  const {
    children,
    className,
    as = 'button',
    view = 'primary',
    small,
    square,
    disabled,
    loading,
    type,
    ...rest
  } = props;

  const computedDisabled = loading || disabled;
  const computedType = type || (as === 'button' ? 'button' : type);
  const RenderAs = as;

  return (
    <RenderAs
      className={cn(className, 'uu-button', `uu-button_view_${view}`, {
        'uu-button_small': small,
        'uu-button_square': square,
        'uu-button_loading': loading,
      })}
      disabled={computedDisabled}
      type={computedType}
      {...rest}
      ref={ref}
    >
      {children}
    </RenderAs>
  );
};

export const Button = forwardRef<
  HTMLButtonElement | HTMLSpanElement | HTMLAnchorElement | typeof RouterLink,
  ButtonOwnProps
>(ButtonWithoutRef);
