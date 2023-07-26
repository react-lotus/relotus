import { isValidElement, useMemo } from 'react';
import type { ComponentType, PropsWithRef, ReactNode } from 'react';
import { nanoid } from 'nanoid';
import { Tooltip, TooltipProps } from '../Tooltip';
import styles from './withTooltip.module.scss';

export function withTooltip<P extends PropsWithRef<{ title?: string }>>(
  Component: ComponentType<P>,
  tooltipProps?: Omit<TooltipProps, 'children'>,
): ComponentType<Omit<P, 'title'> & { title: ReactNode }> {
  function WrappedComponent({ title, ...props }: Omit<P, 'title'> & { title: ReactNode }) {
    const id = useMemo(() => nanoid(), []);
    if (isValidElement(title)) {
      return (
        <>
          <Tooltip {...tooltipProps} title={title}>
            <Component {...(props as P)} aria-labelledby={id} />
          </Tooltip>
          <div id={id} className={styles.hidden}>
            {title}
          </div>
        </>
      );
    }

    return (
      <Tooltip {...tooltipProps} title={title}>
        <Component {...(props as P)} aria-label={title} />
      </Tooltip>
    );
  }
  WrappedComponent.displayName = `withTooltip(${Component.displayName || Component.name})`;
  return WrappedComponent;
}
