import React from 'react';
import cn from 'classnames';
import type { SplashedCoreProps } from '../Splashed';
import { Splashed } from '../Splashed';
import { ReactComponent as UtkonosIcon } from './assets/utkonos.svg';
import './index.scss';

const DEFAULT_SPINNER_SIZE = 60;

export interface Props extends SplashedCoreProps {
  /** Флаг абсолютного положения */
  absolute?: boolean;
  /** Дополнительный класс */
  className?: string;
  /** Размер в пикселях */
  size?: number;
}

/**
 * Компонент отображения загрузки
 */
export function Spinner({
  show,
  absolute,
  className,
  size = DEFAULT_SPINNER_SIZE,
}: Props): JSX.Element {
  const currentSize = size < 0 ? DEFAULT_SPINNER_SIZE : size;
  const scaleValue = currentSize / DEFAULT_SPINNER_SIZE;

  return (
    <Splashed show={show}>
      <div className={cn(className, 'uu-spinner', { 'uu-spinner_absolute': absolute })}>
        <div className="uu-spinnerIconsWrapper" style={{ height: currentSize, width: currentSize }}>
          <div
            style={{ transform: `scale(${scaleValue})` }}
            className="uu-spinnerWhirlpoolContainer"
          >
            <div className="uu-spinnerWhirlpool" />
          </div>
          <UtkonosIcon
            style={{ transform: `scale(${scaleValue})` }}
            className="uu-spinnerUtkonosIcon"
          />
        </div>
      </div>
    </Splashed>
  );
}
