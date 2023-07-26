/* istanbul ignore file */
import * as BaseKeycloakReact from '@react-keycloak/web';

jest.mock('keycloak-js', () => {
  let token = 'token';
  const userProfile = {
    username: 'test',
    email: 'test@relotus.dev',
    firstName: 'Test',
    lastName: 'User',
  };
  const realmAccess = { roles: ['admin', 'auditor', 'user'] };
  let authenticated = true;

  return jest.fn(() => {
    return {
      init: jest.fn().mockReturnValue(Promise.resolve()),
      authenticated,
      hasRealmRole: jest.fn().mockReturnValue(true),
      hasResourceRole: jest.fn().mockReturnValue(true),
      idToken: token,
      initialized: true,
      updateToken: jest.fn(() => {
        token = 'new_token';
        return Promise.resolve(true);
      }),
      loadUserProfile() {
        return Promise.resolve({ userProfile });
      },
      login() {
        authenticated = true;
        return Promise.resolve();
      },
      logout() {
        authenticated = false;
        return Promise.resolve();
      },
      profile: userProfile,
      realm: 'TestRealm',
      realmAccess,
      get refreshToken() {
        return `refresh_${token}`;
      },
      get token() {
        return token;
      },
    };
  });
});

jest.mock('@react-keycloak/web', () => {
  const originalLib: typeof BaseKeycloakReact = jest.requireActual('@react-keycloak/web');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const keycloak = jest.requireMock('keycloak-js')();
  return {
    ...originalLib,
    useKeycloak: jest.fn(() => {
      return { initialized: true, keycloak };
    }),
  };
});
