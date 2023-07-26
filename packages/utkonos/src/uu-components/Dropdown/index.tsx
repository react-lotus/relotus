import cn from 'clsx';
import { nanoid } from 'nanoid';
import type { CSSProperties, ReactNode } from 'react';
import { useCallback, useRef, useState, useMemo } from 'react';
import { useClickAway } from 'react-use';
import { useBooleanState } from '@relotus/hooks';
import { jsxToString } from '../_datepicker';
import { SelectMenu, SelectMenuProps } from '../_select';
import { Button, ButtonProps } from '../Button';
import type { LabeledCoreProps } from '../Labeled';
import { Labeled } from '../Labeled';
import { ReactComponent as ArrowSvg } from './assets/arrow.svg';

import './index.scss';

export * from './DropdownItem';

type ButtonUsableProps = Omit<ButtonProps, 'as' | 'children' | 'onClick' | 'title' | 'type'>;

type DivElement = JSX.IntrinsicElements['div'];

export interface DropdownProps
  extends SelectMenuProps,
    LabeledCoreProps,
    ButtonUsableProps,
    DivElement {
  /**
   * Внутренее содержимое списка дропдауна, может быть любым
   */
  children: ReactNode;

  /**
   * Уникальный id
   *
   * @default nanoid()
   */
  id?: string;

  /**
   * Дополнительные стили
   */
  style?: CSSProperties;

  /**
   * Контент кнопки
   *
   * см. API компонента Button
   */
  buttonContent: ReactNode;

  /**
   * Скрывать стрелку раскрытия/сворачивания элемента
   *
   * @default false
   */
  withoutArrow?: boolean;

  /**
   * aria-label, метка для элемента
   */
  ariaLabel?: string;
}

/**
 * Компонент дропдауна: кнопка с выпадающим списком
 */
export function Dropdown(props: DropdownProps): JSX.Element {
  const [fallbackId] = useState(nanoid);

  const {
    appendToBody = false,
    children,
    buttonContent,
    className,
    direction,
    disabled,
    id = fallbackId,
    label,
    menuMaxHeight,
    menuPosition = 'bottom-start',
    menuWidth,
    required,
    style,
    view = 'primary',
    withoutArrow = false,
    square,
    loading,
    small,
    ariaLabel = jsxToString(buttonContent),
    hint,
    ...rest
  } = props;

  // Открытие списка
  const [isOpen, , setClose, toggle] = useBooleanState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [menuRef, setMenuRef] = useState<HTMLElement | null>(null);

  const buttonChildren =
    typeof buttonContent === 'string' && !withoutArrow ? (
      <span>{buttonContent}</span>
    ) : (
      buttonContent
    );

  const ref = useMemo(() => ({ current: menuRef }), [menuRef]);
  useClickAway(ref, setClose);

  const onSelectMenuClick = useCallback(
    ({ target }) => {
      if (menuRef !== target) {
        setClose();
      }
    },
    [menuRef, setClose],
  );

  const openDropdown = useCallback(() => {
    // Хак, решающий проблему быстрого закрытия и открытия DropDown без применения e.stopPropagation() и корретную работу useClickAway() в React 17.
    setTimeout(() => toggle(), 0);
  }, [toggle]);

  return (
    <Labeled
      className={className}
      id={id}
      label={label}
      direction={direction}
      required={required}
      hint={hint}
    >
      <div
        className={cn('uu-dropdown', className)}
        ref={rootRef}
        aria-label={ariaLabel}
        role="menu"
        {...rest}
      >
        <Button
          className="uu-dropdownButton"
          id={id}
          onMouseDown={openDropdown}
          onTouchStart={openDropdown}
          view={view}
          disabled={disabled}
          square={square}
          loading={loading}
          aria-expanded={isOpen}
          small={small}
        >
          {buttonChildren}
          {!withoutArrow && (
            <ArrowSvg
              className={cn('uu-dropdownArrow', {
                'uu-dropdownArrow_open': isOpen,
              })}
              role="img"
            />
          )}
        </Button>
        {isOpen && (
          <SelectMenu
            appendToBody={appendToBody}
            className="uu-dropdownMenu"
            isOpen
            menuMaxHeight={menuMaxHeight}
            menuPosition={menuPosition}
            menuWidth={menuWidth}
            target={rootRef.current}
            ref={setMenuRef}
            menuRef={menuRef}
            onClick={onSelectMenuClick}
            role="menubar"
          >
            {children}
          </SelectMenu>
        )}
      </div>
    </Labeled>
  );
}
