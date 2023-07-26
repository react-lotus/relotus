import React, { ReactNode, useMemo } from 'react';
import cn from 'classnames';
import { ReactComponent as Lock } from './assets/lock.svg';
import './index.scss';

export interface FieldAddonCoreProps {
  /** Суффикс для поля ввода */
  suffix?: ReactNode;
  /** Доступность поля для редактирования */
  disabled?: boolean;
}

export interface FieldAddonProps extends FieldAddonCoreProps {
  /** Дополнительный класс */
  className?: string;
  /** дополнительные элементы поля */
  children?: React.ReactNode;
}

/**
 * Компонент вспомогательных элементов полей ввода
 */
export function FieldAddon(props: FieldAddonProps): JSX.Element | null {
  const { className, suffix, disabled, children } = props;
  const hasAddons = useMemo(() => disabled || suffix || children, [disabled, suffix, children]);

  if (!hasAddons) {
    return null;
  }

  return (
    <div className={cn('uu-fieldAddon', className)}>
      {suffix && <span className="uu-fieldAddonSuffix">{suffix}</span>}
      {disabled && <Lock className="uu-fieldAddonDisabled" />}
      {children}
    </div>
  );
}
