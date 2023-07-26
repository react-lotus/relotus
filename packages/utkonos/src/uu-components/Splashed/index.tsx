import React from 'react';
import type { ReactElement } from 'react';
import { CSSTransition } from 'react-transition-group';
import './index.scss';

const classNames = {
  enter: 'uu-splashed_enter',
  enterActive: 'uu-splashed_enterActive',
  exitActive: 'uu-splashed_exitActive',
};

export interface SplashedCoreProps {
  /**
   * Состояние отображения контента, включает анимацию появления и скрытия.
   *
   * Если не задан, то контент отображается всегда.
   */
  show?: boolean;
}

interface SplashedProps extends SplashedCoreProps {
  /** Контент, которому добавляется анимация при появлении и скрытии */
  children: NonNullable<ReactElement>;
}

/**
 * Компонент плавного появления элемента
 */
export function Splashed({ show, children }: SplashedProps): JSX.Element {
  if (show === undefined) {
    return <>{children}</>;
  }

  return (
    <CSSTransition in={show} timeout={300} unmountOnExit classNames={classNames}>
      {children}
    </CSSTransition>
  );
}
