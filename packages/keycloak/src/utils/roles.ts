import { KeycloakInstance } from 'keycloak-js';

export function hasRole(keycloak: KeycloakInstance, role: string) {
  return keycloak.hasRealmRole(role) || keycloak.hasResourceRole(role);
}
