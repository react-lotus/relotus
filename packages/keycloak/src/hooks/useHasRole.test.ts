import '../mock';

import { renderHook } from '@testing-library/react-hooks';
import { useKeycloak } from '@react-keycloak/web';

import { useHasRole } from './useHasRole';

import { initKeycloak } from '..';

const Keycloak = initKeycloak({ clientId: 'Foo', realm: 'Bar,' });
const MOCK_ROLES = ['admin', 'user'];

const KeycloakMock = jest.mocked(Keycloak.keycloak, true);

KeycloakMock.hasRealmRole.mockImplementation((role: string) => {
  return MOCK_ROLES.includes(role);
});
KeycloakMock.hasResourceRole.mockImplementation((role: string) => MOCK_ROLES.includes(role));

const useKeycloakMock = jest.mocked(useKeycloak);

useKeycloakMock.mockImplementation(() => ({
  initialized: true,
  keycloak: KeycloakMock,
}));

describe('useHasRole', () => {
  it('should return true if user has role', () => {
    const { result } = renderHook(() => useHasRole(MOCK_ROLES[0]), { wrapper: Keycloak });
    expect(result.current).toBeTruthy();
  });

  it('should return false if user has no role', () => {
    const { result } = renderHook(() => useHasRole(`${MOCK_ROLES[0]}foo`), { wrapper: Keycloak });
    expect(result.current).toBeFalsy();
  });
});
