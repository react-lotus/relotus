import React from 'react';
import {
  ToastContainer as ReactToastifyContainer,
  ToastContainerProps as ReactToastifyContainerProps,
  Bounce,
  ToastPosition,
} from 'react-toastify';

import { CloseToastButton } from './ClostToastButton';
import './index.scss';

const Close = <CloseToastButton />;

export interface ToastContainerProps extends ReactToastifyContainerProps {
  /**
   * Длительность в ms через сколько сообщение будет закрыто само
   * @default 5000
   */
  autoClose?: number | false;
  /**
   * Положение сообщения
   * @default bottom-left
   */
  position?: ToastPosition;
  /**
   * Останавливать таймер автоматического закрытия при наведении на сообщение
   * @default true
   */
  pauseOnHover?: boolean;
  /**
   * Останавливать таймер автоматического закрытия когда window теряет фокус
   * @default true
   */
  pauseOnFocusLoss?: boolean;
  /**
   * Закрывать сообщение при клике по нему
   * @default true
   */
  closeOnClick?: boolean;
  /**
   * Скрывать прогресс-бар
   * @default true
   */
  hideProgressBar?: boolean;
  /**
   * Разрешить закрытие сообщений через drag
   * @default false
   */
  draggable?: boolean;
  /**
   * Новые сообщения отображаются сверху
   * @default false
   */
  newestOnTop?: boolean;
  /**
   * Ограничение на количество одновременно отображаемых сообщений.
   * При достижении лимита, сообщения будут попадать в очередь
   * @default true
   */
  limit?: number;
  /**
   * Обработчик клика по сообщению
   * @default 0
   */
  onClick?: (event: React.MouseEvent) => void;
}

/**
 * Компонент ToastContainer
 *
 * Построен поверх https://fkhadra.github.io/react-toastify
 */
export function ToastContainer({
  autoClose = 5000,
  position = 'bottom-left',
  newestOnTop = true,
  closeOnClick = true,
  pauseOnFocusLoss = true,
  draggable = false,
  pauseOnHover = true,
  hideProgressBar = true,
  limit = 0,
  ...rest
}: ToastContainerProps) {
  return (
    <ReactToastifyContainer
      autoClose={autoClose}
      position={position}
      hideProgressBar={hideProgressBar}
      className="uu-toast__container"
      newestOnTop={newestOnTop}
      closeOnClick={closeOnClick}
      rtl={false}
      toastClassName="uu-toast"
      bodyClassName="uu-toast__body"
      pauseOnFocusLoss={pauseOnFocusLoss}
      draggable={draggable}
      pauseOnHover={pauseOnHover}
      transition={Bounce}
      limit={limit}
      closeButton={Close}
      {...rest}
    />
  );
}

export { toast } from 'react-toastify';
