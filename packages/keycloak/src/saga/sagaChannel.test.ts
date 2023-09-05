import '../mock';

import { waitFor } from '@testing-library/react';
import Keycloak from 'keycloak-js';

import { authEventEmitter } from '../services/AuthEventsBus';
import { AuthEvent } from '../types';
import { createKeycloakChannel, events } from './sagaChannel';

describe('createKeycloakChannel', () => {
  describe.each([
    ['onReady', AuthEvent.ready],
    ['onAuthSuccess', AuthEvent.authSuccess],
    ['onAuthError', AuthEvent.authError],
    ['onAuthRefreshSuccess', AuthEvent.authRefreshSuccess],
    ['onAuthRefreshError', AuthEvent.authRefreshError],
    ['onAuthLogout', AuthEvent.authLogout],
    ['onTokenExpired', AuthEvent.tokenExpired],
    ['onInitError', AuthEvent.initError],
  ])('for keycloak %s event ', (keycloakEvent, event) => {
    it(`should emit saga ${event} event `, async () => {
      const chanel = createKeycloakChannel();
      const cb = jest.fn();
      chanel.take(cb);
      authEventEmitter.emit(keycloakEvent, { keycloak: new Keycloak() });
      await waitFor(() => {
        expect(cb).toBeCalledWith(expect.objectContaining({ type: expect.hasSymbol(event) }));
      });
      chanel.close();
    });

    it(`should match ${event} from events.%${event}`, async () => {
      const chanel = createKeycloakChannel();
      const cb = jest.fn();
      chanel.take(cb);
      authEventEmitter.emit(keycloakEvent, { keycloak: new Keycloak() });
      await waitFor(() => {
        const [payload] = cb.mock.calls[0];
        expect(events[event].match(payload)).toBeTruthy();
      });
      chanel.close();
    });

    it(`should not emit saga ${event} event when channel close`, async () => {
      const chanel = createKeycloakChannel();
      const cb = jest.fn();
      chanel.take(cb);
      chanel.close();
      cb.mockReset();
      authEventEmitter.emit(keycloakEvent, { keycloak: new Keycloak() });
      await waitFor(() => {
        expect(cb).not.toHaveBeenCalled();
      });
    });
  });
});
