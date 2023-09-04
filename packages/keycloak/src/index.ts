import OriginKeycloak, { KeycloakConfig } from 'keycloak-js';
import type { Axios } from 'axios';
import type { AuthClientEvent } from '@react-keycloak/core';

import { createProvider } from './components/Provider';
import { bindInterceptor } from './interceptor';
import { authEventEmitter } from './services/AuthEventsBus';
import type { EventPayload } from './types';

const subscribe = (eventName: AuthClientEvent, cb: (event: EventPayload) => void) => {
  authEventEmitter.addListener(eventName, cb);
  return () => {
    authEventEmitter.removeListener(eventName, cb);
  };
};

export function initKeycloak(config: KeycloakConfig, axios?: Axios) {
  const keycloak = new OriginKeycloak({
    ...config,
  });

  if (axios) {
    bindInterceptor(axios, keycloak);
  }

  const Provider = createProvider(keycloak);

  return Object.assign(Provider, { keycloak, subscribe });
}

export * from './hooks';
