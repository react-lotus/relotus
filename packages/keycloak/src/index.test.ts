import { AuthClientEvent } from '@react-keycloak/core';
import { initKeycloak } from '.';
import { authEventEmitter } from './services/AuthEventsBus';

describe('initKeycloak', () => {
  const Keycloak = initKeycloak({ clientId: 'TEST', realm: 'TEST' });

  it('should return component with static keycloak property', () => {
    expect(Keycloak.keycloak).toBeDefined();
  });

  it('should return component with ability of subscribe', () => {
    const event: AuthClientEvent = 'onAuthSuccess';
    const handler = jest.fn();

    const unsubscribe = Keycloak.subscribe(event, handler);
    authEventEmitter.emit(event, { keycloak: Keycloak.keycloak });
    expect(handler).toBeCalled();
    unsubscribe();
  });
});
