import { useKeycloak } from '@react-keycloak/web';
import { useMemo } from 'react';

import { hasRole } from '../utils/roles';

export function useHasRole(role: string): boolean {
  const { keycloak } = useKeycloak();
  return useMemo(() => hasRole(keycloak, role), [keycloak, role]);
}
