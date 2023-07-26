import { buffers, eventChannel } from 'redux-saga';
import { KeycloakProfile } from 'keycloak-js';
import { AuthClientError } from '@react-keycloak/core';

import { createEvent } from '../utils/event';
import { authEventEmitter } from '../services/AuthEventsBus';

import { AuthEvent, EventHandler } from '../types';

const authSuccess = createEvent<AuthSuccessPayload>(AuthEvent.authSuccess);
const authError = createEvent<AuthClientError | undefined>(AuthEvent.authError);
const authRefreshSuccess = createEvent<AuthSuccessPayload>(AuthEvent.authRefreshSuccess);
const authRefreshError = createEvent<AuthClientError | undefined>(AuthEvent.authRefreshError);
const ready = createEvent(AuthEvent.ready);
const initError = createEvent(AuthEvent.initError);
const authLogout = createEvent(AuthEvent.authLogout);
const tokenExpired = createEvent(AuthEvent.tokenExpired);

interface AuthSuccessPayload {
  token: string;
  profile: KeycloakProfile;
}

type KeycloakChannelEvent =
  | ReturnType<typeof authSuccess>
  | ReturnType<typeof authError>
  | ReturnType<typeof authRefreshSuccess>
  | ReturnType<typeof authRefreshError>
  | ReturnType<typeof ready>
  | ReturnType<typeof initError>
  | ReturnType<typeof authLogout>
  | ReturnType<typeof tokenExpired>;

export function createKeycloakChannel() {
  return eventChannel<KeycloakChannelEvent>((emit) => {
    const handleAuthError: EventHandler = ({ error }) => emit(authError(error));
    const handleRefreshError: EventHandler = ({ error }) => emit(authRefreshError(error));
    const handleReady: EventHandler = () => emit(ready({}));
    const handleInitError: EventHandler = ({ error }) => emit(initError(error));
    const handleAuthLogout: EventHandler = () => emit(authLogout({}));
    const handleTokenExpired: EventHandler = () => emit(tokenExpired({}));

    const handleAuthSuccess: EventHandler = ({ keycloak }) => {
      const { token } = keycloak;
      keycloak
        .loadUserProfile()
        .then((profile) => {
          emit(
            authSuccess({
              profile,
              token: token as string,
            }),
          );
        })
        .catch(authError);
    };

    const handleRefreshSuccess: EventHandler = ({ keycloak }) => {
      const { token } = keycloak;
      keycloak
        .loadUserProfile()
        .then((profile) => {
          emit(
            authRefreshSuccess({
              profile,
              token: token as string,
            }),
          );
        })
        .catch(authError);
    };

    authEventEmitter.on('onAuthError', handleAuthError);
    authEventEmitter.on('onAuthSuccess', handleAuthSuccess);
    authEventEmitter.on('onAuthRefreshSuccess', handleRefreshSuccess);
    authEventEmitter.on('onAuthRefreshError', handleRefreshError);
    authEventEmitter.on('onReady', handleReady);
    authEventEmitter.on('onInitError', handleInitError);
    authEventEmitter.on('onAuthLogout', handleAuthLogout);
    authEventEmitter.on('onTokenExpired', handleTokenExpired);

    return () => {
      authEventEmitter.off('onAuthError', handleAuthError);
      authEventEmitter.off('onAuthSuccess', handleAuthSuccess);
      authEventEmitter.off('onAuthRefreshSuccess', handleRefreshSuccess);
      authEventEmitter.off('onAuthRefreshError', handleRefreshError);
      authEventEmitter.off('onReady', handleReady);
      authEventEmitter.off('onInitError', handleInitError);
      authEventEmitter.off('onAuthLogout', handleAuthLogout);
      authEventEmitter.off('onTokenExpired', handleTokenExpired);
    };
  }, buffers.dropping());
}

export const events = {
  authSuccess,
  authError,
  authRefreshSuccess,
  authRefreshError,
  ready,
  initError,
  authLogout,
  tokenExpired,
};
