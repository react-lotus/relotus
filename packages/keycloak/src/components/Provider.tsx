import React, { ComponentProps, ReactNode, useCallback } from 'react';
import { KeycloakInstance, KeycloakProfile } from 'keycloak-js';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import type { AuthClientError, AuthClientEvent } from '@react-keycloak/core';

import { authEventEmitter } from '../services/AuthEventsBus';

export interface KeycloakProviderProps
  extends Omit<ComponentProps<typeof ReactKeycloakProvider>, 'authClient'> {
  children: ReactNode;
  onUserLogin?: (profile: KeycloakProfile) => void;
  onUserLogOut?: () => void;
}

export function createProvider(keycloakInstance: KeycloakInstance) {
  function KeycloakProvider({
    onEvent,
    onUserLogin,
    onUserLogOut,
    ...props
  }: KeycloakProviderProps) {
    const handleEvent = useCallback(
      (eventType: AuthClientEvent, error?: AuthClientError) => {
        /* istanbul ignore next */
        authEventEmitter.emit(eventType, { ...error, keycloak: keycloakInstance });
        /* istanbul ignore next */
        onEvent?.(eventType, error);
        /* istanbul ignore next */
        switch (eventType) {
          case 'onAuthRefreshError':
            keycloakInstance.logout().catch(() => {});
            break;
          case 'onAuthSuccess':
          case 'onAuthRefreshSuccess': {
            keycloakInstance.loadUserProfile().then(onUserLogin, () => {});
            break;
          }
          case 'onAuthLogout':
            onUserLogOut?.();
            break;
          default:
            break;
        }
      },
      [onEvent, onUserLogOut, onUserLogin],
    );
    return <ReactKeycloakProvider {...props} authClient={keycloakInstance} onEvent={handleEvent} />;
  }

  return KeycloakProvider;
}
