import React from 'react';

interface CheckRenderProps {
  /**
   * Будет вызвана если рендер приводит к ошибке
   */
  onError(error: Error): void;
  /**
   * Будет вызвана если рендер проходит успешно
   */
  onSuccessRender(): void;
}

/**
 * Компонент для проверки вызывает рендер ошибку или нет
 *
 * @export
 * @class CheckRender
 * @extends {React.PureComponent<CheckRenderProps, { error?: Error }>}
 */
export class CheckRender extends React.PureComponent<CheckRenderProps, { error?: Error }> {
  renderSuccessCallback: ReturnType<typeof setTimeout> | undefined;

  constructor(props: CheckRenderProps) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidMount() {
    const { onSuccessRender } = this.props;
    // Так как didCatch вызывается после componentDidMount, откладываем вызов onSuccessRender
    this.renderSuccessCallback = setTimeout(onSuccessRender);
  }

  componentDidCatch(error: Error) {
    const { onError } = this.props;
    // Если был отложенный onSuccessRender, отменяем его
    if (this.renderSuccessCallback) {
      clearInterval(this.renderSuccessCallback);
    }
    onError(error);
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error) return null;

    return <>{children}</>;
  }
}
