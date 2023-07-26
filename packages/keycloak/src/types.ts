/* istanbul ignore file */
import type { AuthClientError } from '@react-keycloak/core';
import type { KeycloakInstance } from 'keycloak-js';

export enum AuthEvent {
  ready = 'ready',
  authSuccess = 'authSuccess',
  authError = 'authError',
  authRefreshSuccess = 'authRefreshSuccess',
  authRefreshError = 'authRefreshError',
  authLogout = 'authLogout',
  tokenExpired = 'tokenExpired',
  initError = 'initError',
}

export type EventHandler = (payload: EventPayload) => void;

export interface EventPayload {
  error?: AuthClientError;
  keycloak: KeycloakInstance;
}
