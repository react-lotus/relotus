import '../mock';

import { renderHook } from '@testing-library/react-hooks';

import { initKeycloak } from '..';
import { useKeycloak } from '.';

describe('useKeycloak', () => {
  it('should return keycloak', () => {
    const KeycloakProvider = initKeycloak({ clientId: 'Foo', realm: 'Bar' });
    const { result } = renderHook(() => useKeycloak(), { wrapper: KeycloakProvider });
    const { keycloak, initialized } = result.current;
    expect(keycloak).toBeDefined();
    expect(initialized).toBe(true);
  });
});
