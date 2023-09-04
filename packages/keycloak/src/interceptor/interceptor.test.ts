import '../mock';

import axios from 'axios';
import Keycloak from 'keycloak-js';

import { bindInterceptor, setTokenToHeder } from './interceptor';
import { initKeycloak } from '..';

const keycloak = new Keycloak();

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
    },
  },
}));

describe('bindInterceptor', () => {
  it('should bind interceptor', () => {
    bindInterceptor(axios, keycloak);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(axios.interceptors.request.use).toBeCalled();
  });

  it('should bind interceptor', () => {
    const eject = bindInterceptor(axios, keycloak);
    eject();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(axios.interceptors.request.eject).toBeCalled();
  });

  it('should be called on init', () => {
    initKeycloak({ clientId: 'Foo', realm: 'Bar' }, axios);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(axios.interceptors.request.use).toBeCalled();
  });
});

describe('setTokenToHeder', () => {
  it('should set Authorization header', async () => {
    const config = await setTokenToHeder(keycloak, { url: '/foo' });
    expect(config.headers).toMatchObject({
      Authorization: expect.stringContaining(keycloak.token as string),
    });
  });
});
