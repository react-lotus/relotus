/**
 *
 * ResetErrorBoundary
 *
 */
import React from 'react';

import { CheckRender } from './CheckRender';

function isSameErrors(errorA: Error, errorB: Error): boolean {
  if (errorA instanceof Error && errorB instanceof Error) {
    return errorA.name === errorB.name && errorA.message === errorB.message;
  }
  return false;
}

export interface ResetErrorBoundaryProps {
  /**
   * Функция reset, изменяющая данные, которые могут приводить к ошибке.
   * Может возвращать функцию, которая отменяет сделанные изменения, в случае, если ошибка не исчезла.
   */
  reset(error: Error): void | ((error: Error) => void);
}

interface State {
  error: Error | null;
  checkError: Error | null;
  rethrowingError: Error | null;
}

/**
 * Предохранитель (компонент Error Boundary), который отлавливает ошибки дочерних компонентов и запускает функцию reset как попытку исправить их.
 * В случае, если ошибка не была устранена, она прокидывается выше и может быть перехвачена вышестоящим предохранителем.
 */
export class ResetErrorBoundary extends React.Component<ResetErrorBoundaryProps, State> {
  private rollbackReset?: void | ((error: Error) => void);

  constructor(props: ResetErrorBoundaryProps) {
    super(props);
    this.state = {
      error: null,
      rethrowingError: null,
      checkError: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidMount() {
    this.resetError();
  }

  componentDidUpdate() {
    const { checkError } = this.state;
    // Если есть ошибка для проверки, то пропускаем сброс ошибки
    if (checkError) return;
    this.resetError();
  }

  resetError = () => {
    const { error } = this.state;
    const { reset } = this.props;

    // Если нечего обрабатывать, выходим
    if (!error) return;

    // Пытаемся сбросить ошибку
    this.rollbackReset = reset(error);
    this.setState({ checkError: error });
  };

  handleError = (error: Error) => {
    const { error: prevError } = this.state;

    if (!prevError) return;
    // Если ошибка одна и та же, значит reset не помог, вызываем onResetFail
    // Иначе, reset помог, но ошибка другая
    if (this.rollbackReset && isSameErrors(error, prevError)) {
      this.rollbackReset(error);
    }

    this.setState({ rethrowingError: error, checkError: null });
  };

  recoveryAfterError = () => {
    // если сброс помог очищаем предыдущую ошибку и rollbackReset
    this.rollbackReset = undefined;
    this.setState({ error: null, checkError: null });
  };

  render() {
    const { error, rethrowingError, checkError } = this.state;
    const { children } = this.props;
    if (!error) {
      return children;
    }

    if (rethrowingError) {
      throw rethrowingError;
    }

    if (checkError) {
      return (
        <CheckRender onError={this.handleError} onSuccessRender={this.recoveryAfterError}>
          {children}
        </CheckRender>
      );
    }
    return null;
  }
}
