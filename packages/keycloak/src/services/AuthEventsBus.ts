import { EventEmitter } from 'events';
import type { AuthClientEvent } from '@react-keycloak/core';
import { EventHandler } from '../types';

export const authEventEmitter = new EventEmitter() as Omit<EventEmitter, 'on'> & {
  on: (event: AuthClientEvent, cb: EventHandler) => EventEmitter;
};
