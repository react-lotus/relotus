import React, { useEffect, useState, useCallback } from 'react';
import type { Meta, Story } from '@storybook/react/types-6-0';
import { useBooleanState } from '@relotus/hooks';
import { Button } from '../..';

import { ToastContainer, ToastContainerProps, toast } from '.';

export default {
  title: 'Page/ToastContainer',
  component: ToastContainer,
} as Meta;

export const Playground: Story<ToastContainerProps> = ({ ...args }) => {
  const [trigger, fireReload] = useState<unknown>();

  const dismissAll = useCallback(() => toast.dismiss(), []);

  useEffect(() => {
    toast('Сообщение', {
      containerId: 'playground',
    });
    toast.success('Приглашение отправлено сотруднику', {
      containerId: 'playground',
    });
    toast.error('Что-то пошло не так. Действие не выполнено', {
      containerId: 'playground',
    });
    toast.warn('Что-то пошло не так', {
      containerId: 'playground',
    });
    toast.info('Для доступа к новым функциям, обновите страницу', {
      containerId: 'playground',
    });
  }, [trigger]);

  return (
    <div>
      <div className="sb-row">
        <Button onClick={fireReload}>Отобразить оповещения</Button>
        <Button onClick={dismissAll}>Скрыть все</Button>
        {/* containerId и enableMultiContainer используется только потому, что на этой странице несколько ToastContainer */}
        <ToastContainer {...args} containerId="playground" enableMultiContainer />
      </div>
    </div>
  );
};

export const CustomJSXContent = () => {
  /**
   * containerId и enableMultiContainer используется только потому, что на этой странице несколько ToastContainer
   * */
  const [isShown, show, hide] = useBooleanState();
  useEffect(() => {
    if (isShown) {
      toast.info(
        <span role="img" aria-label="fire">
          🔥
        </span>,
        {
          onClose: hide,
          toastId: 'customContent',
          containerId: 'jsxContent',
        },
      );
    } else {
      toast.dismiss('customContent');
    }
  }, [isShown, hide]);

  return (
    <>
      <ToastContainer containerId="jsxContent" enableMultiContainer />
      <Button onClick={isShown ? hide : show}>{isShown ? 'Скрыть' : 'Отобразить'}</Button>
    </>
  );
};

export const CustomOptionsForEachToast = () => {
  /**
   * containerId и enableMultiContainer используется только потому, что на этой странице несколько ToastContainer
   * */
  const [isShown, show, hide] = useBooleanState();
  useEffect(() => {
    if (isShown) {
      toast.info('У меня изменено положение и я никогда не закроюсь автоматически', {
        autoClose: false,
        position: 'top-right',
        onClose: hide,
        containerId: 'customOptions',
      });
      toast.info('А у меня есть прогресс', {
        hideProgressBar: false,
        toastId: 'progress',
        containerId: 'customOptions',
      });
    } else {
      toast.dismiss('progress');
    }
  }, [hide, isShown]);

  return (
    <>
      <ToastContainer containerId="customOptions" enableMultiContainer />
      <Button onClick={isShown ? hide : show}>{isShown ? 'Скрыть' : 'Отобразить'}</Button>
    </>
  );
};

export const LargeContent = () => {
  /**
   * containerId и enableMultiContainer используется только потому, что на этой странице несколько ToastContainer
   * */
  const [isShown, show, hide] = useBooleanState();
  useEffect(() => {
    if (isShown) {
      toast(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        {
          onClose: hide,
          toastId: 'longContent',
          containerId: 'largeContent',
        },
      );
    } else {
      toast.dismiss('longContent');
    }
  }, [hide, isShown]);

  return (
    <>
      <ToastContainer containerId="largeContent" enableMultiContainer />
      <Button onClick={isShown ? hide : show}>{isShown ? 'Скрыть' : 'Отобразить'}</Button>
    </>
  );
};
